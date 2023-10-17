/**
 * @author ahrayi
 * @create date 2023-10-13 18:45:03
 * @modify date 2023-10-13 18:51:23
 */

package com.newus.traders.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRcvRequestDto {
    private String bankTranId;
    private String cntrAccountType;
    private String cntrAccountNum;
    private String bankCodeStd;
    private String accountNum;
    private String printContent;
    private int transAmt;
    private String reqClientName;
    private String reqClientBankCode;
    private String reqClientAccountNum;
    private String reqClientNum;
    private String transferPurpose;
    private String cmsNum;
}
