/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-22 23:29:41
 * @modify date 2023-10-22 23:29:46
 * @desc [CSS]
 */
import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import {TbLock, TbLockSquareRoundedFilled} from 'react-icons/tb';

export default function Optmessage({onText}) {
  const [otp, setOtp] = useState('');
  
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    onText(newOtp); // You should define this function in the parent component.
  };

  return (
    <div style={{border: '3px'}}>
    <Row style={{margin:'20px'}}>
    <Typography style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px'}}component="h1" variant="h5">휴대폰 인증번호
      </Typography>
    </Row>

    <Row><TbLockSquareRoundedFilled className='lockicon'/></Row><br/>
    <Row><span className='basefont'>핸드폰으로 전송된 인증번호 6자리를 입력해주시기 바랍니다.</span></Row>
    <br/>
    <Row className='otp-field'>
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>&nbsp;</span>}
      containerStyle={{display: 'contents'}}
      inputStyle={{ width: "3rem", height: "3.5rem" }}
      renderInput={(props) => <input name='inputAuthNum' onChange={onText}  {...props} />}
    /></Row>

    </div>
  );
}