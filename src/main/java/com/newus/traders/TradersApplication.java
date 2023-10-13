package com.newus.traders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableScheduling //예림 - 뉴스 스케쥴링(업데이트)
public class TradersApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradersApplication.class, args);
	}

}
