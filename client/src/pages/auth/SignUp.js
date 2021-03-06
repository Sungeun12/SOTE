import React from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import AuthLayout from '../../components/auth/AuthLayout';

function SignUp() {
  return (
    <div>
      <AuthLayout title="회원가입" description="기본 회원 정보를 등록해주세요">
        <SignUpForm />
      </AuthLayout>
    </div>
  );
}

export default SignUp;
