import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Main from "./components/Main";
import Login from "./components/login/Login";
import Login_sdk from "./components/login/Login_sdk";
import Redirection from "./components/login/Redirection";
import ProductDetails from "./components/product/ProductDetails";
import ProductList from "./components/product/ProductList";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";

import Chat1 from "./components/chat/Chat1";
import ChatList from "./components/chat/ChatList";
import ChatDetails from "./components/chat/ChatDetails";

function App() {
  return (
    <div>
      <ul>
         <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">ProductList</Link>
        </li>

        <li>
          <Link to="/login">login</Link>
        </li>

        <li>
          <Link to="/login_sdk">login_sdk</Link>
        </li>
        <li>
          <Link to='/chat'>chat</Link>
        </li>
        <li>
          <Link to='/chat/list'>chatList</Link>
        </li> 

        <li>
          <Link to="/payment">GreenPay</Link>
        </li>
        <li>
          <Link to="/payment">GreenPay</Link>
        </li>
      </ul>
      <Switch>
        <Route path={["/", "/main"]} exact>
          <Main />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path='/chat' exact>
          <Chat1/>
        </Route>
        <Route path='/chat/list' exact>
          <ChatList/>
        </Route>

        <Route path='/chat/roomNum' exact>
          <ChatDetails/>
        </Route>
        
        <Route path="/products/:id" exact>
          <ProductDetails />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/redirect" exact>
          <Redirection />
        </Route>
        <Route path="/login_sdk" exact>
          <Login_sdk />
        </Route>
        <Route path={["/", "/main"]} exact><Main /></Route>
        <Route path="/product" exact><ProductList /></Route>
        <Route path="/payment" exact><GreenPay/></Route>
        <Route path="/payment/gpay_register" component={PayRegister} />
      </Switch>
    </div>
  );
}

export default App;
