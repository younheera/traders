/**
 * @author wheesunglee
 * @create date 2023-09-19 08:10:22
 * @modify date 2023-09-19 08:10:22
 */

package com.newus.traders;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

    // 서버 열렸는지 확인
    @GetMapping
    public String hello() {
        return "hello";
    }
}
