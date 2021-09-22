const express = require('express');
const router = express.Router();
const VoteController = require('../controllers/vote');
const { upload } = require('../util');

router.get('/', VoteController.getVotes);

router.post('/', VoteController.createVote);

router.get('/major', VoteController.getMajorVotes);

router.post('/upload', upload.single('img'), VoteController.uploadImage);

router.get('/:id', VoteController.getVote);

router.post('/:id', VoteController.castVote);

module.exports = router;