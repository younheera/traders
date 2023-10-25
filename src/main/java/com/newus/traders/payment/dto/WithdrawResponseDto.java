/**
 * @author ahrayi
 * @create date 2023-10-17 13:32:02
 * @modify date 2023-10-17 13:49:54
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
public class WithdrawResponseDto {
    private String api_tran_id;
    private String api_tran_dtm;
    private String rsp_code;
    private String rsp_message;

    private String dps_bank_code_std;
    private String dps_bank_code_sub;
    private String dps_bank_name;
    private String dps_account_num_masked;
    private String dps_print_content;
    private String dps_account_holder_name;

    private String bank_tran_id;
    private String bank_tran_date;
    private String bank_code_tran;
    private String bank_rsp_code;
    private String bank_rsp_message;

    private String account_num;
    private String account_alias;
    private String bank_code_std;
    private String bank_code_sub;
    private String bank_name;
    private String savings_bank_name;
    private String account_num_masked;
    private String print_content;
    private String account_holder_name;
    private int tran_amt;
    private int wd_limit_remain_amt;
}
