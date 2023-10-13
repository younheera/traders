/**
 * @author hyunseul
 * @create date 2023-10-04 13:02:02
 * @modify date 2023-10-12 17:36:36
 */

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Clock from 'react-live-clock';
import '../../assets/css/ChatStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatprofile from "../../assets/img/Chatprofile.png";
import {AiOutlineCalendar} from 'react-icons/ai';
import {MdArrowBackIosNew} from 'react-icons/md'
import {PiCreditCard} from 'react-icons/pi'
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ChatScheduleModal from "./ChatScheduleModal";





// 채팅 내용
const ChatBox = () => {
  const { roomNum } = useParams();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const eventSourceRef = useRef(null);
  const messageRef = useRef(null);
  const history = useHistory();
  
  const [isModalVisible, setModalVisible] = useState(false); // 모달
  const [reservedData, setReservedData] = useState(null); // 예약 정보 저장
  const [location, setLocation] = useState("");
  const messageEndRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  

  useEffect(() => {
    // 방 입장 시 스크롤을 맨 아래로 이동시키는 함수 호출
    scrollToBottom();
  }, [messages]); // 빈 배열을 두어 한 번만 실행되도록 설정

  
const scrollToBottom = () => {
  messageRef.current.scrollTop = messageRef.current.scrollHeight;
  messageRef.current?.scrollIntoView({behavior: 'smooth'})
}

useEffect(() => {
  messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
}, [messages]);


  useEffect(() => {
    // 이전 채팅 내용을 서버에서 가져오기
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/roomNum/${roomNum}`);
        const chatData = response.data || [];

         if (Array.isArray(chatData)) {
          setMessages(chatData);
         } else {
           console.error("서버에서 받아온 데이터가 올바른 형식이 아닙니다.");
         }
      } catch (error) {
        console.error("이전 채팅 내용을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchData(); // 이전 채팅 내용을 가져오기
    
  }, [roomNum]);

  useEffect(() => {
    // EventSource 초기화 및 메시지 받아오기
    eventSourceRef.current = new EventSource(`http://localhost:8080/api/chat/roomNum/${roomNum}`);
  
    eventSourceRef.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      // 이전 메시지와 새로운 메시지를 비교하여 새로운 메시지만 업데이트
      if (!messages.some(msg => msg.id === newData.id)) {
        setMessages(prevMessages => [...prevMessages, newData]);
      }
    };
    scrollToBottom();
    // 컴포넌트가 언마운트될 때 EventSource 연결 닫기
    return () => {
      eventSourceRef.current.close();
     
    };
  }, [messages]); // messages가 변경될 때마다 useEffect가 호출됨


  // 서버에 메세지 보내기 
  const sendMessageToServer = async (message) => {
      
    if (message.trim() !== "") {
    const chat = {
      text: message,
      sender: username,
      receiver:"유인나",
      roomNum: roomNum,
    };
  
    try {
      await axios.post("http://localhost:8080/api/chat", chat);
      console.log("메시지 전송 완료 " + chat);
      setMessage("");

      // 새로운 메세지 배열 끝에 추가해 화면에 표시
      scrollToBottom();
      setMessages(prevMessages => [...prevMessages, chat])

    } catch (error) {
      console.error("메시지 전송 오류:", error);
    }
  };
};
  
  
  // 보내는 사람 대화박스(블루)
  const getSendMsgBox = (data) => {
    const createdAt = data.createdAt
    if(createdAt){
    const tm = data.createdAt.substring(11,16)

    return (
      <div>
      <div className="sent_msg">
        <p className="message-content">{data.text}</p>
      </div>
      <span className="sent_time_date">{tm}</span>
      </div>
    );
  }
  return null;
};

// 받는 사람 대화박스(그레이)
const getReceiveMsgBox = (data) => {
  const createdAt = data.createdAt;
  if (createdAt) {
    const tm = data.createdAt.substring(11, 16);
    return (
      <div>
      <div className="received_withd_msg">
        <p className="message-content">{data.text}</p>
      </div> 
        <span className="time_date">{tm}</span>
      </div>
    );
  }
  return null;
};


const sendMessage = () => {
  if (message.trim() !== "") {
    sendMessageToServer(message);
  }
};

const handleInputChange = (e) => {
  setMessage(e.target.value);
};

const handleEnterPress = (e) => {
  if (e.key === "Enter") {
    sendMessage();
    console.log("Enter pressed")
  }

};

// 뒤로가기 버튼 클릭 이벤트 함수
 const handleBackButtonClick = () => {
   history.push("/chat/list");
 }


  useEffect(() => {

    // 예약 정보가 있는 경우에만 추가하도록 변경
    if (reservedData) {
      setMessages(prevMessages => [...prevMessages, reservedData]);
    }
  }, [reservedData]);
  

  // 모달 값 저장 함수
 const handleSaveModal = (data) => {
  console.log("모달에서 받은 데이터:", data)

  //setReservedData(data);
  const message = `${data.sender}님이 약속을 잡았습니다.\n시간: ${data.date}\n 장소: ${data.location}`;

  console.log(message);
  setLocation(data.location);
  sendMessageToServer(message);
  setModalVisible(false);

  }

// const handleSaveModal = (data) => {
//   console.log("모달에서 받은 데이터:", data);

//   // 예약 정보를 문자열로 변환하여 저장
//   const reservationMessage = `${username}님이 약속을 잡았습니다. 시간: ${data.date}, 장소: ${data.location}`;

  

//   // 스타일 클래스가 있는 경우 스타일 클래스를 추가하여 저장
//   const styledMessage = data.style
//     ? `<div class="${data.style}">${reservationMessage}</div>`
//     : reservationMessage;

//   // 예약 정보 메시지를 서버에 전송
//   const notice = {
//     text: styledMessage, // 혹은 reservationMessage로 저장할 수 있습니다.
//     sender: username,
//     receiver: "유인나",
//     roomNum: roomNum,
//     style: data.style
//   };

//   sendMessageToServer(notice); // 서버에 메시지 전송
//   setModalVisible(false); // 모달 닫기
// };


  return (
    <>
    <ChatScheduleModal show={isModalVisible} handleClose={toggleModal}  onsave={handleSaveModal}/>
    <div className="message">
      <div className="message-container" ref={messageRef}>
        <div>
          <MdArrowBackIosNew size='20px' onClick={handleBackButtonClick}/>　
          <img src={Chatprofile} alt="상품 이미지" value={username}/> 
          　유인나
          
          <hr/>  
        </div>
        <div className="clock-container">
        <div className="clock">
          <span>
          <Clock format={'YYYY년 MM월 DD일'} ticking={false} timezone={"Asia/Seoul"} />
          </span>
        </div>
        </div>
        
   
        {messages.map((data, index) => (
          <div key={index}>
            {data.sender === username ?  getSendMsgBox(data)
                  : getReceiveMsgBox(data)}      
          </div>
          
        ))}
        <div ref={messageEndRef}></div>
      </div>
      



      <div style={{ float: "left", clear: "both" }}></div>
      <div className="message-container">
        
          <div className="input_msg_write">
          <AiOutlineCalendar className="icon-calendar" size="30px" onClick={toggleModal} />
          <PiCreditCard className="icon-card" size="30px"></PiCreditCard>
            <input
              type="text"
              className="write_msg"
              placeholder="Type a message"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <button className="msg_send_btn" type="button" onClick={sendMessage}>
              Send
            </button>
            
        
        </div>
      </div>
 
    </div>
    </>
  );
}

export default ChatBox;
