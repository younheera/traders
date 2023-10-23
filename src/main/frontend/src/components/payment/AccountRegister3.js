/**
 * @author ahrayi
 * @create date 2023-10-17 10:02:58
 * @modify date 2023-10-17 18:07:15
 */

import React,{useState} from 'react';

const AccountRegister3 = ({postAccountInfo}) => {

    const [flag,setFlag] = useState(true);
    const [agreed, setAgreed] = useState(false);

    const handleAgreementChange = () => {
        setAgreed(!agreed);
    }

    const handleVerification = () => {
        setFlag(false);
    }

    const handleNext = () => {
        postAccountInfo();
    }

    return (
        <div>
            <h2>ARS</h2>
            인증전화를 받은 후,<br/>
            안내 음성에 따라 아래 번호를 입력해주세요.

            <div><br/><br/>
                <span style={{ color: "green", fontWeight: "bold" }}>[필수]</span>
                    &nbsp;&nbsp; 오픈뱅킹 출금이체 동의 &nbsp;
                    <a href='#'>
                        상세보기
                    </a>
                    <span style={{ float: "right" }}>
                        <input
                        type="checkbox"
                        className="term-checkbox"
                        checked={agreed}
                        onChange={handleAgreementChange}
                        disabled={!flag}
                        />
                        동의함 &nbsp;&nbsp;
                        <input
                        type="checkbox"
                        className="term-checkbox"
                        checked={!agreed}
                        onChange={handleAgreementChange}
                        disabled={!flag}
                        />
                        동의안함
                </span>
                <br />
            </div>
            {flag && <button onClick={handleVerification} disabled={!agreed}>📞인증전화 받기</button>}
            {!flag && <button onClick={handleNext}>인증 완료</button>}<br/>
            {!flag && <p>ARS 인증과정은 생략됩니다.</p>}
            
        </div>
    );
};

export default AccountRegister3;