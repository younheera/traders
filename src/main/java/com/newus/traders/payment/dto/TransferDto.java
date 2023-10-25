/**
 * @author ahrayi
 * @create date 2023-10-24 10:25:14
 * @modify date 2023-10-24 10:25:14
 */

package com.newus.traders.payment.dto;

import com.newus.traders.product.dto.ProductDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferDto {
    private int transferAmt;
    private String payPwd;
    private String productId;
    private ProductDto product;
}
