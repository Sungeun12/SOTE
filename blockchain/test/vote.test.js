const Vote = artifacts.require('Vote');
const MockVote = artifacts.require('MockVote');
const catchRevert = require('./exceptions').catchRevert;
const expectEvent = require("./expectEvent");

contract('Vote', function([deployer, user1, user2]) {
  let vote;
  const CANDIDATE_NAMES = ['apple', 'banana'];
  const SINGLE_SELECTION = 0;
  const MULTI_SELECTION = 1;
  const ONE_HOUR_IN_SECONDS = 60 * 60;
  const ONE_HOUR_IN_MILLIS = ONE_HOUR_IN_SECONDS * 1000; 
  const ONE_HOUR_AGO = Math.floor((new Date().getTime() - ONE_HOUR_IN_MILLIS) / 1000.0);
  const ONE_HOUR_LATER = Math.floor((new Date().getTime() + ONE_HOUR_IN_MILLIS) / 1000.0);
  const ONE_DAY_LATER = Math.floor((new Date().getTime() + ONE_HOUR_IN_MILLIS * 24) / 1000.0);

  describe('constructor', function() {
    before(async() => {
      vote = await Vote.new(CANDIDATE_NAMES, SINGLE_SELECTION, ONE_HOUR_LATER, ONE_DAY_LATER);
    })

    it('initializes the candidates with the correct values', async() => {
      const numOfCandidates = await vote.totalNumOfCandidates();
      assert.equal(numOfCandidates, 2);
  
      const candidate1 = await vote.candidates(0);
      assert.equal(candidate1.id, 0, 'contains the correct id');
      assert.equal(candidate1.name, 'apple', 'contains the correct name');
      assert.equal(candidate1.voteCount, 0, 'contains the correct vote count');
  
      const candidate2 = await vote.candidates(1);
      assert.equal(candidate2.id, 1, 'contains the correct id');
      assert.equal(candidate2.name, 'banana', 'contains the correct name');
      assert.equal(candidate2.voteCount, 0, 'contains the correct vote count');
    })
  
    it('initializes the selection type with the correct value', async() => {
      const selectionType = await vote.selectionType();
      assert.equal(selectionType, SINGLE_SELECTION);
    })
  
    it('initializes the voting time with the correct values', async() => {
      const openingTime = await vote.openingTime();
      const closingTime = await vote.closingTime();
      assert.equal(openingTime, ONE_HOUR_LATER);
      assert.equal(closingTime, ONE_DAY_LATER);
    })
  
    it('should fail when an invalid selection type was passed', async() => {
      await catchRevert(Vote.new(CANDIDATE_NAMES, 2, ONE_HOUR_LATER, ONE_DAY_LATER));
    })
  
    it('should fail when invalid voting time was passed', async() => {
      await catchRevert(Vote.new(CANDIDATE_NAMES, SINGLE_SELECTION, ONE_HOUR_AGO, ONE_DAY_LATER));
      await catchRevert(Vote.new(CANDIDATE_NAMES, SINGLE_SELECTION, ONE_HOUR_LATER, ONE_HOUR_AGO));
    })
  })

  describe('when user cast a vote for single option', function() {
    beforeEach(async() => {
      vote = await MockVote.new(CANDIDATE_NAMES, SINGLE_SELECTION, ONE_HOUR_LATER, ONE_DAY_LATER);
      await vote.decreaseOpeningTime(ONE_HOUR_IN_SECONDS);
    })

    it('allows users to vote successfully', async() => {
      let receipt = await vote.castVoteForSingleOption(0, { from: user1 });
      const candidate1 = await vote.candidates(0);
      const voteCount = candidate1.voteCount;
      const numOfVoters = await vote.totalNumOfVoters();
      const hasVoted = await vote.voted(user1);
      assert.equal(voteCount, 1);
      assert.equal(numOfVoters, 1);
      assert(hasVoted);
      await expectEvent.inLogs(receipt.logs, 'VotingEvent');
    })

    it('should fail when the election is not in progress', async() => {
      await vote.decreaseClosingTime(ONE_HOUR_IN_SECONDS * 24);
      await catchRevert(vote.castVoteForSingleOption(0, { from: user1 }));
    })

    it('should fail when the user has already voted', async() => {
      await vote.castVoteForSingleOption(0, { from: user2 });
      await catchRevert(vote.castVoteForSingleOption(0, { from: user2 }));
    })

    it('should fail when the user votes for an invalid candidate', async() => {
      await catchRevert(vote.castVoteForSingleOption(2, { from: user2 }));
    })
  })

  describe('when user cast a vote for multiple options', function() {
    beforeEach(async() => {
      vote = await MockVote.new(CANDIDATE_NAMES, MULTI_SELECTION, ONE_HOUR_LATER, ONE_DAY_LATER);
      await vote.decreaseOpeningTime(ONE_HOUR_IN_SECONDS);
    })

    it('allows users to vote successfully', async() => {
      let receipt = await vote.castVoteForMultiOptions([0, 1], { from: user1 });
      const candidate1 = await vote.candidates(0);
      const candidate1VoteCount = candidate1.voteCount;
      const candidate2 = await vote.candidates(1);
      const candidate2VoteCount = candidate2.voteCount;
      const numOfVoters = await vote.totalNumOfVoters();
      const hasVoted = await vote.voted(user1);
      assert.equal(candidate1VoteCount, 1);
      assert.equal(candidate2VoteCount, 1);
      assert.equal(numOfVoters, 1);
      assert(hasVoted);
      await expectEvent.inLogs(receipt.logs, 'VotingEvent');
    })

    it('should fail when the election is not in progress', async() => {
      await vote.decreaseClosingTime(ONE_HOUR_IN_SECONDS * 24);
      await catchRevert(vote.castVoteForMultiOptions([0, 1], { from: user1 }));
    })

    it('should fail when the user has already voted', async() => {
      await vote.castVoteForMultiOptions([0, 1], { from: user2 });
      await catchRevert(vote.castVoteForMultiOptions([0, 1], { from: user2 }));
    })

    it('should fail when the user votes for an invalid candidate', async() => {
      await catchRevert(vote.castVoteForMultiOptions([], { from: user2 }));
    })
  })

  describe('getResult', function() {
    before(async() => {
      vote = await MockVote.new(CANDIDATE_NAMES, SINGLE_SELECTION, ONE_HOUR_LATER, ONE_DAY_LATER);
      await vote.decreaseOpeningTime(ONE_HOUR_IN_SECONDS);
      await vote.castVoteForSingleOption(0, { from: user1 });
      await vote.castVoteForSingleOption(0, { from: user2 });
    })

    it('should fail when the function is called before or during the election', async() => {
      await catchRevert(vote.getResult());
    })

    it('should return the exact result of the vote after the election', async() => {
      vote.decreaseClosingTime(ONE_HOUR_IN_SECONDS * 24);
      const {0: names, 1: voteCounts} = await vote.getResult();
      assert.equal(names.length, 2);
      assert.equal(names[0], 'apple');
      assert.equal(names[1], 'banana');
      assert.equal(voteCounts.length, 2);
      assert.equal(voteCounts[0], 2);
      assert.equal(voteCounts[1], 0);
    })
  })
})
