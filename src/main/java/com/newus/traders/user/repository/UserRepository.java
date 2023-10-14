package com.newus.traders.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//    @EntityGraph(attributePaths = "authorities")
//    Optional<User> findOneWithAuthoritiesByUsername(String username);
   @EntityGraph(attributePaths = "authorities")
   Optional<User> findOneWithAuthoritiesByEmail(String email);

   	// Optional<User> findOneWithAuthoritiesByUsername(String email);
	Boolean existsByEmail(String email);
	User findByEmailAndPassword(String email, String password);
	User findByEmail(String email);
	Optional<User> findByuserId(String userId);
	boolean existsByUsername(String username);
}

