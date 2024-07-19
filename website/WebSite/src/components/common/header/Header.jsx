import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="main">
        <div className='container2 paddingSmall'>
          <nav className="main">
            <button className='barIcon' onClick={() => setNavbar(!navbar)}>
              {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
            <ul dir="rtl" className={navbar ? "navbar" : ""} >
              <li>
                <Link to='/' className={location.pathname === '/' ? 'header active' : ''}>الرئيسيه</Link>
              </li>
              <li>
                <Dropdown className="drobdown-li">
                  <Dropdown.Toggle className="dropdown-top" variant="black">
                    عن الجامعة
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menuitem">
                    <Link to='/vision'><Dropdown.Item href="#/action-1">رؤية الجامعة</Dropdown.Item></Link>
                    <Link to='/message'><Dropdown.Item href="#/action-2">رسالة الجامعة</Dropdown.Item></Link>
                    <Link to='/goal'><Dropdown.Item href="#/action-3">أهداف الجامعة</Dropdown.Item></Link>
                    <Link to='/uni'><Dropdown.Item href="#/action-3">نبذة تاريخية</Dropdown.Item></Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <Link to='/news' className={location.pathname === '/news' ? 'header active' : ''}>اخبار الجامعه</Link>
              </li>
              <li>
                <Link to='/events' className={location.pathname === '/events' ? 'header active' : ''}>الزيارات والمؤتمرات</Link>
              </li>
              <li>
                <Dropdown className="drobdown-li">
                  <Dropdown.Toggle className="dropdown-top" variant="black">
الأرشيف                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menuitem">
                    <Link to='/archive'><Dropdown.Item href="#/action-1">أرشيف الأخبار</Dropdown.Item></Link>
                    <Link to='/eventarchive'><Dropdown.Item href="#/action-2">أرشيف المؤتمرات</Dropdown.Item></Link>
                    <Link to='/comersarchive'><Dropdown.Item href="#/action-3">أرشيف اخبار الوافدين</Dropdown.Item></Link>
                    <Link to='/headarchive'><Dropdown.Item href="#/action-3">أرشيف رئيس الجامعة</Dropdown.Item></Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <Link to='/siteMap' className={location.pathname === '/siteMap' ? 'header active' : ''}>خريطة الجامعة</Link>
              </li>
              <li>
                <Link to='/sector-head-news' className={location.pathname === '/sector-head-news' ? 'header active' : ''}> رئيس الجامعة</Link>
              </li>
              <li>
                <Link to='/Comers' className={location.pathname === '/Comers' ? 'header active' : ''}>اخبار الوافدين</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
