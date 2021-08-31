const NoticeService = require('../services/notice');

exports.getNotices = (req, res) => {
  const { query } = req;
  const groupId = req.params.id;
  NoticeService.getNotices(groupId, query)
    .then(notices => res.json({ success: true, data: notices }))
    .catch(err => res.json({ success: false, err }));
}

exports.createNotice = (req, res) => {
  const groupId = req.params.id;
  const json = req.body;
  NoticeService.createNotice(groupId, json)
    .then(notice => res.json({ success: true, data: notice._id }))
    .catch(err => res.json({ success: false, err }));
}

exports.getNotice = (req, res) => {
  const { id } = req.params;
  NoticeService.getNotice(id)
    .then(data => res.json({ success: true, data }))
    .catch(err => res.json({ success: false, err }));
}

exports.deleteNotice = (req, res) => {
  const { id } = req.params;
  NoticeService.deleteNotice(id)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}

exports.updateNotice = (req, res) => {
  const json = req.body;
  NoticeService.updateNotice(json)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}

exports.uploadFile = (req, res) => {
  const filepath = req.file.filename;
  if(filepath) res.json({ success: true, data: filepath });
  else res.json({ success: false });
}