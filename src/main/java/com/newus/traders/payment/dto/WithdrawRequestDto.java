/**
 * @author ahrayi
 * @create date 2023-10-17 12:59:47
 * @modify date 2023-10-17 13:32:09
 */

package com.newus.traders.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithdrawRequestDto {
    private String bankTranId;
    private String ctrAccountType;
    private String ctrAccountNum;
    private String dpsPrintContent; // 입금계좌인자내역
    private String wdBankCodeStd; // 출금은행표준코드
    private String wdAccountNum; // 출금계좌번호
    private int tranAmt;
    private String wdPrintContent; // 입금계좌인자내역
    private String userSeqNo;
    private String tran_dtime;
    private String reqClientName;
    private String reqClientBankCode;
    private String reqClientAccountNum;
    private String reqClientNum;
    private String transferPurpose;
    // 최종수취고객 정보
    private String recvClientName;
    private String recvClientBankCode;
    private String recvClientAccountNum;
}
