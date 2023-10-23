import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS를 임포트하세요.
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import OtpInput from "react-otp-input";

export default function Optmessage({ onText }) {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    onText(newOtp);
  };

  return (
    <div style={{ border: "3px" }}>
      <Row style={{ margin: "20px" }}>
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          휴대폰 인증번호
        </h1>
      </Row>

      <Row>
        <span className="lockicon">Lock Icon</span>
      </Row>
      <br />
      <Row>
        <span className="basefont">
          핸드폰으로 전송된 인증번호 6자리를 입력해주시기 바랍니다.
        </span>
      </Row>
      <br />
      <Row className="otp-field">
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          separator={<span>&nbsp;</span>}
          containerStyle={{ display: "contents" }}
          inputStyle={{
            width: "3rem",
            height: "3.5rem",
            textAlign: "center",
            fontSize: "20px",
          }}
        />
      </Row>
    </div>
  );
}
