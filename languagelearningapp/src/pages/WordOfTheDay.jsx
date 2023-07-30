import React, { useEffect, useState } from "react";
import "../css/WordOfTheDay.css";
import ApiServerClient from "../ApiServerClient";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faHouse } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import PlaceholderLoader from "../components/PlaceholderLoader";
import HomeButtonHeader from "../components/HomeButtonHeader";

const WordOfTheDay = (props) => {
  const { setPage } = props;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [exampleTranslated, setExampleTranslated] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordDate, setWordDate] = useState("");

  useEffect(() => {
    getRandomWord();
  }, []);

  // change word in example color
  useEffect(() => {
    if (example.includes(word)) {
      const regex = new RegExp(`(${word}\\S*\\.?)`);
      const parts = example.split(regex);
      const newExample = parts.map((part, index) => {
        // if first 3 letters of part are the same as word, then highlight
        if (part.substring(0, 3) === word.substring(0, 3)) {
          return (
            <span key={index} className="highlighted">
              {part}
            </span>
          );
        } else {
          return part + " ";
        }
      });
      setExample(newExample);
    }
  }, [example, word]);

  // change translation in exampleTranslation color
  useEffect(() => {
    if (exampleTranslated.includes(translation)) {
      const regex = new RegExp(`(${translation}\\S*\\.?)`);
      const parts = exampleTranslated.split(regex);
      const newExample = parts.map((part, index) => {
        // if first 3 letters of part are the same as word, then highlight
        if (part.substring(0, 3) === translation.substring(0, 3)) {
          return (
            <span key={index} className="highlighted">
              {part}
            </span>
          );
        } else {
          return part + " ";
        }
      });
      setExampleTranslated(newExample);
    }
  }, [exampleTranslated, translation]);

  const getRandomWord = async () => {
    try {
      const response = await ApiServerClient.getRandomWord();
      setTimeout(() => {
        console.log(response.data);
        const data = response.data;
        setWord(data.language.english.word);
        setWordDate(response.data.date);
        // set language here
        const language = "spanish";
        setTranslation(data.language[language].word);
        setDefinition(data.language.english.definition);
        setExample(data.language.english.example);
        setExampleTranslated(data.language[language].example);
        // set isLoaded to true
        setIsLoaded(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const speakText = (text, lang) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      synth.speak(utterance);
    } else {
      alert("Sorry, speech synthesis is not supported in your browser.");
    }
  };

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
      <HomeButtonHeader navigateToPage={props.navigateToPage} />

      <Container fluid className="wotd-container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column">
            <h3>{wordDate}</h3>
            <h1>{translation}</h1>
          </div>
          <FontAwesomeIcon
            className="i"
            icon={faVolumeHigh}
            onClick={() => speakText(translation, "es-ES")}
          />
        </div>
        <h2>{word}</h2>
        <br />
        <br />
        <h2>{exampleTranslated}</h2>
        <h3>{example}</h3>
      </Container>
      <Container fluid className="descContainer">
        <div className="descBox">
          <div className="descTop">
            <h3>Definition</h3>
          </div>
          <hr />
          <h3>{definition}</h3>
        </div>
      </Container>
    </motion.div>
  );
};

export default WordOfTheDay;
