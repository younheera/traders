/**
 * @author ahrayi
 * @create date 2023-10-22 02:23:30
 * @modify date 2023-10-23 04:46:39
 * @desc 그린페이 계좌송금(내 계좌로 보내기)
 */


import React from 'react';

const WithdrawGpay = () => {
    return (
        <>
        <h2>내 계좌로 보내기</h2>
            국민 1221230000678
            {/* 내 계좌정보 */}

            <br/>
            <input type='text' placeholder='금액을 입력해주세요'/><br/>
            그린페이 잔액: 50000원

            <br/>
            <button>+1만원</button>
            <button>+5만원</button>
            <button>+10만원</button>
            <br/>
            <button>1</button><button>2</button><button>3</button><br/>
            <button>4</button><button>5</button><button>6</button><br/>
            <button>7</button><button>8</button><button>9</button><br/>
            <button>00</button><button>0</button><button>←</button><br/>
            <button>충전하기</button>    
        </>
    );
};

export default WithdrawGpay;