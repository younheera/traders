package com.newus.traders.auth.userinfo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BaseAuthRole { //Base Model 사용자 권한 관리
    
    GUEST("ROLE_GUEST","손님"),
	USER("ROLE_USER","일반 사용자");
	
	private final String Key;//오버로딩된 생성자
	private final String title;
}
