import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fetcher from '../../util/fetcher';
import * as S from '../signUp/style';
import color from '../../util/style/color';

function LoginForm() {
  const { data: userData, error: swrError, revalidate } = useSWR(
    'http://localhost:{서버포트}/api/user/',
    fetcher,
  );

  const [logInError, setLogInError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setLogInError(false);
    axios
      .post(
        'api/user/login',
        {
          email: `${data.email}@sookmyung.ac.kr`,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        revalidate();
      })
      .catch(error => {
        setLogInError(error.response.data);
      });
  };

  if (!swrError && userData) {
    return <Redirect to="/" />;
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.EmailWrapper>
        <S.EmailInput
          placeholder="이메일"
          {...register('email', {
            required: true,
            pattern: /[a-zA-Z0-9_.-]{6,30}/,
          })}
        />
        <S.Email>@ sookymyung.ac.kr</S.Email>
      </S.EmailWrapper>

      {errors.email && errors.email.type === 'required' && (
        <S.ErrorMessage>이메일을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <S.ErrorMessage>
          {' '}
          6자~30자 글자(a-z),숫자(0-9) 및 마침표(.)만 입력할 수 있습니다.
        </S.ErrorMessage>
      )}
      <S.Input
        type="password"
        placeholder="비밀번호"
        {...register('password', {
          required: true,
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
        })}
      />
      {errors.password && errors.password.type === 'required' && (
        <S.ErrorMessage>비밀번호를 입력해주세요.</S.ErrorMessage>
      )}
      {errors.password && errors.password.type === 'pattern' && (
        <S.ErrorMessage>8~20자 영문, 숫자로 입력해주세요.</S.ErrorMessage>
      )}
      <BottomContainer>
        <li>비밀번호 찾기</li>
        <li>
          <ToSignUp to="/signup">회원가입</ToSignUp>
        </li>
      </BottomContainer>
      <S.SubmitButton type="submit">로그인</S.SubmitButton>
      {logInError && <S.ErrorMessage>{logInError}</S.ErrorMessage>}
      <S.CheckBoxItem>
        <input
          type="checkbox"
          style={{ transform: 'scale(1.5)', marginRight: '20px' }}
          {...register('loginSave')}
        />
        <div>로그인 정보 유지하기</div>
      </S.CheckBoxItem>
    </S.Form>
  );
}

const BottomContainer = styled.ul`
  margin-top: 2vh;
  display: flex;
  justify-content: space-between;
  color: ${color.darkGray};
  cursor: pointer;
  font-size: 1rem;
`;

const ToSignUp = styled(Link)`
  text-decoration: none;
  color: ${color.darkGray};
`;

export default LoginForm;
