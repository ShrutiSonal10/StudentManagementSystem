import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  // Initialize state variables for date and time
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Update date and time every second
  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = new Date();
      // Update date
      setCurrentDate(now.toLocaleDateString());
      // Update time
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <h6>Current Date and Time</h6>
      <p>Date: {currentDate}</p>
      <p>Time: {currentTime}</p>
    </div>
  );
};

export default DateTimeDisplay;
