/**
 * @author ahrayi
 * @create date 2023-10-21 18:12:44
 * @modify date 2023-10-21 18:12:44
 */

package com.newus.traders.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.payment.entity.TransactionHistory;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, String> {

}
