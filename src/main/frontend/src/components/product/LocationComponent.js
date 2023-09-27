/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-09-26 13:22:21
 * @modify date 2023-09-27 16:27:52
 * @desc [현재 위치의 경도,위도를 띄운다.]
 */

import axios from "axios";
import React, { useEffect, useState } from "react";

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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
      await axios.post("/api/sendCoordinates", {
        latitude: latitude,
        longitude: longitude,
      });
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
    </div>
  );
};

export default LocationComponent;
