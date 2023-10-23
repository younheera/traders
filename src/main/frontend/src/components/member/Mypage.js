/**
 * @author heera youn
 * @create date 2023-10-21 20:18:24
 * @modify date 2023-10-23 00:14:48
 * @desc [마이페이지]
 */
import React, { useState } from 'react';
import MyPageTab from './MyPageTab';
import PayCard from '../../assets/css/PayCard.css';
import { Row } from 'react-bootstrap';
import CardPoint from './CardPoint';


const Mypage = () => {
    const[tab, setTab] = useState(0); //탭 상태관리 변수
    
    return (
        <div>
            <MyPageTab tab={tab} setTab={setTab}/>
            <TabContent tab={tab}/> 
            <CardPoint/>
        </div>
    );
};

function TabContent(props) {
  
    if (props.tab === 0) {
      return <CardPoint tab={props.tab}/>;
     
} else if (props.tab === 1) {
    return <div>페이등록</div>;
} else if (props.tab === 2) {
    return <div>내 관심상품</div>;
} else if (props.tab===3) {
  return <div> 출석체크 </div>;
}
}

export default Mypage;