/**
 * @author ahrayi
 * @create date 2023-10-12 16:12:53
 * @modify date 2023-10-12 16:12:53
 */

package com.newus.traders.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequestDto {
    private String code;
    private String client_id;
    private String client_secret;
    private String redirect_uri;
    private String grant_type;
}
