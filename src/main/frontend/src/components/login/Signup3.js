import React, { useEffect, useState } from "react";

export function useValid(changeValue) {
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isEmailConfirm: false,
    isNickname:false,
    isNicknameConfirm:false,
    isPassword: false,
    isPasswordConfirm: false,
    
  });

  useEffect(() => {
    if (changeValue.email.length > 0) {
      const exp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
      setIsValid({ ...isValid, isEmail: exp.test(changeValue.email) });
    } else {
      setIsValid({ ...isValid, isEmail: false });
    }
  }, [changeValue.email, isValid]);

  useEffect(() => {
    if (changeValue.emailConfirm.length > 0) {
      setIsValid({
        ...isValid,
        isEmailConfirm: changeValue.email === changeValue.emailConfirm,
      });
    } else {
      setIsValid({ ...isValid, isEmailConfirm: false });
    }
  }, [changeValue.emailConfirm, isValid]);

  useEffect(() => {
    if(changeValue.nickname.length < 2 || changeValue.nickname.length>5) {
      setIsValid({...isValid, isNickname: false});
    }else {
      setIsValid({...isValid, isNickname:true});
    }
  })

  useEffect(() => {
    if (changeValue.password.length > 0) {
      // 비밀번호 유효성 검사 로직 추가
    } else {
      setIsValid({ ...isValid, isPassword: false });
    }
  }, [changeValue.password, isValid]);

  useEffect(() => {
    if (changeValue.passwordConfirm.length > 0) {
      // 비밀번호 확인 유효성 검사 로직 추가
    } else {
      setIsValid({ ...isValid, isPasswordConfirm: false });
    }
  }, [changeValue.passwordConfirm, isValid]);

  return isValid;
}

export function Input(props) {
    return (
      <div>
        <input
          placeholder={props.place}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
        <div>{props.isValid ? "" : props.validText}</div>
      </div>
    );
  }

export function Signup() {
  const [form, setForm] = useState({
    email: "",
    emailConfirm: "",
    nickname:"",
    nicknameConfirm:"",
    password: "",
    passwordConfirm: "",
  });

  const isValid = useValid(form);

  const handleChange = (e) => {
    // input 값 변경 시 form 업데이트
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <Input
          place="이메일을 입력하세요"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          isValid={isValid.isEmail}
          validText={isValid.isEmail ? "이메일의 형식이 올바르지 않습니다!" : "사용 가능한 이메일 입니다."}
        />
        <Input
          place="이메일을 확인하세요"
          type="email"
          value={form.emailConfirm}
          onChange={(e) => setForm({ ...form, emailConfirm: e.target.value })}
          isValid={isValid.isEmailConfirm}
          validText={isValid.isEmailConfirm ? "" : "이메일이 같지 않습니다."}
        />
          <Input
            place="닉네임을 입력하세요"
            type="nickname"
            value={form.nickname}
            onChange={e => setForm({...form, nickname: e.target.value})}   
            valid={!isValid.isNickname ? "닉네임은 2글자 이상 5글자 이하로 입력해주세요!" : "사용가능한 닉네임 입니다."}
          />
          <Input
            place="비밀번호를 입력하세요"
            type="password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}   
            valid={!isValid.isPassword}
          />
          <Input
            place="비밀번호를 확인하세요"
            type="password"
            value={form.passwordConfirm}
            onChange={e => setForm({...form, passwordConfirm: e.target.value})}   
            valid={!isValid.isPasswordConfirm}
          />
        </form>
      </div>
    );
  }
  