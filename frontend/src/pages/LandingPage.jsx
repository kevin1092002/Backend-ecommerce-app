import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import headerImg from "../assets/lgoo.png";
import Grid from "@mui/material/Grid"; // Import the correct Grid component
import image from "../assets/banner-bg.png";
import LandingBar from "../components/footer";
import { Typography, useMediaQuery, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../Style/Landing.css";

const Landing = () => {
  // theme.js

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section
      className="landing"
      id="landing"
      style={{
        fontSize: "xx-large",
        marginTop: 0,
        padding: "260px 0 0 0",
        Height: "100vh",
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${image})`,
        fontFamily: "monospace",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* Typewriter Effect */}
          <div
            className="typewriter-container"
            style={{
              marginLeft: "5%",
              marginBottom: "5%",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            <Typography
              variant={isSmallScreen ? "h4" : "h1"}
              sx={{ fontFamily: "monospace" }}
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Painting Ecommerce Application")
                    .pauseFor(1000)
                    .start();
                }}
              />
            </Typography>
          </div>
          {/* Description */}
          {/* Buttons */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <Link to="/home">
                <button
                  className="cybr-btn"
                  style={{
                    marginLeft: "5%",
                    fontFamily: "monospace",
                  }}
                >
                  View Market<span aria-hidden>_</span>
                  <span aria-hidden className="cybr-btn__glitch">
                    View Market Place
                  </span>
                </button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/signup">
                <button
                  className="cybr-btn"
                  style={{
                    fontFamily: "monospace",
                  }}
                >
                  Get Started<span aria-hidden>_</span>
                  <span aria-hidden className="cybr-btn__glitch">
                    Get Started
                  </span>
                </button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Header Image */}
          <img
            src={headerImg}
            alt="Header Img"
            id="headerimg"
            className="Headerimg"
            style={{
              width: "60%",
              animation: "updown 3s linear infinite",
              // Adjust this value to move the headerImg higher
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LandingBar style={{ position: "absolute", bottom: 0 }} />{" "}
          {/* Footer component */}
        </Grid>
      </Grid>
    </section>
  );
};

export default Landing;
