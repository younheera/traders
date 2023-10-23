/**
 * @author ahrayi
 * @create date 2023-10-10 11:13:25
 * @modify date 2023-10-23 09:22:14
 */

package com.newus.traders.payment.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.payment.dto.DepositRequestDto;
import com.newus.traders.payment.dto.DepositResponseDto;
import com.newus.traders.payment.dto.InquiryRcvResponseDto;
import com.newus.traders.payment.dto.MeResponseDto;
import com.newus.traders.payment.dto.PayAccountDto;
import com.newus.traders.payment.dto.PaymentDto;
import com.newus.traders.payment.dto.RegisterResponseDto;
import com.newus.traders.payment.dto.ReqList;
import com.newus.traders.payment.dto.TokenResponseDto;
import com.newus.traders.payment.dto.WithdrawRequestDto;
import com.newus.traders.payment.entity.Payment;
import com.newus.traders.payment.service.PaymentService;
import com.newus.traders.payment.service.RestTemplateService;
import com.newus.traders.user.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PaymentController {

    private final PaymentService paymentService;
    private final RestTemplateService restTemplateService;
    private final TokenProvider tokenProvider;

    // 최초등록
    @Transactional
    @PostMapping("/payment/register")
    public ResponseEntity<?> registerData(@RequestBody PaymentDto paymentDto,
            @RequestHeader("token") String accessToken) {

        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        Object principal = authentication.getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        String userName = userDetails.getUsername();
        System.out.println("최초등록 - 토큰에서 추출한 userName: " + userName);
        //

        // 사용자인증
        RegisterResponseDto rr = restTemplateService.authorizeUser(paymentDto);

        // 토큰 발급
        TokenResponseDto tr = restTemplateService.getToken(rr.getCode());

        // 사용자정보조회
        MeResponseDto mr = restTemplateService.getUserInfo(tr.getAccess_token(), tr.getUser_seq_no());

        paymentDto.setAccessToken(tr.getAccess_token());
        paymentDto.setRefreshToken(tr.getRefresh_token());
        paymentDto.setUserSeqNo(tr.getUser_seq_no());
        paymentDto.setExpiresIn(paymentService.getExpirationDate(tr.getExpires_in()));
        paymentDto.setUserCi(mr.getUser_ci());

        paymentService.savePaymentDtoToDb(paymentDto, userName);

        return new ResponseEntity<>(Collections.singletonMap("message", "결제가 성공적으로 등록되었습니다."), HttpStatus.OK);
    }

    // 유효계좌확인
    @Transactional
    @PostMapping(value = "/payment/valid-account")
    public ResponseEntity<?> checkValidAccount(@RequestBody PayAccountDto payAccountDto,
            @RequestHeader("token") String accessToken) {

        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        Object principal = authentication.getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        String nickName = userDetails.getUsername();
        System.out.println("유효계좌확인 - 토큰에서 추출한 nickName: " + nickName);
        //
        Long clientInfo = paymentService.getClientInfo(nickName).get();
        Optional<Payment> payment = paymentService.getPaymentInfo(clientInfo);

        String userName = payment.get().getUserName();

        payAccountDto.setClientInfo(clientInfo);
        payAccountDto.setUserName(userName);

        System.out.println(payAccountDto.toString());
        // 수취조회
        InquiryRcvResponseDto irr = restTemplateService.receiveInquiry(payAccountDto, "AU", 1);

        System.out.println(irr.toString());

        if (irr.getRsp_code().equals("A0000") && irr.getBank_rsp_code().equals("000")) {
            int ranNum = restTemplateService.generateRandomNum();
            // 입금(AU)
            DepositResponseDto dr = restTemplateService.transferDeposit(payAccountDto, "AU", 1, ranNum);

            if (dr.getRsp_code().equals("A0000") && dr.getRes_list().get(0).getBank_rsp_code().equals("000")) {

                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("ranNum", ranNum);
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            }
            return new ResponseEntity<>(Collections.singletonMap("message", "인증 송금 실패"), HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<>(Collections.singletonMap("message", "유효하지 않은 계좌입니다."), HttpStatus.BAD_REQUEST);
    }

    // 계좌 등록
    @Transactional
    @PostMapping(value = "/payment/save-account")
    public ResponseEntity<?> savePayAccount(@RequestBody PayAccountDto payAccountDto,
            @RequestHeader("token") String accessToken) {

        Authentication authentication = tokenProvider.getAuthentication(accessToken);// 토큰이용 정보추출
        Object principal = authentication.getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        String userName = userDetails.getUsername();
        System.out.println(userDetails.getUsername());
        //

        // ClientInfo 추출
        Long clientInfo = paymentService.getClientInfo(userName).get();

        // 그린페이 가입 상태 확인
        if (!(paymentService.checkPayMember(clientInfo))) {
            // throw new PaymentException(); 그린페이 가입 회원이 아닙니다.
        } else if (paymentService.checkAccntMember(clientInfo)) {
            // 계좌등록여부 확인 -> 이미 등록된 계좌가 있습니다. 확인 -> 계좌정보로 이동.
        }

        payAccountDto.setClientInfo(clientInfo);

        System.out.println(payAccountDto.toString());

        paymentService.savePayAccountDtoToDb(payAccountDto);

        // 동의자료 파일 전송~~~~~~

        return new ResponseEntity<>(Collections.singletonMap("message", "계좌가 성공적으로 등록되었습니다."), HttpStatus.OK);
    }

    // 인증문자 발송
    @Transactional
    @PostMapping(value = "/payment/sms")
    public ResponseEntity<?> sendSms(@RequestBody Map<String, String> requestBody) {

        System.out.println(requestBody.toString());

        String rphone = requestBody.get("rphone");
        System.out.println(rphone);
        try {

            System.out.println(rphone);
            paymentService.sendSms(rphone);
            System.out.println(rphone);

            return new ResponseEntity<>(Collections.singletonMap("message", "문자 발송 성공"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("message", "문자 발송 실패"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 인증문자 일치 확인
    @Transactional
    @PostMapping(value = "/payment/verify-sms")
    public ResponseEntity<?> verifySms(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.toString());

        try {
            String rphone = requestBody.get("rphone");
            System.out.println("controller: " + rphone);
            String inputAuthNum = requestBody.get("inputAuthNum");
            System.out.println("controller: " + inputAuthNum);

            if (paymentService.verifyAuthNum(rphone, inputAuthNum)) {
                return new ResponseEntity<>(Collections.singletonMap("message", "문자 인증 성공"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Collections.singletonMap("message", "문자 인증 실패"),
                        HttpStatus.ALREADY_REPORTED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("message", "문자 인증 실패"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // // 그린페이 페이지 로드 시 페이정보 응답
    // @PostMapping(value = "/payment/payMgmt")
    // public ResponseEntity<?> getPayinfo(@RequestHeader("token") String
    // accessToken) {
    // // header: nickName
    // // response: 계좌번호, 은행번호, 닉네임, 본명, 페이잔액
    // }

    // // 그린페이 충전
    // @Transactional
    // @PostMapping(value = "/payment/add")
    // public ResponseEntity<?> addPayMoney(@RequestBody PayAccountDto
    // payAccountDto,
    // @RequestHeader("token") String accessToken) {
    // // header: nickName, body: 충전금액, 페이비밀번호
    // // userName -> 유저정보 추출
    // // 페이비밀번호 대조 후 (불일치 시 예외 처리)
    // // 일치 시 출금 API 호출
    // WithdrawRequestDto request = new WithdrawRequestDto();
    // // api 정상 처리되면 payAccount의 paybalance + 처리,
    // // 거래 내역에 데이터 추가

    // // 응답 반환
    // }

    // // 그린페이 인출(내 계좌로 송금)
    // @Transactional
    // @PostMapping(value = "/payment/withdraw")
    // public ResponseEntity<?> withdrawPayMoney() {
    // // header: nickName, body: 인출금액, 페이비밀번호
    // // userName -> 유저정보 추출
    // // 페이비밀번호 대조 후 (불일치 시 예외 처리)
    // // 일치 시 (수취조회 API 호출 생략)
    // // 입급 API 호출
    // ReqList reqList = new ReqList(0, null, null, null, null, null, 0, null, null,
    // null, null, null, null, null);
    // DepositRequestDto request = new DepositRequestDto();
    // // api 정상 처리되면 payAccount의 paybalance - 처리,
    // // 거래 내역에 데이터 추가

    // // 응답 반환
    // }

    // // 거래(송금하기)
    // @Transactional
    // @PostMapping(value = "/payment/transfer")
    // public ResponseEntity<?> transferPayMoney() {
    // // header: nickname, body: 판매자nickname, 상품명, 상품가격, (글id?), 부족금액, payPassword

    // // userName -> 유저정보 추출
    // // 페이비밀번호 대조 후 (불일치 시 예외 처리)
    // // 일치 시 (수취조회 API 호출 생략)

    // // 부족금액 값이 있으면,
    // // // 출금 API 호출
    // // // WithdrawRequestDto request = new WithdrawRequestDto();
    // // // api 정상 처리되면 payAccount의 paybalance + 처리,
    // // // 거래 내역에 데이터 추가

    // // 구매자 paybalance -처리
    // // 판매자 paybalance +처리
    // // 거래 내역에 데이터 추가

    // // 응답 반환
    // }

}