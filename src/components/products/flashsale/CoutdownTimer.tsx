import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';


const CountdownTimer = ({ }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Thời gian đếm ngược đã kết thúc
      return <span>Countdown completed!</span>;
    } else {
      // Hiển thị thời gian đếm ngược
      return (
        <span>
          {hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}
        </span>
      );
    }
  };

  return <Countdown date={new Date(new Date().getTime() + 300 * 1000)} renderer={renderer} />;
};

export default CountdownTimer;
