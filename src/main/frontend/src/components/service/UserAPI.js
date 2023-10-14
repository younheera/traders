import React from 'react';
import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken"); 

export const UserAPI = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `$ ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});
// 토큰 갱신
const refreshAccessToken = async () => {
    const response = await UserAPI.get(`/api/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserAPI.defaults.headers.common['Authorization'] = `${ACCESS_TOKEN}`;
}
// 토큰 유효성 검사(인터셉터)
UserAPI.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        await refreshAccessToken();
        return UserAPI(originalRequest);
    }
    return Promise.reject(error);
});
export default UserAPI;