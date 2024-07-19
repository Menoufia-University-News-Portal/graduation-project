import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./side.css"
import Slider from "react-slick"
import Heading from "../../../common/heading/Heading"
import { Fieldset } from 'primereact/fieldset';
import  Avatar  from 'react-avatar'
//import { Avatar } from '@/components/lib/avatar/Avatar';
//import { Avatar } from '../../../../../public/images/drahmed.png';
import { Calendar } from 'primereact/calendar';
import Carousel from 'react-bootstrap/Carousel';
import Tpost from '../Tpost/Tpost';

//const allCat = [...new Set(popular.map((curEle) => curEle.catgeory))]
//console.log(allCat)

const Side = () => {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState(null);

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  
  const catgeory = ["كلية الطب البشري","كلية الهندسة الالكترونية","كلية الطب البيطري","كلية التربية النوعية", "كلية الحاسبات والمعلومات", "كلية الآداب", "كلية الحقوق", "كلية التمريض", "كلية الصيدله", "كلية طب الأسنان", "كلية التجارة","كلية الإعلام","كلية العلوم الصحية","كلية العلوم","كلية التربية للطفولة المبكرة","كلية الاقتصاد المنزلي","كلية الزراعة","كلية التربية"]
  const legendTemplate = (
    <div className="flex align-items-center gap-2 px-7">
      <span className="font-bold">أهداف الجامعة</span>
        <Avatar src="../../../../../public/images/drahmed.jpg" size="20" round={true}   name="" unstyled={true}/>
        
    </div>
);
  return (
    <>
      
     {/* <Heading title='صفحات الجامعه' />
     <SocialMedia />
     */} 
      <section >
         <Heading />
      <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>
        </section> 
        
        <video className='gallary' width="350" height="220" autoPlay muted>
  <source src="../images/ppp.mp4" type="video/mp4"/>
  

</video>
      <section>
       
        
        <div className="card">
            <Fieldset legend={legendTemplate}>
                <p dir="rtl" className="m-0">
                تمثل الغاية العامة النتائج النهائية المطلوب تحقيقها فى الأجل الطويل، وتكون غالباً  مفتوحة النهاية وغير محددة بفترة زمنية. كما لا يتم التعبير عنها فى شكل كمى، ولا تتضمن إطاراً زمنيا محددا لتحقيقها. وتمثل الغايات العامة للجامعة مؤشرات النجاح لتحقيق رسالتها. وفى ضوء رؤية ورسالة الجامعة فقد أمكن تحديد الغايات العامة التالية:

1- توسع مؤسسى هادف لفتح آفاق علمية جديدة فى ظل إقتصاد المعرفة والتنافسية.

2 - مكانة رفيعة للجامعة فى منظومة التعليم العالى وكسب ثقة المجتمع.

3 - خريج مواكب لروح العصر ومتطلبات سوق العمل.

4 - عضو هيئة تدريس ذو جدارات علمية ومهنية متميزة أقليميا وعالميا.

                </p>
            </Fieldset>
        </div>
       
        </section>
      
      <div>
        <p>
          <br/>
        </p>
      </div>
      <Carousel>
      <Carousel.Item interval={1000}>
      <img  style={{height:"300px", width:'320px'}}  alt='' src='../images/drKased.jpg'  />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img   style={{height:"300px" , width:'320px'}}  src='../images/drSobhy.jpg' alt='' />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img  style={{height:"300px" , width:'320px'}}  src='../images/drhazem.jpg' alt='' />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      

      <section className='catgorys'>
        <Heading title='كليات الجامعة' />
        {/*<div className='items'>{allCat}</div>*/}
        {catgeory.map((val) => {
          return (
            <div className='category category1'>
              <span dir='rtl'>{val}</span>
            </div>
          )
        })}
      </section>

     
        <Heading  title='تواصل معنا' />

      <section className='subscribe'>
        <h1 dir='rtl' className='title'>اشترك في نشرتنا الاخبارية</h1>
        <form action=''>
          <input dir='rtl' type='email' placeholder='الايميل الخاص بيك...' />
          
          <button>
            <i className='fa fa-paper-plane'></i>ارسال
          </button>
        </form>
     
      </section>
      <Tpost/>
    <section className='gallery'>
        <Heading title='معرض' />
        <Slider {...settings}>
          {news.map((val) => {
            return (
              <div className='img'>
                <img src={val.link} alt='' />
              </div>
            )
          })}
        </Slider>
        </section> 
        
    </>
  )
}

export default Side
