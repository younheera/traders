import React from "react";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Main from "./components/Main";
import Login from "./components/login/Login";
import Redirection from "./components/login/Redirection";
import GreenPay from "./components/payment/GreenPay";
import PayRegister from "./components/payment/PayRegister";
import NearestProductList from "./components/product/NearestProductList";
import ProductDetails from "./components/product/ProductDetails";
import ProductList from "./components/product/ProductList";
import ProductRegistration from "./components/product/ProductRegistration";
import ProductUpdate from "./components/product/ProductUpdate";

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
          <Link to="/login">login</Link>
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
        <Route path="/products/nearestProducts" exact>
          <NearestProductList />
        </Route>
        <Route path="/products/register" exact>
          <ProductRegistration />
        </Route>
        <Route path="/products/update/:id" exact>
          <ProductUpdate />
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
        <Route path="/payment" exact>
          <GreenPay />
        </Route>
        <Route path="/payment/gpay_register" component={PayRegister} />
      </Switch>
    </div>
  );
}

export default App;
