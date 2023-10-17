/**
 * @author ahrayi
 * @create date 2023-10-16 15:19:05
 * @modify date 2023-10-16 15:19:05
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
public class ResList {
    private String bank_rsp_code;
    private String bank_rsp_message;
    private String account_holder_name;
    private int tran_amt;
}
