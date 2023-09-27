/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-27 14:36:02
 * @modify date 2023-09-27 14:36:02
 * @desc [description]
 */
import React from 'react';
import '../../assest/css/ChatHeader.css'
import {Navbar} from 'react-bootstrap'

const Header = () => {
    return (
    <Navbar bg="primary" variant="dark" className = "header-container">
        <Navbar.Brand className = "header-title-container">
            <h3>Carrykim의 채팅앱</h3>
        </Navbar.Brand>
    </Navbar>
    );
};

export default Header;