import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../NEWS/News.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLocationDot } from "react-icons/fa6";

const HeadNews = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sector-head-news/viewAll');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Initialize AOS
    AOS.init();

    // Specify cleanup to prevent memory leaks
    return () => {
      AOS.refresh();
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...   ';
  };

  

  return (
    <div className="containerH" style={{paddingTop:20}}>
      <div className="news-grid">
        {events.map((item) => (
          <div key={item.event_id} className="news-item" style={{marginTop:"70px",marginBottom:"-40px"}} data-aos="zoom-in-up" data-aos-duration="1500">
            <img  src ={`http://localhost:3001/${item.link}`} alt={item.title} className="image2new" />
            {item.faculties && (
              <p className="faculty-small">كلية  {item.faculties[0]?item.faculties[0].name:" "} <span><FaLocationDot /></span></p>
            )}
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-description">
                {truncateText(item.description, 100)} 
                {item.description.length > 150 && <Link to={`/sector-head-news/${item.sector_head_news_id}`} className="read-more">اقرا المزيد</Link>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadNews;
