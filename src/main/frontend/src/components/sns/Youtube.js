/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-20 11:17:37
 * @modify date 2023-10-23 12:07:22
 * @desc [description]
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