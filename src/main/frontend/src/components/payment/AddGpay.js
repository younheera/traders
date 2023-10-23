/**
 * @author ahrayi
 * @create date 2023-10-22 02:22:56
 * @modify date 2023-10-23 08:53:49
 * @desc 그린페이 충전
 */

import React from 'react';
import PayPassword from './PayPassword';

const AddGpay = () => {

    // 최대충전/송금가능금액: 200만

    return (
        <>
        <h2>충전하기</h2>
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
            <button onClick={PayPassword}>충전하기</button>
        </>
   );
};

export default AddGpay;