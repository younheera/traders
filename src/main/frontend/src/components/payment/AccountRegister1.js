/**
 * @author ahrayi
 * @create date 2023-10-13 16:44:23
 * @modify date 2023-10-17 12:46:29
 */

import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import bankCode from './bankCode';
import axios from 'axios';

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

        axios.post('http://localhost:8080/api/payment/valid-account',requestBody)
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
        <form>
            <TextField
                inputProps={{ maxLength: 16, inputMode: 'numeric', pattern: '[0-9]*' }}
                id="standard-error-required"
                label="계좌번호"
                type='text'
                color='success'
                variant="standard"
                required
                name='accountNum'
                onChange={onText} 
            />
            <br/><br/>

            <TextField
                style={{width: '200px'}}
                id="standard-select"
                select
                label="은행"
                color='success'
                variant="standard"
                required
                name='bankCodeStd'
                onChange={onText}
            >
                {bankCode.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br/><br/>
                
            주소     <input type='text' id='addr1' name='addr1' required onChange={onText}></input><Button>주소입력</Button><br/>
            상세주소 <input type='text' id='addr2' name='addr2' required onChange={onText}></input>
                
            <br/><br/>
                
            <Button variant="contained" color="success" onClick={handleAccountVerification}>
                계좌 인증 요청
            </Button>

        </form>
   );
};

export default AccountRegister1;