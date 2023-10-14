package com.newus.traders.user.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.user.dto.UserDTO;
import com.newus.traders.user.entity.Authority;
import com.newus.traders.user.entity.User;
import com.newus.traders.user.exception.DuplicateMemberException;
import com.newus.traders.user.exception.NotFoundMemberException;
import com.newus.traders.user.jwt.TokenProvider;
import com.newus.traders.user.repository.UserRepository;
import com.newus.traders.user.util.SecurityUtil;



@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public UserDTO signup(UserDTO userDto) {
        if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(   null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public UserDTO getUserWithAuthorities(String username) {
        return UserDTO.from(userRepository.findOneWithAuthoritiesByEmail(username).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDTO getMyUserWithAuthorities() {
        return UserDTO.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByEmail)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }
    
    //유저삭제
    @Transactional
    public void delete(Long id){
        User user = this.userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user id = " + id ));
        this.userRepository.delete(user);
    }

    public boolean existsByUsername(String username) {
	 	return userRepository.existsByUsername(username);
	 }
	 public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	 }
}