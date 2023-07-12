import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "../css/ReviewChoice.css";

const ReviewProgBar = (props) => {
  const [progBar, setProgBar] = useState(0);
  const { questionIndex, questions, shuffledQuestions } = props;

  useEffect(() => {
    // calculate progress bar
    const progBar = (questionIndex / questions.length) * 100;
    setProgBar(progBar);
  }, [shuffledQuestions, questionIndex]);

  return (
    <div className="progBarContainer">
      <ProgressBar now={progBar} className="progBar" variant="custom-color" />
    </div>
  );
};

export default ReviewProgBar;