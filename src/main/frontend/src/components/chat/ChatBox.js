/**
 * @author hyunseul
 * @create date 2023-10-04 13:02:02
 * @modify date 2023-10-11 12:14:18
 */

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Clock from 'react-live-clock';
import '../../assest/css/ChatStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatList from "./ChatList";
import Chatprofile from "../../assest/img/Chatprofile.png";
import {AiOutlineCalendar} from 'react-icons/ai';
import {MdArrowBackIosNew} from 'react-icons/md'
import { useHistory } from "react-router-dom/cjs/react-router-dom";


// 채팅 내용
const ChatBox = () => {
  const { roomNum } = useParams();
  const [username, setUsername] = useState("배수지");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const eventSourceRef = useRef(null);
  const messageRef = useRef(null);

  const history = useHistory();

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
  
    // 컴포넌트가 언마운트될 때 EventSource 연결 닫기
    return () => {
      eventSourceRef.current.close();
    };
  }, [messages]); // roomNum 또는 messages가 변경될 때마다 useEffect가 호출됨


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


const scrollToBottom = () => {
  messageRef.current.scrollTop = messageRef.current.scrollHeight;
  messageRef.current?.scrollIntoView({behavior: 'smooth'})
}

useEffect(() => {
  scrollToBottom();
},[messages])

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
// const handleBackButtonClick = () => {
//   history.push("/chat/list");
// }


  return (
    <div className="message">
      <div className="message-container" ref={messageRef}>
      <div>
        <MdArrowBackIosNew size='20px'/>　
        <img src={Chatprofile} alt="상품 이미지" value={username}/> 
        　유인나
        <AiOutlineCalendar className="icon-calendar"size='30px'/>
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
      </div>
      <div className="message-container">
        <div className="type_msg">
          <div className="input_msg_write">
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
    </div>
  );
}

export default ChatBox;
