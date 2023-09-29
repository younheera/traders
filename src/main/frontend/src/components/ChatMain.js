import React from 'react';
import Chat1 from './chat/Chat1';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ChatMain = () => {
    return (
        <div>
             
             <Link to={"/chat/roomNum/10"}>roomnum 10</Link>

        </div>
    );
};

export default ChatMain;