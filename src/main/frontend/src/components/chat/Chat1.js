/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-26 17:03:10
 * @modify date 2023-09-27 16:26:54
 * @desc [description]
 */
/* eslint-disable */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../assest/css/ChatStyle.css";
import profile from "../../assest/img/Chatprofile.png";

const Chat1 = () => {
  const [username, setUsername] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const msgInputRef = useRef(null);

  useEffect(() => {
    //const usernameInput = prompt("아이디를 입력하세요");
    //const roomNumInput = prompt("채팅방 번호를 입력하세요");
    setUsername("11");
    setRoomNum(10);
    axios.get(`http://localhost:8080/api/chat/roomNum/10`).then((res) => {
      console.log(res);
      const dataArray = Array.isArray(res.data) ? res.data : [res.data];
      setMessages(dataArray); // 배열 형태로 업데이트
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const chat = {
        receiver: "222",
        sender: username,
        roomNum: roomNum,
        msg: message,
      };

      // 메시지를 서버로 전송하는 로직 (fetch 또는 axios 사용)
      fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버에서 응답을 받으면 처리할 코드
          console.log("메시지 전송 완료");
          console.log(data);
        })
        .catch((error) => {
          // 오류 처리
          console.error("메시지 전송 오류:", error);
        });
      // 메시지를 전송한 후 입력 필드 초기화
      setMessage("aaaa");
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

  const getMessageBox = (data, isSent) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = tm + " | " + md;

    return (
      <div className={isSent ? "sent_msg" : "received_withd_msg"}>
        <p>{data.msg}</p>
        <span className="time_date">
          {convertTime} / <b>{data.sender}</b>
        </span>
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
        console.log("메시지 전송 완료");
        const newMessage = {
          id: Date.now(),
          sender: username,
          msg: msgInput.value,
          convertTime:
            new Date().toLocaleTimeString() +
            " | " +
            new Date().toLocaleDateString(),
        };

        if (username === chat.sender) {
          initMyMessage(newMessage);
        } else {
          initYourMessage(newMessage);
        }
      } else {
        console.error("메시지 전송 오류");
      }

      msgInput.value = "";
    } catch (error) {
      console.error("메시지 전송 오류:", error);
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
      <div>
        <div>
          <div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <img src={profile} className="mr-3 rounded-circle" /> &nbsp;&nbsp;
              <span id="username">
                {/* 여기에 username을 출력하려면 username 변수를 사용하세요 */}
              </span>
            </div>
            <div>
              {messages.map((data, index) => (
                <div
                  key={index}
                  className={
                    data.sender === username ? "sent_msg" : "received_withd_msg"
                  }
                >
                  <p>{data.msg}</p>
                  <span className="time_date">
                    {data.convertTime} / <b>{data.sender}</b>
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterPress}
                />
                <button type="button" onClick={sendMessage}>
                  <i className="fa fa-paper-plane" aria-hidden="true" />
                  보내기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat1;
