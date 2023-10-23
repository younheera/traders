/**
 * @author heera youn
 * @create date 2023-10-22 23:27:59
 * @modify date 2023-10-23 09:25:04
 * @desc [포인트 충전 모달 기능]
 */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/css/ChatMapModal.css';

const PointCharge = ({ showModal, handleCloseModal }) => {
    const[counter,setCounter] = useState(0)
    function onClick() {
        setCounter(counter+1);
    }
    return (
        <Modal className='basefont' show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100 title" style={{marginLeft:'5px'}}>&nbsp;&nbsp;포인트 충전하기
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{margin:'auto', justifyContent:'center'}}>
                <p style={{textAlign:'center'}} className='allterms'>충전하실 금액을 입력해주세요.</p>
                <p className='titleterms' style={{textAlign:'center'}}> {counter}</p>
                
                
                <span>충전 : </span><button onClick={()=> setCounter(counter+10000)
                }className='chargeButton'> +10,000원</button>
                <button onClick={()=> setCounter(counter+5000)
                }className='chargeButton'>+5,000원</button>
                <button onClick={()=> setCounter(counter+1000)
                }className='chargeButton'>+1,000원</button>
           
                <br/>
                
                <span>충전 : </span><button onClick={()=> setCounter(counter-10000)}className='chargeButton'>-10,000원</button>
                <button onClick={()=> setCounter(counter-5000)}className='chargeButton'>-5,000원</button>
                <button onClick={()=> setCounter(counter-1000)}className='chargeButton'>-1,000원</button>
            </Modal.Body>

            <Modal.Footer>
                <Button className='cancelButton-1' variant="secondary" onClick={handleCloseModal}>취소</Button>
                <Button className="saveButton-1" variant="primary">확인</Button>
            </Modal.Footer>
    </Modal>      
    );
};

export default PointCharge;