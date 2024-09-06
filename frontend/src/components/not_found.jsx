import React from 'react'
import {useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import images from "../assets/images.png"
const NotFoundPage = () => {
  const handleDirect = useNavigate();
  return (
    
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        height: '100vh',
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Box
          component="img"
          src={images} // Replace with your image URL
          alt="Astronaut"
          sx={{
            width: '100%',
            maxWidth: 300,
            height: 'auto',
            mb: 4,
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sorry, the page you are looking for could not be found or has been removed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={() => handleDirect("/home")}
        >
          Go back
        </Button>
      </Container>
    </Box>
  )}

export default NotFoundPage