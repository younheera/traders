/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-24 13:52:03
 * @modify date 2023-10-24 14:56:20
 * @desc [그린페이 인증 FE,CSS]
 */
/**
 * @author ahrayi
 * @create date 2023-09-26 13:20:05
 * @modify date 2023-10-24 13:51:36
 * 그린페이 가입 - 2. 문자인증 처리
 */

import { Typography } from "@material-ui/core";
import React from "react";
import gpaymessage from "../../assets/img/gpaymessage.png";
import { Container, Row } from "react-bootstrap";

const RegisterStep2 = ({
  inputAuthNum,
  handleVerifySms,
  onText,
  handleSendSms,
  authBtnFlag,
}) => {
  return (
    <>
    <Container style={{width:'1040px'}}>
    
      <h1 className="title1" 
      style={{margin:'auto'}}> 문자 인증</h1>
      <img src={gpaymessage} width="100%"/><br/><br/>
      
      <Row>
      <button name="authNumBtn" 
      className="saveButton"
      onClick={handleSendSms} 
      disabled={authBtnFlag}
      style={{margin:'auto', justifyContent:'center', width:'300px'}}>
        인증번호 받기
      </button>
      </Row>
      <br />
      <Row style={{margin:'auto', justifyContent:'center'}}>
      {authBtnFlag && (
        <div style={{margin:'auto', textAlign:'auto'}}>
         
        </div>
      )}
      
      </Row>
       
        </Container>
      <Container style={{width:'1040px'}}>
        <Row style={{margin:'auto',justifyContent:'center'}}>
        <input
            type="text"
            name="inputAuthNum"
            maxLength={6}
            size={6}
            onChange={onText}
            style={{width:'200px', height:'40px'}}
            
          />
         
          <button className="cancelButton-1"
          onClick={handleVerifySms}
          style={{margin:'3px', width:'150px',height:'40px',color:'#fff'}}
          >인증하기
          </button>
        </Row>
      </Container>
      </>
  
  );
};

export default RegisterStep2;
