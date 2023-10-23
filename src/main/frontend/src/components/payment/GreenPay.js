/**
 * @author ahrayi
 * @create date 2023-09-25 15:01:56
 * @modify date 2023-10-23 11:23:37
 */
import React from "react";
import { Link } from "react-router-dom";

const GreenPay = () => {
  return (
    <div>
      그린페이 가입 시 혜택 1 2 3 <br />
      <br />
      <Link to="/payment/gpay_register">시작하기</Link>
      <br />
      <Link to="/payment/accnt_register">계좌등록</Link>
      <br/>
      <Link to="/payment/payMgmt">페이관리</Link>
    </div>
  );
};

export default GreenPay;
