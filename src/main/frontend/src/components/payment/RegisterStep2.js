/**
 * @author ahrayi
 * @create date 2023-09-26 13:20:05
 * @modify date 2023-10-23 11:48:05
 * @modify date 2023-10-20 19:06:25
 * 그린페이 가입 - 2. 문자인증 처리
 */

import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import gpaymessage from '../../assets/img/gpaymessage.png';
import { Row } from "react-bootstrap";
import AuthModal from "./AuthModal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegisterStep2 = ({ handleVerifySms, onText, handleSendSms,authBtnFlag }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal =()=> {
    setIsModalOpen(true);
  }

  const closeModal=()=> {
    setIsModalOpen(false);
  }
  
  return (
    <Container>
      <div component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
 
        <img src={gpaymessage}
        style={{width:'100%', margin:'20px'}}/>

      
      <Row><button
        className="saveButton"
        name="authNumBtn"
        onClick={()=> {
          handleSendSms();
          openModal();}}
        disabled={authBtnFlag}
        style={{borderRadius:'10px'}}>
        인증번호 받기
      </button></Row><br /><br/>
      
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onText={onText}
        handleVerifySms={handleVerifySms}/>
      </div>
    </Container>
  );
  }

export default RegisterStep2;
