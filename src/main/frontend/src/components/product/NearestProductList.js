/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-09-26 13:22:21
 * @modify date 2023-10-05 16:36:38
 * @desc [현재 위치의 경도,위도를 띄운다.]
 */

import axios from "axios";
import React, { useEffect, useState } from "react";

const NearestProductList = () => {
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [products, setProducts] = useState([]); //추가

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const sendCoordinatesToServer = async () => {
    try {
      const response = await axios.get("/api/products/nearestProducts", {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      setProducts(response.data); //추가
      console.log("데이터가 서버로 전송되었습니다.");
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <div>
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
      </div>
      <button onClick={sendCoordinatesToServer}>서버로 전송</button>

      <div>
        <h2>3km 반경의 상품 목록</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NearestProductList;
