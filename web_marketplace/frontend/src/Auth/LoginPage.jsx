import React from 'react';
import LoginCard from './LoginCard';
import BackgroundVideo from './BackgroundVideo.jsx';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans">
      <button onClick={() => navigate('/')}
        className="absolute left-8 top-8 z-20 rounded-lg border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/20">
        Home
      </button>

      <BackgroundVideo videoSrc={import.meta.env.VITE_AUTH_VIDEO} />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="main-card relative z-10 flex items-center justify-center">
          <LoginCard />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginPage;