import React from 'react';
import {Background, LoadingText} from './Styles';
import planetload from './img/planetload.png';
import Loading from './css/Loading.css';

export const OfficialLoading = () => {
    return (
        <Background>
            <LoadingText>로딩글귀 스타일 지정필요</LoadingText>
            <img src={planetload} alt="로딩중" width="10%" className='loadingimage'/>
        </Background>
    );
};

