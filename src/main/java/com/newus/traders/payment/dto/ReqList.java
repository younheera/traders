/**
 * @author ahrayi
 * @create date 2023-10-16 14:15:20
 * @modify date 2023-10-16 14:15:20
 */

package com.newus.traders.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqList {
    private int tranNo;
    private String bankTranId;
    private String bankCodeStd;
    private String accountNum;
    private String accountHolderName;
    private String printContent;
    private int tranAmt;
    private String reqClientName;
    private String reqClientBankCode;
    private String reqClientAccountNum;
    private String reqClientNum;
    private String transferPurpose;
    private String recvBankTranId;
    private String cmsNum;
}
