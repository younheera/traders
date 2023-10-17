/**
 * @author heera youn
 * @create date 2023-10-16 10:47:46
 * @modify date 2023-10-16 10:47:46
 */

package com.newus.traders.user.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.user.controller.dto.TokenDTO;
import com.newus.traders.user.controller.dto.TokenRequestDTO;
import com.newus.traders.user.controller.dto.UserRequestDTO;
import com.newus.traders.user.controller.dto.UserResponseDTO;
import com.newus.traders.user.service.AuthService;

import antlr.Token;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(authService.signup(userRequestDTO));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenDTO> login(@RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(authService.login(userRequestDTO));
    }

    
    // @PostMapping("/reissue")
    // public ResponseEntity<?> reissue(@RequestHeader Map<String, String> data) {
    //     System.out.println(data.toString());
    //     //TokenRequestDTO tokenRequestDTO
    //     System.out.println(data.get("refresh"));
    //     //여기서 rt를 가지고 다시 at와, rt를 발급받게끔
    //     //근데 서비스에서 reissue 할때에 autheticationd을 at를 이용해서 가져오기때문에, 차라리 프론트에서 at를 가져오는게 나을 수도 있겠다. 라는 의견
    //     // System.out.println("//////AT///////" + tokenRequestDTO.getAccessToken());
    //     // System.out.println("//////RT///////" + tokenRequestDTO.getRefreshToken());
    //     return ResponseEntity.ok("ok");
     @PostMapping("/auth/reissue")
    public ResponseEntity<TokenDTO> reissue(@RequestBody TokenRequestDTO tokenRequestDTO, HttpServletRequest request) {
        String refreshToken = request.getHeader("Refresh"); // Refresh 헤더 가져오기
        System.out.println("Refresh 헤더 값: " + refreshToken);
        System.out.println("무엇을 요청?"+ tokenRequestDTO.toString());
        System.out.println("넘어온 AT:" + tokenRequestDTO.getAccessToken());
        System.out.println("넘어온 RT: " + tokenRequestDTO.getRefreshToken());
        System.out.println("?");
        return ResponseEntity.ok(authService.reissue(tokenRequestDTO));
    }
}


