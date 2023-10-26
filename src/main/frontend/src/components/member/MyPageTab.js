/**
 * @author heera youn
 * @create date 2023-10-21 23:00:26
 * @modify date 2023-10-25 13:56:28
 * @desc [마이페이지 탭 분리 및 관리]
 */
import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import  {BsCashCoin} from 'react-icons/bs';
import {GoHeartFill} from 'react-icons/go';
import {BsCartFill} from 'react-icons/bs';
import {FaUserCheck} from 'react-icons/fa';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
    tabs: {
        "& .MuiTab-root.Mui-selected'": {
          justifycontent:'center',
          position:'static',
          backgroundcolor: 'antiquewhite',
        },
        "& .MuiTabs-flexContainer": {
            justifycontent:'center',
            position:'static',
            display:'flex',
        },
    },
}));

const MyPageTab = ({tab,setTab}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    const handleTabClick = (index) => {
        setTab(index);
    };

    
    return (
        <div class="MuiTabs-root Tabs" aria-label="disabled tabs example" style={{justifyContent:'center'}}>
            
        <Tabs value={value} 
        TabIndicatorProps={{ style: { background: "#faebd7" , width: "650px"}}}
        style={{backgroundColor:'antiquewhite'}}>

            <Tab icon={<BsCashCoin />} label="그린페이 충전/환급"
            onClick={()=> {handleTabClick(0)}} value={0} />
            
            <Tab icon={<GoHeartFill />} label="나의 관심상품" 
            onClick={()=> {handleTabClick(1)}} value={1} />
            
            <Tab icon={<BsCartFill />} label="내 등록 물품"
            onClick={()=> {handleTabClick(2)}} value={2}/>
            
            <Tab icon={<FaUserCheck />} label="출석체크 이벤트"
            onClick={()=> {handleTabClick(3)}} value={3}/>
    </Tabs>
    </div>

    );
};

export default MyPageTab;