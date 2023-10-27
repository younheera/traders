/**
 * @author hyunseul
 * @create date 2023-10-23 22:31:18
 * @modify date 2023-10-27 11:57:15
 * @desc [페이지 전체 템플릿 css]
 */
/**
 * @author ahrayi
 * @create date 2023-10-13 16:31:55
 * @modify date 2023-10-23 19:45:40
 */

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { PiNumberCircleTwo } from "react-icons/pi";
import "../../assets/css/AccountRegister.css";
import "../../assets/css/ProductRegistration.css";
import Account from "../../assets/img/Account.png";

const AccountRegister2 = ({ onNext, ranNum, accountNum }) => {
  const [inputRanNum, setInputRanNum] = useState("");

  const verifyRanNum = () => {
    if (ranNum == inputRanNum) {
      onNext();
    } else {
      console.log(ranNum);
      console.log(inputRanNum);
      alert("올바르지 않은 번호입니다.");
    }
  };

  useEffect(() => {
    setInputRanNum(ranNum);
  }, [ranNum]);

  function maskAccountNumber(accountNum) {
    if (accountNum && accountNum.length >= 7) {
      const prefix = accountNum.slice(0, 3);
      const suffix = accountNum.slice(-3);
      const masking = "*".repeat(accountNum.length - 6); // 앞뒤 3자리 제외 가운데 숫자를 ''로 마스킹
      return prefix + masking + suffix;
    }
    return accountNum; // 계좌번호가 7자리 미만이면 마스킹하지 않음
  }

  return (
    <body>
      <Container
        className="product"
        style={{ width: "850px", marginTop: "180PX" }}
      >
        <Row className="product-header ">
          <div
            style={{ fontSize: "15pt", fontWeight: "600", color: " #198754" }}
          >
            ▷인증하기
          </div>
          <hr className="product-hr" />
        </Row>
        <Row style={{ height: "120px" }}>
          <p style={{ fontWeight: "700", marginBottom: "5px" }}>
            은행 계좌 인증
          </p>
          <p className="account-col-1">
            * 입금내역이 없다면 등록하신 계좌 정보를 다시 확인해주세요.
            <br />* 계좌 거래내역에서 입금된 1원의 입금자명을 확인 후, '그린' 뒤
            3자리 숫자를 입력해주세요.
          </p>
        </Row>
        <Row style={{ fontWeight: "900" }}>
          <div>
            <PiNumberCircleTwo style={{ fontSize: "16pt" }} /> 인증번호 입력
          </div>
        </Row>
      </Container>

      <Container
        style={{ maxWidth: "1040px", height: "330px" }}
        className="account-container-2"
      >
        <Row>
          <Col xs={12} md={6} className="account-2-img">
            <img src={Account} width="100%" alt="계좌 정보"></img>
          </Col>
          <Col
            xs={12}
            md={6}
            style={{ marginTop: "100px" }}
            className="account2-col-2"
          >
            <p>
              계좌 정보
              <input
                className="account-2-text-field"
                type="text"
                readOnly
                value={maskAccountNumber(accountNum)}
              />
            </p>
            <p>
              인증번호
              <input
                className="account-2-text-field"
                type="text"
                name="inputRanNum"
                maxLength={3}
                value={inputRanNum}
                onChange={(evt) => setInputRanNum(evt.target.value)}
              />
            </p>
          </Col>
        </Row>
      </Container>

      <Row className="account-row">
        <button
          className="account-row-btn saveButton-2 "
          onClick={verifyRanNum}
        >
          확인
        </button>
      </Row>
      <br></br>
      <Container
        style={{
          maxWidth: "1040px",
          backgroundColor: "#cdcdcd8d ",
          height: "150px",
        }}
      >
        <Row className="account-row text-2" style={{ paddingTop: "10px" }}>
          <p>
            ▶ 반드시 가입자 본인 명의의 계좌로 등록하셔야 합니다.
            <br></br>
            <br></br>▶ 계좌 인증 완료 후 입금이 되지 않으시는 경우 'Q.가상계좌
            입금이 되지 않습니다' 를 참고해주세요.
          </p>
        </Row>
      </Container>
      <br />
      <br />
    </body>
  );
};

export default AccountRegister2;
