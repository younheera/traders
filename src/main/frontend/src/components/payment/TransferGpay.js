/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-25 16:27:03
 * @desc [css]
 */
/**
 * @author ahrayi
 * @create date 2023-10-22 03:55:46
 * @modify date 2023-10-24 19:13:47
 * @desc 채팅 - [송금하기]
 */
/**
 * @author wheesunglee
 * @create date 2023-10-23 22:58:47
 * @modify date 2023-10-23 22:58:53
 * @desc 채팅방에서 물품 정보 받아오기
 */



import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../../assets/css/ChatStyle.css';
import {useParams,withRouter} from "react-router-dom/cjs/react-router-dom.min";
import { fetchProduct } from "../../assets/js/product";
import TokenRefresher from "../util/TokenRefresher";
import {BsDot} from 'react-icons/bs'
import { TextField } from "@material-ui/core";


const TransferGpay = (props) => {
    const { id } = useParams();
    const [buyer, setBuyer] = useState();
    const [product, setProduct] = useState();
    const [balance, setBalance] = useState();
    useEffect(() => {
        fetchProduct(id).then((response) => {
          if (response) {
            setProduct(response.data);
          }
        });
        setBuyer(window.user);
    
        //getBalance();
        console.log("transfer gpay", product);
        console.log("buyer", buyer);
      }, []);
    
      // 그린페이 송금
      const transferPayment = () => {
        TokenRefresher.post("http://localhost:8080/api/payment/transfer");
      };
    
      // 그린페이 잔액 가져오기
      const getBalance = () => {
        TokenRefresher.get("http://localhost:8080/api/payment/payMgmt")
          .then((res) => setBalance(res.data))
          .catch((error) => {
            if (error.response) {
              const errorResponse = error.response.data;
              console.log(errorResponse);
            }
          });
      };

      const [password, setPassword] = useState("");
      const [keypadRows, setKeypadRows] = useState([]);
    
      useEffect(() => {
        const randomCharacters = shuffleArray([
          "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ]);
    
        const initialKeypadRows = [
            ["1", "2", "3","4"],
            ["5", "6", "7","8"],
            ["C", "9", "0","←"]
            
          ];
    
        setKeypadRows(initialKeypadRows);
      }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const handleClearButtonClick = () => {
        setPassword("");
      };
    
      const handleDeleteButtonClick = () => {
        setPassword(password.slice(0, -1));
      };
    
      const handleKeypadButtonClick = (character) => {
        setPassword(password + character);
      };
    
      function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }
        return shuffledArray;
      }
    
      function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
          chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
      }
    
      function handleGpayPwd(password) {
        if (password.length === 6) {
          
         
        } else {
          Error("❌ 비밀번호는 6자리입니다 ❌");
        }
      };

    return (
        <>
         <Container style={{ width: '1040px' }}>
        {product && (
          <div className="message-container">
            <div className="chat-pay-header">
              <Col style={{ fontSize: '18pt', fontWeight: '700', marginTop: '20px' }}>결제하기</Col>
            </div>
                <hr style={{ marginTop: '30px', marginBottom: '0px' }} />
            <div style={{ backgroundColor: ' #d1d1d1' }}>
              <div style={{ paddingTop: '30px' }}>
                <div>
                  <img src={product.images[0].filepath} className="chat-pay-product-img" alt="Product"></img>
                  <span className="chat-product-name">
                    <BsDot />
                    상품명: {product.name}
                  </span>
                </div>
                <input type="text" value={product.price} className="chat-product-price-input" readOnly />
                <span className="chat-product-price">원</span><br />
                <span className="chat-product-pay-balance">
                  그린페이 잔액: {balance} |
                  {parseInt(product.price) > parseInt(balance)
                    ? `부족한 금액 ${product.price - balance}원이 자동충전되어요`
                    : null}
                </span>
              </div>
            </div>
         

        <Row style={{ width: "300px", margin: "auto" }}>
          <TextField
            style={{marginTop:'30px',marginBottom:'30px'}}
            type="password"
            id="gpayPwd"
            maxLength={6}
            size={6}
            value={password}
            onChange={handlePasswordChange}
            inputProps={{ style: { textAlign: "center" } }}
            readOnly
          />
        </Row>

        <Row style={{ margin: "auto" }}>
          
          <div
            // id="keypad"
            style={{
              margin: "auto",
              flexBasis: "content",
              width: "50%",
              display: "grid",
            }}
          >
            {keypadRows.map((row, rowIndex) => (
              <span style={{ float: "left" }}>
                <Col key={rowIndex}>
                  {row.map((character) => (
                    <button
                      style={{ justifyContent: "center" }}
                      className="chat-key__button"
                      key={character}
                      onClick={() => {
                        if (character === "C") {
                          handleClearButtonClick();
                        } else if (character === "←") {
                          handleDeleteButtonClick();
                        } else {
                          handleKeypadButtonClick(character);
                        }
                      }}
                    >
                      {character}
                    </button>
                  ))}
                </Col>
              </span>
            ))}
          </div>
        </Row>
       
        <Row style={{marginTop:'15px'}}>
          <button
            style={{ margin: "auto", width: "200px",backgroundColor:'#198754'}} 
            className="saveButton-2"
            id="setGpayPwd"
            onClick={transferPayment}
          >
            송금하기
          </button>
        </Row>

        </div>
        )}
   
        {/* <button onClick={transferPayment}>송금하기</button> */}
      </Container>
    </>
  );
};

export default withRouter(TransferGpay);