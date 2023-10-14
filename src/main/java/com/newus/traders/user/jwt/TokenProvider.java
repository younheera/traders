/**
 * @author heera youn
 * @create date 2023-10-13 23:04:41
 * @modify date 2023-10-13 23:04:41
 */

package com.newus.traders.user.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import com.newus.traders.user.dto.TokenDTO;
import com.newus.traders.user.service.CustomUserDetails;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


@Component
public class TokenProvider implements InitializingBean {

   private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
   private static final String AUTHORITIES_KEY = "auth";
   private final String secret;
   private final long tokenValidityInMilliseconds;
   private final long refreshTokenValidityInSeconds;
   private Key key;


   public TokenProvider(
      @Value("${jwt.secret}") String secret,
      @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds,
      @Value("${jwt.refresh.expiration}") long refreshTokenValidityInSeconds) {
      this.secret = secret;
      this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
      this.refreshTokenValidityInSeconds = refreshTokenValidityInSeconds;
   }
   //InitializingBean상속, Bean생성 이후 생성자 통해 secret값을 Base64 Decode 후 key변수 할당
   @Override
   public void afterPropertiesSet() {
      byte[] keyBytes = Decoders.BASE64.decode(secret);
      this.key = Keys.hmacShaKeyFor(keyBytes);
   }
   //Token생성 메서드(유저정보가 담긴 authenticate객체)
   public TokenDTO createToken(Authentication authentication) {
      String authorities = authentication.getAuthorities().stream()
         .map(GrantedAuthority::getAuthority)
         .collect(Collectors.joining(","));

      CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
      long now = (new Date()).getTime();
      Date validity = new Date(now + this.tokenValidityInMilliseconds);

      //Access Token 생성
      String accessToken =  Jwts.builder()
         .claim(AUTHORITIES_KEY, authorities)
         .setSubject(authentication.getName())//토큰소유자
         .claim("useremail", customUserDetails.getEmail())
         .signWith(key, SignatureAlgorithm.HS512)
         .setIssuedAt(new Date())//토큰발행일
         .setExpiration(validity)//토큰만료일exp
         .compact();

      Date refreshTokenExpire = new Date(now + this.refreshTokenValidityInSeconds); 

      String refreshToken = Jwts.builder()
         .claim(AUTHORITIES_KEY, authorities)
         .setIssuedAt(new Date())//토큰발행일
         .setExpiration(refreshTokenExpire)
         .signWith(key, SignatureAlgorithm.HS512)
         .compact();

         return TokenDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
   }

   //JWT토큰 복호화, TOKEN정보 꺼내는 코드
   //토큰으로 claims 생성, 이를 이용해서 user객체 생성 후 authenticate객체 최종 리턴
   public Authentication getAuthentication(String accessToken) {//인증정보 조회

      Claims claims = pareClaims(accessToken);
      if(claims.get(AUTHORITIES_KEY)==null) {
         throw new RuntimeException("권한 정보가 없는 토큰입니다.");
      }

      //claims 권한 정보 갖고오기
      Collection<? extends GrantedAuthority> authorities =
         Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

      //UserDetails 객체 생성 후 Authentication리턴
      User principal = new User(claims.getSubject(), "", authorities);
      return new UsernamePasswordAuthenticationToken(principal, "", authorities);
   }

   //accessToken에서 username추출
   public String getUsernameByAccessToken(TokenDTO tokenDTO){
      Jws<Claims> claims = Jwts.parserBuilder()
         .setSigningKey(key)
         .build()
         .parseClaimsJws(tokenDTO.getAccessToken());

         return claims.getBody().getSubject();
   }
   
   public Claims pareClaims(String accessToken) {
      try {
         return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
      } catch (ExpiredJwtException  e) {
         return e.getClaims();
      }
   }

   public Long getExpiration(String accessToken) {
      // accessToken 남은 유효시간
      Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
      // 현재 시간
      Long now = new Date().getTime();
      return (expiration.getTime() - now);
  }
   ///////////////////////토큰 정보 검증 메서드//////////////////////////
   public boolean validateToken(String token) {
      try {
         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
         return true;
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         logger.info("Invalid JWT Token",e);
      } catch (ExpiredJwtException e) {
         logger.info("Expired JWT Token",e);
      } catch (UnsupportedJwtException e) {
         logger.info("Unsupported JWT Token", e);
      } catch (IllegalArgumentException e) {
         logger.info("JWT claims string is empty.", e);
      }
      return false;
   }
   public String validateRefreshToken(TokenDTO refreshTokenObj){
      // refresh 객체에서 refreshToken 추출
      String refreshToken = refreshTokenObj.getRefreshToken();

      try {
          // 검증
         JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
         Jws<Claims> claims = jwtParser.parseClaimsJws(refreshToken);


          if (!claims.getBody().getExpiration().before(new Date())) {
            return recreationAccessToken(claims.getBody().get("sub").toString());
          }
      }catch (Exception e) {
          //refresh 토큰이 만료되었을 경우, 로그인이 필요
          return null;

      }

      return null;
  }
  public String recreationAccessToken(String useremail){

   Claims claims = Jwts.claims().setSubject(useremail);
   Date now = new Date();

   //Access Token
   String reaccessToken = Jwts.builder()
           .setClaims(claims) // 정보 저장
           .setIssuedAt(now) // 토큰 발행 시간 정보
           .setExpiration(new Date(now.getTime() + this.tokenValidityInMilliseconds)) // set Expire Time
           .signWith(key, SignatureAlgorithm.HS512)
           // signature 에 들어갈 secret값 세팅
           .compact();

   return reaccessToken;
}

}