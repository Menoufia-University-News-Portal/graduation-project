import React from 'react';
import './Info.css';
import Heading from '../../common/heading/Heading';



const Info = () => {
  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div className="heading-container">
      <Heading  title='فريق عمل المشروع'></Heading>
    </div>
      <main className="team-container">
        <div className="team-member">
          <h2>م/اسراء الخضرى محمد النجار</h2>
          <p style={{fontSize:"20px"}}>Email: <a href="mailto:">israaelnajjar664@gmail.com</a></p>
          <p style={{fontSize:"20px",marginRight:"80px"}}>LinkedIn: <a href="https://www.linkedin.com/in/esraa-elnajjar-098084246/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
          
          
        </div>
        <div className="team-member">
          <h2>م/آلاء عادل محمد محيى حتحوت</h2>
          <p style={{fontSize:"20px"}}>Email: <a href="mailto:alaahathout1@gmail.com">alaahathout1@gmail.com</a></p>
          <p style={{fontSize:"20px",marginRight:"48px"}}>LinkedIn: <a href="https://www.linkedin.com/in/alaa-hathout-6b860b244" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        </div>
        <div className="team-member">
          <h2>م/آيه عادل محمد محيى حتحوت</h2>
          <p style={{fontSize:"20px"}}>Email: <a href="mailto:ayahathout1@gmail.com">ayahathout1@gmail.com</a></p>
          <p style={{fontSize:"20px",marginRight:"48px"}}>LinkedIn: <a href="https://www.linkedin.com/in/aya-hathout-08a60a244" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        </div>
        <div className="team-member">
          <h2>م/اسراء احمد على احمد</h2>
          <p style={{fontSize:"20px"}}>Email: <a href="mailto:ea3357304@gmail.com">ea3357304@gmail.com</a></p>
          <p style={{fontSize:"20px",marginRight:"35px"}}>LinkedIn: <a href="https://www.linkedin.com/in/esraa-ahmed-246a66281/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        </div>
        <div className="team-member">
          <h2>م/اسراء حسين عطيه محمود</h2>
          <p style={{fontSize:"20px"}}>Email: <a href="mailto:israahussein737@gmail.com">israahussein737@gmail.com</a></p>
          <p style={{fontSize:"20px",marginRight:"80px"}}>LinkedIn: <a href="https://www.linkedin.com/in/esraa-hussein-426338251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        </div>
      </main>
    </>
  );
}

export default Info;