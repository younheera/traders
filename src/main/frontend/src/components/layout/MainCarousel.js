/**
 * @author heera youn
 * @create date 2023-10-22 23:36:29
 * @modify date 2023-10-22 23:36:44
 * @desc [Carousel 이미지 배치 추가]
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-21 18:49:35
 */


import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import MainTop from './MainTop';
import webmain1 from "../../assets/img/webmain1.jpg";
import main2 from '../../assets/img/main2.jpg';
import main3 from '../../assets/img/main3.jpg';
import '../../assets/css/MainCarousel.css'

const MainCarousel = () => {

    const [index,setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item > 
            <MainTop/>
            <img g text="First slide" src={webmain1} className='carousel-inner'/>
           
        </Carousel.Item>
        <Carousel.Item >
            <img src={main2} className='carousel-inner-1'/>
            
        </Carousel.Item>
        <Carousel.Item >
            <img src={main3} className='carousel-inner-1'/>
            {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            </Carousel.Caption> */}
        </Carousel.Item>
        </Carousel>
    );
  }
  

export default MainCarousel;