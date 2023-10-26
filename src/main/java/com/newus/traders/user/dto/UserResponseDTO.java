/**
 * @author heera youn
 * @create date 2023-10-13 10:39:38
 * @modify date 2023-10-16 14:29:15
 */
package com.newus.traders.user.dto;

import com.newus.traders.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
  private String username;
  private String email;

  public static UserResponseDTO of(User user) {
    return new UserResponseDTO(user.getUsername(), user.getEmail());
  }
}