/**
 * @author heera youn
 * @create date 2023-10-25 14:38:18
 * @modify date 2023-10-25 14:38:26
 */
import React from 'react';
import MainCarousel from './MainCarousel';
import { BsArrowUpCircle } from 'react-icons/bs';
import { TopButton, scrollToTop } from './PublicComponents';
import '../../styles/global.css';
import ResizedComponent from './ResizedComponent';
import MainNews from './MainNews';
import MainImg from './MainImg';

const MainView = () => {
    return (
        <div className='basefont'>
            <body>
                <div>
                <ResizedComponent>
                    <MainCarousel/>
                    <MainImg/>
                    <MainNews/>
                    <BsArrowUpCircle onClick={scrollToTop} type='button' className='public-bottombutton' size='50px'/>
                    <TopButton />
                </ResizedComponent>
                </div>
            </body>
        </div>

    )
    }
export default MainView;
