import React from "react";
import { Grid, Typography,Button } from "@mui/material";
import AppBar from "../components/header";
import HomeImageCarousel from "../components/HomeImageCarousel";
import FooterApp from "../components/footer";

import ItemCard from "../components/Item";
import Filter from "../components/filter";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { searchValue } = useParams();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({
    min: null,
    max: null,
    category: "",
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleResetFilter = () => {
    const resetFilter = {
      min: null,
      max: null,
      category: "",
    };
    setFilter(resetFilter);
  };

  // Filter items based on the filter criteria using filter array function
  const filteredItems = items.filter((item) => {
    //set the condtion for price filter
    const isPriceInRange =
      (!filter.min || item.price >= filter.min) &&
      (!filter.max || item.price <= filter.max);
    //set the condtion for category filter
    const isCategoryMatch =
      !filter.category || item.category === filter.category;
    console.log(isCategoryMatch);
    console.log(isPriceInRange && isCategoryMatch);
    return isPriceInRange && isCategoryMatch;
  });

  useEffect(() => {
    // Fetch data from the API endpoint when the component mounts
    fetch(`http://localhost:8080/api/product/search/${searchValue}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchValue]);

  return (
    <Grid container>
      {/* Header */}
      <Grid item xs={12}>
        <AppBar />
        <HomeImageCarousel />
      </Grid>

      {/* Filter Section */}
      <Filter onFilterChange={handleFilterChange} />
      <Button variant="contained" sx={{marginTop:"5px"}} onClick={()=>handleResetFilter()}> Reset Filter</Button>

      {/* Item Count Display */}
      <Grid container padding={1}>
        <Typography variant="body">{filteredItems.length} items</Typography>
      </Grid>

      {/* List of Items */}
      <Grid container sx={{ marginTop: 2 }}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={3}>
            {/* Individual Item Card */}
            <ItemCard key={item.digital_asset_id} item={item} />
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <FooterApp />
      </Grid>
    </Grid>
  );
};

export default Product;
