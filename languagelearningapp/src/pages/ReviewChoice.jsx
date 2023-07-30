import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faVolumeHigh,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/ReviewChoice.css";
import ApiServerClient from "../ApiServerClient";
import PlaceholderLoader from "../components/PlaceholderLoader";
import ReviewTimer from "../components/ReviewTimer";
import ReviewProgBar from "../components/ReviewProgBar";
import ReviewContext from "../context/ReviewContext";
import AppContext from "../context/AppContext";
import { shuffleQuestions } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import HomeButtonHeader from "../components/HomeButtonHeader";

const ReviewChoice = (props) => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [correctText, setCorrectText] = useState("");

  const [intervalId, setIntervalId] = useState(null); // Used for review timer

  // Review context
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
    console.log(learnLanguageString);
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

        setIsLoaded(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = () => {
    // get the next question
    // if the questionIndex is equal to the length of the questions array, navioate to the results page and reset the questionIndex
    if (questionIndex === questions.length - 1) {
      props.navigateToPage("review/results");
      setQuestionIndex(0);
    } else {
      setQuestionIndex(questionIndex + 1);
      // set questions array to the word and 3 alternatives
      setShuffledQuestions(
        shuffleQuestions([
          questions[questionIndex + 1].word,
          ...questions[questionIndex + 1].alternatives.slice(0, 3),
        ])
      );
    }
  };

  const nextQuestion = () => {
    setCorrectText("");
    handleAnswer();
    // clear the correct and false class from the divs
    const divs = document.getElementsByClassName("qBlock");
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove("correct");
      divs[i].classList.remove("false");
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
        {correctText === "Correct!" && (
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
        )}
        <br />
        <br />
        {shuffledQuestions.map((question, index) => {
          return (
            <div
              className="qBlock noAnswer col-lg-4 col-10"
              key={index}
              onClick={() => {
                if (question === questions[questionIndex].word) {
                  // add correct class to the clicked div
                  document
                    .getElementsByClassName("qBlock")
                    [index].classList.add("correct");
                  // set correct text
                  setCorrectText("Correct!");
                  clearInterval(intervalId);
                } else {
                  // add false class to the clicked div
                  document
                    .getElementsByClassName("qBlock")
                    [index].classList.add("false");
                }
              }}
            >
              <h2>{question}</h2>
            </div>
          );
        })}
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

export default ReviewChoice;
