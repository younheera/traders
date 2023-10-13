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
import ProductUpdate from "./components/product/ProductUpdate";
import LoginPageTest from "./components/service/LoginPageTest";

function App() {
  return (
    <div>
      <Link to="/products/register">ProductRegistration</Link>
      <br />
      <Link to="/products/nearestProducts">NearestProductList</Link>
      <br />

      <Link to="/login">로그인테스트</Link>
      <br />

      <Link to="/signup">회원가입테스트</Link>
      <br />

      <Link to="/payment">GreenPay</Link>
      <br />

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
        <Route path="/products/update/:id" exact>
          <ProductUpdate />
        </Route>

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
      </Switch>
    </div>
  );
}

export default App;
