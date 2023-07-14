import React, { useState, useEffect, useContext } from "react";
import "../css/ReviewChoice.css";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSliders,
  faVolumeHigh,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import PlaceholderLoader from "./PlaceholderLoader";
import ReviewTimer from "./ReviewTimer";
import ApiServerClient from "../ApiServerClient";
import ReviewContext from "../ReviewContext";
import AppContext from "../AppContext";
import { shuffleQuestions } from "../utility";
import { useNavigate } from "react-router-dom";

const ReviewTrueFalse = (props) => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctText, setCorrectText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const [intervalId, setIntervalId] = useState(null); // Used for review timer

  // context
  const { rVal } = useContext(ReviewContext);
  const { qAmount } = rVal;
  const { timer } = rVal;

  // App context
  const { aVal } = useContext(AppContext);
  const { learnLanguage } = aVal;
  const learnLanguageString = learnLanguage.toString().toLowerCase();

  useEffect(() => {
    getReviewQuestions();
    console.log(qAmount);
  }, []);

  const getReviewQuestions = async () => {
    try {
      const response = await ApiServerClient.getReviewQuestions(qAmount);
      setTimeout(() => {
        // setTimeout is used to simulate a loading time
        const data = response.data;
        // for each object in data. Push the object into questions array
        const questionsArray = [];
        for (let i = 0; i < data.length; i++) {
          questionsArray.push(data[i]);
        }
        setQuestions(questionsArray);

        // set questions array to the word and 3 alternatives
        setShuffledQuestions(
          shuffleQuestions([
            questionsArray[questionIndex].word,
            ...questionsArray[questionIndex].alternatives.slice(0, 3),
          ])
        );

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
            onClick={navigate.bind(this, "/")}
          />
        </div>
        <div className="d-flex align-items-center rightBanner">
          {timer && (
            <ReviewTimer
              intervalId={intervalId}
              setIntervalId={setIntervalId}
              questionIndex={questionIndex}
            />
          )}
          <FontAwesomeIcon
            icon={faSliders}
            className="slidersIcon"
            onClick={navigate.bind(this, "/review")}
          />
        </div>
      </Container>

      <Container fluid className="wotd-container">
        <div className="reviewMain">
          <h1>{questions[questionIndex].translation[learnLanguageString]}</h1>
          <FontAwesomeIcon className="i" icon={faVolumeHigh} />
        </div>
        {correctText === "Correct!" && (
          <div className="d-flex">
            <h2 className="correctText">{correctText}</h2>
            <FontAwesomeIcon icon={faCircleArrowRight} className="slidersIcon" />
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
