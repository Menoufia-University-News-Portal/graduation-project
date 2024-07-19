import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import AOS from 'aos';
import Heading from "../../../common/heading/Heading";
import "../Ppost/ppost.css";

const LastSection = () => {
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
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <section className='popularPost LastSection'>
        <Heading title='رئيس الجامعة' />
        <div className='content'>
          <Slider {...settings}>
            {news.map((val) => (
              <div className='items' data-aos="zoom-in-up" data-aos-duration="1500" key={val.event_id}>
                <div className='box shadow'>
                  <div className='images'>
                    <div className='img'>
                      <img src ={`http://localhost:3001/${val.link}`} alt={val.title} />
                    </div>
                  </div>
                  <div className='text1'>
                    <h1 dir='rtl' className='title1'>{val.title.slice(0, 40)}...</h1>
                    <p dir='rtl' className="news-description">
                      {truncateText(val.description, 100)}
                      {val.description.length > 150 && <Link to={`/news/${val.news_id}`} className="read-more">اقرا المزيد</Link>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <br/>
        <br/>
      </section>
    </>
  );
}

export default LastSection;
