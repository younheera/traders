package com.newus.traders.user.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.user.dto.UserDTO;
import com.newus.traders.user.exception.UserException;
import com.newus.traders.user.jwt.TokenProvider;
import com.newus.traders.user.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
        this.userService = userService;
    }
	private TokenProvider tokenProvider;

	// Bean으로 작성해도 됨.
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


	@PostMapping("/auth/signup")
	public ResponseEntity<UserDTO> signup(
            @Valid @RequestBody UserDTO userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }
	

	// @PostMapping("/auth/signin")
	// public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
	// 	UserEntity user = userService.getByCredentials(
	// 					userDTO.getEmail(),
	// 					userDTO.getPassword(),
	// 					passwordEncoder);

	// 	if(user != null) {
	// 		// 토큰 생성
	// 		final String token = tokenProvider.create(user);

	// 		final UserDTO responseUserDTO = UserDTO
	// 						.builder()
	// 						.email(user.getEmail())
	// 						.username(user.getUsername())
	// 						.password(user.getPassword())
	// 						.id(user.getId())
	// 						.token(token)
	// 						.build();
	// 		System.out.println("responseUserDTO" + responseUserDTO);

	// 		return ResponseEntity.ok().body(responseUserDTO);
			
	// 	} else {
	// 		ResponseDTO responseDTO = ResponseDTO.builder()
	// 						.error("Login failed.")
	// 						.build();
	// 		return ResponseEntity
	// 						.badRequest()
	// 						.body(responseDTO);
	// 	}
	// }
	
	// //회원정보 조회 API
	// @GetMapping("/auth/user")
	// Public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {

	// }
	// //회원정보 수정 API
	// @PutMapping("/auth/user")

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
