/**
 * @author heera youn
 * @email [example@mail.com]
 * @create date 2023-10-21 19:40:46
 * @modify date 2023-10-21 19:49:05
 * @desc 모달창 외부 다른 요소 클릭할 때 모달 닫는 동작수행
 */

import React, { useEffect } from 'react';

const useOutSideClick = (ref,callback) => {
    useEffect(()=> {
        const handleClick =(event)=> {
            if(ref.current && !ref.current.contains(event.target)) {
                callback?.();
            }
        };
        window.addEventListener('mousedown',handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
    }, [ref,callback]);
};

export default useOutSideClick;