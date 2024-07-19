import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Popular.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Heading from "../../../common/heading/Heading"

const Popular = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/comers-news/latest/newcomers');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);
 useEffect(() => {
    AOS.init();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...   ';
  };
  const settings = {
    dots: true,
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 3,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 6,
        },
      },
    ],
  }
  return (
    <>
      < section className='popular'>
      <Heading title="اخبار الوافدين"/>
        <div className='content'>
          <Slider {...settings}>
            {news.map((val) => {
              return (
                <div className='items' data-aos="zoom-in-up" data-aos-duration="1500">
                  <div className='box shadow'>
                    <div className='images row'>
                      <div key={val.event_id} className='img'>
                        <img  src ={`http://localhost:3001/${val.link}`} alt={val.title}  />
                      </div>
                      {/*  <div class='category category1'>
                        <span>{val.catgeory}</span>
                      </div>*/}
                     
                    </div>
                    <div className='text5 row'>
                      <h4 dir='rtl' className='title1'>{val.title.slice(0, 40)}...</h4>
                      
                      <p  dir='rtl' className="text5">
                {truncateText(val.description, 100)} 
                {val.description.length > 150 && <Link to={`/Comers/${val.comers_news_id}`} className="read-more">اقرا المزيد</Link>}
              </p>
                      
                     
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default Popular
