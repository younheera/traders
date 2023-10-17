/**
 * @author ahrayi
 * @create date 2023-10-12 18:15:24
 * @modify date 2023-10-12 18:15:24
 */

package com.newus.traders.payment.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MeResponseDto {
    private String user_ci;
}
