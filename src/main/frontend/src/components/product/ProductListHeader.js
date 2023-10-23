import axios from "axios";
import { React, useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/Product.css";
import ProductList from "./ProductList";
import { ButtonGroup } from "react-bootstrap";
import TokenRefresher from "../service/TokenRefresher";

const ProductListHeader = () => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewNearby, setViewNearby] = useState(false);
  const history = useHistory();

  const getAllProducts = () => {
    TokenRefresher
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setData(res.data);
      })

      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
          console.log("getLocation");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const sendCoordinatesToServer = async () => {
    try {
      const response = await TokenRefresher.get(
        "http://localhost:8080/api/products/nearestProducts",
        {
          params: {
            latitude: latitude,
            longitude: longitude,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    }
  };

  const getNearby = () => {
    setViewNearby(!viewNearby);
    if (viewNearby) {
      getAllProducts();
    } else {
      if (latitude !== null && longitude !== null) {
        sendCoordinatesToServer();
      }
    }
  };

  useEffect(() => {
    getLocation();
    getAllProducts();
  }, []);

  return (
    <>
      <Container style={{ maxWidth: "1040px"}}>
        <Row>
          <Col md="12" className="text-center mb-4" >
            <div style={{width:'100%'}}>
              <button className="category-btn ">여성의류</button>
              <button className="category-btn ">남성의류</button>
              <button className="category-btn ">신발</button>
              <button className="category-btn">가방/지갑</button>
              <button className="category-btn ">반려동물용품</button>
              <button className="category-btn ">디지털</button>
              <button className="category-btn">가전제품</button>
              <button className="category-btn">스포츠/레저</button>
              <button className="category-btn">도서/티켓/문구</button>
              <button className="category-btn ">가구/인테리어</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-left-align bold-colored-font " >
            {showAvailable ? "전체 보기" : "거래 가능한 물품"}
            <input
              className="list-checkbox"
              type="checkbox"
              checked={showAvailable}
              onChange={() => setShowAvailable(!showAvailable)}
            />
          </Col>
          <Col className="col-right-align">
            <button
              className="btn-2"
              // onClick={() => setViewNearby(!viewNearby)}
              onClick={getNearby}
            >
              {viewNearby ? "전지역 물품" : "현위치 물품"}
            </button>
          </Col>
          {/* <Col className="col-right-align" md="4">
            <button
              className="btn-1 bold"
              onClick={() => {
                history.push("products/register");
              }}
            >
              등록하기
            </button>
          </Col> */}
        </Row>

        </Container>

          <Container style={{ maxWidth: "1040px", marginTop:"15px"}}>
        <Row className="justify-content-center" style={{margin:'0px'}} >
          <Col md="12" style={{margin:'0px'}}>
             <Row >
              {data.map((product, index) => {
                if (showAvailable && product.status === "SOLD") {
                  return null;
                }
                return (
                  <Col md={3} key={index} style={{ marginBottom: "15px" }}>
                    <ProductList product={product} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        
      </Container>
    </>
  );
};

export default ProductListHeader;
