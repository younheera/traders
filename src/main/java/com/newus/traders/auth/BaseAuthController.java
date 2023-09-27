package com.newus.traders.auth;

import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.newus.traders.auth.userinfo.dto.SessionUser;
import com.newus.traders.auth.userinfo.service.LoginUser;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BaseAuthController {//Base인증

    @GetMapping("/")//SussionUser데이터타입 값 => @LoginUser 어노테이션 생성하여 가져옴
	public String index(Model model, @LoginUser SessionUser user) {
		
		//Service파일에서 세션에 올려놓은 user => 데이터 받아서 => model에 넣어놓고 => FE
		//SessionUser user = (SessionUser)httpSession.getAttribute("user");
		
		if(user!=null) {
			model.addAttribute("email",user.getEmail());
			model.addAttribute("name",user.getName());
			model.addAttribute("picture",user.getPicture());
		}
			return "index";//FE?
	}
    
}
