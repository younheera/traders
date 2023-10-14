package com.newus.traders.user.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.user.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}