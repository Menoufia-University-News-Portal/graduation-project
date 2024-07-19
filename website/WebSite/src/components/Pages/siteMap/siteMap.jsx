import React from 'react';
import './siteMap.css'; 
import locImage from './loc.png';

const SiteMap = () => {
    return (
        <div className="container">
            <img src={locImage} alt="University Map" className="map-image" />
            <div className="buttons-container">
                <a href="https://www.google.com/maps/place/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9+%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5650743,31.0132521,17.95z/data=!4m6!3m5!1s0x14f7d6eb70a91047:0xc353387ed2f37809!8m2!3d30.5655764!4d31.0130822!16zL20vMGIxeGc2?entry=ttu"
                   target="_blank" rel="noopener noreferrer" className="button">
                    الادارة العامة لجامعة المنوفية
                </a>
                <a href="https://www.google.com/maps/d/u/0/viewer?mid=1LKhWoCUvNG2xO1N0frvhDc_O76s&hl=en_US&ll=30.466044519424674%2C31.02056700000001&z=10"
                   target="_blank" rel="noopener noreferrer" className="button">
                    محافظة المنوفية
                </a>
                <a href="/siteMap/destination" className="button">
                    حدد وجهتك
                </a>
            </div>
        </div>
    );
};

export default SiteMap;
