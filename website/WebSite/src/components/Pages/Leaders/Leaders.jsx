import React, { useEffect, useState } from 'react';
import './Leaders.css';
import Heading from '../../common/heading/Heading';

function Leaders({ presidentImg, vicePresidentImg1, vicePresidentImg2 }) {
    const [leadersData, setLeadersData] = useState([]);

    useEffect(() => {
        fetchLeadersData();
    }, []);

    const fetchLeadersData = async () => {
        try {
            const response = await fetch('http://localhost:3001/uni-leader/viewAll');
            const data = await response.json();
            setLeadersData(data);
        } catch (error) {
            console.error('Error fetching leaders data:', error);
        }
    };

    const handleLeaderClick = (cvLink) => {
        window.open(cvLink, '_blank');
    };

    const renderLeaders = () => {
        return leadersData.map((leader, index) => (
            <div key={index} className="leader">
                <div className="leader-info">
                    <img
                        src ={`http://localhost:3001/${leader.link}`}
                        alt={leader.name}
                        className="leader-img"
                    />
                    <div className="leader-hover">
                        <a

                            className="president-desc"

                        >
                            {leader.role}
                        </a>
                        <div
                            className="president-role"
                            onClick={() => handleLeaderClick(getCvLink(index))}
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            {leader.name}
                        </div>
                    </div>
                </div>
            </div>
        ));
    };


    const getCvLink = (index) => {
        const cvLinks = [
            "https://www.menofia.edu.eg/Styles/University_Master/images/CVDrKased.pdf",
            "https://www.menofia.edu.eg/Styles/University_Master/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B0%D8%A7%D8%AA%D9%8A%D8%A9%20%D8%AF.%20%D8%B5%D8%A8%D8%AD%D9%8A%20%D8%B4%D8%B1%D9%81%20%D8%B9%D9%85%D9%8A%D8%AF%20%D8%A7%D9%84%D9%83%D9%84%D9%8A%D8%A9%2013-3%20-%20Copy.pdf",
            "https://www.menofia.edu.eg/Styles/University_Master/DrhazemCV.pdf"
        ];
        return cvLinks[index] || '#';
    };

    return (
        <div className="leadership-section">
            <Heading title='القيادات الحالية للجامعة' />
            <div className="leaders-grid">
                {renderLeaders()}
            </div>
        </div>
    );
}

export default Leaders;
