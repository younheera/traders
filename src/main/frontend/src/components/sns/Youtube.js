/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-06 17:43:20
 * @modify date 2023-10-12 11:38:26
 * @desc [유투브 api를 이용하여 해쉬태그 '기후위기'로 영상을 받아올것임 - 아직 미구현]
 */
import React from 'react';


const Youtube = () => {

    return (
        <div className='Modal'>
                <div>
                    <iframe src={`https://www.youtube.com/embed/nbYWT1QK6oo`} frameborder="0"/>
                    <iframe src={`https://www.youtube.com/embed/XYEjbD3rf78`} frameborder="0"/>
                </div>
        </div>
    );
};

export default Youtube;