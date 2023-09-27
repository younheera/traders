package com.newus.traders.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.newus.traders.model.dto.KakaoProfile;
import com.newus.traders.model.dto.OauthToken;
import com.newus.traders.model.entity.User;
import com.newus.traders.model.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository; //(1)
    
     public OauthToken getAccessToken(String code) {

        //(2)통신에 유용한 클래스
        RestTemplate rt = new RestTemplate();

        //(3)헤더에 들어가야하는 정보 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(4)파라미터 넘기기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "3aa767356c8d1622abe4b4cf5dfa93ea");
        params.add("redirect_uri", "http://localhost:3000/redirect");
        params.add("code", code);
        params.add("client_secret", "64aWvgbxIaXqktYbStD2blZUlYebna1A");

        //(5)헤더와 바디 정보를 하나의 객체에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //(6)응답받는 값 JSON형태이므로, STRING형 객체
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
       
        //(7)JSON형식 데이터 클래스로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("//////////////oauthToken/////////////////" + oauthToken);
        return oauthToken; //(8)
    } 

    //사용자 정보 가져오기
    public User saveUser(String token){

        //(1) 
        KakaoProfile profile = findProfile(token);

		//(2) UserRepository 에 만들어뒀던 findByKakaoEmail() 메소드를 이용해 User 객체에 담아준다.
        User user = userRepository.findByKakaoEmail(profile.getKakao_account().getEmail());
        
        //(3) DB에 사용자를 저장하기 전, 이미 존재하는 사용자인지 체크
        if(user == null) { //user변수 값이 null인지, 아닌지로 (null이라면 DB저장되지 않았으므로, 사용자 저장 로직 실행)
            user = User.builder()
                    .kakaoId(profile.getId())
                     //(4) 카카오 프로필 이미지는 Properties 가 아닌 KakaoAccount 에서 가져옴
                    .kakaoProfileImg(profile.getKakao_account().getProfile().getProfile_image_url())
                    .kakaoNickname(profile.getKakao_account().getProfile().getNickname())
                    .kakaoEmail(profile.getKakao_account().getEmail())
                     //(5) 사용자의 Role(권한)은 ROLE_USER 로 고정
                    .userRole("ROLE_USER").build();
        
            userRepository.save(user);
        }
        System.out.println("profile" + profile+"**%%%%%%%%%%%%%%%%%%%%%%%%");

        return user;
    }
    //(1-1) 메소드 이용 액세스토큰으로 카카오 서버에서 사용자 정보 가져오기
    public KakaoProfile findProfile(String token) {
        
        //(1-2) 통신에 필요한 RestTemplate 객체
        RestTemplate rt = new RestTemplate();

		//(1-3) HttpHeader 객체를 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4) 헤더에는 발급받은 엑세스 토큰을 넣어 요청
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		//(1-5) HttpHeader 와 HttpBody 정보를 하나의 객체에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

		//(1-6)
        // Http 요청 (POST 방식) 후, response 변수(String)에 응답 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

		//(1-7) Json 응답을 KakaoProfile 객체로 변환해 리턴
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }
}