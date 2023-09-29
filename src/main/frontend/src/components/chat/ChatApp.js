import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ChatApp = () => {
  const [roomNum, setRoomNum] = useState(""); // 방 번호 상태
  const history = useHistory();

  const handleEnterRoom = () => {
  
    // 방 입장 로직 구현 후, 방 정보 업데이트
    const enteredRoomNum = prompt("채팅방 번호를 입력하세요");
    setRoomNum(enteredRoomNum);

    // 방 입장 후 채팅창으로 이동
    history.push(`chat/roomNum/${enteredRoomNum}`); 
    console.log(enteredRoomNum)
  };

  return (
    <div>
      <h2>채팅 애플리케이션</h2>
      
      <button onClick={handleEnterRoom}>방 입장</button>
    </div>
  );
};

export default ChatApp;
