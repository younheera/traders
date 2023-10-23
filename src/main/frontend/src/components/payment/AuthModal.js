import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Optmessage from './Otpmessage';

const AuthModal = ({ isOpen, onClose, onText, handleVerifySms, inputAuthNum }) => {
    return (

        isOpen && (
          <div className="modal show"
          style={{ display: 'block', position: 'none' }}>
         <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
          backgroundColor: "white",
        }}
      ></div>
            <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>휴대폰 본인인증</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Optmessage onChange={onText} inputAuthNum = {inputAuthNum}/>
                {/* <input
              type="text"
              name="inputAuthNum"
              maxLength={6}
              size={6}
              onChange={onText}
            /> */}
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleVerifySms} className='checkButton'>인증</button>
                <button onClick={onClose} className='backButton'>닫기</button>
            </Modal.Footer>
            </Modal.Dialog>
          </div>
        )
      );
    };
    
    export default AuthModal;