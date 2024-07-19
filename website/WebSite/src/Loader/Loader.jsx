// Loader.js
import React, { useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";
import "./Loader.css"; // Create and import a CSS file for loader styling if needed

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay before loading the content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <Grid
          height="100"
          width="100"
          color="#000"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;
