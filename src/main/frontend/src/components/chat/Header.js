/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-09-27 14:36:02
 * @modify date 2023-09-27 16:27:03
 * @desc [description]
 */
import React from "react";
import { Navbar } from "react-bootstrap";
import "../../assest/css/ChatHeader.css";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" className="header-container">
      <Navbar.Brand className="header-title-container">
        <h3>Carrykim의 채팅앱</h3>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
