package com.newus.traders.user.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

   // @NotNull
   @Size(max = 50)
   private String username;

   @NotNull
   @Size(max = 100)
   private String email;
   
   @NotNull
   @Size(min = 3, max = 100)
   private String password;
}