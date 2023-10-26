/**
 * @author ahrayi
 * @create date 2023-10-22 02:49:20
 * @modify date 2023-10-25 16:36:49
 * @desc 그린페이 관리(충전, 환급 ,이용내역)
 */

/**
 * @author heera youn
 * @create date 2023-10-22 02:25:19
 * @modify date 2023-10-24 11:56:28
 * @desc [마이페이지 TAB1.그린페이 전환/충전, 내역테이블 ]
 */

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import bankCode from './bankCode';
import TokenRefresher from "../util/TokenRefresher";
import { Error, Success } from "../util/Alert";
import WithdrawGpay from "../member/WithdrawGpay";
import PointCharge from "../member/PointCharge";

  
  const PayMgmt = (props) => {
      const [showChargeModal, setShowChargeModal] = useState(false);
      const [showWithdrawModal, setShowWithdrawModal] = useState(false);
      const [user, setUser] = useState(null);
      const [bankName, setBankName] = useState('')
      const [transferAmt, setTransferAmt] = useState('')
      const [payPwd, setPayPwd] = useState("")
      const [transactionHistory, setTransactionHistory] = useState([]);
      const [data, setData] = useState({
        nickName: '',
        accountNum:'',
        bankCodeStd:'',
        payBalance:'',
        // + 최근이용내역관련 data
    })
      
    const handleShowChargeModal = () => {
      setShowChargeModal(true);
    };
  
    const handleCloseChargeModal = () => {
        setShowChargeModal(false);
    };
    
    const handleShowWithdrawModal = () => {
        setShowWithdrawModal(true);
    };
    
    const handleCloseWithdrawModal = () => {
        setShowWithdrawModal(false);
    };

    const comma = (str) => {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    
    useEffect(() => {
      setUser(window.user);
    }, []);
    
  
    useEffect(() => {
        TokenRefresher.post('http://localhost:8080/api/payment/payMgmt')
        .then(response => {
            setData(response.data);
            setBankName(()=>findBankLabel(data.bankCodeStd))
        })
        .catch(error => {
            console.error('데이터 가져오기 실패:', error);
        });
    }, [data.payBalance]); 

    const findBankLabel = (value) => {
        const bank = bankCode.find(item => item.value == value);
        return bank ? bank.label : '-'; 
      };

    function maskAccountNumber(accountNum) {
        if (accountNum && accountNum.length >= 7) {
            const prefix = accountNum.slice(0, 3);
            const suffix = accountNum.slice(-3);
            const masking = "*".repeat(accountNum.length - 6);
            return prefix + masking + suffix;
        }
        return accountNum;
        }
    
     // 충전 요청
    const postAddPayMoney = () => {
        const requestBody = {
          transferAmt: transferAmt,
          payPwd: payPwd,
        };
        console.log(requestBody)

        TokenRefresher.post(
        "http://localhost:8080/api/payment/add",
        requestBody
        )
        .then((Response) => {
            if (Response.status === 200) {
            console.log(Response.data);
            setData(prev => ({
                ...prev,
                payBalance: transferAmt
            }));
            Success("✅ 충전 성공");
            } else {
            Error("❌ 충전 실패");
            }
        })
        .catch((error) => {
            console.error();
        });
    }; 

    // 내 계좌 송금 요청
    const postWdPayMoney = () => {
        const requestBody = {
        transferAmt: transferAmt,
        payPwd: payPwd,
        };
        console.log(requestBody)

        TokenRefresher.post(
        "http://localhost:8080/api/payment/withdraw",
        requestBody
        )
        .then((Response) => {
            if (Response.status === 200) {
            console.log(Response.data);
            setData(prev => ({
                ...prev,
                payBalance: transferAmt
            }));
            Success("✅ 송금 성공");
            } else {
            Error("❌ 송금 실패");
            }
        })
        .catch((error) => {
            console.error();
        });
    }; 

    useEffect(() => {
      TokenRefresher.post("http://localhost:8080/api/payment/transactionHistory")
        .then((response) => {
          setTransactionHistory(response.data);
        })
        .catch((error) => {
          console.error('거래 내역 조회 실패', error);
        });
    }, [data.payBalance]);

    if (props.tab === 0) {
      return (
        <>
          <Row
            className="basefont"
            style={{ justifyContent: "center", margin: "40px" }}
          >
            <div class="paycard">
              <div class="cardtop">
              {user && <scan>{user}</scan>}<br/>
                <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
              </div>
              <div class="infos">
                <section class="card-number">
                  <p className="paycardtext">Account Number</p>
                  <h1 style={{ fontSize: "20px" }}>{maskAccountNumber(data.accountNum)}</h1>
                </section>
                <div class="cardbottom">
                  <aside class="infos--bottom">
      
                  </aside>
                  <aside>
                    <section>
                      <img
                        src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png"
                        class="cardbrand"
                      />
                    </section>
                  </aside>
                </div>
              </div>
            </div>
          </Row>
  
          <Row
            style={{
              margin: "auto",
              justifyContent: "center",
              flexWrap: "nowrap",
              textAlign: "center",
            }}
          >
            <span className="titleterms" style={{ textAlign: "center" }}>
            {user}님의 그린페이🌿<br/>
            {comma(data.payBalance)} 원
            </span>
          </Row>
  
          <Row
            style={{
              flexWrap: "nowrap",
              width: "50%",
              margin: "auto",
              marginBottom: "40px",
            }}
          >
            <button
              className="checkButton"
              style={{ width: "200px" }}
              onClick={handleShowChargeModal}
            >
              충전
            </button>
  
            <button className="backButton" 
            style={{ width: "200px" }}
            onClick={handleShowWithdrawModal}
            >
              내 계좌 송금
            </button>
          </Row>
            <PointCharge
                setPayPwd={setPayPwd}
                setTransferAmt={setTransferAmt}
                postAddPayMoney={postAddPayMoney}
                showModal={showChargeModal}
                handleCloseModal={handleCloseChargeModal}
            />
            <WithdrawGpay
            setPayPwd={setPayPwd}
            setTransferAmt={setTransferAmt}
            bankName={bankName}
            accountNum={data.accountNum}
            payBalance={data.payBalance}
            postWdPayMoney={postWdPayMoney}
            showModal={showWithdrawModal}
            handleCloseModal={handleCloseWithdrawModal}
            />
  
          {/* 이용 내역 테이블 */}
          <TableContainer style={{ width: "80%", margin: "auto" }}>
            <Table stickyHeader="true" size="smaill" aria-label="a dense table">
              <TableHead>
                    최근 이용 내역
                <TableRow>
                  <TableCell align="center" component="th">
                    구분
                  {/* 0:거래 ,1:충전/환급, 2:포인트 */}
                  </TableCell>
                  <TableCell align="center" component="th">
                    거래일시
                  </TableCell>
                  <TableCell align="center" component="th">
                    거래품목
                  </TableCell>
                  <TableCell align="center" component="th">
                    금액
                  </TableCell>
                  <TableCell align="center" component="th">
                    비고
                  </TableCell>
                </TableRow>
              </TableHead>
  
              <TableBody>
              {transactionHistory.length === 0 ? (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    이용내역이 없습니다.
                  </TableCell>
                </TableRow>
                ) : (transactionHistory.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{transaction.type}</TableCell>
                    <TableCell align="center">{transaction.transactionDtime}</TableCell>
                    <TableCell align="center">{transaction.content}</TableCell>
                    <TableCell align="center">{transaction.tranAmt}</TableCell>
                    <TableCell align="center">{/* 비고 */}</TableCell>
                  </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    }
  };
  
  export default PayMgmt;