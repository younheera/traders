package com.newus.traders.auth.userinfo.DTO;

import java.util.Map;

import com.newus.traders.auth.userinfo.BaseAuthRole;
import com.newus.traders.auth.userinfo.BaseAuthUser;

import lombok.Builder;
import lombok.Getter;



@Getter
public class OAuthAtrributes {//소셜 서버에서 넘어오는 데이터
	private Map<String, Object> attributes;//전달해주는 사용자 정보를 attributes에 담아낸다.
	private String nameAttributeKey;
	private String name;
	private String email;
	private String picture;    

@Builder
	public OAuthAtrributes(Map<String, Object> attributes,
			String nameAttributeKey,String name,String email,String picture) {
		this.attributes = attributes;
		this.nameAttributeKey = nameAttributeKey;
		this.name = name;
		this.email = email;
		this.picture = picture;
	}   
    //소셜 구분
    public static OAuthAtrributes of(String registrationId,String userNameAttributeName, Map<String,Object> attributes) {  		
		
        if(registrationId.equals("naver")) {//response
			return ofNaver("id", attributes);//id부분 고정
		}
        return ofKakao(userNameAttributeName, attributes);
    } 
    @SuppressWarnings("unchecked")
	private static OAuthAtrributes ofKakao(String userNameAttributeName,
			Map<String, Object> attributes) {
		
	//kakao_account에 사용자 정보(email)이 있음 => 넘어오는 데이터 "kakao_account"받기
		Map<String, Object> kakaoAccount = 
				(Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> kakaoProfile = 
				(Map<String, Object>)kakaoAccount.get("profile");
		//kakaoAccount(JSON형태데이터)에서 profile만 가져온다 (이미지와 url)정보만
		
		return OAuthAtrributes.builder()
				.name((String)kakaoProfile.get("nickname"))
				.email((String)kakaoAccount.get("email"))
				.picture((String)kakaoProfile.get("profile_image_url"))
				.attributes(attributes)
				.nameAttributeKey(userNameAttributeName)
				.build();
		
	}
    @SuppressWarnings("unused")
	private static OAuthAtrributes ofNaver(String userNameAttributeName,
			Map<String, Object> attributes) {
		
		Map<String, Object> response = 
				(Map<String, Object>)attributes.get("response");
		
		return OAuthAtrributes.builder()
				.name((String)response.get("name"))
				.email((String)response.get("email"))
				.picture((String)response.get("profile_image"))
				.attributes(response)
				.nameAttributeKey(userNameAttributeName)
				.build();
				
	} 
    /* Entity호출 시 Builder 실행, BaseAuthUser파일의 Builder로 이동
     * BaseAuthUser Entity생성시점: 처음 가입(Role.GUEST 기본권한)
     * OAuthAttributes클래스 생성 완료 시 같은 패키지 내 SessionUser 클래스 추가가 필요
     */
    public BaseAuthUser toEntity() {
		return BaseAuthUser.builder()
				.name(name)
				.email(email)
				.picture(picture)
				.role(BaseAuthRole.GUEST)//기본계정은 GUEST
				.build();
	}
}
