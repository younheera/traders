import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import ProductDetails from "./components/product/ProductDetails";
import ProductRegistration from "./components/product/ProductRegistration";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingLeaf from "./assets/LoadingLeaf";
import { OfficialLoading } from "./assets/OfficialLoading";
import Attendance from "./components/Attendance";
import ChatApp from "./components/chat/ChatApp";
import ChatBox from "./components/chat/ChatBox";
import ChatList from "./components/chat/ChatList";
import Elasticsearch from "./components/elasticsearch/Elasticsearch";
import MainFooter from "./components/layout/MainFooter";
import MainView from "./components/layout/MainView";
import NavBar from "./components/layout/NavBar";
import ResizedComponent from "./components/layout/ResizedComponent";
import Login from "./components/member/Login";
import Mypage from "./components/member/Mypage";
import RandomEvent from "./components/member/RandomEvent";
import { signout } from "./components/member/SignAPIService";
import SignUp from "./components/member/SignUp";
import Notification from "./components/Notification";
import AccountRegister from "./components/payment/AccountRegister";
import Confetti from "./components/payment/Confetti";
import PayMgmt from "./components/payment/PayMgmt";
import RegisterComplete from "./components/payment/RegisterComplete";
import RegisterStep4 from "./components/payment/RegisterStep4";
import ProductListHeader from "./components/product/ProductListHeader";
import ProductUpdate from "./components/product/ProductUpdate";
import CampaignDatails from "./components/sns/CampaignDatails";
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
          <RandomEvent />
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

              <li>
                <Link to="/attendance">출석체크</Link>
              </li>
              <hr />
              <li>
                <Link to="/notification">알림보기</Link>
              </li>
              <hr />
              {/* :::::::::: 로그인 관련 :::::::::: */}

              <li>
                <Link to="/login">로그인테스트</Link>
              </li>
              <li>
                <Link to="/signup">회원가입테스트</Link>
              </li>
              <button onClick={signout}>로그아웃</button>
              <hr />
              {/* :::::::::: pay 관련 :::::::::: */}

              <li>
                <Link to="/payment">GreenPay</Link>
              </li>
              <br />
              <li>
                <Link to="/pay3">pay3</Link>
              </li>
              <li>
                <Link to="/Random">RegisterComplete</Link>
              </li>
              <hr />
              {/* :::::::::: chat 관련 :::::::::: */}
              <li>
                <Link to="/chat">chat</Link>
              </li>
              <hr />
              {/* :::::::::: sns 관련 :::::::::: */}
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/campaign">Campaign</Link>
              </li>
              <li>
                <Link to="/sns">sns</Link>
              </li>
              <hr />
              {/* :::::::::: 기타 :::::::::: */}

              <li>
                <Link to="/mypage">Mypage</Link>
              </li>
              <li>
                <Link to="/loading1">Loading1</Link>
              </li>
              <li>
                <Link to="/loading2">Loading2</Link>
              </li>
            </ul>

            <Switch>
              <Route path={["/", "/main"]} exact>
                {/* <MainView /> */}
              </Route>

              <Route path="/search" exact>
                <Elasticsearch />
              </Route>
              <Route path="/attendance" exact>
                <Attendance />
              </Route>
              <Route path="/notification">
                <Notification />
              </Route>

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
              <Route path="/payment/payMgmt" component={PayMgmt} />
              <Route path="/pay3">
                <RegisterStep4 />
              </Route>

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
              <Route path="/campaign/:id" exact>
                <CampaignDatails />
              </Route>
              <Route path="/sns" exact></Route>
              <Route path="/sns/snsRegistration" exact>
                <SnsRegistration />
              </Route>

              <Route path="/progress" exact></Route>
              <Route path="/mypage">
                <Mypage />
              </Route>
              <Route path="/loading1">
                <LoadingLeaf />
              </Route>
              <Route path="/loading2">
                <OfficialLoading />
              </Route>
              <Route path="/Random">
                <RegisterComplete />
                <Confetti />
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
