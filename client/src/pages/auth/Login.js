import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import AuthLayout from '../../components/auth/AuthLayout';

function Login() {
  return (
    <AuthLayout title="로그인" description="학교 이메일로 로그인하세요.">
      <LoginForm />
    </AuthLayout>
  );
}
export default Login;
