/**
 * @author ahrayi
 * @create date 2023-10-16 11:48:38
 * @modify date 2023-10-16 11:48:38
 */

package com.newus.traders.payment.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayAccountDto {
    private Long clientInfo;
    private String userName;
    private String accountNum;
    private String bankCodeStd;
    private LocalDateTime agreeWdTr;
    private String addr1;
    private String addr2;
}
