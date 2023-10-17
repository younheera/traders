/**
 * @author ahrayi
 * @create date 2023-10-04 11:18:29
 * @modify date 2023-10-04 11:18:29
 */

package com.newus.traders.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, String> {
}
