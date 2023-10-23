import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import TokenRefresher from "../member/TokenRefresher";
const Elasticsearch = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const { location } = props;
    const keyword = location.state;
    TokenRefresher.get("http://localhost:8080/api/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, []);

  console.log(data);
  return <div></div>;
};

export default withRouter(Elasticsearch);
