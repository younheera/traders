/**
 * @author ahrayi
 * @create date 2023-10-17 12:02:07
 * @modify date 2023-10-17 12:02:07
 */

package com.newus.traders.payment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.payment.entity.PayAccount;

public interface PayAccountRepository extends JpaRepository<PayAccount, Long> {

    Optional<PayAccount> findByClientInfo(Long clientInfo);

}