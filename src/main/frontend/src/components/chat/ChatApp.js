import React, {useState } from "react";
import { useHistory } from "react-router-dom";

const ChatApp = () => {
  // const [username, setUsername] = useState("") // 사용자 이름
  const history = useHistory();
  const [roomNum, setRoomNum] = useState(""); // 방 번호 상태
  const [username,setUsername] = useState("");

  const handleUsernameInput = () => {
    const enteredUsername = prompt("사용자 이름을 입력하세요");
    if(enteredUsername){
      //setUsername(enteredUsername)
      console.log(enteredUsername)
      history.push(`/chat/list/`,{enteredUsername})
    }else{
      alert("사용자 이름을 입력해야 채팅을 시작할 수 있습니다.")
    }
   
  }


  const handleEnterRoomNum = () => {
    // 방 입장 로직 구현 후, 방 정보 업데이트
    const enteredRoomNum = prompt("채팅방 번호를 입력하세요");
    setRoomNum(enteredRoomNum);

    // 방 입장 후 채팅창으로 이동
    history.push(`chat/roomNum/${enteredRoomNum}`);
    console.log(enteredRoomNum);
  };

  return (
    <div>
      <h2>채팅 애플리케이션</h2>
      <button onClick={handleEnterRoomNum}>방 입장</button>
       
      <button onClick={handleUsernameInput}>사용자 이름 입력</button>
       

    </div>
  );
};

export default ChatApp;
