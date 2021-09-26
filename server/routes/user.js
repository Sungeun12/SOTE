const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/auth');
const { upload } = require('../util');

router.post("/signup", UserController.signup);

router.post("/sendmail", UserController.sendMail);

router.post("/authConfirm", UserController.authConfirm);

router.get("/auth", checkAuth, UserController.auth);

router.post("/signin", UserController.signin);

router.get("/signout", checkAuth, UserController.signout);

router.post("/upload", upload.single('user'), UserController.uploadImage);

router.patch("/", UserController.updateImage);

router.get('/:id/vote', UserController.getVotes);

router.get('/:id/group', UserController.getGroups);

module.exports = router;
