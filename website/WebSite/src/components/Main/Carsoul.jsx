import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

export class Carsoul extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3001/gallery/viewAll')
      .then(response => {
        console.log(response.data); // Log the response to verify the data
        this.setState({ images: response.data });
      })
      .catch(error => {
        console.error('There was an error fetching the images!', error);
      });
  }

  render() {
    const { images } = this.state;

    return (
      <>
        <div style={{ height: "5px" }}></div>
        <div>
          <div className='container-fluid'></div>
          <div className='container-fluid' style={{ marginTop: "70px", width: "100%" }}>
            <OwlCarousel
              className="owl-theme"
              loop
              margin={8}
              responsive={{
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                900: {
                  items: 3
                },
                1200: {
                  items: 4
                }
              }}
            >
              {images.map(image => (
                <div key={image.image_id}>
                  <img className="img" src ={`http://localhost:3001/${image.link}`} alt={`Slide ${image.image_id}`} onError={(e) => { e.target.onerror = null; e.target.src = "default-image-path.jpg"; }} />
                  {console.log(`http://localhost:3001/gallery/images/${image.link}`)} {/* Log the image URL */}
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </>
    );
  }
}

export default Carsoul;
