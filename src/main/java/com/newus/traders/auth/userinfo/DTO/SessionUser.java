package com.newus.traders.auth.userinfo.DTO;

import java.io.Serializable;
import com.newus.traders.auth.userinfo.BaseAuthUser;
import lombok.Getter;

@Getter
public class SessionUser implements Serializable{//인증된 로그인 정보를 세션 저장(직렬화 사용)
	private String name;
	private String email;
	private String picture;
	
	public SessionUser(BaseAuthUser user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.picture = user.getPicture();
	}    
}
