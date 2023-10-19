package com.newus.traders.user.controller.dto;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.newus.traders.user.entity.Authority;
import com.newus.traders.user.entity.User;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
    private String username;
    private String email;
    private String password;

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}