/**
 * @author heera youn
 * @create date 2023-10-04 13:01:56
 * @modify date 2023-10-04 13:01:56
 */
package com.newus.traders.user.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.newus.traders.user.entity.UserEntity;
import com.newus.traders.user.repository.UserRepository;
import com.nimbusds.jose.Algorithm;
import com.nimbusds.jose.Header;
import com.nimbusds.jose.util.StandardCharset;
import com.nimbusds.jwt.JWT;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenProvider {//토큰 생성, 유효성 검증
	//토큰 생성에 필요한 값
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AUTHORIZATION_KEY = "auth";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final long TOKEN_TIME = 60 * 60 * 1000L;
	
	// @Value("${jwt.secretkey}")
	// private String SECRET_KEY;

	private static final String SECRET_KEY = "Q4NSl604sgyHJj1qwEkR3ycUeR4uUAt7WJraD7EN3O9DVM4yyYuHxMEbSF4XXyYJkal13eqgB0F7Bq4H";
	  byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
	//   byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
	  Key key = Keys.hmacShaKeyFor(keyBytes);
	  //private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	
	@Value("${jwt.access.header}")
	private String accessHeader;
	@Value("${jwt.refresh.header}")
    private String refreshHeader;
	@Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;


	public String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.toString();
		}
		return null;
	}
	public String create(UserEntity userEntity) {
		Claims claims = Jwts.claims();
		  // 기한 지금으로부터 1일로 설정
		  Date expiryDate = Date.from(
			  Instant.now()
			  .plus(1, ChronoUnit.DAYS));
			  
		return Jwts.builder()
			.setClaims(claims)
			// header 내용 
			.signWith(SignatureAlgorithm.HS256, key)
			// payload 내용
			.setSubject(userEntity.getId()) // sub토큰 소유자
			.setIssuer("Co_Traders") // iss 토큰 발행자
			.setIssuedAt(new Date()) // iat 토큰발행일
			.setExpiration(expiryDate) // exp 토큰만료일
			.compact();
	}

//리프레쉬토큰 만료 시 재갱신 어떻게 되야하는지 , 재발급 과정 테스트 필요

	public String validateAndGetUserId(String token) {
		// parseClaimsJws 메서드가 Base64로 디코딩 및 파싱
		// 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용해 서명한 후 token의 서명과 비교
		// 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
		// 그중 우리는 userId가 필요하므로 getBody를 부른다
		Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
		
				log.info("issuer" + claims.getIssuer());
				log.info("subject" + claims.getSubject());
				log.info("expire" + claims.getExpiration());

		return claims.getSubject(); // subject 즉 사용자 아이디를 리턴한다.
	}

	//토큰검증
	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			if(claims.getBody().getExpiration().before(new Date())) {
				return false;
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
