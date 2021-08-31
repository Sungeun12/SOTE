const UserService = require('../services/user');

exports.signup = (req, res) => {
  const json = req.body;
  UserService.signup(json)
    .then(user => res.json({ success: true, data: user._id }))
    .catch(err => res.json({ success: false, err }));
}

exports.sendMail = (req, res) => {
  const { email } = req.body;
  UserService.sendMail(email)
    .then(() => { res.json({ success: true })})
    .catch(err => res.json({ success: false, err }));
}

exports.authConfirm = (req, res) => {
  const { email, cauthNumber } = req.body;
  UserService.authConfirm(email, cauthNumber)
    .then(data => {
      console.log(data);
      const { message, token } = data;
      if(message) {
        res.json({ success: false, message });
      }
      res.cookie('x_auth', token).json({ success: true, message: '인증이 완료되었습니다.' });
    })
    .catch(err => res.json({ success: false, err }));
}

exports.auth = (req, res) => {
  const { _id, isAdmin, email, name, major, image, votes } = req.user;
  res.json({
    isAuth: true,
    _id,
    isAdmin,
    email,
    name,
    major,
    image,
    votes
  });
}

exports.signin = (req, res) => {
  const { email, password } = req.body;
  UserService.signin(email, password)
    .then(data => {
      const { message, token, userId } = data;
      if(message) {
        res.json({ loginSuccess: false, message });
      }
      res.cookie('x_auth', token).json({ loginSuccess: true, userId });
    })
    .catch(err => res.json({ loginSuccess: false, err }));
}

exports.signout = (req, res) => {
  const id = req.user._id;
  UserService.signout(id)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}

exports.uploadImage = (req, res) => {
  const filepath = req.file.filename;
  if(filepath) res.json({ success: true, data: filepath });
  else res.json({ success: false }); 
}

exports.updateImage = (req, res) => {
  const { userId, filepath } = req.body;
  UserService.updateImage(userId, filepath)
    .then(() => res.json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
}

exports.getVotes = (req, res) => {
  const { id } = req.params;
  UserService.getVotes(id)
    .then(votes => res.json({ success: true, data: votes }))
    .catch(err => res.json({ success: false, err }));
}

exports.getGroups = (req, res) => {
  const { id } = req.params;
  UserService.getGroups(id)
    .then(groups => res.json({ success: true, data: groups }))
    .catch(err => res.json({ success: false, err }));
}