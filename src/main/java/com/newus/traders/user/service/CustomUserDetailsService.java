package com.newus.traders.user.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.user.entity.User;
import com.newus.traders.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
   private final UserRepository userRepository;

   public CustomUserDetailsService(UserRepository userRepository) {
      this.userRepository = userRepository;
   }
   //시큐리티 내용 외 파라미터 추가하고 싶을 때 사용
   //제약조건: Controller에서 Auth점검 시 UserCustom으로 받기
   // 예) (변경 전) @AuthenticationPrincipal User user => (변경 후) @AuthenticationPrincipal UserCustom user
   boolean enabled = true;
   boolean accountNonExpired = true;
   boolean credentialsNonExpired = true;
   boolean accountNonLocked = true;

   @Override
   @Transactional
   //이메일 기준으로 사용자조회
      public UserDetails loadUserByUsername(final String email) {

      return userRepository.findOneWithAuthoritiesByEmail(email)
         .map(user -> createUser(email, user))
         .orElseThrow(() -> new UsernameNotFoundException(email + " -> 데이터베이스에서 찾을 수 없습니다."));
   }

   private CustomUserDetails createUser(String username, User user) {
      if (!user.isActivated()) {
         throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
      }

      List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
              .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
              .collect(Collectors.toList());
    
      CustomUserDetails userCustom =  new CustomUserDetails(user.getUsername(),
              user.getPassword(),enabled,accountNonExpired,credentialsNonExpired,accountNonLocked,
              user.getEmail(),
              grantedAuthorities);

            return userCustom;
   }


}