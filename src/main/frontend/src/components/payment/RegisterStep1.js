/**
 * @author ahrayi
 * @create date 2023-09-26 10:32:10
 * @modify date 2023-09-27 16:27:34
 * 그린페이 가입 - 1. 인증정보input 및 약관동의 처리
 */

import React from 'react';
import Terms from './Terms';

const RegisterStep1 = ({ form, onText, onNext }) => {
  const {
    user_name,
    user_info,
    user_gender,
    cell_carrier,
    user_cell_no,
    agree_yn,
    agree_dtime,
  } = form;

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 0) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });

  {
    /* 약관모두동의 + 모든 항목 not null일 때 다음 버튼 활성화 */
  }
  {
    /* 다음 버튼 누르면 유효성 검사*/
  }

  return (
    <>
      <h2>본인인증</h2>
      <p>
        <label>이름</label>
        <br />
        <input
          type="text"
          name="user_name"
          value={user_name}
          placeholder="이름을 입력하세요"
          onChange={onText}
        />
      </p>
      <p>
        <label>주민등록번호</label>
        <br />
        <input
          type="text"
          name="user_info"
          value={user_info}
          maxLength={6}
          size={6}
          onChange={onText}
        />
        -
        <input
          type="password"
          name="user_gender"
          value={user_gender}
          maxLength={1}
          size={1}
          onChange={onText}
        />
        ******
      </p>
      <p>
        <div class="input-group mb-3">
          <label>휴대폰 번호</label>
          <br />
          <select label="통신사" class="dropdown-menu" name="cell_carrier">
            <option class="dropdown-item" value="SKT">
              SKT
            </option>
            <option class="dropdown-item" value="KT">
              KT
            </option>
            <option class="dropdown-item" value="LG U+">
              LG U+
            </option>
            <option class="dropdown-item" value="SKT 알뜰폰">
              SKT 알뜰폰
            </option>
            <option class="dropdown-item" value="KT 알뜰폰">
              KT 알뜰폰
            </option>
            <option class="dropdown-item" value="LG U+ 알뜰폰">
              LG U+ 알뜰폰
            </option>
          </select>
          <input
            type="text"
            class="form-control"
            name="user_cell_no"
            placeholder="휴대폰 번호를 입력하세요"
          />
        </div>
        <br />
        <br />
      </p>
      <Terms />
      <p>
        <button onClick={onNext}>다음</button>
      </p>
    </>
  );
};

export default RegisterStep1;
