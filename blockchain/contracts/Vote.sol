// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Vote {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public voted;
    event VotingEvent(uint256 totalNumOfVoters);
    uint256 public totalNumOfCandidates;
    uint256 public totalNumOfVoters;
    uint256 public candidateCount;
    uint256 public selectionType;
    uint256 public openingTime;
    uint256 public closingTime;

    constructor(
        string[] memory candidateNames,
        uint256 _selectionType, // 0이면 single, 1이면 multiple selection
        uint256 _openingTime,
        uint256 _closingTime
    ) public {
        require(_selectionType == 0 || _selectionType == 1);
        require(_openingTime >= block.timestamp);
        require(_openingTime <= _closingTime);

        selectionType = _selectionType;
        openingTime = _openingTime;
        closingTime = _closingTime;

        totalNumOfCandidates = candidateNames.length;
        for (uint256 i = 0; i < totalNumOfCandidates; i++) {
            addCandidate(candidateNames[i]);
        }
    }

    function addCandidate(string memory name) internal {
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
        candidateCount++;
    }

    function castVoteForSingleOption(uint256 candidateId) external {
        require(isOngoing(), "Election is not in progress.");
        require(!voted[msg.sender], "You already voted.");
        require(
            candidateId >= 0 && candidateId < totalNumOfCandidates,
            "Not a valid candidate."
        );
        require(selectionType == 0);

        candidates[candidateId].voteCount++;
        totalNumOfVoters++;
        voted[msg.sender] = true;

        emit VotingEvent(totalNumOfVoters);
    }

    function castVoteForMultiOptions(uint256[] calldata candidateIds) external {
        require(isOngoing(), "Election is not in progress.");
        require(!voted[msg.sender], "You already voted.");
        require(candidateIds.length > 0, "You must select at least one option");
        require(selectionType == 1);

        for (uint256 i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] >= totalNumOfCandidates) {
                return;
            }
            candidates[candidateIds[i]].voteCount++;
        }
        totalNumOfVoters++;
        voted[msg.sender] = true;

        emit VotingEvent(totalNumOfVoters);
    }

    function getResult()
        external
        view
        returns (string[] memory, uint256[] memory)
    {
        require(hasClosed());
        string[] memory names = new string[](totalNumOfCandidates);
        uint256[] memory voteCounts = new uint256[](totalNumOfCandidates);
        for (uint256 i = 0; i < totalNumOfCandidates; i++) {
            names[i] = candidates[i].name;
            voteCounts[i] = candidates[i].voteCount;
        }
        return (names, voteCounts);
    }

    function isOngoing() public view returns (bool) {
        return block.timestamp >= openingTime && block.timestamp <= closingTime;
    }

    function hasClosed() public view returns (bool) {
        return block.timestamp > closingTime;
    }
}

contract MockVote is Vote {
    constructor(
        string[] memory candidateNames,
        uint256 _selectionType,
        uint256 _openingTime,
        uint256 _closingTime
    ) public Vote(candidateNames, _selectionType, _openingTime, _closingTime) {}

    function decreaseOpeningTime(uint256 secs) external {
        openingTime -= secs;
    }

    function decreaseClosingTime(uint256 secs) external {
        closingTime -= secs;
    }
}
