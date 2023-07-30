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
import PlaceholderLoader from "../components/PlaceholderLoader";
import ReviewTimer from "../components/ReviewTimer";
import ApiServerClient from "../ApiServerClient";
import ReviewContext from "..//context/ReviewContext";
import AppContext from "../context/AppContext";
import { shuffleQuestions } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import HomeButtonHeader from "../components/HomeButtonHeader";
import ReviewProgBar from "../components/ReviewProgBar";

const ReviewTrueFalse = (props) => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctText, setCorrectText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const [intervalId, setIntervalId] = useState(null); // Used for review timer


  const [isDisabled, setIsDisabled] = useState(false);

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
    console.log(`qamount ${qAmount}`);
    console.log(shuffledQuestions);
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

  const checkAnswer = (answer) => {
    if (
      answer === true &&
      shuffledQuestions[0] === questions[questionIndex].word
    ) {
      setCorrectText("Correct!");
      clearInterval(intervalId);
      setIsDisabled(true);
    } else if (
      answer === false &&
      shuffledQuestions[0] !== questions[questionIndex].word
    ) {
      setCorrectText("Correct!");
      clearInterval(intervalId);
      setIsDisabled(true);
    } else {
      setCorrectText("Incorrect!");
      clearInterval(intervalId);
      setIsDisabled(true);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < qAmount - 1) {
      setQuestionIndex(questionIndex + 1);
      setShuffledQuestions(
        shuffleQuestions([
          questions[questionIndex + 1].word,
          ...questions[questionIndex + 1].alternatives.slice(0, 3),
        ])
      );
      setCorrectText("");
      setIsDisabled(false);
    } else {
      props.navigateToPage("review/results");
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
        <HomeButtonHeader navigateToPage={props.navigateToPage} />
        <div></div>
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
        <div className="">
          <h2>{shuffledQuestions[0]}</h2>
          {/* <h2>{questions[questionIndex].word}</h2> */}
        </div>
        {correctText === "Correct!" ? (
          <div className="d-flex">
            <h2 className="correctText">{correctText}</h2>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="slidersIcon"
              onClick={() => {
                nextQuestion();
              }}
            />
          </div>
        ) : correctText === "Incorrect!" ? (
          <div className="d-flex">
            <h2 className="incorrectText">{correctText}</h2>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="slidersIcon"
              onClick={() => {
                nextQuestion();
              }}
            />
          </div>
        ) : null}
        <br />
        <br />
        <div className="tfContainer">
          <button
            onClick={() => {
              checkAnswer(true);
            }}
            className="true"
            disabled={isDisabled}
          >
            <h2>True</h2>
          </button>
          <button
            onClick={() => {
              checkAnswer(false);
            }}
            className="false"
            disabled={isDisabled}
          >
            <h2>False</h2>
          </button>
        </div>
      </Container>

      <Container fluid className="descContainer">
        <ReviewProgBar
          questionIndex={questionIndex}
          questions={questions}
          shuffleQuestions={shuffleQuestions}
        />
      </Container>
    </motion.div>
  );
};

export default ReviewTrueFalse;
