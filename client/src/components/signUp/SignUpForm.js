import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as S from './style';
import { majorOptions } from '../../util/selectOption/selectOption';
import color from '../../util/style/color';
import { customStyles } from './style';

const SignUpForm = ({ history }) => {
  const [sendAuth, setSendAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const email = watch('email');
  const authNumber = watch('authNumber');
  const password = useRef();
  password.current = watch('password');
  const checkAll = watch('checkAll');
  const check1 = watch('check1');
  const check2 = watch('check2');

  const handleCheckAll = () => {
    setValue('checkAll', !checkAll);
    setValue('check1', !checkAll);
    setValue('check2', !checkAll);
  };

  useEffect(() => {
    setValue('checkAll', check1 && check2);
  }, [check1, check2]);

  const onSubmit = data => {
    setSignUpError('');
    axios
      .post('/api/user/signup', {
        email: `${data.email}@sookmyung.ac.kr`,
        password: data.password,
        sid: data.sid,
        name: data.name,
        major: data.major.label,
        isAdmin: false,
      })
      .then(response => {
        console.log(response);
        history.push('/login');
      })
      .catch(error => {
        console.log(error.response);
        setSignUpError(error.response.data);
      });
  };

  const sendAuthNumber = () => {
    axios
      .post('/api/user/sendemail', {
        email: `${email}@sookmyung.ac.kr`,
      })
      .then(() => {
        setSendAuth(true);
      })
      .catch(error => {
        console.log(error);
        setSignUpError(error.response.data);
      });
    console.log('전송');
  };

  const authNumberConfirm = () => {
    axios
      .post('/api/user/authconfirm', { authNumber })
      .then(() => {
        setAuth(true);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('확인');
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Label>이름</S.Label>
      <S.Input
        placeholder="이름"
        {...register('name', {
          required: true,
          pattern: /^[가-힣]{2,6}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
        })}
      />
      {errors.name && errors.name.type === 'required' && (
        <S.ErrorMessage>이름을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <S.ErrorMessage>
          한글은 2~6자, 영문은 2~10자 firstname Lastname 형식으로 입력해주세요.
        </S.ErrorMessage>
      )}

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
        {...register('authNumber', { required: true })}
        disabled={auth}
        style={{ marginBottom: '0px' }}
      />
      <S.ButtonWrapper>
        {errors.authNumber ? <S.ErrorMessage>인증번호를 입력해주세요.</S.ErrorMessage> : <div />}
        {auth ? (
          <S.Confirm>확인</S.Confirm>
        ) : (
          <S.AuthButton type="button" onClick={authNumberConfirm}>
            확인하기
          </S.AuthButton>
        )}
      </S.ButtonWrapper>
      <S.Label>학과</S.Label>
      <Controller
        name="major"
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={majorOptions}
            placeholder="학과를 선택해주세요."
            styles={customStyles}
          />
        )}
        control={control}
        defaultValue=""
      />
      {errors.major && <S.ErrorMessage>학과를 선택해주세요.</S.ErrorMessage>}

      <S.Label>학번</S.Label>
      <S.Input
        type="number"
        placeholder="학번"
        {...register('sid', { required: true, minLength: 7, maxLength: 7 })}
      />
      {errors.sid && errors.sid.type === 'required' && (
        <S.ErrorMessage>학번을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.sid && errors.sid.type === 'minLength' && (
        <S.ErrorMessage>학번 7자리를 입력해주세요.</S.ErrorMessage>
      )}
      {errors.sid && errors.sid.type === 'maxLength' && (
        <S.ErrorMessage>학번 7자리를 입력해주세요.</S.ErrorMessage>
      )}

      <S.Label>비밀번호</S.Label>
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

      <S.Label>비밀번호 확인</S.Label>
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
      <S.Label>약관 동의</S.Label>
      <S.CheckBoxWrapper>
        <S.CheckBoxItem>
          <input
            type="checkbox"
            style={{ transform: 'scale(1.5)', marginRight: '20px' }}
            {...register('checkAll', { required: true })}
            onChange={handleCheckAll}
          />
          <div style={{ fontSize: '1.2rem', color: 'black' }}>전체 동의</div>
        </S.CheckBoxItem>
        <S.Line />
        <S.CheckBoxItem>
          <input
            type="checkbox"
            style={{ transform: 'scale(1.5)', marginRight: '20px' }}
            {...register('check1', { required: true })}
          />
          <div>
            이용약관<span style={{ color: `${color.navy}` }}>(필수)</span>
          </div>
        </S.CheckBoxItem>
        {errors.check1 && <S.ErrorMessage>이용약관에 동의해주세요.</S.ErrorMessage>}
        <S.CheckBoxItem>
          <input
            type="checkbox"
            style={{ transform: 'scale(1.5)', marginRight: '20px' }}
            {...register('check2', { required: true })}
          />
          <div>
            개인 정보 수집 동의<span style={{ color: `${color.navy}` }}>(필수)</span>
          </div>
        </S.CheckBoxItem>
        {errors.check2 && <S.ErrorMessage>개인 정보 수집에 동의해주세요.</S.ErrorMessage>}
      </S.CheckBoxWrapper>

      <S.SubmitButton type="submit">회원가입 완료</S.SubmitButton>
      {signUpError && <S.ErrorMessage>{signUpError}</S.ErrorMessage>}
      <S.BottomText>
        이미 가입하셨나요?
        <S.ToLogin to="login">로그인</S.ToLogin>
      </S.BottomText>
    </S.Form>
  );
};

export default SignUpForm;
