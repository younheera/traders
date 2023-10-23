/**
 * @author wheesunglee
 * @create date 2023-09-20 10:19:28
 * @modify date 2023-10-20 19:34:20
 */

import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import jwt_decode from "jwt-decode";
import {IoIosHeart} from 'react-icons/io'

const ProductList = ({ product }) => {
  const [images, setImages] = useState();
  const history = useHistory();
  const { kakao } = window;
  const [address, setAddress] = useState();

  const getAddress = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    // const coord = new kakao.maps.LatLng(37.5566803113882, 126.904501286522);
    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  useEffect(() => {
    setImages(product.images);
    //getAddress(product.latitude, product.longitude);
  });

  console.log(address);

  return (
    <>
      <Card className="product-card-list">
        <CardBody className="card-body">
          {images && (
            <>
            <img
              alt=""
              src={images[0].filepath}
              className="product-list-img"
              onClick={() => history.push(`/products/${product.id}`)}
            />
            <span className="badge position-absolute top-0 end-0">예약중</span>
            </>
          )}

          <Row style={{marginTop:'8px', fontWeight:'700'}}>
            <Col className="product-name">#{product.category}</Col>
          </Row>

          <Row className="justify-content">
              <Col sm={7} className="product-name">
                {product.name} 
                </Col>
                <Col sm={4} className="product-name-like">
                <font className="likes">{product.likes}</font>
                <IoIosHeart className="product-name-icons"></IoIosHeart>
                </Col>
           </Row>
          
         
           
           <Row className="justify-content" style={{marginTop:'12px'}}>
           <Col sm={5} className="product-price">
                {product.price}<span style={{marginLeft:'3px',marginTop:'7px',fontSize:'9pt'}}>원</span> 
            </Col>
             {/* 주소 찍히는 곳 */}
            <Col sm={5} className="product-addr">
              {/* {product.longitude} */}
              역삼동
            </Col>
          </Row>
            
          </CardBody>
      </Card>
    </>
  );
};
export default ProductList;
