/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-04 13:01:49
 * @modify date 2023-10-04 13:01:50
 * @desc [description]
 */
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { css } from "@emotion/react";
import './Signup.css';

// ErrorMessage 컴포넌트 정의
const ErrorMessage = ({ message }) => (
  <p style={{ color: '#f00', lineHeight: 1.4 }}>{message}</p>
);

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, "닉네임은 최소 2글자 이상입니다!")
    .max(5, "닉네임은 최대 5글자입니다!")
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!")
    .required('닉네임을 입력해주세요'),
  email: yup
    .string()
    .email('이메일 형식이 적합하지 않습니다.')
    .required('이메일을 필수로 입력해주세요.'),
  password: yup
    .string()
    .min(3, '비밀번호를 3~16글자로 입력해주세요.')
    .max(16, '비밀번호를 3~16글자로 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
      '비밀번호에 영문, 숫자, 특수문자를 포함해주세요.'
    )
    .required('비밀번호를 필수로 입력해주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
});


const SingUp2 = () => {
  const { register, handleSubmit, watch, formState: { isSubmitting, errors },reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
console.log(watch());
const nickname = watch().nickname;

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <form id="join" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <h2>회원가입</h2>

          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" {...register('nickname')} css={InputContainer}/>
          
          {errors.nickname && <ErrorMessage message={errors.nickname.message} />}

          
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" {...register('email')} />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" {...register('password')}/>
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
           />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
        </div>
        
        <SubmitBtn type='submit' disabled={isSubmitting}>
          회원가입
        </SubmitBtn>
        </fieldset>
      </form>
    </div>
  );
};

const SubmitBtn = styled.button`
  display: block;
  background-color: #04202f;
  color: #fff;
  height: 3rem;
  padding: 0.625rem 1rem;
  border-radius: 1.5rem;
  font-weight: 700;
  width: 100%;
  margin: 2rem auto 0.8rem;
  &:hover {
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #a2adb1;
  height: 2.75rem;
  border-radius: 1.5rem;
  padding-left: 1rem;
  background-color: #fff;
  & + label {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 17px;
  margin-bottom: 0.5rem;
  & + p {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  height: inherit;
  margin-left: 0.8rem;
  width: calc(100% - 2rem);
`;

const Warn = styled.p`
  color: red;
  padding-left: 17px;
  font-size: 0.8rem;
  font-weight: 700;
  div + & {
    margin: 0.5rem 0 0.8rem;
  }
`;
export default SingUp2;
