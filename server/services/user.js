const User = require("../models/User");
const Group = require("../models/Group");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.signup = async json => {
  const user = new User(json);
  user.code = Math.floor(Math.random() * 1000000) + 100000;
  if (user.code > 1000000) {
    user.code -= 100000;
  }
  const newUser = await user.save();
  return newUser;
}

exports.sendMail = async email => {
  User.findOne({ email }, async (err, user) => {
    if (!user) {
      return { message: "제공된 이메일에 해당하는 유저가 없습니다." };
    }
    let key = "code key";
    let decipher = crypto.createDecipher("aes-256-cbc", key);
    let result = decipher.update(user.code, "base64", "utf8");
    result += decipher.final("utf8");
    let concode = result;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      }
    });
    let mailOptions = {
      from: `"SOTE" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "SOTE 회원가입 인증 코드 입니다.",
      text: String(concode)
    };
    await transporter.sendMail(mailOptions);
  });
}

exports.authConfirm = async (email, cauthNumber) => {
  User.findOne({ email }, async (err, user) => {
    if(!user) {
      return { message: "제공된 이메일에 해당하는 유저가 없습니다." };
    }
    let key = 'code key';
    let cipher = crypto.createCipher("aes-256-cbc", key);
    let result = cipher.update(cauthNumber, "utf8", "base64");
    result += cipher.final("base64");
    
    if(result !== user.code) {
      return { message: "인증번호가 다릅니다." };
    }
    user.generateCodeToken((err, user) => {
      return { token: user.codetoken };
    });
  });
}

exports.signin = async (email, password) => {
  User.findOne({ email }, (err, user) => {
    if (!user) {
      return { message: "제공된 이메일에 해당하는 유저가 없습니다." };
    }
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return { message: "비밀번호가 틀렸습니다." };
      }
    });
    user.generateToken((err, user) => {
      return { token: user.token, userId: user._id };
    });
  });
}

exports.signout = async id => {
  await User.findByIdAndUpdate(id, { token: "" });
}

exports.updateImage = async (userId, filepath) => {
  await User.findByIdAndUpdate(userId, { image: filepath });
}

exports.getVotes = async id => {
  const user = await User.findById(id);
  return user.votes;
}

exports.getGroups = async id => {
  const groups = await Group.find({ members: { $in: id }});
  return groups;
}
