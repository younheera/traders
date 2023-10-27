/**
 * @author heera youn
 * @create date 2023-10-22 17:24:50
 * @modify date 2023-10-27 15:08:44
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-27 14:34:54
 */

import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/MainTop.css";
import logo from "../../assets/img/logo.gif";

const MainTop = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState();

  const changeInput = (evt) => {
    const { value } = evt.target;
    setKeyword(value);
  };
  return (
    <div className="main">
      <div className="container">
        <img src={logo} className="logo-img"></img>
        <div className="text">
          <p className="text1"> Find exciting goods</p>
          <p className="text2">
            Swap things for quality products that suit you{" "}
          </p>
        </div>
        <nav className="container-fluid">
          <form className="d-flex">
            <input
              className="searchBar form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={changeInput}
            />
            <button
              className="search-btn btn btn-outline-success"
              onClick={() => history.push(`./search/${keyword}`)}
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    </div>
  );
};

export default MainTop;
