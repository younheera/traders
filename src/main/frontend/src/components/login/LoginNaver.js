import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const {naver} = window;

const LoginNaver = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI
    const NAVER_SECRET = process.env.REACT_APP_NAVER_SECRET
    const STATE="false";
    
    const location = useLocation();

    const initializeNaverLogin =()=> {
        const naverLogin = new naver.LoginWithNaverId({
            clientId : NAVER_CLIENT_ID,
            callbackUrl : REDIRECT_URI,
            clientSecret: NAVER_SECRET,
            isPopup : false,
            loginButton: {color:'green', type: 3, height: '60'},
        });
        naverLogin.init();
    }

    const getNaverToken=()=> {
        if(!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log(token);
    }


    useEffect(()=> {
        initializeNaverLogin();
        getNaverToken();
    },[]);
    //const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;


    // const Naver =()=> {
    //     window.location.href = NAVER_AUTH_URL;
    // };
    // return <button onClick={Naver}>네이버로그인</button>
      return (
            <div>
              <div id="naverIdLogin"></div>
            </div>
          );

};
export default LoginNaver;