/**
 * @author ahrayi
 * @create date 2023-09-25 18:43:06
 * @modify date 2023-09-27 13:57:54
 * 그린페이 가입 프로세스
 */

import React, { useState } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';

const PayRegister = () => {

    const [form, setForm] = useState({
        user_name: '',
        user_info: '',
        user_gender: '',
        cell_carrier: '',
        user_cell_no: '',
        agree_yn: '',
        agree_dtime: '',
        inputAuthNum: '',
    })

    const {user_name,user_info,user_gender,cell_carrier,user_cell_no,agree_yn,agree_dtime,inputAuthNum} = form
    const [authNum,setAuthNum] = useState('')

    const onText =(evt)=>{
        const {value,name} = evt.target
        setForm({
            ...form,
            [name]:value
        })
    }

    const [step,setStep] = useState(1)

    const onNext=()=>{
        setStep(state => state+1)
    }
    const onPrev=()=>{
        setStep(state => state-1)
    }
    
    function getCurrentDtime() {
        const now = new Date();
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hour = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        return `${year}${month}${day}${hour}${minutes}${seconds}`;
    }

    return (
        <div>
            {step===1 && <RegisterStep1 form={form} onText={onText} onNext={onNext}/>}
            {step===2 && <RegisterStep2 {...form} inputAuthNum={inputAuthNum} authNum={authNum} onText={onText} onNext={onNext}/>}
            {step===3 && <RegisterStep3 onNext={onNext} />}
            {step===4 && <RegisterStep4 onNext={onNext} />}
        </div>
    );
};

export default PayRegister;