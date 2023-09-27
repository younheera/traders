package com.newus.traders.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

import com.newus.traders.auth.jwt.JwtAccessDeniedHandler;
import com.newus.traders.auth.jwt.JwtAuthenticationEntryPoint;
import com.newus.traders.auth.jwt.JwtSecurityConfig;
import com.newus.traders.auth.jwt.TokenProvider;
import com.newus.traders.auth.userinfo.BaseAuthRole;
import com.newus.traders.auth.userinfo.service.BaseCustomOAuth2UserService;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public BCryptPasswordEncoder encoderPassword() {
        return new BCryptPasswordEncoder();
    }

    //service등록
	@Autowired
	private final BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	
	//메소드도 객체화
	@Bean//Spring Security 설정을 구성하는 부분
	public SecurityFilterChain configure(HttpSecurity http) throws Exception{
				
		http
        .cors()

        .and()
        .csrf().disable()
        .headers().frameOptions().disable()//csrf의 프레임옵션을 짧게 받아냄

        .and()
        .exceptionHandling()//예외처리설정
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .accessDeniedHandler(jwtAccessDeniedHandler)

        .and()
        .httpBasic().disable()//스프링시큐리티 기본 로그인 페이지 X
        .authorizeRequests()//URL별 권한 관리를 설정하는 옵션,해당 옵션이 설정되어햐 Matchers를 이용해 URL별로 관리 대상을 지정가능
        .antMatchers("/","**","/css/**","/images/**","/js/**","/h2/**","/h2-console/**").permitAll()// permitAll : 전체열람가능
        //혹시나해서 적어주는것일뿐, resources는 들어갈 수 있음
        .antMatchers("/api/vi/**").hasRole(BaseAuthRole.USER.name())//"/api/v1/**"는 USER만 허용
        .anyRequest()//설정된 값 이외 나머지 URL
        .authenticated()//anyRequest()로 인해 나머지 url들은 모두 인증된 사용자만 허용

        .and()
        .sessionManagement()//세션관리설정
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        .and()
        .logout().logoutSuccessUrl("/")// 로그아웃 성공시 / 로 이동

        .and()
        .apply(new JwtSecurityConfig(tokenProvider))//클래스 적용하여 JWT기반 보안 구성 설정

        .and()
        .oauth2Login().defaultSuccessUrl("/")
        .userInfoEndpoint()// 로그인 성공 후 사용자 정보 가져오기
		.userService(baseCustomOAuth2UserService)// 소셜 로그인 성공 후, 추가로 진행하고자 하는 기능을 명시
		;
		//api가 만든 주소를 풀어준다
		
		return http.build();
	}

}
