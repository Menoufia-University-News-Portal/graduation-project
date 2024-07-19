import React from 'react';
import './destination.css';

const Destination = () => {
    const faculties = [
        { id: 1, name: "اتجاهى نحو كلية الحاسبات والمعلومات" },
        { id: 2, name: "اتجاهى نحو كلية العلوم" },
        { id: 3, name: "اتجاهى نحو كلية الاداب" },
        { id: 5, name: "اتجاهى نحو كلية  التجارة" },
        { id: 7, name: "اتجاهى نحو كلية الاقتصاد المنزلى" },
        { id: 8, name: "اتجاهى نحو كلية الطب" },
        { id: 10, name: "اتجاهى نحو كلية الاعلام" },
        { id: 11, name: "اتجاهى نحو كلية الهندسة" },
        { id: 12, name: "اتجاهى نحو كلية الزراعة" },
        { id: 13, name: "اتجاهى نحو كلية الهندسة الالكترونية" },
        { id: 14, name: "اتجاهى نحو كلية التربية" },
        { id: 15, name: "اتجاهى نحو كلية الحقوق" },
        { id: 16, name: "اتجاهى نحو كلية التمريض" },
        { id: 17, name: "اتجاهى نحو كلية التربية النوعية" },
        { id: 18, name: "اتجاهى نحو كلية الصيدلة" },
        { id: 19, name: "اتجاهى نحو كلية التربية الرياضية" },
        { id: 20, name: "اتجاهى نحو كلية العلوم الطبية التطبيقية" },
        { id: 21, name: "اتجاهى نحو كلية طب الاسنان" },
        { id: 22, name: "اتجاهى نحو كلية الذكاء الاصطناعى" }
        
        // Add more faculties as needed
    ];

    return (
        <div className="faculty-container">
            <div className="column">
                {faculties.slice(0, Math.ceil(faculties.length / 2)).map((faculty, index) => (
                    <div key={index}>
                        <button onClick={() => handleButtonClick(faculty.id)} className="faculty-button">
                            {faculty.name}
                        </button>
                    </div>
                ))}
            </div>
            <div className="column">
                {faculties.slice(Math.ceil(faculties.length / 2)).map((faculty, index) => (
                    <div key={index}>
                        <button onClick={() => handleButtonClick(faculty.id)} className="faculty-button">
                            {faculty.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const handleButtonClick = (facultyId) => {
    // Define static links based on faculty_id
    let link;
    if (facultyId === 1) {
        link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA+%D9%88+%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5756664,31.0110936,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6bf14e416e9:0xc49ca19e02abe2d2!8m2!3d30.5756664!4d31.0085187!16s%2Fg%2F1yg57_zm3?entry=ttu';
    } else if (facultyId === 2) {
        link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B9%D9%84%D9%88%D9%85+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5751574,31.0113442,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6bf3bfef67d:0x240a3bffb88e4661!8m2!3d30.5751574!4d31.0087693!16s%2Fg%2F11c2093b8b?entry=ttu';
    } 
 else if (facultyId === 3) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%A2%D8%AF%D8%A7%D8%A8+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5740711,31.0127051,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d7002417dcd3:0x120fbd9527cc3c2!8m2!3d30.5740712!4d31.0078342!16s%2Fg%2F11vrdvzt3n?entry=ttu';
} else if (facultyId === 5) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D9%87+%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5747977,31.009934,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6befa89f465:0x1368ad827604a759!8m2!3d30.5747977!4d31.0073591!16s%2Fg%2F1s05nstyc?entry=ttu';
} else if (facultyId === 7) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%A3%D9%82%D8%AA%D8%B5%D8%A7%D8%AF+%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%89+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5566813,31.0227916,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6f1b9434e33:0xa5f600ee5573f68e!8m2!3d30.5566814!4d31.0179207!16s%2Fg%2F1hm328tgh?entry=ttu';
} else if (facultyId === 8) {
    link = 'https://www.google.com/maps/place/Faculty+of+Medicine+-+Menofia+University/@30.5773616,31.0146262,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6c71546fd23:0x10f3474535419598!8m2!3d30.5773616!4d31.0120513!16s%2Fg%2F119tlwf1m?entry=ttu';
} else if (facultyId === 10) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%A5%D8%B9%D9%84%D8%A7%D9%85+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5747539,31.0141856,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d7db38ff8ebf:0xbe4802edcb5a2e3!8m2!3d30.574754!4d31.0093147!16s%2Fg%2F11hjkx6bjc?entry=ttu';

} else if (facultyId === 11) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5786198,31.0120651,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6b8781deee5:0x4a0f349e031d85e2!8m2!3d30.5786198!4d31.0094902!16s%2Fg%2F1hm4cn16j?entry=ttu';

} else if (facultyId === 12) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.557601,31.0155281,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6f2e52fafe1:0xf41986fd46122564!8m2!3d30.557601!4d31.0129532!16s%2Fg%2F11bw2_ftth?entry=ttu';

} else if (facultyId === 13) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9+%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9+%D8%A8%D9%85%D9%86%D9%88%D9%81%E2%80%AD/@30.472637,30.9291841,17z/data=!4m15!1m8!3m7!1s0x14587e438e34459f:0x539da7deaa77ebce!2z2YPZhNmK2Kkg2KfZhNmH2YbYr9iz2KnYjCDZhdiv2YrZhtipINmF2YbZiNmB2Iwg2YXYrdin2YHYuNipINin2YTZhdmG2YjZgdmK2Kk!3b1!8m2!3d30.472637!4d30.9266092!16s%2Fg%2F1tg57sx_!3m5!1s0x14587e447c6fc38b:0xc47ca8046df9b6d6!8m2!3d30.473412!4d30.9263735!16s%2Fg%2F12mkvmqp9?entry=ttu';
} else if (facultyId === 14) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+-+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5559081,31.0213563,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6f3ae1020e7:0x9b78f67dbbd354b4!8m2!3d30.5559082!4d31.0164854!16s%2Fg%2F1s05qn7wd?entry=ttu';
} else if (facultyId === 15) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AD%D9%82%D9%88%D9%82+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5736789,31.0092454,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6be5bc56d0b:0x459cc0a6991030b!8m2!3d30.5736789!4d31.0066705!16s%2Fg%2F12ht1y7kq?entry=ttu';
} else if (facultyId === 16) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B6+%D8%A8%D8%B4%D8%A8%D9%8A%D9%86+%D8%A7%D9%84%D9%83%D9%88%D9%85%E2%80%AD/@30.5761637,31.0144257,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6c7471b62e3:0xf5b033bc590781e!8m2!3d30.5761637!4d31.0118508!16s%2Fg%2F11b6_n0j92?entry=ttu';
} else if (facultyId === 17) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D9%86%D9%88%D8%B9%D9%8A%D8%A9+-+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.29365,30.9870449,17z/data=!3m1!4b1!4m6!3m5!1s0x145863890595c951:0xe9315940efd62252!8m2!3d30.29365!4d30.98447!16s%2Fg%2F1jkvm_0km?entry=ttu';
} else if (facultyId === 18) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B5%D9%8A%D8%AF%D9%84%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5776516,31.0123731,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d791fcfeb1b5:0x9ca2865e19831da!8m2!3d30.5776516!4d31.0097982!16s%2Fg%2F11fn2pb7cp?entry=ttu';
} else if (facultyId === 19) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5583271,31.0231932,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6efe9e0672f:0x82fa6cc190ce3a9c!8m2!3d30.5583271!4d31.0206183!16s%2Fg%2F11c416bkj2?entry=ttu';
} else if (facultyId === 20) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B9%D9%84%D9%88%D9%85+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D9%8A%D8%A9+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5764991,31.0152986,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d7eefae9c077:0x6017234c68056665!8m2!3d30.5764991!4d31.0127237!16s%2Fg%2F11p0g77t_d?entry=ttu';
} else if (facultyId === 21) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%B7%D8%A8+%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5764697,31.0161853,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d763e133623b:0x3ec73dfb36b5b4d7!8m2!3d30.5764697!4d31.0136104!16s%2Fg%2F11r_xnzc4f?entry=ttu';
} else if (facultyId === 22) {
    link = 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1+%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5755587,31.0104824,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d78ad00386ef:0xda0cac26ecbe9b27!8m2!3d30.5755587!4d31.0079075!16s%2Fg%2F11p12ykgzv?entry=ttu';
} else  {
    link = 'https://www.google.com/maps/place/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9+%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5655764,31.0156571,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6eb70a91047:0xc353387ed2f37809!8m2!3d30.5655764!4d31.0130822!16zL20vMGIxeGc2?entry=ttu';
}
    // Open the link in a new tab
    window.open(link, '_blank');

};

export default Destination;