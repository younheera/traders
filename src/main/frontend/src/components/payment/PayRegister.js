/**
 * @author ahrayi
 * @create date 2023-09-25 18:43:06
 * @modify date 2023-10-20 01:39:16
 * 그린페이 가입 프로세스
 */

import React, { useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import RegisterComplete from "./RegisterComplete";
import ProgressForm from "../service/ProgressForm";

const PayRegister = () => {
  const [form, setForm] = useState({
    userName: "",
    userInfo: "",
    userGender: "",
    cellCarrier: "",
    userCellNo: "",
    agreeYn: "",
    agreeDtime: ""
  });

  const {
    userName,
    userInfo,
    userGender,
    cellCarrier,
    userCellNo,
    agreeYn,
    agreeDtime
  } = form;
  const [inputAuthNum, setInputAuthNum] = useState('')
  const [authNum, setAuthNum] = useState("");

  const onText = (evt) => {
    const { value, name } = evt.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [step, setStep] = useState(1);

  const onNext = () => {
    console.log("onNext called");
    setStep((state) => state + 1);
  };
  const onPrev = () => {
    setStep((state) => state - 1);
  };

  function confirmGpayPwd(gpayPwd1, gpayPwd2){
    if (gpayPwd1===gpayPwd2){
      /* gpayPwd 저장 */
      PayRegisterHandler()
      onNext()
    }else{
      onPrev()
    }    
  }

  function getCurrentDtime() {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}${hour}${minutes}${seconds}`;
  }

  const PayRegisterHandler = async () => {
    const apiUrl = 'http://localhost:8080/api/payment/register'; // 백엔드 API의 URL로 대체
  
    try {
      // 요청 데이터 생성
      const requestData = {
        userName: '이아라',
        userInfo: '19930304',
        userGender: 'F',
        cellCarrier: 'KT',
        userCellNo: '01077021685',
        agreeYn: 'Y',
        agreeDtime: getCurrentDtime(),
        payPassword: '111111',
      };
  
      // HTTP POST 요청 설정
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('API 호출 실패');  // 에러 처리 보완
      }
  
      const responseData = await response.json();
      console.log('API 응답:', responseData);
  
      // {API 호출 성공 시 추가 작업}
  
    } catch (error) {
      console.error('API 호출 오류:', error);
      // {오류 처리}
    }
  };

  return (
    <div>
      <ProgressForm onNext={onNext}/>
      {step === 1 && (
        <RegisterStep1 form={form} onText={onText} onNext={onNext} />)
        }
      {step === 2 && (
        <RegisterStep2
          {...form}
          inputAuthNum={inputAuthNum}
          authNum={authNum}
          onText={onText}
          onNext={onNext}
        />
      )}
      {step === 3 && <RegisterStep3 onNext={onNext} />}
      {step === 4 && <RegisterStep4 onNext={onNext} confirmGpayPwd={confirmGpayPwd} />}
      {step === 5 && <RegisterComplete />}
    </div>
  );
};

export default PayRegister;
