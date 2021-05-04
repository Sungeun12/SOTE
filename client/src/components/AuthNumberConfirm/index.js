import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as S from '../signUp/style';

function AuthNumberConfirm() {
  const [sendAuth, setSendAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch('email');
  const cauthNumber = watch('cauthNumber');

  const sendAuthNumber = () => {
    axios
      .post('http://localhost:5000/user/sendmail', {
        email: `${email}@sookmyung.ac.kr`,
      })
      .then(() => {
        setSendAuth(true);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('전송');
  };

  const authNumberConfirm = () => {
    axios
      .post('http://localhost:5000/user/authconfirm', { cauthNumber })
      .then(response => {
        setAuth(true);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('확인');
  };

  return (
    <S.Form onSubmit={handleSubmit(authNumberConfirm)}>
      <S.Label>이메일</S.Label>
      <S.EmailWrapper>
        <S.EmailInput
          placeholder="이메일"
          {...register('email', { required: true, pattern: /[a-zA-Z0-9_.-]{6,30}/ })}
        />
        <S.Email>@ sookymyung.ac.kr</S.Email>
      </S.EmailWrapper>
      <S.ButtonWrapper>
        {errors.email && errors.email.type === 'required' ? (
          <S.ErrorMessage>이메일을 입력해주세요.</S.ErrorMessage>
        ) : (
          <div />
        )}
        {errors.email && errors.email.type === 'pattern' ? (
          <S.ErrorMessage>
            6자~30자 글자(a-z),숫자(0-9) 및 마침표(.)만 입력할 수 있습니다.
          </S.ErrorMessage>
        ) : (
          <div />
        )}
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
        {...register('cauthNumber', { required: true })}
        disabled={auth}
        style={{ marginBottom: '0px' }}
      />
      <S.ButtonWrapper>
        {errors.cauthNumber ? <S.ErrorMessage>인증번호를 입력해주세요.</S.ErrorMessage> : <div />}
        {auth ? <S.Confirm>확인</S.Confirm> : <S.AuthButton type="submit">확인하기</S.AuthButton>}
      </S.ButtonWrapper>
    </S.Form>
  );
}

export default AuthNumberConfirm;
