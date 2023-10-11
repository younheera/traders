package com.newus.traders.mail.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.mail.service.MailService;

    @Slf4j
    @RestController
    @RequestMapping("/api")
    public class MailController {
    
    @Autowired
    private MailService mailService;

    // 이메일 인증
	@GetMapping("/auth/signup/email")
	@ResponseBody
	String mailConfirm(@RequestParam("email") String email) throws Exception {
        System.out.println("받은 이메일 주소: " + email);
		String code = mailService.sendSimpleMessage(email);
		System.out.println("인증코드 : " + code);
		return code;
	}
    
}
