import React from 'react';
import AuthButton from './AuthButton';
import { GoogleLogin } from '@react-oauth/google';
import AUTHAPI from './AUTHAPI.jsx';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const res = await AUTHAPI(credentialResponse.credential);

      if (res.status) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate('/');
      }
    }
  };

  const handleGithubLogin = () => {
    console.log("GitHub Login Triggered");
  };

  const GithubIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489..." />
    </svg>
  );

  return (
    <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f]/60 p-10 text-center text-white shadow-2xl backdrop-blur-xl">

      <h1 className="mb-2 text-4xl font-bold tracking-tight">AI OS</h1>
      <p className="mb-10 text-sm text-zinc-400">
        Redefine computing. Sign in to continue.
      </p>

      <div className="flex flex-col gap-4">

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap
            theme="filled_black"
            shape="pill"
            width="100%"
          />
        </div>

        <AuthButton
          icon={GithubIcon}
          label="Continue with GitHub"
          onClick={handleGithubLogin}
        />

      </div>
    </div>
  );
};

export default LoginCard;