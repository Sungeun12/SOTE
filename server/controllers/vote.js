const VoteService = require('../services/vote');

exports.getVotes = (req, res) => {
    const { query } = req;
    VoteService.getVotes(query)
        .then(votes => res.json({ success: true, data: votes }))
        .catch(err => res.json({ success: false, err }));
}

exports.createVote = (req, res) => {
    VoteService.createVote(req.body)
        .then(vote => res.json({ success: true, data: vote._id }))
        .catch(err => res.json({ success: false, err }));
}

exports.getMajorVotes = (req, res) => {
    VoteService.getMajorVotes()
        .then(votes => res.json({ success: true, data: votes }))
        .catch(err => res.json({ success: false, err }));
}

exports.uploadImage = (req, res) => {
    const filepath = req.file.filename;
    if(filepath) res.json({ success: true, data: filepath });
    else res.json({ success: false }); 
}

exports.getVote = (req, res) => {
    const { id } = req.params;
    VoteService.getVote(id)
        .then(data => res.json({ success: true, data }))
        .catch(err => res.json({ success: false, err }));
}

exports.castVote = (req, res) => {
    const voteId = req.params.id;
    const userId = req.body.userId;
    
    VoteService.castVote(voteId, userId)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}