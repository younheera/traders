/**
 * @author ahrayi
 * @create date 2023-10-04 11:18:01
 * @modify date 2023-10-17 11:57:32
 */

package com.newus.traders.payment.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {

    private Long clientInfo;

    // 사용자에게 입력받는 정보
    private String userName;
    private String userInfo;
    private String userGender;
    private String cellCarrier;
    private String userCellNo;
    private String agreeYn;
    private String agreeDtime;
    private String payPassword;

    // 최초인증 후 받아오는 정보
    private String userSeqNo;
    private String userCi;
    private String accessToken;
    private String refreshToken;
    private LocalDateTime expiresIn;
}
