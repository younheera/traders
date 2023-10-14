/**
 * @author heera youn
 * @create date 2023-10-14 00:53:43
 * @modify date 2023-10-14 00:53:43
 */
package com.newus.traders.user.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.user.dto.LoginDTO;
import com.newus.traders.user.dto.TokenDTO;
import com.newus.traders.user.jwt.JwtFilter;
import com.newus.traders.user.jwt.TokenProvider;
import com.newus.traders.user.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDTO> authorize(@Valid @RequestBody LoginDTO loginDto) {

        //1. login DTO 기반 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

                
        //2. 검증
        //Builder를 사용, Token을 인증 후 성공 시 객체반환
        // authenticationToken.getPrincipal();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 가입이된 회원인지 화인
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //3. 인증 정보를 기반한 JWT토큰 생성
        TokenDTO tokenDTO = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Authorization " + tokenDTO.getAccessToken());
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Authorization-refresh " + tokenDTO.getRefreshToken());

        System.out.println("accessToken정보: " + tokenDTO.getAccessToken());
        System.out.println("refreshToken정보: " + tokenDTO.getRefreshToken());

        
        return new ResponseEntity<>(tokenDTO, httpHeaders, HttpStatus.OK);
    }

}
