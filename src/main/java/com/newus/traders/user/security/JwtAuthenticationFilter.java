package com.newus.traders.user.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.newus.traders.user.repository.UserRepository;
import com.newus.traders.user.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
//JWT방식은 세션방식과 다르게 Filter 하나 추가 필요(사용자 로그인 시 Request에 갖고 있는 Token을 해석해주는 로직 필요(일종의 Service클래스) = JwtAuthenticationFilter)
	
	private final TokenProvider tokenProvider;
	private final UserRepository userRepository;

	
	@Override //AccessToken 검증
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		
		try {
			// 리퀘스트에서 토큰 가져오기.
			String token = parseBearerToken(request); 
			log.info("Filter is running..." + token + "token정보");
			// 토큰 검사하기. JWT이므로 인가 서버에 요청 하지 않고도 검증 가능.
			if (token != null && !token.equalsIgnoreCase("null")) {
				
				String userId = tokenProvider.validateAndGetUserId(token);// userId 가져오기. 위조 된 경우 예외 처리 된다.
				log.info("Authenticated user ID : " + userId );
				// 인증 완료; SecurityContextHolder에 등록해야 인증된 사용자라고 생각한다.
				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
								userId, // 인증된 사용자의 정보. 문자열이 아니어도 아무거나 넣을 수 있다.
								null, 
								AuthorityUtils.NO_AUTHORITIES
				);

				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);//인증정보넣기
				SecurityContextHolder.setContext(securityContext);//다시등록
			}
		} catch (Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}

		filterChain.doFilter(request, response);
	}

	private String parseBearerToken(HttpServletRequest request) {
		// Http 리퀘스트의 헤더를 파싱해 Bearer 토큰을 리턴한다.
		String bearerToken = request.getHeader("Authorization");

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	public String resolveToken(HttpServletRequest request, String header) {
		String bearerToken = request.getHeader(header);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
