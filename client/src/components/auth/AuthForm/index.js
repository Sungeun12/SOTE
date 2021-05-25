import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as api from '../../../api/auth';
import * as S from '../SignUpForm/style';
import useInput from '../../../hooks/useInput';
import checkEmail from '../../../util/RegExp/checkEmail';

function AuthForm() {
  const [sendAuth, setSendAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [cauthNumber, onChangeCAuthNumber, setCAuthNumber] = useInput('');
  const [emailError, setEmailError] = useState(false);

  const history = useHistory();

  const sendAuthNumber = () => {
    if (emailError || !email) {
      setEmailError(true);
      return;
    }
    const userEmail = `${email}@sookmyung.ac.kr`;
    const response = api.sendMail(userEmail);

    if (response) {
      setSendAuth(true);
    }
    if (response.data && !response.data.loginSuccess) {
      alert(response.data.message);
    }
  };

  const authNumberConfirm = () => {
    if (!cauthNumber) {
      alert('인증번호를 입력해주세요');
      return;
    }
    if (!email) {
      alert('이메일을 입력해주세요');
    }
    const userEmail = `${email}@sookmyung.ac.kr`;

    api
      .authConfirm(userEmail, cauthNumber)
      .then(response => {
        console.log(response.data);
        if (response.data && !response.data.success) {
          alert(response.data.message);
        }
        if (response.data && response.data.success) {
          setAuth(true);
          alert(response.data.message);
          history.push('/login');
          setEmail('');
          setCAuthNumber('');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <S.Form>
      <S.Label>이메일</S.Label>
      <S.EmailWrapper>
        <S.EmailInput
          placeholder="이메일"
          value={email}
          type="text"
          onChange={onChangeEmail}
          onBlur={() => setEmailError(!checkEmail(email))}
          required
        />
        <S.Email>@ sookymyung.ac.kr</S.Email>
      </S.EmailWrapper>
      <S.ButtonWrapper>
        {emailError ? <S.ErrorMessage>이메일 입력이 잘못되었습니다.</S.ErrorMessage> : <div />}
        {sendAuth ? (
          <S.AgainRequestButton type="button" onClick={sendAuthNumber}>
            요청 다시 보내기
          </S.AgainRequestButton>
        ) : (
          <S.AuthButton type="button" onClick={sendAuthNumber}>
            인증번호 요청
          </S.AuthButton>
        )}
      </S.ButtonWrapper>
      <S.Label>인증번호</S.Label>
      <S.Input
        placeholder="인증번호"
        value={cauthNumber}
        disabled={auth}
        onChange={onChangeCAuthNumber}
        required
      />
      <S.ButtonWrapper>
        <div />
        {auth ? (
          <S.Confirm>확인</S.Confirm>
        ) : (
          <S.AuthButton type="button" onClick={authNumberConfirm}>
            확인하기
          </S.AuthButton>
        )}
      </S.ButtonWrapper>
    </S.Form>
  );
}

export default AuthForm;
