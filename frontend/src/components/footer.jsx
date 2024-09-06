import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import { Link as RouterLink } from "react-router-dom";

// Footer component for displaying information and navigation links in the application footer
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        fontFamily: "monospace",
        backgroundColor: "black",
        color: "white",
        p: 6,
        marginTop: 1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* About Us Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              color="white"
              gutterBottom
              style={{ fontFamily: "monospace" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              color="white"
              style={{ fontFamily: "monospace", marginTop: "20px" }}
            >
              More than Paint Seller
            </Typography>
          </Grid>

          {/* Navigation Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              color="white"
              gutterBottom
              style={{ fontFamily: "monospace" }}
            >
              Navigation
            </Typography>
            <nav
              sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "black",
                padding: "1rem",
              }}
            >
              <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={12} md={3}>
                  <Link
                    component={RouterLink}
                    to="/home"
                    sx={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="body2">Home</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Link
                    component={RouterLink}
                    to="/profile"
                    sx={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="body2">My Profile</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Link
                    component={RouterLink}
                    to="/"
                    sx={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="body2">About</Typography>
                  </Link>
                </Grid>
              </Grid>
            </nav>
          </Grid>

          {/* Follow Us Section */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "block",
                textAlign: "start",
              }}
            >
              <Typography
                variant="h5"
                color="white"
                gutterBottom
                style={{ fontFamily: "monospace" }}
              >
                Follow Us
              </Typography>
              <ul
                className="social-icons"
                style={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <li>
                  <a href="#" style={{ margin: "0 1rem", color: "white" }}>
                    <FontAwesomeIcon icon={faFacebookF} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" style={{ margin: "0 1rem", color: "white" }}>
                    <FontAwesomeIcon icon={faTwitter} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" style={{ margin: "0 1rem", color: "white" }}>
                    <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" style={{ margin: "0 1rem", color: "white" }}>
                    <FontAwesomeIcon icon={faGooglePlusG} className="icon" />
                  </a>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
