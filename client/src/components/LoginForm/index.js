import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as S from '../SignUpForm/style';
import color from '../../util/style/color';
import { signIn } from '../../actions/auth_actions';

function LoginForm() {
  const dispatch = useDispatch();

  const [logInError, setLogInError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setLogInError(false);
    const userEmail = `${data.email}@sookmyung.ac.kr`;
    const userPwd = data.password;
    dispatch(signIn(userEmail, userPwd));
  };

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
        <li style={{ width: '60%' }}>비밀번호 찾기</li>

        <li style={{ width: '20%' }}>
          <StyledLink to="/auth">인증하기</StyledLink>
        </li>
        <li>
          <StyledLink to="/signup">회원가입</StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color.darkGray};
`;

export default withRouter(LoginForm);
