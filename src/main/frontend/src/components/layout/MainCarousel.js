/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-20 09:15:49
 */


import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import webmain1 from "../../assets/img/webmain1.jpg";
import webmain2 from "../../assets/img/webmain2.jpg";
import webmain3 from "../../assets/img/webmain3.jpg";
import '../../assets/css/MainCarousel.css'

const MainCarousel = () => {

    const [index,setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item > 
            <img g text="First slide" src={webmain1} className='carousel-inner'/>
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
            <img text="Second slide" src={webmain2} className='carousel-inner'/>
            <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
            <img text="Third slide"src={webmain3} className='carousel-inner'/>
            <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
  }
  

export default MainCarousel;