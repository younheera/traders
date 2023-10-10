import React from "react";
import './login.css';


const Login = () => {
  const KAKAO_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const Kakao = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div className="Positioner">
      <div className="ShadowedBox">
        <div className="LogoWrapper">
         <h2>로그인 페이지</h2>
        </div>
      <div>
    
      </div>

        

      <button onClick={Kakao}>카카오로 시작하기</button><br/>
      <button>네이버로 시작하기</button>
      </div>
    </div>
  );
};
export default Login;
