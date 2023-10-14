/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-14 00:53:26
 * @modify date 2023-10-14 11:36:26
 * @desc [description]
 */
import { responsiveFontSizes } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

let backendHost;
const hostname = window && window.location && window.location.hostname;
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}
export const API_BASE_URL = `${backendHost}`;

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
    body: JSON.stringify(request)
  };

  if (request) {// GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options).then((response) => {
    if (response.status===200) {
      console.log(response);
      return response.json();
      }
    }).catch((error) => {
      console.log(error.sta)
      if (error.status === 403 || error.status ===400) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    });
}

export function signin(LoginDTO) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  
  return axios.post(`${API_BASE_URL}/api/authenticate`, LoginDTO, {

    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json"
    }
  })
  .then((response) => {
   
    if (response.status === 200 && response.data) {
      localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
      localStorage.setItem("REFRESH_TOKEN", response.data.refreshToken);
      //  window.location.href = "/";
    }
  })
  .catch((error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 400)) {
      console.log("error: "+error.response);
      // window.location.href = "/login";
    }
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}


export function signup(userDTO) {
  return call("/api/auth/signup", "POST", userDTO);
}
