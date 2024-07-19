import React from 'react';
import { GrNotes } from "react-icons/gr";
import "./Message.css";

export default function Message() {
    return (
        <div>
            <div style={{ height: "50px", width: "100%" }}></div>
            <h1 dir="rtl" className="tobic2">
                <GrNotes /> &nbsp; رسالة الجامعة
            </h1>
            <p dir="rtl" className="texttt">
                جامعة المنوفية إحدى مؤسسات التعليم العالى التى تسهم فى إعداد الكوادر البشرية اللازمة لسوق العمل وتأهيلها من خلال تقديم خدمات تعليمية وبحثية ومجتمعية متميزة وفق المعايير المرجعية لتحقيق أهداف التنمية المستدامة وكسب ثقة المجتمع.
            </p>
        </div>
    );
}
