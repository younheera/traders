package com.newus.traders.user.dto;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.newus.traders.user.entity.User;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 3, max = 100)
   private String password;

   @NotNull
   @Size(min = 3, max = 100)
   private String email;

   private Set<AuthorityDTO> authorityDtoSet;

   public static UserDTO from(User user) {
      if(user == null) return null;

      return UserDTO.builder()
              .email(user.getEmail())
              .username(user.getUsername())
              .authorityDtoSet(user.getAuthorities().stream()
                      .map(authority -> AuthorityDTO.builder().authorityName(authority.getAuthorityName()).build())
                      .collect(Collectors.toSet()))
              .build();
   }
}