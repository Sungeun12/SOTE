const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/group');
const { upload } = require('../util');

router.get('/', GroupController.getGroups);

router.post('/', GroupController.createGroup);

router.put('/', GroupController.updateGroup);

router.get('/:id', GroupController.getGroup);

router.patch('/:id', GroupController.updateEmailFilepath);

router.post('/:id/joinreq', GroupController.requestForJoin);

router.post('/:id/join', GroupController.registerMember);

router.post('/:id/leave', GroupController.unregisterMember);

router.post('/:id/manager', GroupController.registerManager);

router.delete('/:id/manager', GroupController.unregisterManager);

router.post('/upload', upload.single('group'), GroupController.uploadFile);

module.exports = router;