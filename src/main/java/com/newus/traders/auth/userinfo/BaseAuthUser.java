package com.newus.traders.auth.userinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class BaseAuthUser {//Base Model 테이블 생성

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;
	
	@Column
	private String picture;//사진 위치정보 저장

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BaseAuthRole role;//일반사용자인지,guest인지 구분을 위한 BaseAuthRole 클래스
	
	//자기자신의 오버로딩된 생성자를 만듬
	@Builder//객체생성 자동
	public BaseAuthUser(String name,String email,String picture,BaseAuthRole role) {
		this.name=name;
		this.email=email;
		this.picture=picture;
		this.role=role;
	}
	
	//회원정보수정
	public BaseAuthUser update(String name, String picture) {
		this.name=name;
		this.picture=picture;
		
		return this;//반환값을 받아야만 수정결과가 반영된다.
	}
	
	public String getRoleKey() {
		return this.role.getKey();
	}
	
    
}
