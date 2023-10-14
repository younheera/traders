package com.newus.traders.user.dto;

import lombok.*;
import com.newus.traders.user.entity.User;

@Getter
@Setter
public class UserResponseDTO {
   private String username;
   private String password;
   private String email;
   private String pictureurl;
   private String local;

}