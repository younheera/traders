/**
 * @author heera youn
 * @create date 2023-10-25 14:38:18
 * @modify date 2023-10-27 14:52:45
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:29:09
 * @modify date 2023-10-27 11:24:25
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
                  
                </ResizedComponent>
                </div>
            </body>
        </div>

    )
    }
export default MainView;
