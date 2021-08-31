const express = require('express');
const router = express.Router();
const NoticeController = require('../controllers/notice');
const { upload } = require('../util');

router.get('/group/:id/notice', NoticeController.getNotices);

router.post('/group/:id/notice', NoticeController.createNotice);

router.get('/notice/:id', NoticeController.getNotice);

router.delete('/notice/:id', NoticeController.deleteNotice);

router.put('/notice', NoticeController.updateNotice);

router.post('/upload', upload.single('notice'), NoticeController.uploadFile);

module.exports = router;