/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-26 17:02:33
 * @modify date 2023-09-27 14:36:10
 * @desc [description]
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const ChatList = ({username}) => {
    const [chatRooms, setChatRooms] = useState([]);
    // const [username,setUsername] = useState('');
    const [roomNum,setRoomNum] = useState('');
    // const [messages,setMessages] = useState([])

    useEffect(() => {
        // const usernameInput = prompt("아이디를 입력하세요");
        // const roomNumInput = prompt("채팅방 번호를 입력하세요");
        // setUsername(username);
        // setRoomNum(roomNum);

        // 서버에서 채팅방 목록 가져오는 api엔드포인트 요청
        axios.get(`http://localhost:8080/api/chat/list`)
          .then((res) => {
            const chatRoomData = res.data// 채팅방 목록 데이터
            setChatRooms(chatRoomData) // 채팅방 목록 상태 업데이트
        })
          .catch((error)=>{
            console.error('채팅방 목록을 가져오는데 실패하였습니다.',error);
          })
      }, []);
    


    return (
        <div>
            <h2>채팅방 목록</h2>
            <ul>
                {chatRooms.map((roomNum, index) => (
                    <li key={index}>
                    <span>방번호: {roomNum}</span>
                    <br/>
                    <Link to={`/chat/${roomNum}`}>ChatDetails</Link>{""}
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default ChatList;