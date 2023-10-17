/**
 * @author ahrayi
 * @create date 2023-10-10 14:16:48
 * @modify date 2023-10-10 14:16:48
 */

package com.newus.traders.payment.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TokenResponseDto {
    private String access_token;
    private String token_type;
    private String expires_in;
    private String refresh_token;
    private String user_seq_no;
}
