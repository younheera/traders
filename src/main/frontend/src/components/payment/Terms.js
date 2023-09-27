/**
 * @author ahrayi
 * @create date 2023-09-26 11:33:31
 * @modify date 2023-09-26 13:14:31
 */

import React, { useState } from 'react';

const initialTermStates = {
  term1: false,
  term2: false,
  term3: false,
  term4: false,
};

const Terms = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [termStates, setTermStates] = useState(initialTermStates);

  // 전체 동의 상태를 업데이트하는 함수
  const toggleSelectAll = () => {
    const allTermsChecked = !selectAllChecked;
    const updatedTermStates = { ...termStates };

    // 모든 약관 항목을 선택 또는 선택 해제
    Object.keys(updatedTermStates).forEach((term) => {
      updatedTermStates[term] = allTermsChecked;
    });

    setTermStates(updatedTermStates);
    setSelectAllChecked(allTermsChecked);
  };

  // 약관 항목을 선택 또는 선택 해제하는 함수
  const handleCheckboxChange = (name) => {
    const updatedTermStates = { ...termStates, [name]: !termStates[name] };
    setTermStates(updatedTermStates);

    // 모든 약관 항목이 선택되었는지 확인
    const allTermsChecked = Object.values(updatedTermStates).every((value) => value);
    setSelectAllChecked(allTermsChecked);
  };

  // 약관 항목 배열
  const terms = [
    { name: 'term1', label: '그린페이 서비스 약관', link: 'https://www.daangnpay.com/서비스-약관' },
    { name: 'term2', label: '그린페이 전자금융거래 이용약관', link: '' },
    { name: 'term3', label: '개인정보 수집 및 이용동의', link: '' },
    { name: 'term4', label: '개인정보 제3자 제공 동의(그린페이)', link: '' },
  ];

  return (
    <form>
      <div>
        <input
          type="checkbox"
          name="selectall"
          value="selectall"
          checked={selectAllChecked}
          onChange={toggleSelectAll}
          required
        />
        &nbsp;&nbsp;약관 모두 동의<br/>
      </div>
      <hr className="hr-3" />
      {terms.map((term) => (
        <div key={term.name}>
          <span style={{ color: 'green', fontWeight: 'bold' }}>[필수]</span>&nbsp;&nbsp;{term.label}&nbsp;
            <a href={term.link} target='_blank'>상세보기</a>
          <span style={{ float: 'right' }}>
            <input
              type="checkbox"
              className="term-checkbox"
              name={term.name}
              checked={termStates[term.name]}
              onChange={() => handleCheckboxChange(term.name)}
            />
            동의함 &nbsp;&nbsp;
            <input
              type="checkbox"
              className="term-checkbox"
              name={term.name}
              checked={!termStates[term.name]}
              onChange={() => handleCheckboxChange(term.name)}
            />
            동의안함
          </span><br />
        </div>
      ))}
    </form>
  );
};

export default Terms;