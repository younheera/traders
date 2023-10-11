package com.newus.traders.user.controller;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;

import org.elasticsearch.core.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.user.dto.ResponseDTO;
import com.newus.traders.user.dto.UserDTO;
import com.newus.traders.user.entity.UserEntity;
import com.newus.traders.user.exception.UserException;
import com.newus.traders.user.security.TokenProvider;
import com.newus.traders.user.service.UserService;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private TokenProvider tokenProvider;

	// Bean으로 작성해도 됨.
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


	@PostMapping("/auth/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
		System.out.println(userDTO);
		try {
			// 리퀘스트를 이용해 저장할 유저 만들기
			UserEntity user = UserEntity.builder()
							.email(userDTO.getEmail())
							.username(userDTO.getUsername())
							.password(passwordEncoder.encode(userDTO.getPassword()))
							.build();
			// 서비스를 이용해 리파지토리에 유저 저장
			UserEntity registeredUser = userService.create(user);
			UserDTO responseUserDTO = UserDTO.builder()
							.email(registeredUser.getEmail())
							.id(registeredUser.getId())
							.username(registeredUser.getUsername())
							.build();
			// 유저 정보는 항상 하나이므로 그냥 리스트로 만들어야하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴.
			return ResponseEntity.ok(responseUserDTO);

		} catch (Exception e) {
			// 예외가 나는 경우 bad 리스폰스 리턴.
			ResponseDTO responseDTO 
			= ResponseDTO.builder().error(e.getMessage()).build();
			System.out.println(e.getMessage());
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}
	

	@PostMapping("/auth/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
		UserEntity user = userService.getByCredentials(
						userDTO.getEmail(),
						userDTO.getPassword(),
						passwordEncoder);

		if(user != null) {
			// 토큰 생성
			final String token = tokenProvider.create(user);

			final UserDTO responseUserDTO = UserDTO
							.builder()
							.email(user.getEmail())
							.username(user.getUsername())
							.password(user.getPassword())
							.id(user.getId())
							.token(token)
							.build();
			System.out.println("responseUserDTO" + responseUserDTO);

			return ResponseEntity.ok().body(responseUserDTO);
			
		} else {
			ResponseDTO responseDTO = ResponseDTO.builder()
							.error("Login failed.")
							.build();
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}

  	 @GetMapping("/auth/signup/nameCheck")
 	public ResponseEntity<?> checkNicknameDuplication(@RequestParam(value="username") String username) {
		try{
		System.out.println(username);
		if(userService.existsByUsername(username)) {
			throw new UserException(HttpStatus.CONFLICT);
		}else{
			return ResponseEntity.ok(HttpStatus.OK);
		}
	}catch(UserException e) {
		return ResponseEntity.status(e.getStatus()).body(e.getMessage());
	}
	}
	
	@GetMapping("/auth/signup/emailCheck")
	public ResponseEntity<?> checkEmailDuplication(@RequestParam(value="email") String email) {
		try{
		System.out.println(email);
		if(userService.existsByEmail(email)) {
			throw new UserException(HttpStatus.CONFLICT);
		}else{
			return ResponseEntity.ok(HttpStatus.OK);
		}
		}catch(UserException e) {
			return ResponseEntity.status(e.getStatus()).body(e.getMessage());
		}
	}
}
