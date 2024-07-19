import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';
import Helmet from 'react-helmet';
import { FaLocationDot } from "react-icons/fa6";

import { FaMapMarkerAlt, FaFacebook, FaCalendarAlt, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';


const EventDetails = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRelatedNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/event/viewAll');
                const latestNews = response.data.slice(0, 5);
                setRelatedNews(latestNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchRelatedNews();
    }, []);



    const mapFacultyName = (facultyName) => {
        if (facultyName === 'Medicine') {
            return <div className='faculty-small'> كلية الطب <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Computers and Information') {
            return <div className='faculty-small'>كلية الحاسبات والمعلومات <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Science') {
            return <div className='faculty-small'>كلية العلوم <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Art') {
            return <div className='faculty-small'>كلية الاداب <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Commerce') {
            return <div className='faculty-small'>كلية التجارة <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Home economy') {
            return <div className='faculty-small'>كلية الاقتصاد المنزلى <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Mass communication') {
            return <div className='faculty-small'>كلية الاعلام <FaMapMarkerAlt className='location-icon' /></div>;
        }
        if (facultyName === 'Engineering') {
            return <div className='faculty-small'>كلية الهندسة <FaMapMarkerAlt className='location-icon' /></div>;
        }
        return facultyName;
    };

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/event/${id}`);
                setNewsItem(response.data);
            } catch (error) {
                console.error('Error fetching news item:', error);
            }
        };

        fetchNewsItem();
    }, [id]);

    const handleNavigate = (newsItem) => {
        navigate(`/event/${newsItem.event_id}`);
        window.location.reload();
    };


    if (!newsItem) {
        return null;
    }

    const handleFacebookShare = () => {
        const shareUrl = window.location.href;
        window.FB.ui({
            method: 'share',
            href: shareUrl,
        }, function (response) { });
    };
    const handleGoogleShare = () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: newsItem.title,
                text: newsItem.description,
                url: shareUrl,
            })
                .then(() => console.log('Successfully shared'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            console.error('Sharing not supported');
        }
    };



    return (
        <div>
            <Helmet>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0" nonce="YOUR_NONCE_VALUE"></script>
                <script async defer src="https://apis.google.com/js/platform.js"></script>
            </Helmet>
            <div style={{height:"300px"}}>

            </div>
            <div className="news-details-container0">
                <div className="news-details-grid">
                    <div className="news-details-content">
                        <h2>{newsItem.title}</h2>
                        <hr className="title-line" />
                        <div className="details-header0">
                        {newsItem.faculties && (
              <p className="faculty-name2">كلية  {newsItem.faculties[0]?newsItem.faculties[0].name:" "} <span><FaLocationDot /></span></p>
            )}
                            <h6 className='date'>
                                {new Date(newsItem.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                <FaCalendarAlt className="calendar-icon" />
                            </h6>
                        </div>

                        <p>{newsItem.description}</p>
                        <div className="share-buttons">
                            <button className="share-buttonfacebook" onClick={handleFacebookShare}>
                                <FaFacebook className="facebook-icon" /> فيسبوك
                            </button>
                            <button className="share-buttongoogle" onClick={handleGoogleShare}>
                                <FaGoogle className="google-icon" />  جوجل
                            </button>
                            <button className="share-buttonlinkedin">
                                <FaLinkedin className="linkedin-icon" />  لينكد إن
                            </button>
                            <button className="share-buttontwitter">
                                <FaTwitter className="twitter-icon" />  تويتر
                            </button>
                        </div>
                    </div>
                    <div className="news-details-image">
                        <img src ={`http://localhost:3001/${newsItem.link}`} alt={newsItem.title} />
                    </div>
                </div>
            </div>
            <div className="related-news">
                <h2 className="related-news-heading0">أخبار لها صلة</h2>
                <div className="related-news-grid">
                    {relatedNews.map((relatedNewsItem, index) => (
                        <div key={index} className="news-card">
                            <img  src ={`http://localhost:3001/${relatedNewsItem.link}`}  alt={relatedNewsItem.title} className="news-card-image" />
                            <p className="news-card-title">{relatedNewsItem.title}</p>
                            <div className="button-wrapper">
                                <button onClick={() => handleNavigate(relatedNewsItem)}>تصفح</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default EventDetails;
