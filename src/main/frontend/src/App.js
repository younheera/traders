import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Attendance from "./components/Attendance";
import Notification from "./components/Notification";
import ChatApp from "./components/chat/ChatApp";
import ChatBox from "./components/chat/ChatBox";
import ChatList from "./components/chat/ChatList";
import Elasticsearch from "./components/elasticsearch/Elasticsearch";
import MainFooter from "./components/layout/MainFooter";
import MainView from "./components/layout/MainView";
import NavBar from "./components/layout/NavBar";
import ResizedComponent from "./components/layout/ResizedComponent";
import AccountRegister from "./components/payment/AccountRegister";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import ProductDetails from "./components/product/ProductDetails";
import ProductListHeader from "./components/product/ProductListHeader";
import ProductRegistration from "./components/product/ProductRegistration";
import ProductUpdate from "./components/product/ProductUpdate";
import Login from "./components/service/Login";
import { signout } from "./components/service/SignAPIService";
import SignUp from "./components/service/SignUp";
import CampaignList from "./components/sns/CampaignList";
import NewsList from "./components/sns/NewsList";
import SnsRegistration from "./components/sns/SnsRegistration";
import Youtube from "./components/sns/Youtube";
import "./styles/global.css";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
});

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("REFRESH_TOKEN")) {
      const userInfo = jwt_decode(localStorage.getItem("REFRESH_TOKEN"));
      window.user = userInfo.sub;
      console.log("로그인 된 사용자:", window.user);
    }
  });

  return (
    <>
      <ResizedComponent>
        <NavBar />
        <MainView />
        <ThemeProvider theme={theme}>
          <ToastContainer />
          {/* <TokenRefresher/> */}
          <div className="Pretendard-Regular">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <hr />
              {/* :::::::::: products 관련 :::::::::: */}
              <li>
                <Link to="/products/register">ProductRegistration</Link>
              </li>
              <li>
                <Link to="/products">ProductList</Link>
              </li>
              <hr />
              {/* :::::::::: 출석체크 관련 :::::::::: */}
              <li>
                <Link to="/attendance">출석체크</Link>
              </li>

              <hr />
              {/* :::::::::: 알림 관련 :::::::::: */}
              <li>
                <Link to="/notification">알림보기</Link>
              </li>
              <hr />
              <li>
                <Link to="/login">로그인테스트</Link>
                <br />
              </li>
              <li>
                <Link to="/signup">회원가입테스트</Link>
                <br />
              </li>
              <button onClick={signout}>로그아웃</button>
              <hr />
              <li>
                <Link to="/payment">GreenPay</Link>
              </li>
              <br />
              <li>
                <Link to="/chat">chat</Link>
              </li>
              <hr />
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/campaign">Campaign</Link>
              </li>
            </ul>
            <Switch>
              <Route path={["/", "/main"]} exact>
                {/* <MainView /> */}
              </Route>
              {/* :::::::::: products 관련 :::::::::: */}
              <Route path="/products" exact>
                <ProductListHeader />
              </Route>
              <Route path="/products/register" exact>
                <ProductRegistration />
              </Route>
              <Route path="/products/:id" exact>
                <ProductDetails />
              </Route>
              <Route path="/products/update/:id" exact>
                <ProductUpdate />
              </Route>
              {/* :::::::::: 통합검색 관련 :::::::::: */}
              <Route path="/search" exact>
                <Elasticsearch />
              </Route>
              {/* :::::::::: 출석체크 관련 :::::::::: */}
              <Route path="/attendance" exact>
                <Attendance />
              </Route>
              {/* :::::::::: 알림 관련 :::::::::: */}
              <Route path="/notification">
                <Notification />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <SignUp />
              </Route>

              <Route path="/payment" exact>
                <GreenPay />
              </Route>
              <Route path="/payment/gpay_register" component={PayRegister} />
              <Route
                path="/payment/accnt_register"
                component={AccountRegister}
              />

              <Route path="/chat" exact>
                <ChatApp />
              </Route>

              <Route
                path="/chat/roomNum/:roomNum"
                component={ChatBox}
                exact
              ></Route>
              <Route path="/chat/list" component={ChatList} exact></Route>

              <Route path="/news" exact>
                <Youtube />
                <NewsList />
              </Route>

              <Route path="/campaign" exact>
                <CampaignList />
              </Route>

              <Route path="/sns/snsRegistration" exact>
                <SnsRegistration />
              </Route>
            </Switch>
          </div>
          <ChatList />
          <MainFooter />
        </ThemeProvider>
      </ResizedComponent>
    </>
  );
}

export default App;
