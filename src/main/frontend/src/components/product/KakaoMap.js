/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-09-26 10:32:54
 * @modify date 2023-09-27 16:27:49
 * @desc [상품 리스트 페이지에서 근처 상품 보기 버튼을 클릭하면 지도 모달 페이지가 뜨게 한다.]
 */

// 모달 버튼이 있는 페이지
// ModalTest.jsx

import { useState } from "react";
import styled from "styled-components";
import ModalPage from "./ModalPage";

export default function KakaoMap() {
  // 모달을 보여줄지 말지 상태를 관리하는 state를 만들어준다.
  const [showModal, setShowModal] = useState(false);

  // 모달 버튼을 클릭하면 열리고
  const openModal = () => {
    setShowModal(true);
  };
  // 활성화된 모달창 밖을 클릭하면 닫힌다.
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={openModal}>모달이에옹</button>
      {showModal === true ? (
        <ModalPage showModal={showModal} closeModal={closeModal} />
      ) : null}
    </>
  );
}

// 위치를 대략 가운대로 정해주고
const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

// 모달 밖 배경색은 우리에게 익숙한 어두운 색으로 만들어주자
const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

// 모달창 사이즈는 용도에 맞춰 설정해준다.
const StyledModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
`;
