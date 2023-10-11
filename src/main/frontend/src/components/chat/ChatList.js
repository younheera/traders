import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Chatprofile from "../../assest/img/Chatprofile.png";
import ChatBox from "./ChatBox";
import axios from "axios";

const ChatList = () => {
  const location = useLocation();
  const username = location.state.enteredUsername;
  const [chatRooms, setChatRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (username) {
      fetchData();
    } else {
      history.push("/");
    }
  }, [username]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/chat/list", {
        params: {
          sender: username,
        },
      });

      const chatData = response.data || [];
      setChatRooms(chatData);
      console.log("채팅방 요청 성공", chatData);
    } catch (error) {
      console.error("채팅방 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  return (
    <div>
      {username && chatRooms.length > 0 && (
        <div>
          <h3>채팅방 목록</h3>
          <ul>
            {chatRooms.map((roomNum) => (
              <li key={roomNum}>
                <img src={Chatprofile} alt="상품 이미지" />
                <button onClick={() => history.push(`/chat/roomNum/${roomNum}`)}>
                  채팅방 {roomNum}으로 입장
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatList;
