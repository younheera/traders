/**
 * @author heera youn
 * @create date 2023-10-16 10:39:38
 * @modify date 2023-10-16 10:39:38
 * @desc [JWT 토큰 기반, 로그인 사용자 관련 Controller ]
 */
package com.newus.traders.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.user.dto.UserResponseDTO;
import com.newus.traders.user.exception.UserException;
import com.newus.traders.user.service.UserService;
import com.newus.traders.user.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	// 로그인한 사용자의 ID통해서 사용자 정보를 조회
	@GetMapping("/auth/me")
	public ResponseEntity<UserResponseDTO> findMemberInfoById() {
		return ResponseEntity.ok(userService.findMemberInfoById(SecurityUtil.getCurrentUserId()));
	}

	// 사용자의 이메일 주소 기반 사용자 정보 조회
	@GetMapping("/auth/{email}")
	public ResponseEntity<UserResponseDTO> findMemberInfoByEmail(@PathVariable String email) {
		return ResponseEntity.ok(userService.findMemberInfoByEmail(email));
	}

	@GetMapping("/auth/signup/nameCheck")
	public ResponseEntity<?> checkNicknameDuplication(@RequestParam(value = "username") String username) {

		try {

			if (userService.existsByUsername(username)) {
				throw new UserException(HttpStatus.CONFLICT);
			} else {
				return ResponseEntity.ok(HttpStatus.OK);
			}
		} catch (UserException e) {
			return ResponseEntity.status(e.getStatus()).body(e.getMessage());
		}
	}

	@GetMapping("/auth/signup/emailCheck")
	public ResponseEntity<?> checkEmailDuplication(@RequestParam(value = "email") String email) {
		try {
			System.out.println(email);
			if (userService.existsByEmail(email)) {
				throw new UserException(HttpStatus.CONFLICT);
			} else {
				return ResponseEntity.ok(HttpStatus.OK);
			}
		} catch (UserException e) {
			return ResponseEntity.status(e.getStatus()).body(e.getMessage());
		}
	}
}
