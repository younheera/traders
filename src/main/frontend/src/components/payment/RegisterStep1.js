/**
 * @author ahrayi
 * @create date 2023-09-26 10:32:10
 * @modify date 2023-10-20 08:15:06
 * 그린페이 가입 - 1. 인증정보input 및 약관동의 처리
 * FE수정(kierayoun)
 */

import React, { useState } from 'react';
import Terms from './Terms';
import { Button, Container, Grid, GridList, GridListTile, GridListTileBar, Link, TextField, Typography } from "@material-ui/core";
import "../../styles/global.css"
import { CustomTextField } from '../../styles/styles';
import MobileListbox from './MobileListbox';
import ProgressForm from '../service/ProgressForm';

const RegisterStep1 = ({ form, onText, onNext }) => {
  
  const {
    userName,
    userInfo,
    userGender,
    cellCarrier,
    userCellNo,
    agreeYn,
    agreeDtime
  } = form;
  
  const [allTermsChecked, setAllTermsChecked] = useState(false);
  
  const toggleAllTermsChecked = () => {
    setAllTermsChecked(!allTermsChecked);
  };
  // window.addEventListener("scroll", function () {
  //   const header = document.querySelector(".header");
  //   if (window.scrollY > 0) {
  //     header.classList.add("fixed");
  //   } else {
  //     header.classList.remove("fixed");
  //   }
  // });

  // {
  //   /* 약관모두동의 + 모든 항목 not null일 때 다음 버튼 활성화 */
  // }
  // {
  //   /* 다음 버튼 누르면 유효성 검사*/
  // }


  return (
    <div>
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
      <Grid item xs={12}><Typography style={{ fontSize: '30px', textAlign:'center', fontWeight:'bold' }} component="h1" variant="h5">본인인증</Typography></Grid><br/>
      <form noValidate>

      <Grid container spacing={2}>
      <Grid item xs={12}>
      <CustomTextField
        variant="outlined"
        required
        fullWidth
        id= "userName"
        label="이름을 입력하세요"
        name="userName"
        bordercolor="green"
        autoComplete="email"
        value={userName}
        onChange={onText}
        />
      </Grid>
     </Grid><br/>
     <Grid container spacing={12}>
     <Grid item xs={5}>
        <CustomTextField
          variant="outlined" 
          required 
          id="userInfo"
          label="주민등록번호"
          name="userInfo" 
          type="text"
          value={userInfo} 
          maxLength={6}
          size={6} 
          bordercolor="green"
          onChange={onText}
          />
      </Grid>
      <text style={{fontSize: '36px', verticalAlign: 'middle'}}>&nbsp;&nbsp;-&nbsp;&nbsp;</text>
      <Grid item xs={1}>
      <CustomTextField
          variant="outlined" required fullWidth
          type="text"
          name="userGender"
          value={userGender}
          bordercolor="green"
          maxLength={1}
          size={1}
          onChange={onText}
          />
      </Grid>
      <text style={{fontSize: '36px', verticalAlign: 'middle'}}>&nbsp;******</text>
      </Grid><br/>
    
      <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <MobileListbox/>
        </Grid>
        
        <Grid item xs={7}>
          <CustomTextField
            variant="outlined"
            required
            type="text"
            bordercolor="green"
            className="form-control"
            name="userCellNo"
            label="휴대폰 번호를 입력하세요"
          />
        </Grid>
      </Grid>
      </div>
        <br /><br />
      <Terms />
      <br /><br />
      <p>
        {/* disabled={!allTermsChecked} 속성수정 */}
        <button className='saveButton' 
        onClick={()=> {onNext();}}>다음</button>
      </p>
      </form>
    </Container>
    </div>
  );
};

export default RegisterStep1;
