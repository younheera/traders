/**
 * @author ahrayi
 * @create date 2023-10-13 16:44:23
 * @modify date 2023-10-23 12:28:49
 */

import React, { useState } from 'react';
import '../../assets/css/AccountRegister.css';
import '../../assets/css/ProductRegistration.css';
import Form from 'react-bootstrap/Form';
import '../../styles/global.css';
import bankCode from './bankCode';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {PiNumberCircleOne} from 'react-icons/pi';
import TokenRefresher from '../member/TokenRefresher';


const AccountRegister1 = ({form, setForm, onNext, setRanNum}) => {

    const onText = (evt) => {
        const { value, name } = evt.target;
        setForm({
          ...form,
          [name]: value,
        });
      };

    const handleAccountVerification =()=>{

        const requestBody = {
            accountNum:form.accountNum,
            addr1:form.addr1,
            addr2: form.addr2,
            bankCodeStd: form.bankCodeStd,
            clientInfo: form.clientInfo,
        }

        TokenRefresher.post('http://localhost:8080/api/payment/valid-account',requestBody)
            .then(Response => {
                if(Response.status===200) {
                    console.log(Response.data)
                    setRanNum(Response.data.ranNum);

                    onNext();
                }else{
                    alert('유효하지 않은 계좌정보입니다.')
                }
            })
            .catch(error =>{
                console.error();
            })
    }

    return (
        <body>
            <Container className="product" style={{ maxWidth: "1040px"}} >
             <Row className="product-header">
                <div style={{fontSize:'15pt', fontWeight:'600',color:" #198754"}}>
                ▷인증하기</div>
                <hr className="product-hr" />
             </Row>
             <Row style={{height:'120px'}}>
                <p style={{fontWeight:'700',marginBottom:'5px'}}>
                  은행 계좌 인증  
                </p>
                <p className="account-col-1">
                    * 은행 계좌 인증을 진행해 주세요.<br/>
                    * 회원님의 실명과 계좌에 등록된 이름이 일치해야 인증이 가능합니다.
                </p>
             </Row>
             <Row style={{fontWeight:'900'}} >
                <div>
                    <PiNumberCircleOne style={{fontSize:'16pt'}}/> 인증할 은행 계좌 정보
                </div>
            </Row>
        </Container>
        <Container style={{maxWidth: "1040px",height:'330px'}} className='account-container-2' >
            <Row style={{marginTop:'45px'}} className='account-row'>
                <Col md={2} className='account-col-2'>
                    은행 선택
                </Col >
                <Col md={9} className="account-col-3">
                <Form.Select
                    aria-label="인증할 은행을 선택해주세요."
                    name='bankCodeStd'
                    value={form.bankCodeStd}
                    onChange={onText}
                    style={{border:'1px solid', fontSize:'10pt',width:'70%'}}
                >
                    {bankCode.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </Form.Select>
                </Col >
            </Row>   
            <Row className='account-row'>
                <Col md={2} className='account-col-2'>
                    은행 계좌번호
                </Col >
                <Col md={9} className="account-col-3">
                    <input
                        className='account-text-field'
                        maxLength={16}
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder="계좌번호를 입력해주세요."
                        type='text'
                        color='success'
                        required
                        name='accountNum'
                        onChange={onText} 
                    />
                </Col>    
            </Row>
            <Row className='account-row'>
                <Col md={2} className='account-col-2'>
                    주소
                </Col >            
                <Col md={9} className="account-col-3">
                    <input type='text' id='addr1' name='addr1' value={address} required onChange={onText} readOnly className='account-text-field'
                    placeholder="주소를 입력해주세요."
                    onClick={handleAddressInput}/>
                </Col>   
            </Row>
            <Row className='account-row'>
                <Col md={2} className='account-col-2'>
                상세주소
                </Col >      
                <Col md={9} className="account-col-3">    
                    <input type='text' id='addr2' name='addr2' required onChange={onText} className='account-text-field'/>
                </Col> 
            </Row>  
            </Container>
            
                <Row className='account-row'>   
                    <button className='account-row-btn saveButton-2 ' onClick={handleAccountVerification}>
                        계좌 인증 요청
                    </button>
                </Row> 
           <br></br>
            <Container style={{ maxWidth: "1040px", backgroundColor:"#cdcdcd8d ", height:'150px'}} >
            <Row className='account-row text-2' style={{paddingTop:'10px'}}>
                <p >
                ▶계좌 인증을 위하여 1원을 송금할 예정입니다.
                <br></br><br></br>
                ▶ 계좌 거래내역에서 '그린_000'중 세자리 인증번호를 입력해주세요.
                </p>
            </Row>
            </Container>
        </body>
   );
};

export default AccountRegister1;