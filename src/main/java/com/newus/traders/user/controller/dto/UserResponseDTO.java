package com.newus.traders.user.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.newus.traders.user.entity.User;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
  private String username;
  private String email;

    public static UserResponseDTO of(User user) {

        return new UserResponseDTO(user.getUsername(),user.getEmail());
    }
}