import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthForm from '../../components/auth/AuthForm';

function AuthConfirm() {
  return (
    <div>
      <AuthLayout title="인증하기" description="학교 이메일 인증을 완료해주세요.">
        <AuthForm />
      </AuthLayout>
    </div>
  );
}

export default AuthConfirm;
