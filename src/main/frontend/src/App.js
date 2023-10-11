import React from "react";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/login/SignUp";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import NearestProductList from "./components/product/NearestProductList";
import ProductDetails from "./components/product/ProductDetails";
import ProductList from "./components/product/ProductList";
import ProductRegistration from "./components/product/ProductRegistration";
// import ProductUpdate from "./components/product/ProductUpdate";
import LoginPageTest from "./components/service/LoginPageTest";
import ChatApp from "./components/chat/ChatApp";
import ChatBox from "./components/chat/ChatBox";
import ChatList from "./components/chat/ChatList";
import { Button } from "@material-ui/core";
// import {signout} from "./components/service/DemoAPIService"; 


function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products/register">ProductRegistration</Link>
        </li>
        <li>
          <Link to="/products/nearestProducts">NearestProductList</Link>
        </li>
        <li>
          <Link to="/products">ProductList</Link>
        </li>

        <li>
          <Link to="/login">로그인테스트</Link>
        </li>
        <li>
          <Link to="/signup">회원가입테스트</Link>
        </li>
        <hr />

        <li>
          <Link to="/payment">GreenPay</Link>
        </li>
       
        <li>
          <Link to="/chat">chat</Link>
        </li>
   
        {/* <Button onClick={signout}>로그아웃</Button> */}
      </ul>

      <Switch>
        <Route path={["/", "/main"]} exact>
          <Main />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/nearestProducts" exact>
          <NearestProductList />
        </Route>
        <Route path="/products/register" exact>
          <ProductRegistration />
        </Route>

        <Route path="/products/:id" exact>
          <ProductDetails />
        </Route>
        {/* <Route path="/products/update/:id" exact>
          <ProductUpdate />
        </Route> */}

        <Route path="/login" exact>
          <LoginPageTest />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>

        <Route path="/payment" exact>
          <GreenPay />
        </Route>
        <Route path="/payment/gpay_register" component={PayRegister} />

        <Route path="/chat" exact>
          <ChatApp/>
        </Route>

        <Route path="/chat/roomNum/:roomNum" component={ChatBox} exact></Route>
        <Route path="/chat/list" component={ChatList} exact></Route>

      </Switch>
    </div>
  );
}

export default App;
