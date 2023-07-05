import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSliders, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "../css/ReviewChoice.css";
import ApiServerClient from "../ApiServerClient";
import PlaceholderLoader from "./PlaceholderLoader";

const ReviewChoice = (props) => {
  const { setPage } = props;

  const language = "spanish";

  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [progBar, setProgBar] = useState(0);

  useEffect(() => {
    getReviewQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // calculate progress bar
    const progBar = (questionIndex / questions.length) * 100;
    setProgBar(progBar);
  }, [shuffledQuestions]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const getReviewQuestions = async () => {
    try {
      const response = await ApiServerClient.getReviewQuestions();
      setTimeout(() => { // setTimeout is used to simulate a loading time
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

  // fisher-yates shuffle algorithm
  const shuffleQuestions = (array) => {
    for (let i = array.length - 1; i > 0; i--) { // i = 3
      const randomIndex = Math.floor(Math.random() * (i + 1)); // 0.1 to 3.6 => 0 to 3
      // make array[i] equal to array[randomIndex] and array[randomIndex] equal to array[i]
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // [array[3], array[2]] = [array[2], array[3]]
    }
    return array;
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
          <h1>{formattedTime}</h1>
          <FontAwesomeIcon icon={faSliders} className="slidersIcon" />
        </div>
      </Container>

      <Container fluid className="wotd-container">
        <div className="reviewMain">
          <h1>{questions[questionIndex].translation[language]}</h1>
          <FontAwesomeIcon className="i" icon={faVolumeHigh} />
        </div>
        <h2 className="correctText">Correct!</h2>
        <br />
        <br />
        {shuffledQuestions.map((question, index) => {
          return (
            <div
              className="qBlock noAnswer col-lg-4 col-10"
              key={index}
              onClick={() => {
                if (question === questions[questionIndex].word) {
                  setQuestionIndex(questionIndex + 1);
                  setShuffledQuestions(
                    shuffleQuestions([
                      questions[questionIndex + 1].word,
                      ...questions[questionIndex + 1].alternatives.slice(0, 3),
                    ])
                  );
                }
              }}
            >
              <h2>{question}</h2>
            </div>
          );
        })}
      </Container>

      <Container fluid className="descContainer">
        <div className="progBarContainer">
          <ProgressBar now={progBar} className="progBar" variant="custom-color" />
        </div>
      </Container>
    </motion.div>
  );
};

export default ReviewChoice;
