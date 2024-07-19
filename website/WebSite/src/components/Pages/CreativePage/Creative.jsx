import React from 'react';
import { Parallax } from 'react-parallax';
import './Creative.css'; 

const Creative = () => {
  return (
    <div className="App66">
      <Parallax
        bgImage={'https://www.menofia.edu.eg/PrtlFiles/Sectors/postgrad/Sectors/postgrad/Portal/Images/8225d4eb-9a90-4fc9-9537-72be83eaf21e.png'}
        strength={-200}
      >
        <div
          style={{
            height: 400,
            width: "100%",
            position: "relative",
          }}
        >
          
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", 
            }}
          >
            <div className="parallax-content">
            <h1>جامعة المنوفية</h1>
            <p>من أعرق الصروح التعليمية المصرية والتى تقدم مستوى تعليمي راقي يمنح لها مكانتها المرموقة وسط الجامعات الدولية</p>
          </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Creative;
