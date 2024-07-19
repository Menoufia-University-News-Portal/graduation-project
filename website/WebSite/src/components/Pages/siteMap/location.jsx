import React from 'react';
import { useParams } from 'react-router-dom';

const LocationPage = () => {
  const { id } = useParams();

  // Define mappings for different IDs to their corresponding external links
  const linkMap = {
    '1': 'https://www.google.com/maps/place/%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA+%D9%88+%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA+%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%E2%80%AD/@30.5756664,31.0110936,17z/data=!3m1!4b1!4m6!3m5!1s0x14f7d6bf14e416e9:0xc49ca19e02abe2d2!8m2!3d30.5756664!4d31.0085187!16s%2Fg%2F1yg57_zm3?entry=ttu', // Replace 'https://www.example.com/link1' with your actual link
    '2': 'https://www.example.com/link2', // Replace 'https://www.example.com/link2' with your actual link
    // Add more mappings for other IDs as needed
  };

  // Check if the ID exists in the mapping
  if (linkMap[id]) {
    // Redirect to the corresponding external link
    window.location.href = linkMap[id];
  } else {
    // Redirect to a default page if the ID is not found
    window.location.href = 'https://www.example.com/default'; // Replace 'https://www.example.com/default' with your default link
  }

  // Alternatively, you can render content directly in this component
  // return <h1>Location Page for ID {id}</h1>;
};

export default LocationPage;
