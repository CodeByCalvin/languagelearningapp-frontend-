import "../css/learn.css";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as PlaySolid } from "../imgs/icons/play-solid.svg";
import { ReactComponent as Microphone } from "../imgs/icons/microphone-solid.svg";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ApiServerClient from "../ApiServerClient";
import ReviewProgBar from "./ReviewProgBar";
import { ReactComponent as ArrowRight } from "../imgs/icons/arrow-right-solid.svg";

export default function Learn(props) {
  const wordClass = "";

  // Prompt for number of questions and initialize state with empty objects

  const initialQuestionLength = 10;
  const initialQuestions = Array.from(
    { length: initialQuestionLength },
    () => ({})
  );

  const [word, setWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
  const [languageExample, setLanguageExample] = React.useState("");
  const [translatedExample, setTranslatedExample] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [responseMessage, setResponseMessage] = React.useState("");
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questions, setQuestions] = React.useState(initialQuestions);
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]); // Added this line

  const language = "french";
  const knownLanguage = "english";

  // Retrieve word from database
  const getRandomWord = async () => {
    try {
      const response = await ApiServerClient.getRandomWord();
      const data = response.data;
      console.log(data);
      if (
        data.language &&
        data.language[knownLanguage] &&
        data.language[language]
      ) {
        // Save the word data to the questions state  (for review)
        const newWordData = {
          index: questionIndex + 1,
          word: data.language[language].word,
          definition: data.language[knownLanguage].definition,
        };

        // Copy old state and replace the question at the current index
        let newQuestions = [...questions];
        newQuestions[questionIndex] = newWordData;
        setQuestions(newQuestions);
        console.log(questions);

        // Set the word, definition, and example based on the language
        setTranslatedExample(data.language[knownLanguage].example);
        setDefinition(data.language[knownLanguage].definition);
        setWord(data.language[language].word);
        setEnglishWord(data.language[knownLanguage].word);
        // Sets the example based on the language (and highlights the specific word)
        setLanguageExample(
          highlightWord(
            data.language[language].word,
            data.language[language].example
          )
        );
        setTranslatedExample(
          highlightWord(
            data.language[knownLanguage].word,
            data.language[knownLanguage].example
          )
        );
        // Update shuffledQuestions for progress bar
        setShuffledQuestions(newQuestions); // Added this line
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  // When play button is pressed, play audio of word
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  // Highlight the word in the sentence
  const highlightWord = (word, languageExample) => {
    // Split the example into parts around the word variable
    const parts = languageExample.split(word);

    // Insert the highlighted word between each part
    const highlightedExample = parts.reduce((prev, curr, i) => {
      if (i === 0) {
        return [curr];
      } else {
        return [
          ...prev,
          <span
            key={i}
            className="highlight"
            style={{ color: "var(--main-purple)", fontWeight: "600" }}
          >
            {word}
          </span>,
          curr,
        ];
      }
    }, []);

    return highlightedExample;
  };

  // When microphone button is pressed, listen for user's response and compare to correct answer
  const useMicrophone = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log("Voice activated, you can speak to microphone");
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.onresult = function (event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      // Check if transcript contains the word
      if (transcript.toLowerCase().includes(word.toLowerCase())) {
        console.log("Yes"); // Word is heard
      } else {
        console.log("No"); // Word is not heard
      }
    };

    // Set the recognition to only last for 5 seconds
    recognition.start();
    setTimeout(() => recognition.stop(), 5000);
  };

  // Increment questionIndex and retrieve new word
  const nextQuestion = async () => {
    if (questionIndex < initialQuestionLength - 1) {
      setQuestionIndex(questionIndex + 1);
      await getRandomWord();
    }
  };

  return (
    <motion.div
      className="learn"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Container fluid className="home-header">
          <FontAwesomeIcon
            icon={faHouse}
            className="houseIcon"
            onClick={() => props.setPage && props.setPage("home")}
          />
        </Container>

        <Container
          fluid
          className="home-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - IconHeight)",
          }}
        >
          <div className="word-class">{wordClass}</div>

          <Container className="d-flex justify-content-center align-items-center gap-5 mb-4">
            <div className="word">{word}</div>

            <button onClick={playAudio} className="play-btn">
              <PlaySolid
                style={{
                  width: "60%",
                  height: "60%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </button>
          </Container>
          <div className="translation">{definition}</div>
          <div className="language-example">{languageExample}</div>

          <div className="translated-example">{translatedExample}</div>
          <div className="microphone"> </div>

          <button onClick={useMicrophone} className="microphone-btn">
            <Microphone
              style={{
                width: "70%",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </button>
          <div className="response-message">{responseMessage[0]}</div>
          <button className="next-btn" onClick={nextQuestion}>
            <ArrowRight />
          </button>

          <div className="response-message">{responseMessage[1]}</div>
        </Container>
      </div>
      <Container fluid className="footer">
        <ReviewProgBar
          questionIndex={questionIndex}
          questions={questions}
          shuffledQuestions={shuffledQuestions}
        />
      </Container>
    </motion.div>
  );
}
