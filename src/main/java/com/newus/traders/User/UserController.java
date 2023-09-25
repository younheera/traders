package com.newus.traders.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/oauth/kakao")
    public String getLogin(@RequestParam("code") String code) {
        System.out.println(code);
        return code;
    }

}
