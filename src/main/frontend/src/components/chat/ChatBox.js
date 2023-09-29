import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatBox = () => {
  const [username, setUsername] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const enteredUsername = prompt("아이디를 입력하세요");
    const enteredRoomNum = prompt("채팅방 번호를 입력하세요");
  
    setUsername(enteredUsername);
    setRoomNum(enteredRoomNum);
  
    let eventSource;
  
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${hours}:${minutes} | ${month}/${day}`;
    };
  
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/roomNum/1`);
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const initialMessages = dataArray.map(data => ({
          msg: data.text,
          sender: data.sender,
          convertTime: formatTime(data.createdAt),
        }));
        setMessages(initialMessages);


        // 초기 데이터를 가져온 후에 실시간 채팅 스트리밍 설정
        eventSource = new EventSource(`http://localhost:8080/api/chat/roomNum/1`);
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.sender === enteredUsername) {
            initMyMessage(data);
          } else {
            initYourMessage(data);
          }
        };
      } catch (error) {
        console.error("초기 데이터를 가져오는 데 실패했습니다.", error);
      }
    };
  
    fetchInitialData();
  
    window.addEventListener("error", (event) => {
      console.error("에러 발생:", event.error);
    });
  
    return () => {
      eventSource.close();
    };
  }, []);
    
  
  const getSendMsgBox = (data) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = `${tm} | ${md}`;

    return (
      <div className="sent_msg">
        <p>{data.msg}</p>
        <span className="time_date">
          {convertTime} / <b>{data.sender}</b>
        </span>
      </div>
    );
  };

  const getReceiveMsgBox = (data) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = `${tm} | ${md}`;

    return (
      <div className="received_withd_msg">
        <p>{data.msg}</p>
        <span className="time_date">
          {convertTime} / <b>{data.sender}</b>
        </span>
      </div>
    );
  };

  const initMyMessage = (data) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, getSendMsgBox(data)];
      return updatedMessages;
    });
  };

  const initYourMessage = (data) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, getReceiveMsgBox(data)];
      return updatedMessages;
    });
  };

  const sendMessageToServer = async (roomNum, message) => {
    const chat = {
      roomNum: roomNum,
      text: message,
      sender: username,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/chat', chat);
      console.log('메시지 전송 완료', response.data);
      console.log(messages)
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      sendMessageToServer(roomNum, message);
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
  <div className="message-container">
    {messages.map((data, index) => (
      <div key={index}>
        {data.sender === username ? (
          <div className="sent_msg">
            <p>{data.msg}</p>
            <span className="time_date">
              {data.convertTime} / <b>{data.sender}</b>
            </span>
          </div>
        ) : (
          <div className="received_withd_msg">
            <p>{data.msg}</p>
            <span className="time_date">
              {data.convertTime} / <b>{data.sender}</b>
            </span>
          </div>
        )}
      </div>
    ))}
  </div>



      <h2>{username}</h2>

      <div className="container-fluid">
        <div className="type_msg">
          <div className="input_msg_write">
            <input
              id="chat-outgoing-msg"
              type="text"
              className="write_msg"
              placeholder="Type a message"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <button
              id="chat-outgoing-button"
              className="msg_send_btn"
              type="button"
              onClick={sendMessage}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
