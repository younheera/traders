/**
 * @author ahrayi
 * @create date 2023-10-16 14:00:10
 * @modify date 2023-10-16 14:16:12
 */

package com.newus.traders.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepositRequestDto {
    private String ctrAccountType;
    private String ctrAccountNum;
    private String wdPassPhrase;
    private String wdPrintContent;
    private String nameCheckOption;
    private String tran_dtime;
    private int reqCnt;
    private ReqList reqList;
}
