package com.newus.traders.model.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.model.dto.OauthToken;
import com.newus.traders.model.entity.KakaoUser;
import com.newus.traders.model.service.KakaoUserService;


@RestController //(1)
@RequestMapping("/api")
public class UserController1 {

    @Autowired
    private KakaoUserService userService;

    // 프론트에서 인가코드 받아오는 url
    @GetMapping("/oauth/kakao")
    public KakaoUser getLogin(@RequestParam("code") String code) {

        // 넘어온 인가 코드를 통해 access_token 발급
       OauthToken oauthToken = userService.getAccessToken(code);
  
       
      //(1)
      // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
      KakaoUser user = userService.saveUser(oauthToken.getAccess_token());

        return user;
   }

}