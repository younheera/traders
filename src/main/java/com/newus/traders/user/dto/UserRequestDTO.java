package com.newus.traders.user.dto;

import lombok.*;
import com.newus.traders.user.entity.User;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
   private String username;
   private String password;
   private String email;
   private String pictureurl;
   private String local;

   public User toEntity() {
        return User.builder()
                .username(this.username)
                .password(this.password)
                .email(this.email)
                .pictureurl(this.pictureurl)
                .local(this.local)
                .build();
   }
}