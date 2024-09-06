import React from "react";
import { Grid, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AppBar from "../components/header";
import HomeImageCarousel from "../components/HomeImageCarousel";
import category from "../hardcodeData/categories.json";
import HomeItemCarousel from "../components/HomeItemCarousel";
import FooterApp from "../components/footer";

const Home = () => {
  return (
    <Grid container>
      {/* Header */}
      <Grid item xs={12}>
        <AppBar />
        <HomeImageCarousel />
      </Grid>

      {/* Trending Categories */}
      <Grid container sx={{ padding: "20px" }}>
        {/* Trending in Art */}
        <Grid item xs={12} sx={{ marginBottom: "10px" }}>
          <Typography variant="h5">
            Trending in Art
            <WhatshotIcon sx={{ marginLeft: "2px", color: "#c62828" }} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* Home Item Carousel for Art */}
          <HomeItemCarousel key={category[0]} item={category[0]} />
        </Grid>

        {/* Trending in Photography */}
        <Grid container sx={{ marginTop: "30px" }}>
          <Grid item xs={12} sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">
              Trending in Photography
              <WhatshotIcon sx={{ marginLeft: "2px", color: "#c62828" }} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* Home Item Carousel for Photography */}
            <HomeItemCarousel key={category[1]} item={category[1]} />
          </Grid>
        </Grid>

        {/* Trending in Anime Portrait */}
        <Grid container sx={{ marginTop: "30px" }}>
          <Grid item xs={12} sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">
              Trending in Anime Portrait
              <WhatshotIcon sx={{ marginLeft: "2px", color: "#c62828" }} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* Home Item Carousel for Anime Portrait */}
            <HomeItemCarousel key={category[2]} item={category[2]} />
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <FooterApp />
      </Grid>
    </Grid>
  );
};

export default Home;
