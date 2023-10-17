import React, { useState, useEffect } from 'react';
import "../../styles/global.css"

const JoinPresenter = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  return (
    <form method="post" action="">
      <br/>
      <div className="yourClassNameHere">
        <label className="presenterh1">약관동의</label>
        <div className="yourClassNameHere"><br/>
          <div className="yourClassNameHere"><br/>
            <input
              type="checkbox"
              id="all-check"
              checked={allCheck}
              onChange={allBtnEvent}
              />
            <label htmlFor="all-check" className='presenterh2'>전체동의</label>
          </div><br/>
              <hr/><br/>
          <div className="yourClassNameHere">
            <input
              type="checkbox"
              id="check1"
              checked={ageCheck}
              onChange={ageBtnEvent}
            />
            <label htmlFor="check1" className='presenterh2'>만 14세 이상입니다 <span className="necessarytext">(필수)</span></label>
          </div><br/>
          <div className="yourClassNameHere">
            <input
              type="checkbox"
              id="check2"
              checked={useCheck}
              onChange={useBtnEvent}
            />
            <label htmlFor="check2" className='presenterh2'>이용약관 <span className="necessarytext">(필수)</span></label>
          </div><br/>
          <div className="yourClassNameHere">
            <input
              type="checkbox"
              id="check3"
              checked={marketingCheck}
              onChange={marketingBtnEvent}
            />
            <label htmlFor="check3" className='presenterh2'>마케팅 동의 <span className="choicetext">(선택)</span></label>
          </div>
        </div>
      </div>
      <br/>
    </form>
  );
};

export default JoinPresenter;
