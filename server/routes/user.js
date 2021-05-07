const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.post("/signup", (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  user.code = Math.floor(Math.random() * 1000000) + 100000;
  if (user.code > 1000000) {
    user.code = user.code - 100000;
  }

  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({ sucess: true });
  });
});

router.post("/sendmail", async function (req, res) {
  const user_email = req.body.email; //받아온 email user_email에 초기화

  console.log(user_email);

  var concode;

  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    var key = "code key";
    var decipher = crypto.createDecipher("aes-256-cbc", key);
    var result2 = decipher.update(user.code, "base64", "utf8");
    result2 += decipher.final("utf8");
    concode = result2;
    // 메일발송 함수

    const transporter = nodemailer.createTransport({
      service: "gmail", //사용하고자 하는 서비스
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: "1813910@sookmyung.ac.kr", //gmail주소입력
        pass: "shins1215", //gmail패스워드 입력
      },
    });

    const info = await transporter.sendMail({
      from: "1813910@sookmyung.ac.kr", //보내는 주소 입력
      to: user_email, //위에서 선언해준 받는사람 이메일
      subject: "SOTE 회원가입 인증 코드 입니다.", //메일 제목
      text: String(concode), //내용
    });

    const checkmail = await new Object();
    checkmail.concode = concode;
    await res.send(checkmail);
  });
});

router.post("/authConfirm", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    var key = "code key";
    var data = req.body.cauthNumber;
    var cipher = crypto.createCipher("aes-256-cbc", key);
    var result3 = cipher.update(data, "utf8", "base64");
    result3 += cipher.final("base64");
    console.log(result3);
    if (result3 === user.code) {
      //코드까지 맞다면 토큰을 생성하기
      user.generateCodeToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        //res.cookie("x_auth",user.codetoken)
        //.status(200)
        //.json({ConfirmSuccess: true})
      });
      return res.json({
        success: true,
        message: "인증이 완료되었습니다.",
      });
    } else {
      return res.json({
        success: false,
        message: "인증번호가 다릅니다.",
      });
    }
  });
});

router.post("/signin", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
    });
    //비밀번호까지 맞다면 토큰을 생성하기
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSucess: true, userId: user._id });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  //여기까지 middleware를 통과해 왔다는 얘기는
  //Authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    major: req.user.major,
  });
});

router.get("/signout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, User) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).send({
      sucess: true,
    });
  });
});

module.exports = router;
