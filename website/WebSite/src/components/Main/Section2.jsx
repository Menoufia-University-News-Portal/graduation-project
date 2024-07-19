import React, { useEffect, useState } from "react";
import './part2.css';
import './Section2.css';
import Heading from '../common/heading/Heading';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimatedHeading = () => {
  const [text, setText] = useState("");
  const message = "نبذة عن جامعة المنوفية منذ انشائها عام 1976";
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setText(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="heading-container">
      <Heading title='نبذة عن جامعة المنوفية منذ انشائها عام 1976'></Heading>
    </div>
  );
};

const Section2 = () => {
  return (
    <>
      <AnimatedHeading />
      <div className='all' data-aos="fade-in" data-aos-duration="1000">
        <div className="image-container">
          <img 
            className="zoom-and-rotate"
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
            alt="University"
          />
        </div>
        <div className="text-container">
          <p className="textHis" dir='rtl'>
            أنشئت جامعة المنوفية بالقانون رقم ( 93 ) الصادر في الرابع عشر من أغسطس عام 1976 م ومقرها بشبين الكوم ، لتلبية الطلب المتزايد على التعليم العالي ، ولدعم الجامعات المصرية ومؤسسات التعليم العالي الأخرى في تحقيق رسالتها في تنمية وتطوير المجتمع من خلال تقديم خدمات تعليمية وبحثية ومجتمعية متميزة. واقتضى القانون (93) في مادته الثانية بأن تتكون جامعة المنوفية من الكليات التابعة آنذاك لجامعة طنطا بشبين الكوم ومنوف . كما صدر في الخامس والعشرين من نوفمبر لسنة 1976 قرار رئيس مجلس الوزراء رقم ( 1142) بأن تضم جامعة المنوفية أربع كليات فقط هي : -
            كلية الزراعة -              كلية الهندسة -              كلية التربية -                  كلية الهندسة الإلكترونية بمنوف
            (بكالوريوس/ ليسانس) و214 عضو هيئة تدريس و372 عضو هيئة معاونة (معيد/ مدرس مساعد). توفرت للجامعة الوليدة وقتذاك بعض المقومات ، مثل وجود معاهد وكليات بالإقليم سابقة على إنشاء الجامعة ، ومنها كلية الزراعة التي أنشئت في 1942 كمعهد عالي زراعي بشبين الكوم ، وكلية الهندسة التي تطورت من معهد عالي صناعي عام 1958 وكذلك كلية التربية أنشئت عام 1971 وكانت تابعة لجامعة عين شمس ، كما أنشيء المعهد العالي للإلكترونيات بمنوف الذي كان تابعا لوزارة التعليم العالي ثم تحول لكلية الهندسة الإلكترونية واصبح تابعا لجامعة طنطا عام 1975 إلى أن انتقل تبعيته لجامعة المنوفية في 1976 .
          </p>
        </div>
      </div>
    </>
  );
};

export default Section2;
