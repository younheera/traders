import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import newus1 from '../assets/img/newus1.png';
import newus2 from '../assets/img/newus2.png';
import newus3 from '../assets/img/newus3.png';
import newus4 from '../assets/img/newus4.png';
import newus5 from '../assets/img/newus5.png';
import newus1_1 from '../assets/img/newus1-1.png';
import newus2_1 from '../assets/img/newus2-1.png';
import newus3_1 from '../assets/img/newus3-1.png';
import newus4_1 from '../assets/img/newus4-1.png';
import newus5_1 from '../assets/img/newus5-1.png';
import attendance from '../assets/img/attendance.jpg'
import { BsJustify } from "react-icons/bs";

const AttendanceApp = () => {

  const [clickedDay, setClickedDay] = useState(null);

  const handleAttendance = (day) => {
    setClickedDay(day);
  }

  const images = {
    Monday: clickedDay === "Monday" ? newus1 : newus1_1,
    Tuesday: clickedDay === "Tuesday" ? newus2 : newus2_1,
    Wednesday: clickedDay === "Wednesday" ? newus3 : newus3_1,
    Thursday: clickedDay === "Thursday" ? newus4 : newus4_1,
    Friday: clickedDay === "Friday" ? newus5 : newus5_1,
  };
  
  const rowStyle = {
    width: '850px',
    backgroundImage: `url(${attendance})`, // 배경 이미지 설정
    backgroundSize: 'cover', // 이미지가 container를 완전히 덮도록 설정
    position: 'relative', // 다른 요소를 위치시키기 위해 position 설정
    height: '700px'
  };

  
  return (
    <Container style={rowStyle}>
    <Row style={{margin:'auto', width:'780px', padding:'10px',textAlign:'center'}}>
    {Object.keys(images).map((day, index) => (
      <Col key={day} style={{marginTop:'550px', textAlign:'center'}}>
      <img
        width={90}
        height={100}
        src={images[day]}
        alt={day}
        style={{ filter: clickedDay === day ? "none" : "grayscale(100%)" }}
        onClick={() => handleAttendance(day)}
        disabled={clickedDay && index < Object.keys(images).indexOf(clickedDay)}
      />
 
    </Col>
  ))}
</Row>
</Container>
);
};

export default AttendanceApp;
