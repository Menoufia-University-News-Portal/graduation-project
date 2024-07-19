import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news/viewAll');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();

    AOS.init();

    return () => {
      AOS.refresh();
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <>
    <div style={{height:"100px"}}>

    </div>
    <div className="containerZ">
      <div className="news-grid">
        {news.map((item) => (
          <div key={item.news_id} className="news-item" data-aos="zoom-in-up" data-aos-duration="1500">
            <img src={`http://localhost:3001/${item.link}`} alt={item.title} className="news-image" />
            {item.faculties && (
              <p className="faculty-small">كلية  {item.faculties[0]?item.faculties[0].name:" "} <span><FaLocationDot /></span></p>
            )}
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-description">
                {truncateText(item.description, 100)}
                {item.description.length > 100 && (
                  <Link to={`/news/${item.news_id}`} className="read-more">اقرا المزيد</Link>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default News;
