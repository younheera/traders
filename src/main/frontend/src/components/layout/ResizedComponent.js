/**
 * @author hyunseul

 * @create date 2023-10-17 22:26:02
 * @modify date 2023-10-18 09:34:45
 * @desc [description]
 */

import React, { useState, useEffect } from 'react';


const ResizedComponent = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {/* ... */}
      {children}
    </div>
  );
};

export default ResizedComponent;
