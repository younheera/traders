/**
 * @author ahrayi
 * @create date 2023-09-27 17:20:16
 * @modify date 2023-10-13 16:51:52
 * 그린페이 가입 완료 페이지(AccountRegister 연결)
 */

import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

/* - 등록계좌 존재 시 계좌 정보 띄우고 수정/삭제로  */

const RegisterComplete = () => {
    return (
        <div>
            <h2>그린페이 가입완료</h2>  // alert로 띄우기

            <Link to="/payment/accnt_register">
                <button>계좌 등록</button>
            </Link>
        </div>
    );
};

export default RegisterComplete;