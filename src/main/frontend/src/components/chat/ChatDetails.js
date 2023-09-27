/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-27 11:00:13
 * @modify date 2023-09-27 14:35:09
 * @desc [description]
 */

import React, { useEffect, useRef, useState } from 'react';
import '../../assest/css/ChatStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';



const ChatDetails = ({ roomNum, username }) => {
  const [messages, setMessages] = useState([]);
  const msgInputRef = useRef(null);
  
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/api/chat/roomNum/${roomNum}`);

    eventSource.onmessage = onMessage;

    return () => {
      eventSource.close();
    };
  }, [roomNum]);

  const getMessageBox = (data, isSent) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = tm + " | " + md;

    return (
      <div className={isSent ? "sent_msg" : "received_withd_msg"}>
        <p>{data.msg}</p>
        <span className='time_date'>{convertTime} / <b>{data.sender}</b></span>
      </div>
    );
  };

  const initMyMessage = (data) => {
    const sendBox = getMessageBox(data, true);
    setMessages((prevMessages) => [...prevMessages, sendBox]);
  };

  const initYourMessage = (data) => {
    const receivedBox = getMessageBox(data, false);
    setMessages((prevMessages) => [...prevMessages, receivedBox]);
  };

  const addMessage = async () => {
    const msgInput = msgInputRef.current;

    const chat = {
      sender: username,
      roomNum: roomNum,
      msg: msgInput.value,
    };

    try {
      const response = await fetch("http://localhost:8080/chat/", {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (response.ok) {
        console.log('메시지 전송 완료');
        const newMessage = {
          id: Date.now(),
          sender: username,
          msg: msgInput.value,
          convertTime: new Date().toLocaleTimeString() + " | " + new Date().toLocaleDateString(),
        };

        if (username === chat.sender) {
          initMyMessage(newMessage);
        } else {
          initYourMessage(newMessage);
        }
      } else {
        console.error('메시지 전송 오류');
      }

      msgInput.value = "";
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  const onMessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.sender === username) {
      initMyMessage(data);
    } else {
      initYourMessage(data);
    }
  };

  return (
    <div>
        {messages.map((data, index) => (
        <div key={index} className={data.sender === username ? "sent_msg" : "received_withd_msg"}>
            <p>{data.msg}</p>
            <span className='time_date'>{data.convertTime} / <b>{data.sender}</b></span>
        </div>
        ))}
        <input type="text" ref={msgInputRef} id="chat-outgoing-msg" />
        <button id="chat-outgoing-button" onClick={addMessage}>Send</button>
  </div>
  
 

  );
};

export default ChatDetails;
