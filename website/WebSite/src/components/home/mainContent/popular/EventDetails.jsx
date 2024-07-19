import React from 'react';
import './EventDetails.css';

const EventDetails = () => {
    const sampleNewsItem = {
        title: 'Sample News Title',
        description: 'Sample description for the news item. This is a brief description of the news.',
        link: 'https://via.placeholder.com/600x400',
        faculties: [{ name: 'Science' }],
        event_id: '1',
    };

    const relatedNewsItems = [
        {
            title: 'Related News 1',
            link: 'https://via.placeholder.com/200x200',
            event_id: '2',
        },
        {
            title: 'Related News 2',
            link: 'https://via.placeholder.com/200x200',
            event_id: '3',
        },
        {
            title: 'Related News 3',
            link: 'https://via.placeholder.com/200x200',
            event_id: '4',
        },
    ];

    const mapFacultyName = (facultyName) => {
        const faculties = {
            'Medicine': 'كلية الطب',
            'Computers and Information': 'كلية الحاسبات والمعلومات',
            'Science': 'كلية العلوم',
            'Art': 'كلية الاداب',
            'Commerce': 'كلية التجارة',
            'Home economy': 'كلية الاقتصاد المنزلى',
            'Mass communication': 'كلية الاعلام',
            'Engineering': 'كلية الهندسة'
        };
        return faculties[facultyName] || facultyName;
    };

    return (
        <div>
            <h1 className="heading2">تفاصيل الخبر</h1>
            <div className="news-details-container">
                <div className="news-details-grid">
                    <div className="news-details-content">
                        <h2>{sampleNewsItem.title}</h2>
                        <p>{sampleNewsItem.description}</p>
                        <p>{mapFacultyName(sampleNewsItem.faculties[0].name)}</p>
                        <div className="share-buttons">
                            <button className="share-button facebook">فيسبوك</button>
                            <button className="share-button google">جوجل</button>
                        </div>
                    </div>
                    <div className="news-details-image">
                        <img src={sampleNewsItem.link} alt={sampleNewsItem.title} />
                    </div>
                </div>
            </div>
            <div className="related-news">
                <h2 className="related-news-heading2">أخبار لها صلة</h2>
                <div className="related-news-grid">
                    {relatedNewsItems.map((item, index) => (
                        <div key={index} className="news-card">
                            <img src ={`http://localhost:3001/${item.link}`}  alt={item.title} />
                            <p className="news-card-title">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
