/**
 * @author ahrayi
 * @create date 2023-10-21 18:15:55
 * @modify date 2023-10-21 18:15:55
 */

package com.newus.traders.payment.dto;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistoryDto {
    @Id
    private String transactionId;
    // private String productId;
    private String seller;
    private String buyer;
    private String transactionDtime;
    private int price;
    private String productName;
}
