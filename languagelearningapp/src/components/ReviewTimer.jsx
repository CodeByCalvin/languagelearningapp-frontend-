import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ReviewTimer = (props) => {
  const [timer, setTimer] = useState(0); // Timer
  const { intervalId, setIntervalId, questionIndex } = props; // IntervalID defined in parent component

  // Set timer to 0 when questionIndex changes then start timer
  useEffect(() => {
    setTimer(0);
    const id = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [questionIndex]);

  // Format timer to minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div>
      <h1>{formattedTime}</h1>
    </div>
  );
};

ReviewTimer.propTypes = {
  intervalId: PropTypes.number,
  setIntervalId: PropTypes.func,
  questionIndex: PropTypes.number,
};

export default ReviewTimer;