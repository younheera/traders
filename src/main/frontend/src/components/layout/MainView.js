import React from 'react';
import MainCarousel from './MainCarousel';
import MainTop from './MainTop';
import MainFooter from './MainFooter';
import { BsArrowUpCircle } from 'react-icons/bs';
import { TopButton, scrollToTop } from './PublicComponents';
import '../../styles/global.css';
import ResizedComponent from './ResizedComponent';
const MainView = () => {
    return (
        <div>
            <body>
                <div>
                <ResizedComponent>
                    <MainTop/>
                    <MainCarousel/>
                    {/* <MainFooter/> */}
                    <TopButton />
                  
                        <BsArrowUpCircle onClick={scrollToTop} type='button' className='public-bottombutton' size='50px'/>
                </ResizedComponent>
                </div>
            </body>
        </div>
    );
};

export default MainView;
