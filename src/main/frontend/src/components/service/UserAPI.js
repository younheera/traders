// import React from 'react';
// import axios from "axios";
// import * as jwt_decode from 'jwt-decode';

// let ACCESS_TOKEN = localStorage.getItem("accessToken");
// let REFRESH_TOKEN = localStorage.getItem("refreshToken"); 

// //사용자정의 axios객체
// const loginInstance = axios.create(config => {
// 	config.headers['Content-Type'] = 'application/json';
// })​

// setupAxiosInterceptors() {
//     axios.interceptors.request.use(
//         config => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 config.headers['Authorization'] = 'Bearer ' + token;
//             }
//             // config.headers['Content-Type'] = 'application/json';
//             return config;
//         },
//         error => {
//             Promise.reject(error)
//         });
// }
// axios.interceptors.response.use(function (response){
// 	// Do something with response data
// 	return response;
// }, function (error){
// 	// Do something with Response error
// 	return Promise.reject(error);
// });​



// axios.interceptors.response.use(
// 	// 정상 응답처리
// 	(config) => {
// 		return config
// 	},
// 	// 오류 발생시
// 	function (error) {
// 		const originalRequest = error.config;
// 		//AccessToken이 만료됬고, RefreshToken이 유효하다면
// 		if(validateTimeRefreshtoken() &&!validateTimeAccesstoken()){
// 			// Refreshtoken을 통해 Accesstoken을 재발급한다.
// 			return getAccesstokenWithRefreshtoken()
// 				.then(res => {
// 					// Response가 정상이라면
// 					if(res.status === 200){
// 						console.log(['Inteceptors.Response] got succeed');
// 						sessionStorage.setItem('accessToken', res.data.accessToken);
// 						sessionStorage.setItem('memberId', res.data.memberId);
// 						sessionStorage.setItem('role', res.data.role);
// 						axios.defaults.header.common['accessToken'] =
// 						  sessionStorage.getItem('accessToken');
// 						// 실패했던 요청을 다시 수행한다.
// 						return axios(originalRequest);
// 					}
// 				})
// 		} // Refreshtoken이 만료됬을때
// 		else if (!validateTimeRefreshtoken()){
// 			sessionStorage.clear();
// 			localStorage.clear();
// 			window.location.href = "http://localhost:3000";
// 			alert("세션 만료 다시 로그인 해주세요.");
// 		}
// 		return Promise.reject(error);
// 	}

// 	);​

//     var decodePayload = jwt_decode(accessToken, {payload: true});
//     const validateTimeAccesstoken = () => {
//         // sessionStorage에서 accessToken을 가져온다.
//         const accessToken = sessionStorage.getItem('accessToken');
//         // jwt를 decode 하여 payload를 추출한다.
//         const decodePayload = jwt_decode(accessToken, {payload: true});
    
//         // exp가 UNIX Time으로 나오기 때문에 변환을 해준다.
//         var exp = (new Date(decodePayload.exp * 1000).getTime());
//         var now = new Date().getTime();
    
//         // 변환된 값을 비교하고 Boolean type을 반환한다.
//         if(now < exp){
//             console.log("AccessToken is valid");
//             return true;
//         } else {
//             consoel.log("AccessToken is invalid");
//             return false;
//         }
//     }
//     export const getAccesstokenWithRefreshtoken = () => {
//         getAtInstance.post(baseURL + "/getAt", "", 
//         {
//             headers: { 'refreshToken' : localStorage.getItem('refreshToken')}
//         })
//     }

// export default UserAPI;