/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:10
 * @modify date 2023-10-25 16:20:56
 */

import React, {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import '../../assets/css/ChatMapModal.css';

const ChatMap = ({onAddressChange}) => {
    const {kakao} = window;
    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0}); 
    const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});
    const [address, setAddress] = useState('');


    
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        setUserLocation({lat: latitude, lng: longitude});
                        setMarkerPosition({lat: latitude, lng: longitude});
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };
        getUserLocation(); 
    }, []); 


    const getAddressFromCoordinates = async (lat, lng) => {
        const geocoder = new kakao.maps.services.Geocoder();
        const coord = new kakao.maps.LatLng(lat, lng);

        return new Promise((resolve, reject) => {
            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                   
                    resolve(result[0].road_address);
                } else {
                    reject(status);
                }
            });
        });
    };


    const handleMarkerDragEnd = (e) => {
        const newPosition = e.getPosition();
        const newLocation = {
            lat: newPosition.getLat(),
            lng: newPosition.getLng(),
        };
        setMarkerPosition(newLocation);

        getAddressFromCoordinates(newLocation.lat, newLocation.lng)
            .then((result) => {
                onAddressChange(result.address_name);
            })
            .catch((error) => {
                console.error('Failed to get address:', error);
            });
    };

    return (
        <>
            <Map
                className='map'
                center={{lat: markerPosition.lat, lng: markerPosition.lng}}
                level={3}
            >
                <MapMarker position={{lat: markerPosition.lat, lng: markerPosition.lng}} draggable={true}
                           onDragEnd={handleMarkerDragEnd}/>


                {address && (
                    <div>
                        <p>{address}</p>
                    </div>
                )}
            </Map>
        </>
    );
};

export default ChatMap;