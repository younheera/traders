/**
 * @author heera youn
 * @create date 2023-10-22 23:34:20
 * @modify date 2023-10-22 23:35:17
 * @desc [전역적 발생하는 포인트 이벤트 위한 랜덤요소 기능 및 FE 구현]
 */
import React, { useEffect, useState } from 'react';
import newus1 from '../../assets/img/newus1.png';
import newus2 from '../../assets/img/newus2.png';
import newus3 from '../../assets/img/newus3.png';
import newus4 from '../../assets/img/newus4.png';
import newus5 from '../../assets/img/newus5.png';
import { Success } from '../toastify/Alert';

const RandomEvent = () => {
  const imageArray = [newus1, newus2, newus3, newus4, newus5];
  const [buttonVisible, setButtonVisible] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  let maxX = window.innerWidth - 20;
  let maxY = window.innerHeight - 150; //웹 브라우저 상단 네비바 고려

  const moveButton = () => {
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    setButtonPosition({ x: randomX, y: randomY });
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      moveButton();
    }, 5000); // 5초(속도조절)
    
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    const handleResize = () => {
      // 창 크기가 변경될 때 버튼 위치 다시 설정
      const newMaxX = window.innerWidth - 20;
      const newMaxY = window.innerHeight - 150;
      if (maxX !== newMaxX || maxY !== newMaxY) {
        setButtonPosition({ x: Math.random() * newMaxX, y: Math.random() * newMaxY });
        maxX = newMaxX;
        maxY = newMaxY;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    moveButton();
    Success("포인트 적립 완료!");
    setButtonVisible(false);
    setTimeout(() => setButtonVisible(true), 1000);
  };

  const randomIndex = Math.floor(Math.random() * imageArray.length);
  const randomImage = imageArray[randomIndex];

  return (
    <div>
      {buttonVisible && (
        <img
          src={randomImage}
          onClick={handleButtonClick}
          style={{
            width:'90px',
            height:'100px',
            position: 'absolute',
            top: buttonPosition.y,
            left: buttonPosition.x,
            cursor: 'pointer', // 손가락 커서로 변경
          }}
        />
      )}
    </div>
  );
};

export default RandomEvent;
