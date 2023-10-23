/**
 * @author ahrayi
 * @create date 2023-09-26 14:00:35
 * @modify date 2023-10-22 21:23:58
 * 그린페이 가입 - 3. 간편비밀번호 설정
 */

import React, { useState } from "react";

import '../../assets/css/AccountRegister.css';
import { Col, Container, Row } from "react-bootstrap";
import "../../assets/css/PayRegister.css";
import { Error } from "../toastify/Alert";
import {TextField, Typography } from "@material-ui/core";


const RegisterStep3 = ({ onNext, setGpayPwd }) => {

  const [password,setPassword] = useState('');

  // 0~9와 총 10개의 문자 배열을 랜덤하게 섞은 배열
  const randomCharacters = shuffleArray(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  

  const keypadRows = [...chunkArray(randomCharacters.slice(0,9),3),
    ["C",randomCharacters[9], "←"],
  ];


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClearButtonClick = () => {
    setPassword("");
  };

  const handleDeleteButtonClick = () => {
    setPassword(password.slice(0, -1));
  };

  const handleKeypadButtonClick = (character) => {
    setPassword(password + character);
  };

  // 배열을 랜덤하게 섞는 함수
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // 배열을 지정된 크기로 나누는 함수
  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  function handleGpayPwd(password) {
    if (password.length===6){
      setGpayPwd(password)
      console.log('비밀번호1: ' + password)
      onNext();
    }else{
      alert("비밀번호 6자리를 입력해주세요.")
    }
  }



  return (
    <>
     <Container style={{width:'1040px'}} className='account-container-2'>
        <Row>
            <Typography style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', marginBottom: '30px',marginTop:'25px'}}component="h1" variant="h5">간편비밀번호 설정
          </Typography>
        </Row>
        
        <Row className="basefont"
        style={{margin:'auto', justifyContent:'center'}}>
          다시 한 번 비밀번호를 입력해주세요.
        </Row><br/><br/>

        <Row style={{ width: "300px", margin: "auto" }}>
          <TextField
        type="password" 
        id="gpayPwd" 
        maxLength={6} 
        size={6} 
        value={password} 
        onChange={handlePasswordChange} 
        inputProps={{ style: { textAlign: "center" } }}
        readOnly/>
        <br />
        <br />
      </Row>
      
      <Row style={{margin:'auto'}}>
        <div id="keypad" style={{margin:'auto',flexBasis:'content',width:'50%',display:'grid'}}>
         {keypadRows.map((row, rowIndex) => (
          <span style={{float:'left'}}>
            <Col key={rowIndex}>
              {row.map((character) => (
                <button
                style={{justifyContent:'center'}}
                className="key__button"
                key={character}
                onClick={() => {
                  if(character === "C") {
                    handleClearButtonClick();
                  } else if (character === "←") {
                    handleDeleteButtonClick();
                  } else {
                    handleKeypadButtonClick(character)
                  }
                }}
              >
                {character}
              </button>
            ))}
            </Col></span>
            ))}       

        </div></Row>
        <br/>
        </Container>
        <br/>
        <Container style={{width:'1040px'}}>
        <Row>
          <button
            style={{margin:'auto', width:'200px'}} 
            className='saveButton-2' id="setGpayPwd" onClick={() => handleGpayPwd(password)}
            >
              확인
          </button>
        </Row>
      </Container>
    </>
  );
};

export default RegisterStep3;
