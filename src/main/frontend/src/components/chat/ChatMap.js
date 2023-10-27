/**
 * @author hyunseul
 * @email [example@mail.com]
 * @create date 2023-10-26 16:48:54
 * @modify date 2023-10-26 17:14:15
 * @desc [카카오 맵 api]
 */

import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/ChatMapModal.css";

const ChatMap = ({ onAddressChange }) => {
  const { kakao } = window;
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);

  const KAKAOMAP_API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY;
  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          level: 3,
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
        const newMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          draggable: true,
        });
        markerRef.current = newMarker;

        newMarker.setMap(newMap);
        kakao.maps.event.addListener(newMarker, "dragend", () => {
          const newPosition = markerRef.current.getPosition();
          setUserLocation({
            lat: newPosition.getLat(),
            lng: newPosition.getLng(),
          });
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            newPosition.getLng(),
            newPosition.getLat(),
            (result, status) => {
              console.log(result); // 확인을 위해 응답을 로그로 출력합니다.
              if (status === kakao.maps.services.Status.OK) {
                const newAddress = result[0].road_address
                  ? result[0].road_address.address_name
                  : "주소를 찾을 수 없습니다.";
                onAddressChange(newAddress);
              } else {
                console.error("Failed to get address:", status);
                onAddressChange("주소를 찾을 수 없습니다.");
              }
            }
          );
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [userLocation, onAddressChange]);

  return <div id="map" className="map" ref={mapContainer}></div>;
};

export default ChatMap;
