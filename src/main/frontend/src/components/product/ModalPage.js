/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-09-26 10:33:01
 * @modify date 2023-09-27 16:27:54
 * @desc [상품 리스트 페이지에서 근처 상품 보기 버튼을 클릭하면 지도 모달 페이지가 뜨게 한다.]
 */
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const ModalPage = ({ showModal, closeModal }) => {
  return (
    <>
      {showModal ? (
        <StyledBackground onClick={closeModal}>
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            <Map
              className="myMap"
              style={{ width: "500px", height: "500px" }}
              center={{ lat: 33.5563, lng: 126.79581 }}
              level={3}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>월정리에옹</div>
              </MapMarker>
            </Map>
          </StyledModalContainer>
        </StyledBackground>
      ) : null}
    </>
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .myMap {
    border-radius: 20px;
    box-shadow: 1px 1px 10px 1px rgb(71, 181, 255);
  }
`;

export default ModalPage;
