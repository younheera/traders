package com.newus.traders.auth.userinfo.Service;

import javax.servlet.http.HttpSession;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.newus.traders.auth.userinfo.DTO.SessionUser;

import lombok.RequiredArgsConstructor;

//baseService (어노테이션 해야하는 역할 기술)

@RequiredArgsConstructor
@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {
    private final HttpSession httpSession;

    @Override
	public boolean supportsParameter(MethodParameter parameter) {
		boolean isLoadingUserAnnotation = 
				parameter.getParameterAnnotation(LoginUser.class)!=null; //null이 아닐때 반환값
		boolean isUserClass = SessionUser.class.equals(parameter.getParameterType());
		
		return isLoadingUserAnnotation && isUserClass;
	}
    @Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		
		return httpSession.getAttribute("user"); //세션에 올린 객체user의 값 가져오기 (어노테이션이 해야하는 역할)
	}
}
