import "../css/learn.css";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as PlaySolid } from "../imgs/icons/play-solid.svg";
import { ReactComponent as Microphone } from "../imgs/icons/microphone-solid.svg";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ApiServerClient from "../ApiServerClient";

export default function Learn(props) {
  const wordClass = "";
  // const pronunciation = "/vwah-tur/";
  const [word, setWord] = React.useState("");
  const [languageExample, setLanguageExample] = React.useState("");
  const [translatedExample, setTranslatedExample] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const language = "french";
  const knownLanguage = "english";

  // Retrieve word from database
  const getRandomWord = async () => {
    try {
      const response = await ApiServerClient.getRandomWord();
      const data = response.data;
      console.log(data);
      console.log(data.language[language].word);

      // Set the word based on the language
      setWord(data.language[language].word);
      setLanguageExample(data.language[language].example);
      setTranslatedExample(data.language[knownLanguage].example);
      setDefinition(data.language[knownLanguage].definition);
      console.log(word);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const responseMessage = ["Good job!", "Try again."];

  // When play button is pressed, play audio of word in french
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

  // Highlight word in sentence example and translated example
  // setLanguageExample(highlightWord(word, languageExample));
  // setTranslatedExample(highlightWord(definition, translatedExample));

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

    // set the recognition to only last for 5 seconds
    recognition.start();
    setTimeout(() => recognition.stop(), 5000);
  };

  return (
    <motion.div
      className="learn"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        {/* <div className="pronunciation">{pronunciation}</div> */}
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
      </Container>
    </motion.div>
  );
}
