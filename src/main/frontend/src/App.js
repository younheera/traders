import React from "react";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Main from "./components/Main";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import NearestProductList from "./components/product/NearestProductList";
import ProductDetails from "./components/product/ProductDetails";
import ProductList from "./components/product/ProductList";
import ProductRegistration from "./components/product/ProductRegistration";
// import ProductUpdate from "./components/product/ProductUpdate";
// import SignUp, {Input, Signup, useValid} from "./components/login/Signup";
import LoginPageTest from "./components/service/LoginPageTest";
import SignUp from "./components/login/SignUp";
import {signout} from "./components/service/DemoAPIService"; 
import { Button } from "@material-ui/core";

import NewsList from "./components/sns/NewsList";
import Youtube from "./components/sns/Youtube";
import ModalPage from "./components/product/ModalPage";
import CampaignList from "./components/sns/CampaignList";
import CampaignDatails from "./components/sns/CampaignDatails";

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
          <Link to="/KakaoMap">KakaoMap</Link>
        </li> 


        {/* <li>
          <Link to="/join">회원가입</Link>
        </li> */}
        <hr/>

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
        <Button onClick={signout}>로그아웃</Button>
        <hr/>
        
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/campaign">Campaign</Link>
        </li>
        <li>
          <Link to="/sns">sns</Link>
        </li>
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
          <ProductDetails/>
        </Route>
        <Route path="/products/update/:id" exact>
          {/* <ProductUpdate /> */}
        </Route>

        <Route path="/login" exact>
          <LoginPageTest />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>

        <Route path="/KakaoMap" exact>
          <ModalPage/>
        </Route>
        <Route path="/payment" exact>
          <GreenPay />
        </Route>
        <Route path="/payment/gpay_register" component={PayRegister} />

        <Route path="/news" exact>
          <NewsList/>
          <Youtube/>
        </Route>

        <Route path="/campaign" exact>
          <CampaignList/>
        </Route>
        <Route path="/campaign/:id" exact>
          <CampaignDatails />
        </Route>
        
        <Route path="/sns" exact>
          
        </Route>
      </Switch>
    </div>
  );
}

export default App;
