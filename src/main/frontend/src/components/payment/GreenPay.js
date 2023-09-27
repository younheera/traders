/**
 * @author ahrayi
 * @create date 2023-09-25 15:01:56
 * @modify date 2023-09-27 16:27:30
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
    </div>
  );
};

export default GreenPay;
