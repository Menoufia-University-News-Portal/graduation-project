import React, { useState, useEffect } from 'react';
import './AnimeTabe.css';
import axios from 'axios';
import { useSpring, animated } from "react-spring";

const AnimeTabe = () => {
    const [news, setNews] = useState([]);
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [prevTitle, setPrevTitle] = useState('');

    const props = useSpring({
        from: { opacity: 0, transform: "translateY(-20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        reset: prevTitle !== (news[currentTitleIndex] && news[currentTitleIndex].title),
        onRest: () => setPrevTitle(news[currentTitleIndex] && news[currentTitleIndex].title)
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/news/list');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex(prevIndex => (news.length > 0 ? (prevIndex + 1) % news.length : 0));
        }, 5000); // Change title every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [news]);

    return (
        <div className="news-container">
            {news.length > 0 && (
                <animated.div style={props} className="news-box">
                    {news[currentTitleIndex] && news[currentTitleIndex].title}
                </animated.div>
            )}
        </div>
    );
};

export default AnimeTabe;
