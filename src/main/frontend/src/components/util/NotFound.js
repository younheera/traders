/**
 * @author hyunseul
 * @create date 2023-10-25 14:11:45
 * @modify date 2023-10-25 15:14:44
 * @desc [Error Page 제작]
 */
import React from 'react';
import ErrorPage from '../../assets/img/ErrorPage.jpg';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container style={{ width: "100%" }}>
            <img src={ErrorPage} style={{margin:'auto', width:'100%'}}/>
        </Container>
    );
};

export default NotFound;