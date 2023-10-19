/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-17 23:02:56
 * @modify date 2023-10-17 23:41:55
 * @desc [description]
 */

import React, { useState, useEffect } from 'react';
import { throttle } from "lodash";



const scrollToTop = () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
};

const TopButton = () => {
    const [scrollFlag, setScrollFlag] = useState(false);

    const updateScroll = () => {
        const { scrollY } = window;
        scrollY > 10 ? setScrollFlag(true) : setScrollFlag(false);
    };
    const handleScroll = throttle(updateScroll, 100);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const moveToTop = () => {
        document.documentElement.scrollTop = 0;
    };

    return scrollFlag ? (
        <div onClick={moveToTop}>
            {/* 버튼 내용 */}
        </div>
    ) : null;
};

export { TopButton, scrollToTop };
