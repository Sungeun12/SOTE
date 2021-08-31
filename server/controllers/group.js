const GroupService = require('../services/group');

exports.getGroups = (req, res) => {
    const { query } = req;
    GroupService.getGroups(query)
        .then(groups => res.json({ success: true, data: groups }))
        .catch(err => res.json({ success: false, err }));
}

exports.createGroup = (req, res) => {
    GroupService.createGroup(req.body)
        .then(group => res.json({ success: true, data: group._id }))
        .catch(err => res.json({ success: false, err }));
}

exports.updateGroup = (req, res) => {
    GroupService.updateGroup(req.body)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.getGroup = (req, res) => {
    const { id } = req.params;
    GroupService.getGroup(id)
        .then(group => res.json({ success: true, data: group }))
        .catch(err => res.json({ success: false, err }));
}

exports.updateEmailFilepath = (req, res) => {
    const groupId = req.params.id;
    const filepath = req.body.filepath;
    GroupService.updateEmailFilepath(groupId, filepath)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.requestForJoin = (req, res) => {
    const groupId = req.params.id;
    const userId = req.body.userId;
    GroupService.requestForJoin(groupId, userId)
        .then(result => res.json({ success: true, result }))
        .catch(err => res.json({ success: false, err }));
}

exports.registerMember = (req, res) => {
    const groupId = req.params.id;
    const user = req.body;
    GroupService.registerMember(groupId, user)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.unregisterMember = (req, res) => {
    const groupId = req.params.id;
    const userId = req.body.userId;
    GroupService.unregisterMember(groupId, userId)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.registerManager = (req, res) => {
    const groupId = req.params.id;
    const email = req.body.email;
    GroupService.registerManager(groupId, email)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.unregisterManager = (req, res) => {
    const groupId = req.params.id;
    const managerId = req.body.managerId;
    GroupService.unregisterManager(groupId, managerId)
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}

exports.uploadFile = (req, res) => {
    const filepath = req.file.filename;
    if(filepath) res.json({ success: true, data: filepath });
    else res.json({ success: false }); 
}