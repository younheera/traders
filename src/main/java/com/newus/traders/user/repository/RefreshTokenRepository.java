/**
 * @author heera youn
 * @create date 2023-10-20 15:22:35
 * @modify date 2023-10-22 14:43:47
 */
package com.newus.traders.user.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newus.traders.user.entity.RefreshToken;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByKey(String key);
}