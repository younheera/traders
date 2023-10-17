/**
 * @author ahrayi
 * @create date 2023-09-26 14:00:35
 * @modify date 2023-10-04 07:30:31
 * 그린페이 가입 - 4. 간편비밀번호 확인(리팩필수)
 */

import React, { useState } from "react";

const RegisterStep4 = ({ onNext, confirmGpayPwd }) => {
  const [password, setPassword] = useState("");

  // 0~9와 총 10개의 문자 배열을 랜덤하게 섞은 배열
  const [randomCharacters] = useState(
    shuffleArray(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  );

  // 숫자 키패드를 3개씩 묶어서 저장
  const keypadRows = chunkArray(randomCharacters, 3);

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

  function setGpayPwd() {
    {
      /* payRegister에 보내고 */
    }
    confirmGpayPwd('111111','111111')
  }

  return (
    <div>
      <h2>간편비밀번호 확인</h2>
      다시 한 번 비밀번호를 입력해주세요.
      <br />
      <input type="text" id="gpayPwd" maxLength={6} size={6} value={password} onChange={handlePasswordChange} readOnly/>
      <div id="keypad">
        {keypadRows.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((character) => (
              <button
                key={character}
                onClick={() => handleKeypadButtonClick(character)}
              >
                {character}
              </button>
            ))}
          </div>
        ))}
        <button key={"C"} onClick={handleClearButtonClick}>
          C
        </button>
        <button key={"←"} onClick={handleDeleteButtonClick}>
          ←
        </button>
      </div>
      <button onClick={setGpayPwd}>확인</button>
    </div>
  );
};

export default RegisterStep4;