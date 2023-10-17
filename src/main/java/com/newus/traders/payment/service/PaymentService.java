/**
 * @author ahrayi
 * @create date 2023-10-04 11:18:39
 * @modify date 2023-10-13 12:04:22
 */

package com.newus.traders.payment.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.payment.dto.PayAccountDto;
import com.newus.traders.payment.dto.PaymentDto;
import com.newus.traders.payment.entity.PayAccount;
import com.newus.traders.payment.entity.Payment;
import com.newus.traders.payment.repository.PayAccountRepository;
import com.newus.traders.payment.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PayAccountRepository payAccountRepository;

    // 사용자인증타입(auth_type) 판별(최초등록:0, 재인증:2)
    public int getAuthType(String clientInfo) {
        Optional<Payment> optionalPayment = paymentRepository.findById(clientInfo);

        if (!optionalPayment.isPresent()) {
            return 0;
        }
        return 2;
    }

    // 신규 등록
    @Transactional
    public Payment savePaymentDtoToDb(PaymentDto paymentDto) {

        Payment payment = new Payment();
        payment.setUserName(paymentDto.getUserName());
        payment.setUserInfo(paymentDto.getUserInfo());
        payment.setUserGender(paymentDto.getUserGender());
        payment.setCellCarrier(paymentDto.getCellCarrier());
        payment.setUserCellNo(paymentDto.getUserCellNo());
        payment.setAgreeYn(paymentDto.getAgreeYn());
        payment.setAgreeDtime(paymentDto.getAgreeDtime());
        payment.setPayPassword(paymentDto.getPayPassword());

        payment.setAccessToken(paymentDto.getAccessToken());
        payment.setRefreshToken(paymentDto.getRefreshToken());
        payment.setExpiresIn(paymentDto.getExpiresIn());
        payment.setUserSeqNo(paymentDto.getUserSeqNo());
        payment.setUserCi(paymentDto.getUserCi());

        return paymentRepository.save(payment);
    }

    public PayAccount savePayAccountDtoToDb(PayAccountDto payAccountDto) {
        PayAccount payAccount = new PayAccount();
        payAccount.setClientInfo(payAccountDto.getClientInfo());
        payAccount.setUserName(payAccountDto.getUserName());
        payAccount.setAccountNum(payAccountDto.getAccountNum());
        payAccount.setBankCodeStd(payAccountDto.getBankCodeStd());
        payAccount.setAgreeWdTr(getDateTime());
        payAccount.setAddr1(payAccountDto.getAddr1());
        payAccount.setAddr2(payAccountDto.getAddr2());

        return payAccountRepository.save(payAccount);
    }

    // 만료일 계산
    public LocalDateTime getExpirationDate(String expiresIn_s) {
        LocalDateTime expDateTime = LocalDateTime.now().plusSeconds(Long.parseLong(expiresIn_s));
        return expDateTime;
    }

    private String getDateTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYYMMddHHmmssSSS"));
    }

}