export default function checkEmail(value) {
  const emailReg = /[a-zA-Z0-9_.-]{6,30}/;
  return emailReg.test(value);
}
