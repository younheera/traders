/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-27 14:36:08
 * @modify date 2023-09-27 14:36:08
 * @desc [description]
 */

import React from 'react';
import '../../assest/css/ChatFooter.css'
import {Form,Button} from 'react-bootstrap'


const Footer = () => {
    return (
        <Footer>
            <Form.Control placeholder='' className='input-form'/>
            <Button variant="success" type='submit'>전송하기</Button>{' '}
        </Footer>
    );
};


export default Footer;