import React from "react";
import ItemCard from "../components/Item";
import { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Component for rendering a carousel of home items based on a specified category
const HomeItemCarousel = (category) => {
  const [items, setItems] = useState([]);

  useEffect(() => {

    // Fetch data from the API endpoint when the component mounts
    fetch("http://localhost:8080/api/product/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(items)
  const responsive = {
    superLargeDesktop: {
      // Responsive breakpoints for different screen sizes
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      showDots={true}
      responsive={responsive}
      infinite={false}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {items
        .filter(
          ((item) => item.category === category.item)
        )
        .map((item) => (
          
          <ItemCard key={item.id} item={item} />
          
        ))}
    </Carousel>
  );
};

export default HomeItemCarousel;
