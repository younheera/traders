package com.newus.traders.auth;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.auth.userinfo.BaseAuthUser;


//bas DAO
public interface BaseAuthUserRepository extends JpaRepository<BaseAuthUser, Long>{
	Optional<BaseAuthUser> findByEmail(String email); //email로 데이터를 찾아오기
}