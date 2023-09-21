import React from "react";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Main from "./components/Main";
import ProductList from "./components/product/ProductList";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">ProductList</Link>
        </li>
      </ul>
      <Switch>
        <Route path={["/", "/main"]} exact>
          <Main />
        </Route>
        <Route path="/product" exact>
          <ProductList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
