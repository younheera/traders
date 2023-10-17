/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:32
 * @modify date 2023-10-17 16:31:03
 */

import axios from 'axios';

const fetchLastMessages = async (roomNum) => {

    const parsedRoomNum = parseInt(roomNum); // 문자열을 정수로 변환
    console.log(parsedRoomNum); // 변환된 정수를 콘솔에 출력

  try {
    const response = await axios.get(`http://localhost:8080/api/chat/roomNum/${parsedRoomNum}`);
    const chatData = response.data || {};
    console.log(chatData)

     const lastMsg = chatData.split("data").slice(-1)[0].split(",")[1].split(":")
     const receiver = chatData.split("data").slice(-1)[0].split(",")[5].split(":")

     if (lastMsg[1] && receiver[1]) {
        
        const lastText = lastMsg[1].replace(/"/g,'')
        console.log(lastText);

        const receiverText = receiver[1].replace(/"/g,'')
        console.log(receiverText); 

        return {
            lastMessage: lastText,
            receiver : receiverText 
            };
        } else {
        console.log('데이터가 비어있음 또는 형식이 잘못되었습니다.');
        return null;
        }
    } catch (error) {
        console.error(`채팅방 ${roomNum}의 마지막 메시지를 가져오는 데 실패했습니다:`, error);
        throw error;
    }
};

export { fetchLastMessages };
