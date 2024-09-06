import React from 'react';
import HomeImage from "./HomeImage";
import Carousel from 'react-material-ui-carousel';
import images from '../hardcodeData/image.json';

// Component for rendering a carousel of home images
const HomeImageCarousel = () => {
  return (
     <Carousel indicators={false}>
            {
                images.map(image => <HomeImage key={image.id} item={image} /> )
            }
      </Carousel> 
  )
}

export default HomeImageCarousel;
