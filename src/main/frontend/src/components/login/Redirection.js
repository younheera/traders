import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Redirection = () => {
  // 1. 인가 코드 받기
  const code = new URL(window.location.href).searchParams.get("code");
  
  //인가코드 백엔드로 넘기기
  useEffect(()=>{
    axios
    .get(`http://localhost:8080/api/oauth/kakao?code=${code}`)
    .then((res)=> {
      localStorage.setItem('CC_Token',res.headers.aut)
      localStorage.setItem('RF_Token',refreshToken)
    })
    
  },[]);

  // // 2. access Token
  // const getToken = async () => {
  //   const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
  //   const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  //   const CLIENT_SECRET = process.env.REACT_APP_KAKAO_SECRET;

  //   const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${CLIENT_SECRET}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded:charset=utf-8",
  //     }
  //   });
  //   return response.json();
  // }

  
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   if (code) {
  //     getToken(code).then(res => {
  //       alert(res.access_token);
  //       setToken(res.access_token);
  //     })
  //   }
  // },);

  

  // useEffect(() => {
  //   axios.get("/api/auth")
  //   .then(res => token)
  //   .catch(error => console.log(error))

  // }, [])

  // 리액트 컴포넌트 JSX 반환
  return (
    <div>
     login 중입니다..
    </div>
  );
}

export default Redirection;

