import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Heading from "../../../common/heading/Heading";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./secondSection.css";

const SecondSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/event/viewAll');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          slidesPerRow: 1
        }
      }
    ]
  };

  return (
    <div data-aos="fade-left">
      <section className='SecondSection'>
        <Heading title='الزيارات والمؤتمرات' />
        <div className='content'>
          <Slider {...settings}>
            {news.map((val) => (
              <div className='items' data-aos="zoom-in-up" data-aos-duration="1500" key={val.event_id}>
                <div className='box shadow flexSB'>
                  <div className='images'>
                    <div className='img'>
                      <img src ={`http://localhost:3001/${val.link}`} alt={val.title} />
                    </div>
                  </div>
                  <div className='text2'>
                    <h1 dir='rtl' className='title1'>{val.title.slice(0, 50)}...</h1>
                    <p dir='rtl' className='desc'>
                      {truncateText(val.description.slice(0, 250), 200)}
                      {val.description.length > 150 && <Link to={`/event/${val.event_id}`} className="read-more">اقرا المزيد</Link>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default SecondSection;
