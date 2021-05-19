import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as S from './style';
import { majorOptions } from '../../../util/selectOption/selectOption';
import color from '../../../util/style/color';
import { customStyles } from './style';
import { signUp } from '../../../actions/auth_actions';

const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState('');
  const dispatch = useDispatch();
  const request = useSelector(state => state.user.request);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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
    data = {
      email: `${data.email}@sookmyung.ac.kr`,
      password: data.password,
      id: data.id,
      name: data.name,
      major: data.major.label,
      isAdmin: false,
    };
    setSignUpError('');
    dispatch(signUp(data));
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
          {...register('email', { required: true, pattern: /[a-zA-Z0-9_.-]{5,30}/ })}
        />
        <S.Email>@ sookymyung.ac.kr</S.Email>
      </S.EmailWrapper>
      {errors.email && errors.email.type === 'required' && (
        <S.ErrorMessage>이메일을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <S.ErrorMessage>
          6자~30자 글자(a-z),숫자(0-9) 및 마침표(.)만 입력할 수 있습니다.
        </S.ErrorMessage>
      )}
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
        {...register('id', { required: true, minLength: 7, maxLength: 7 })}
      />
      {errors.id && errors.id.type === 'required' && (
        <S.ErrorMessage>학번을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.id && errors.id.type === 'minLength' && (
        <S.ErrorMessage>학번 7자리를 입력해주세요.</S.ErrorMessage>
      )}
      {errors.id && errors.id.type === 'maxLength' && (
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
      {request && <div>loading...</div>}
      {signUpError && <S.ErrorMessage>{signUpError}</S.ErrorMessage>}
      <S.BottomText>
        이미 가입하셨나요?
        <S.ToLogin to="login">로그인</S.ToLogin>
      </S.BottomText>
    </S.Form>
  );
};

export default SignUpForm;
