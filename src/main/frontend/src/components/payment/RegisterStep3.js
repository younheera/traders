/**
 * @author ahrayi
 * @create date 2023-09-26 14:00:35
 * @modify date 2023-10-21 17:55:34
 * 그린페이 가입 - 3. 간편비밀번호 설정
 */

import { Container, InputAdornment, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import PayRegister from "../../assets/css/PayRegister.css";
import { Error } from "../toastify/Alert";

const RegisterStep3 = ({ onNext, setGpayPwd }) => {

  const [password,setPassword] = useState('');

  // 0~9와 총 10개의 문자 배열을 랜덤하게 섞은 배열
  const [randomCharacters] = useState(
    shuffleArray(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  );

  // 숫자 키패드를 3개씩 묶어서 저장
  const keypadRows = chunkArray(randomCharacters, 2);

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
      onNext();
    }else{
      Error("❌ 비밀번호는 6자리입니다 ❌");
    }
  }

  return (
    <>
    <Row>
        <Typography style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', marginBottom: '30px'}}component="h1" variant="h5">간편비밀번호 설정
      </Typography>
    </Row>
    
    <Row className="basefont"
    style={{margin:'auto', justifyContent:'center'}}>
      페이에 사용할 6자리 비밀번호를 입력해주세요.
      </Row><br/><br/>
    
    <Row style={{width:'300px', margin:'auto'}}>

      <TextField type="password" id="gpayPwd" maxLength={6} 
      size={6} value={password} onChange={handlePasswordChange}
      inputProps={{ style: {textAlign: 'center'} }} readOnly/><br/><br/><br/><br/>
      
      <button id="setGpayPwd" onClick={() => handleGpayPwd(password)}
      className="checkButton">
        확인
      </button>
      
      </Row>
      <br/><br/>
  
      <Row style={{margin:'auto', margin:'auto'}}>
        <div id="keypad" style={{margin:'auto',flexBasis:'content'}}>
        {keypadRows.map((row, rowIndex) => (
          
          
          <span style={{float:'left'}}>
            <div key={rowIndex} className="key__button"
          style={{justifyContent:'center'}}>
            {row.map((character) => (
              <button
                style={{justifyContent:'center'}}
                className="key__button"
                key={character}
                onClick={() => handleKeypadButtonClick(character)}
              >
                {character}
              </button>
            ))}
          </div></span>
          
        ))}
        <button key={"C"} onClick={handleClearButtonClick} className="key__button">
          C
        </button>
        <button key={"←"} onClick={handleDeleteButtonClick} className="key__button">
          ←
        </button>
      </div></Row>
      

    </>
  );
};

export default RegisterStep3;