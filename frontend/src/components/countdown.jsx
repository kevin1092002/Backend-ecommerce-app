import React, { useState, useEffect } from 'react';
import { Typography } from "@mui/material";

// Countdown component that calculates and displays the time remaining until a sale ends
const Countdown = ({ saleEnd }) => {
    const [timeLeft, setTimeLeft] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(saleEnd).getTime();
        const timeRemaining = endTime - now;
  
        if (timeRemaining <= 0) {
          setTimeLeft('Sale Ended');
          clearInterval(interval);
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [saleEnd]);
  
    return <Typography variant="body1">Sale Ends: {timeLeft}</Typography>;
};

export default Countdown;
