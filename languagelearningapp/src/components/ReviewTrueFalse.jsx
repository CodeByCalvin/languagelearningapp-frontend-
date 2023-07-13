import React, { useState, useEffect } from "react";
import "../css/ReviewChoice.css";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSliders, faVolumeHigh, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import PlaceholderLoader from "./PlaceholderLoader";
import ReviewTimer from "./ReviewTimer";
import ApiServerClient from "../ApiServerClient";

const ReviewTrueFalse = (props) => {
  const { setPage } = props;

  const language = "german";
  const questionAmount = props.questionAmount;

  const [isLoaded, setIsLoaded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctText, setCorrectText] = useState("");
  const [questions, setQuestions] = useState([]);

  const [intervalId, setIntervalId] = useState(null); // Used for review timer

  useEffect(() => {
    getReviewQuestions();
  }, []);

  const getReviewQuestions = async () => {
    try {
      const response = await ApiServerClient.getReviewQuestions(questionAmount);
      setTimeout(() => {
        // setTimeout is used to simulate a loading time
        const data = response.data;
        // for each object in data. Push the object into questions array
        const questionsArray = [];
        for (let i = 0; i < data.length; i++) {
          questionsArray.push(data[i]);
        }
        setQuestions(questionsArray);

        console.log(questionsArray);

        setIsLoaded(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // guard clause
  if (!isLoaded) {
    return (
      <motion.div
        className="wotd"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container fluid className="wotd-container flex-row">
          <h1>Loading</h1>
          <PlaceholderLoader />
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="wotd"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="homeContainer justify-content-between">
        <div>
          <FontAwesomeIcon
            icon={faHouse}
            className="houseIcon"
            onClick={() => setPage && setPage("home")}
          />
        </div>
        <div className="d-flex align-items-center rightBanner">
          <ReviewTimer 
            intervalId={intervalId}
            setIntervalId={setIntervalId}
            questionIndex={questionIndex}
          />
          <FontAwesomeIcon icon={faSliders} className="slidersIcon" />
        </div>
      </Container>

      <Container fluid className="wotd-container">
        <div className="reviewMain">
          <h1>Word</h1>
          <FontAwesomeIcon className="i" icon={faVolumeHigh} />
        </div>
        {correctText === "Correct!" && (
          <div className="d-flex">
            <h2 className="correctText">{correctText}</h2>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="slidersIcon"
              
            />
          </div>
        )}
        <br />
        <br />
        <div className="tfContainer">
          <div className="true">
            <h2>True</h2>
          </div>
          <div className="false">
            <h2>False</h2>
          </div>
        </div>
      </Container>

    </motion.div>
  );
};

export default ReviewTrueFalse;
