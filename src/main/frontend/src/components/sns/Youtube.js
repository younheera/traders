/**
 * @author hyunseul
 * @create date 2023-10-19 18:32:07
 * @modify date 2023-10-27 11:37:25
 * @desc [메인 페이지 템플릿 전체 css]
 */

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../assets/css/MainNews.css";

const Youtube = () => {
  return (
    <Carousel
      fade
      className="d-flex align-items-center"
      interval={5000}
      controls={false}
    >
      <Carousel.Item>
        <div className="d-flex flex-row ">
          <div className="text-start">
            <p className="video-text-1">중고거래는 우리 모두가 공유하는 지구를 위한 긍정적인 행동입니다.</p>
            <p className="video-text-2">
            작은 가치가 큰 환경을 만듭니다.
            </p>
          </div>
          <iframe
            className="video"
            title="First Video"
            width="460"
            height="280"
            src="https://www.youtube.com/embed/7Uy3Du2JWOE"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex flex-row">
          <div className='text-start'>
            <p className='video-text-1'>
            중고 물건은 지구의 새로운 시작을 상징합니다. 우리의 선택이 변화를 이끌어냅니다.
            </p>
            <p className='video-text-2'>
            친환경 삶을 추구하며 중고 물건을 사랑하세요.
            </p>
          </div>
          <iframe
          className='video'
            title="Second Video"
            width="460"
            height="280"
            src="https://www.youtube.com/embed/Xp3SasADtE0"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Youtube;
