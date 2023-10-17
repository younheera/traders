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
    private String apiTranId;
    private String apiTranDtm;
    private String rspCode;
    private String rspMessage;

    private String dpsBankCodeStd;
    private String dpsBankCodeSub;
    private String dpsBankName;
    private String dpsAccountNumMasked;
    private String dpsPrintContent;
    private String dpsAccountHolderName;

    private String bankTranId;
    private String bankTranDate;
    private String bankCodeTran;
    private String bankRspCode;
    private String bankRspMessage;

    private String accountNum;
    private String accountAlias;
    private String bankCodeStd;
    private String bankCodeSub;
    private String bankName;
    private String savingsBankName;
    private String accountNumMasked;
    private String printContent;
    private String accountHolderName;
    private int tranAmt;
    private int wdLimitRemainAmt;
}
