/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-18 21:57:51
 * @modify date 2023-10-23 12:31:53
 * @desc [description]
 */

/**
 * @author ahrayi
 * @create date 2023-09-25 15:01:56
 * @modify date 2023-10-23 11:23:37
 */
import React, { useHistory } from "react";
import payment from "../../styles/payment.css";
import { Button, Card } from "@material-ui/core";
import { Link } from 'react-router-dom';
import greenpay1 from '../../assets/img/greenpay1.jpg';
import greenpay2 from '../../assets/img/greenpay2.jpg';
import greenpay3 from '../../assets/img/greenpay3.jpg';
import Row from 'react-bootstrap/Row';

const GreenPay = () => {

  return (
<>
  <Row className="basefont" style={{margin:'60px'}}>
    <span className="title1">그린페이 가입 시 혜택</span>
  <div className="col-xs-12 col-sm-4">
    <div className="card">
        <a className="img-card" href>
          <img src={greenpay2} style={{height:'400px'}} />
        </a>
        <div className="card-content">
          <h4 className="card-title">
            <a href>간편결제</a>
          </h4>
          <p className="">빠르고 신속한 간편결제 가능</p>
        </div>
        <div className="card-read-more">
          <a href className="btn btn-link btn-block">
            Read More
          </a>
        </div>
  </div>

  <div className="col-xs-12 col-sm-4">
    <div className="card">
      <a className="img-card" href>
        <img src={greenpay1} style={{height:'400px'}}/>
      </a>
      <div className="card-content">
        <h4 className="card-title">
          <a href>페이결제 혜택</a>
        </h4>
        <p className="">거래금액의 2% 그린페이 포인트 적립혜택 제공</p>
      </div>
      <div className="card-read-more">
        <a href className="btn btn-link btn-block">
          Read More
        </a>
      </div>
    </div>
  </div> 
   
  <div className="col-xs-12 col-sm-4">
    <div className="card">
      <a className="img-card" href>
        <img src={greenpay3} style={{height:'400px'}}/>
      </a>
      <div className="card-content">
        <h4 className="card-title">
          <a href>충전 및 현금전환</a>
        </h4>
        <p className="">원하는 만큼, 언제든지 충전과 현금전환 서비스 제공</p>
      </div>
      <div className="card-read-more">
        <a href className="btn btn-link btn-block">
          Read More
        </a>
      </div>
    </div>
  </div>
  </div>
</Row>

<div>
      <br />
      <Link to="/payment/gpay_register">시작하기</Link>
      <br />
      <Link to="/payment/accnt_register">계좌등록</Link>
      <br/>
      <Link to="/payment/payMgmt">페이관리</Link>
</div>
  <Row style={{marginLeft:'800px'}}>
    <Link to="/payment/gpay_register"><button className="saveButton" style={{justifyContent:'center'}}></button></Link>
  </Row>
  </>
  );
};

export default GreenPay;
