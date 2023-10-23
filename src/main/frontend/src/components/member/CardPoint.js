/**
 * @author heera youn
 * @create date 2023-10-22 02:25:19
 * @modify date 2023-10-23 11:19:31
 * @desc [마이페이지 TAB1.포인트 전환 및 충전]
 */
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import PayCard from '../../assets/css/PayCard.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import PointCharge from './PointCharge';

const CardPoint = (props) => {
  
  const [showModal,setShowModal] = useState(false);
    
    const handleShowModal=()=> {
        setShowModal(true);
    };
    const handleCloseModal=()=> {
        setShowModal(false);
    };
  
    if (props.tab === 0) {
        return (
          <>
      <Row className='basefont' style={{justifyContent:'center', margin: '40px'}}>
        <div class="card">
        <div class="cardtop">
          <scan>유저이름</scan>
          <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
        </div>
        <div class="infos">
          <section class="card-number">
            <p>Card Number</p>
            <h1>5495 9549 2883 2434</h1>
          </section>
          <div class="cardbottom">
            <aside class="infos--bottom">
              <section>
                <p>Expiry date</p>
                <h3>08/24</h3>
              </section>
              <section>
                <p>CVV</p>
                <h3>748</h3>
              </section>
            </aside>
            <aside>
              <section>
                <img src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png" class="cardbrand" />
              </section>
            </aside>
          </div>
        </div>
      </div>
    </Row>

    <Row style={{margin:'auto',justifyContent:'center',flexWrap:'nowrap',textAlign:'center'}}>
      <span className='titleterms' style={{textAlign:'center'}}> @@@님의 그린페이 잔액 @@@ 원</span>
    </Row>
        
    <Row style={{ flexWrap: 'nowrap', width: '50%', margin: 'auto', marginBottom: '40px' }}>
        
        <button className='checkButton' style={{width:'200px'}} 
        onClick={handleShowModal}>충전하기</button>
        
        <button className='backButton' style={{width:'200px'}}>환급하기</button>
        
      </Row>
      
      <PointCharge showModal={showModal} handleCloseModal={handleCloseModal} />
      
      
      {/* 포인트 내역 테이블 */}
      <TableContainer style={{width:'80%', margin:'auto'}}>
        <Table stickyHeader="true" size="smaill" aria-label="a dense table">
          <TableHead>
          <TableRow>
              <TableCell align='center' component="th">포인트적립내역</TableCell>
              <TableCell align='center' component="th">환급 포인트</TableCell>
              <TableCell align='center' component="th">포인트 잔액</TableCell>
          </TableRow>
          </TableHead>

          <TableBody>
            <br/> <br/> <br/> <br/> <br/>
          </TableBody>
          
        </Table>
      </TableContainer>
      </>
        )
    }
}

export default CardPoint;