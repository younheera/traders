package com.newus.traders.auth.userinfo.service;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginUser {//어노테이션 클래스 (LoginUser 파일명으로 어노테이션 설정)
    
}
