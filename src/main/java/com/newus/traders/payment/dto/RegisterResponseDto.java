/**
 * @author ahrayi
 * @create date 2023-10-04 11:18:13
 * @modify date 2023-10-12 12:03:59
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
public class RegisterResponseDto {
    private String code;
    private String scope;
    private Long client_info;
    private String state;

}
