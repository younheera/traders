/**
 * @author wheesunglee
 * @create date 2023-10-25 16:02:21
 * @modify date 2023-10-25 16:02:21
 * Interceptor 추가
 */

package com.newus.traders.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// import com.newus.traders.auth.userinfo.Service.LoginUserArgumentResolver;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {// 어노테이션 생성

	public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";
	// private final TokenInterceptor tokenInterceptor;

	// private final LoginUserArgumentResolver loginUserArgumentResolver;//의존성주입

	// @Override//인터페이스 내장함수
	// public void addArgumentResolvers(List<HandlerMethodArgumentResolver>
	// resolvers) {

	// resolvers.add(loginUserArgumentResolver); //어노테이션 생성
	// }
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3000);

		// addMapping - CORS를 적용할 url의 패턴을 정의 (/** 로 모든 패턴을 가능하게 함)
		// allowedOrigins - 허용할 origin을 정의 (* 로 모든 origin을 허용, 여러개도 지정가능)
		// allowedMethods - HTTP Method를 지정 (* 로 모든 Method를 허용)
		// maxAge - 원하는 시간만큼 request를 cashing함
	}

	// @Override
	// public void addInterceptors(InterceptorRegistry interceptorRegistry) {
	// interceptorRegistry.addInterceptor(tokenInterceptor).addPathPatterns("/api/**");
	// }
}
