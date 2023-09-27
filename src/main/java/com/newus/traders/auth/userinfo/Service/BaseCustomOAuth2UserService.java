package com.newus.traders.auth.userinfo.service;

import javax.servlet.http.HttpSession;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.newus.traders.auth.BaseAuthUserRepository;
import com.newus.traders.auth.userinfo.BaseAuthUser;
import com.newus.traders.auth.userinfo.dto.OAuthAtrributes;
import com.newus.traders.auth.userinfo.dto.SessionUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
//로그인 후 사용자정보를 기반, 세션 저장 + 사용자정보수정 
public class BaseCustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>{
    @Autowired
	private final BaseAuthUserRepository baseAuthUserRepository;
    @Autowired private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired private final HttpSession httpSession;
 
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> oauthUserService =
				new DefaultOAuth2UserService();
		
		OAuth2User oauth2User = oauthUserService.loadUser(userRequest);//간편 로그인을 진행하는 플랫폼
		
		String registrationId =  userRequest.getClientRegistration().getRegistrationId();//현재 로그인 진행 중인 Service를 구분
		//registrationId: oauth2 로그인 진행 시 key가 되는 필드값(primary key 역할) 구글: sub , 네이버: response , 카카오: id
		System.out.println("registrationId = " + registrationId);

		String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
				.getUserInfoEndpoint().getUserNameAttributeName(); //sub0인지, id인지, response인지
		
		//(OAuth2UserService)로그인을 통해 가져온 OAuth2User의 attribute를 담은 클래스로 네이버 등 다른 소셜 로그인도 이 클래스를 사용
		OAuthAtrributes attributes = OAuthAtrributes.of(registrationId, userNameAttributeName, oauth2User.getAttributes());
		//of가 => OAuthAtrributes의 of를 호출 => of 소셜 호출, OAuthAtrributes.builder() 만들어서 넘어온다 => 데이터를 담아와서 가져온다. 
		
		System.out.println(attributes.getAttributes());//데이터가 JSON형태로 출력
		BaseAuthUser authUser = saveOrUpdate(attributes);	
		System.out.println(authUser.getName());
		httpSession.setAttribute("user", new SessionUser(authUser));//인증유저데이터를 "user"라는 이름으로 , SessionUser클래스에 담아 세션에 데이터를 올린다. //h2콘솔에서 attribute_name에도 user
		
		return new DefaultOAuth2User(//OAuth2 인증 후 사용자 정보를 나타내는 객체를 생성
				Collections.singleton(
						new SimpleGrantedAuthority(authUser.getRoleKey())),
				//사용자역할을 정의,부여 역할은 보통 하나의 역할만을 가지므로 java에 내장된 Collections.singleton유틸리티 클래스를 사용
				attributes.getAttributes(),
				attributes.getNameAttributeKey());
				
	}
	//사용자 정보가 업데이트 시 반영( 만약 사용자명,프로필 사진 등이 변경된다면 BaseAuthUser 엔티티에도 반영)
	private BaseAuthUser saveOrUpdate(OAuthAtrributes attributes) {
		
		BaseAuthUser authUser = baseAuthUserRepository
								.findByEmail(attributes.getEmail())//findByEmail 메서드를 사용, 사용자의 이메일로 검색
								.map(entity -> entity.update(attributes.getName(), attributes.getPicture()))//레파지토리의 Optional클래스 메서드 중 하나인 'map'을 사용한 것이다.
								.orElse(attributes.toEntity());//사용자정보가 존재하지 않을 경우, 새로운 사용자정보를 생성하는 BaseAuthUser의 toEntity()메서드를 사용하여 Entitiy객체 생성
		return baseAuthUserRepository.save(authUser);
	}  
}
