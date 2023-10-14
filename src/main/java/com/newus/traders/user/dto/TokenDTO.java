/**
 * @author heera youn
 * @create date 2023-10-13 23:22:12
 * @modify date 2023-10-13 23:22:12
 */
package com.newus.traders.user.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDTO {
    private Long userNo;
    private String accessToken;
    private String refreshToken;
    private String key;

}