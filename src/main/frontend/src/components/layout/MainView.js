/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-17 16:31:15
 */
import React from 'react';
import MainCarousel from './MainCarousel';
import MainTop from './MainTop';
import MainFooter from './MainFooter';


const MainView = () => {
    return (
        <div>
            <body>
                <div>
                    <MainTop/>
                    <MainCarousel/>
                    <MainFooter/>
                </div>
            </body>
        </div>
    );
};

export default MainView;