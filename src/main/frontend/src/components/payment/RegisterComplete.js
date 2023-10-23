/**
 * @author heera youn
 * @create date 2023-10-22 23:28:10
 * @modify date 2023-10-23 11:10:13
 * @desc CSS구현
 */
/**
 * @author ahrayi
 * @create date 2023-09-27 17:20:16
 * @modify date 2023-10-22 22:26:57
 * 그린페이 가입 완료 페이지(AccountRegister 연결)
 */

import React from 'react';
import PayRegister from '../../assets/css/PayRegister.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Confetti from './Confetti';


/* - 등록계좌 존재 시 계좌 정보 띄우고 수정/삭제로  */

const RegisterComplete = () => {
    
    return (
        <>
        <Confetti/>
      <div className="js-container container" style={{ top: '0px !important' }}></div>
      <div style={{ textAlign: 'center', marginTop: '30px', width: '100%', height: '100%' }}>
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
            <h2 className='title1'>그린페이 가입완료</h2>
            <Link to="/payment/accnt_register">
                <button className='submit-btn'>계좌 등록</button>
            </Link>
            </div>
    </>
  );
};

export default RegisterComplete;