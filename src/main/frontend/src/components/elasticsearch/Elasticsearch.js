import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/Product.css";
import ProductList from "../product/ProductList";
import TokenRefresher from "../util/TokenRefresher";

const Elasticsearch = () => {
  const [data, setData] = useState();
  const { keyword } = useParams();
  useEffect(() => {
    TokenRefresher.get(`http://localhost:8080/api/search/${keyword}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, [keyword]);
  console.log(data);

  return (
    <>
      <Container
        style={{ maxWidth: "1040px", marginTop: "180px", height: "1500px" }}
      >
        <Row className="justify-content-center" style={{ margin: "0px" }}>
          <Col md="12" style={{ margin: "0px" }}>
            <Row>
              {data &&
                data.map((product, index) => {
                  <Col md={3} key={index} style={{ marginBottom: "15px" }}>
                    <ProductList product={product} />
                  </Col>;
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Elasticsearch;
