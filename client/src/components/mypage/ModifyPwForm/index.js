import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as S from '../../auth/SignUpForm/style';

function ModifyPwForm({ setModifyPW }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');
  const onSubmit = data => {
    data = {
      password: data.password,
    };
    setModifyPW(false);
    console.log(data);
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Label>새 비밀번호</Label>
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

      <Label>새 비밀번호 확인</Label>
      <S.Input
        type="password"
        placeholder="비밀번호 확인"
        {...register('pwdConfirm', {
          required: true,
          validate: value => value === password.current,
        })}
      />
      {errors.pwdConfirm && errors.pwdConfirm.type === 'required' && (
        <S.ErrorMessage>비밀번호 확인을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.pwdConfirm && errors.pwdConfirm.type === 'validate' && (
        <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
      )}
      <ButtonWrapper>
        <Button type="submit" bg="#838383">
          수정하기
        </Button>
        <Button type="button" color="#838383" onClick={() => setModifyPW(false)}>
          취소
        </Button>
      </ButtonWrapper>
    </S.Form>
  );
}
const Label = styled.label`
  width: 100%;
  font-size: 1rem;
  margin: 1vh 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;
const Button = styled.button`
  font-family: 'Nanum Gothic Coding', monospace;
  height: 5vh;
  width: 130px;
  padding: 0 10px;
  margin-left: 1vw;
  margin-bottom: 2vh;
  text-align: center;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.bg || 'white'};
  color: ${props => props.color || 'white'};
  border: 1px solid ${props => props.color || 'none'};
  border-radius: 5px;
`;
export default ModifyPwForm;
