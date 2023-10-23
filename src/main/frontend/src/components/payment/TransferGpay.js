/**
 * @author ahrayi
 * @create date 2023-10-22 03:55:46
 * @modify date 2023-10-23 05:02:06
 * @desc 채팅 - [송금하기]
 */

import React from 'react';

const TransferGpay = () => {
    return (
        <>
            <h2>송금하기</h2>
            👱🏻‍♀️ 강남취미헌터
            {/* 판매자 프사 닉네임 */}

            <br/>
            <input type='text' value={65000}/>원<br/>
            그린페이 잔액: 50000원 | 부족한 금액 15000원이 자동충전되어요

            <button>송금하기</button>       
        </>
    );
};

export default TransferGpay;