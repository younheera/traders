/**
 * @author ahrayi
 * @create date 2023-09-26 13:20:05
 * @modify date 2023-10-20 08:23:32
 * 그린페이 가입 - 2. 문자인증 처리
 */

import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

const RegisterStep2 = ({ inputAuthNum, authNum, onText, onNext }) => {
  const [authBtnFlag, setAuthBtnFlag] = useState(false);

  function toggleAuthNumBtn() {
    setAuthBtnFlag(!authBtnFlag);
  }

  function authorizeNum(inputAuthNum, authNum, setStep) {
    {
      /* inputAuthNum과 authNum을 대조 */
    }
    onNext();
  }

  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
      <Grid item xs={12}>
      <Typography style={{ fontSize: '30px', textAlign:'center', fontWeight:'bold' }} component="h1" variant="h5">문자 인증</Typography>
      </Grid>
      <button
        name="authNumBtn"
        onClick={toggleAuthNumBtn}
        disabled={authBtnFlag}
      >
        인증번호 받기
      </button>
      <br />
      {authBtnFlag && (
        <div>
          <input
            type="text"
            name="inputAuthNum"
            maxLength={6}
            size={6}
            onChange={onText}
          />
          <button onClick={() => authorizeNum(inputAuthNum, authNum)}>
            인증
          </button>
        </div>
      )}
  </Container>
    </div>
  );
};

export default RegisterStep2;
