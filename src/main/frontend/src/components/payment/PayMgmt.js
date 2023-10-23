/**
 * @author ahrayi
 * @create date 2023-10-22 02:49:20
 * @modify date 2023-10-23 11:13:54
 * @desc 그린페이 관리(충전, 환급 ,이용내역)
 */

import React, { useEffect, useState } from 'react';
import TokenRefresher from '../service/TokenRefresher';

const PayMgmt = () => {
        
    const [data, setData] = useState({
        nickName: '',
        accountNum:'',
        bankCodeStd:'',
        payBalance:'',
        // + 최근이용내역관련 data
    })

        useEffect(() => {
            TokenRefresher.post('http://localhost:8080/api/payment/payMgmt')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('데이터 가져오기 실패:', error);
            });
        }, []); 
return (
        
        <div>
            <h2>그린페이</h2>
                                                                                        {/* [내 계좌] */}
            <dr>
                <dt>
                지구를지켜라님의 그린페이🌿
                </dt>
                <dt>
                    150000 원
                    {/* 그린페이 잔액 */}
                </dt>
            </dr>            
            <dr>
                <button>충전</button>
                <button>계좌송금</button>
            </dr>
            <br/>
            <hr/>
            <br/>
            <dr>
                <dt>
                최근 이용 내역
                </dt>
            </dr>
            <dr>
                <dt>
                구분아이콘
                {/* (판매/구매/충전/환급) */}
                </dt>
                <dt>
                거래일시
                </dt>
                <dt>
                거래품목
                </dt>
                <dt>
                금액
                {/* + 50000 원 */}
                {/* -  3000 원 */}
                </dt>
                <dt>
                비고
                {/* (후기작성/작성완료) */}
                </dt>
            </dr>
        </div>
    );
};

export default PayMgmt;