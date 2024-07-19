import React from 'react';
import { Parallax } from 'react-parallax';
import './media.css';
import { useState } from 'react';
import axios from 'axios';

const Media = () => {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:3001/subscriber/add', { email: email });
          setResponse(res.data);
          console.log(res.data);
          console.log(res);
        } 
        catch (error) {
          console.error('Error:', error);
        }
    };

    return (
        <div className="App66">
            <Parallax bgImage={'https://wallpapers.com/images/high/social-media-icon-boxes-xgbnybva5vhh8325.webp'} strength={-200}>
                <div style={{ height: 300, width: "100%" }}>
                    <div className="parallax-content">
                        <section className='subscribe'>
                            <h1 dir='rtl' className='title88'>اشترك في نشرتنا الاخبارية</h1>
                            <form onSubmit={handleSubmit}>
                                <input className='inp' dir='rtl' type='email' placeholder='الايميل الخاص بك...' onChange={(e) => setEmail(e.target.value)} required />
                                <button className='button101'>
                                    <i className='fa fa-paper-plane' type="submit"></i>ارسال
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default Media;
