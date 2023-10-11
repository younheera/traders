package com.newus.traders.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.newus.traders.user.security.JwtAuthenticationFilter;
import com.newus.traders.user.service.UserService;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Configuration
@Slf4j
public class WebSecurityConfig implements WebMvcConfigurer {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
    public BCryptPasswordEncoder encoderPassword() {//비밀번호 암호화
        return new BCryptPasswordEncoder();
    }
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring()
            .requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
            // .requestMatchers(new AntPathRequestMatcher("/favicon.ico"));
}
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*"); // 모든 origin을 허용하려면 * 사용
		config.addAllowedHeader("*"); // 모든 헤더를 허용
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
	
	 @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
		http
		.authorizeRequests() // /와 /auth/** 경로는 인증 안해도 됨.
		.antMatchers("/", "**", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/auth/**").permitAll()
		.anyRequest()
		.authenticated()
		;
		http
		.cors() // WebMvcConfig에서 이미 설정했으므로 기본 cors 설정.
		.and()
		.csrf()// csrf는 현재 사용하지 않으므로 disable
		.ignoringAntMatchers("/h2-console/**")
		.ignoringAntMatchers("/auth/**")
		.disable()
		.httpBasic()// token을 사용하므로 basic 인증 disable
		.disable()
		.sessionManagement()  // session 기반이 아님을 선언
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.headers().frameOptions().sameOrigin()
		.and()
		.addFilterBefore(corsFilter(),UsernamePasswordAuthenticationFilter.class)
		.formLogin().disable()
		.httpBasic().disable();

		// filter 등록.
		// 매 리퀘스트마다
		// CorsFilter 실행한 후에
		// jwtAuthenticationFilter 실행한다.
		http.addFilterAfter(
						jwtAuthenticationFilter,
						CorsFilter.class
		);
		return http.build();
	}

}
