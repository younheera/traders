/**
 * @author heera youn
 * @create date 2023-10-22 23:35:51
 * @modify date 2023-10-23 12:29:55
 * @desc [로고 회전 및 메뉴명 수정]
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../assets/css/NavBar.css';
import NavLogo1 from "../../assets/img/NavLogo1.png"
import {PiUserPlusLight} from 'react-icons/pi'
import {BsBagPlus} from 'react-icons/bs'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {

  const user = window.user;

  const history = useHistory();
    return (
      <div className='basefont'>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav">
        <Container className='nav-container'>
         
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-menu me-auto">
             <NavDropdown title="상품" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">상품</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                
              </NavDropdown>
              <NavDropdown title="캠페인" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="마이페이지" id="collapsible-nav-dropdown" style={{marginRight:'0px'}}>
                <NavDropdown.Item href="#action/3.1">포인트 충전</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  나의 관심상품
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">내 등록물품</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  출석체크 이벤트
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Navbar.Brand href="/" className='nav-logo'>
                NewUs
                {/* <img src={NavLogo} className='nav-logo-img'/> */}
                <img src={NavLogo1} className='nav-logo-img'/>
                Traders
            </Navbar.Brand>
            <Nav>
              {/* 로그인 상태에 따른 이름 출력 */}
              <div className='usernickname'><span style={{color: '#167146'}}>
                {user ? <p>{user}님 안녕하세요!</p> : null}</span></div>
              
              {/* <Nav.Link href="/products/register" className='navbar-icons' >
                <BsBagPlus style={{fontSize:'17pt'}} onClick={()=>{
                  history.push("./products/register")
                }}/>
                  <span style={{marginLeft:'5px',position:'relative',top:'3px',fontSize:'12pt'}}>판매하기</span>
              </Nav.Link> */}
            
          


              <Nav.Link href="/" className='nav-logout-icons'>
                <PiUserMinusLight style={{fontSize:'23pt'}}/></Nav.Link>

              <NavDropdown title={<PiUserPlusLight style={{fontSize:'23pt'}}/>} id="collapsible-nav-dropdown" style={{ marginRight: '0px'}}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
              {/* <Nav.Link eventKey={2} href="#memes">
                <PiUserPlusLight></PiUserPlusLight>
              </Nav.Link> */}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    );
};

export default NavBar;