import React, { useState } from 'react';
import './SquareAnimatedButtons.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

const SquareAnimatedButtons = () => {
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [youtubeHovered, setYoutubeHovered] = useState(false);

  return (
    <div className="button-container">
      <button
        className="animated-button"
        onMouseEnter={() => setFacebookHovered(true)}
        onMouseLeave={() => setFacebookHovered(false)}
        style={{ backgroundColor: facebookHovered ? '#3b5998' : 'transparent' }}
      >
        <span className="icon facebook-icon">
          <FontAwesomeIcon icon={faFacebook} />
        </span>
        <span className="text">فيسبوك</span>
      </button>
      <button
        className="animated-button"
        onMouseEnter={() => setYoutubeHovered(true)}
        onMouseLeave={() => setYoutubeHovered(false)}
        style={{ backgroundColor: youtubeHovered ? '#ff0000' : 'transparent' }}
      >
        <span className="icon youtube-icon">
          <FontAwesomeIcon icon={faYoutube}/>
        </span>
        <span className="text">يوتيوب</span>
      </button>
    </div>
  );
};

export default SquareAnimatedButtons;
