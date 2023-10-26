import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import ProductDetails from "./components/product/ProductDetails";
import ProductRegistration from "./components/product/ProductRegistration";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OfficialLoading } from "./assets/OfficialLoading";
import Attendance from "./components/Attendance";
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
import TransferGpay from "./components/payment/TransferGpay";
import ProductListHeader from "./components/product/ProductListHeader";
import ProductUpdate from "./components/product/ProductUpdate";
import CampaignList from "./components/sns/CampaignList";
import NewsList from "./components/sns/NewsList";
import Youtube from "./components/sns/Youtube";
import LoadingLeaf from "./components/util/LoadingLeaf";
import PrivateRoute from "./components/util/PrivateRoute";
import "./styles/global.css";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
});

function App() {
  const user = localStorage.getItem("REFRESH_TOKEN")
    ? jwt_decode(localStorage.getItem("REFRESH_TOKEN")).sub
    : null;
  window.user = user;
  console.log("Main User", user);
  return (
    <>
      <ResizedComponent>
        <NavBar user={user} />
        <Notification />
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

              <Route component={Login} path="/login" exact />

              <Route component={SignUp} path="/signup" exact />

              <Route component={Elasticsearch} path="/search/:keyword" exact />

              <Route component={ProductListHeader} path="/products" exact />

              <Route component={(Youtube, NewsList)} path="/news" exact />

              <Route component={CampaignList} path="/campaign" exact />

              {/* 회원 관련 */}

              <PrivateRoute component={Attendance} path="/attendance" exact />

              <PrivateRoute component={Notification} path="/notification" />

              <PrivateRoute component={Mypage} path="/mypage" />

              {/* 물품 관련 */}

              <PrivateRoute
                component={ProductRegistration}
                path="/products/register"
                exact
              />
              <PrivateRoute
                component={ProductUpdate}
                path="/products/update/:id"
                exact
              />

              <PrivateRoute
                component={ProductDetails}
                path="/products/:id"
                exact
              />

              {/* 채팅 관련 */}

              <PrivateRoute
                component={ChatBox}
                path="/chat/roomNum/:roomNum"
                exact
              />

              <PrivateRoute component={ChatList} path="/chat/list" exact />

              {/* 결제 관련 */}

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
              <Route path="/payment/transfer/:id">
                <TransferGpay />
              </Route>


              


              <Route path="/progress" exact></Route>

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
