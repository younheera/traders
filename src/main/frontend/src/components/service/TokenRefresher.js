import axios from 'axios';
import { useHistory } from "react-router-dom";

/*
TokenRefresher 컴포넌트는 액세스 토큰이 만료되었을 때 자동으로 액세스 토큰을 갱신하기 위해 사용됩니다. 이 컴포넌트 자체는 사용자로부터 직접 호출할 필요가 없습니다. 대신, 애플리케이션의 모든 axios 요청을 가로채고, 만료된 액세스 토큰으로 발생한 오류를 처리합니다.

따라서 단순히 TokenRefresher 컴포넌트를 애플리케이션의 루트 컴포넌트에 추가하면 됩니다. 이제, 다른 컴포넌트에서 axios를 사용하여 서버로 요청을 보낼 때, TokenRefresher가 가로챈 오류를 처리하고 액세스 토큰을 자동으로 갱신할 것입니다.
*/
const TokenRefresher = axios.create({
  baseURL: "http://localhost:8080/api"
})

  // Request interceptor
  TokenRefresher.interceptors.request.use(
    async (config) => {

      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      if (accessToken) {// 헤더에 AT 추가해서 요청 보내기
        if (config.headers) config.headers.token = accessToken;
      }
      console.log("헤더에 AT추가해서 요청 보냄" + config.headers);
      return config;

    },
    (error) => {
      console.log("간절함미다4");
      return Promise.reject(error);
    }
  );

  
// Response interceptor
  TokenRefresher.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("what is originalRequest? : " + originalRequest.data);
      if (error.response && error.response.status === 401) { // AT 만료 상태

        const refreshToken = localStorage.getItem("REFRESH_TOKEN");
        console.log("Reissue Request send to Server"); 
        try {
          const data = {
            accessToken: localStorage.getItem("ACCESS_TOKEN"),
            refreshToken: localStorage.getItem("REFRESH_TOKEN")
          };
          const response = await axios.post("http://localhost:8080/api/auth/reissue", data, {
            headers: {
              'Refresh': refreshToken
            }
          });
          console.log("Reissue Request Response:", response);
          //토큰 재발급 성공
          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            localStorage.setItem("ACCESS_TOKEN", newAccessToken);
            localStorage.setItem("REFRESH_TOKEN", newRefreshToken);
            console.log("New Token Saved to LocalStorage");

            // 이전 요청 헤더에 새로운 액세스 토큰 추가
            error.config.headers.token = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN");
            console.log(error.config.headers.token);

            //이전 요청 재시도
            // const retryResponse = await axios.request(error.config);
            console.log("새로발급받은 token헤더에 담아 로그인 시도");
             //return error.config;

            return axios(originalRequest);

          }
        } catch (err) { //AT+RT 둘다 만료
          console.error("Error refreshing token :", err);
          Error("❌ 장시간 미접속으로 정보만료, 재로그인해주세요! ❌");
          // window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

export default TokenRefresher;
