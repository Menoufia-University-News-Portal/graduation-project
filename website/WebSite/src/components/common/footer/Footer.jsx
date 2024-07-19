import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container0">
          <div className="logo" style={{marginTop:"80px"}}>
            <img src="../images/0000.jpg" alt="" />
            <br />
            <br />
            <Link>
              <span>
                <h4 className="university-link">موقع الجامعة</h4>
              </span>
            </Link>
            <br />
          </div>

          <div className="map-container">
            <a href="https://www.google.com/maps/place/Menoufiya+University/@30.5650743,31.0132521,18z/data=!4m6!3m5!1s0x14f7d6eb70a91047:0xc353387ed2f37809!8m2!3d30.5655764!4d31.0130822!16zL20vMGIxeGc2?entry=ttu" target="_blank" rel="noopener noreferrer">
              <img src="../images/siteMap.jpg" alt="map img" className="map-image" />
            </a>
          </div>

          <div className="box">
            <ul dir="rtl">
              <br />
              <li>
                <Link to="/news"><span>أخبار الجامعة</span></Link>
              </li>
              <li>
                <Link to="/events"><span>الزيارات والمؤتمرات</span></Link>
              </li>
              <li>
                <Link to="/Comers"><span>أخبار الوافدين</span></Link>
              </li>
              <li>
                <Link to="/sector-head-news"><span>رئيس الجامعة</span></Link>
              </li>
              <li>
                <Link to="/archive"><span>أرشيف الأخبار</span></Link>
              </li>
              <li>
                <Link to="/eventarchive"><span>أرشيف الزيارات والمؤتمرات</span></Link>
              </li>
              
            </ul>

            <ul dir="rtl" className="second-column">
              <br />
              <li>
                <Link to="/vision"><span>رؤية الجامعة</span></Link>
              </li>
              <li>
                <Link to="/message"><span>رسالة الجامعة</span></Link>
              </li>
              <li>
                <Link to="/goal"><span>أهداف الجامعة</span></Link>
              </li>
              <li>
                <Link to="/uni"><span>تاريخ الجامعة</span></Link>
              </li>
              <li>
                <Link to="/SiteMap"><span>خريطة الجامعة</span></Link>
              </li>
              <li>
                <Link to="/comersarchive"><span>أرشيف أخبار الوافدين</span></Link>
              </li>
              <li>
                <Link to="/headarchive"><span>أرشيف رئيس الجامعة</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <div className="container0">
        <a style={{textDecoration:"underline"}} href="/Info"><p  style={{marginLeft:"20px" ,marginTop:"1px"}}>
            
            تم التصميم والتطوير بواسطة طلاب كلية الحاسبات والمعلومات جامعة المنوفية 2024
          </p></a>
        </div>
      </div>
    </>
  );
}

export default Footer;
