/**
 * @author heera youn
 * @create date 2023-10-25 14:37:50
 * @modify date 2023-10-27 14:52:35
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:29:09
 * @modify date 2023-10-27 11:24:25
 */
import React from 'react';
import '../../assets/css/MainNews.css'
import Youtube from '../sns/Youtube';
import NewsList from '../sns/NewsList';
import Container from 'react-bootstrap/Container';

const MainNews = () => {
    return (
        <Container style={{width:'100%'}} className='middle-container'>
        <Youtube/>
        <NewsList/>
        </Container>
    );
};

export default MainNews;