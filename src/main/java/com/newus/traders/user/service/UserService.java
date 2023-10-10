package com.newus.traders.user.service;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.http.HttpStatus;
import org.elasticsearch.http.HttpStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.newus.traders.user.entity.UserEntity;
import com.newus.traders.user.exception.UserException;
import com.newus.traders.user.repository.UserRepository;

@Slf4j
@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public UserEntity create(final UserEntity userEntity) {
		if(userEntity == null || userEntity.getEmail() == null ) {
			throw new RuntimeException("Invalid arguments");
		}
		final String email = userEntity.getEmail();
		if(userRepository.existsByEmail(email)) {
			log.warn("Email already exists {}", email);
			throw new RuntimeException("Email already exists");
		}
//사용자정보 토큰값 통해서 뽑아오는 필 
		return userRepository.save(userEntity);
	}

	public UserEntity getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
		final UserEntity originalUser = userRepository.findByEmail(email);

		// matches 메서드를 이용해 패스워드가 같은지 확인
		if(originalUser != null && encoder.matches(password, originalUser.getPassword())) {
			return originalUser;
		}
		return null;
	}

	public UserEntity getLoginUserById(String id) {
		if(id==null) return null;

		Optional<UserEntity> optionalUser = userRepository.findById(id);
		if(!optionalUser.isPresent()) return null;

		return optionalUser.get();
	}

	// public boolean checkNicknameDuplicate(String username) {
	// 	return userRepository.existByUserName(username);
	// }
}