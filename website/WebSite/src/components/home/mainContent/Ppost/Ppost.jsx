import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import Heading from "../../../common/heading/Heading";
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./ppost.css";

const Ppost = () => {
  useEffect(() => {
    AOS.init();
  }, []);

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
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
    <div style={{ padding: 0, margin: 0 }}>
      <section className='popularPost'>
        <Heading title='أحدث الاخبار' />
        <div className='content'>
          <Slider {...settings}>
            {news.map((item) => (
              <div className='items' data-aos="zoom-in-up" data-aos-duration="1500" key={item.news_id}>
                <div className='box shadow'>
                  <div className='images'>
                    <div className='img'>
                      <img src ={`http://localhost:3001/${item.link}`} alt={item.title} />
                    </div>
                  </div>
                  <div className='text1'>
                    <h1 dir="rtl" className='title1'>{item.title.slice(0, 60)} ...</h1>
                    <p dir="rtl" className="news-description">
                      {truncateText(item.description, 100)} 
                      {item.description.length > 150 && <Link to={`/news/${item.news_id}`} className="read-more">اقرا المزيد</Link>}
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

export default Ppost;

//css file 
