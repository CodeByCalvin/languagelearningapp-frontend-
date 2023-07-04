import React, { useEffect, useState } from "react";
import "../css/WordOfTheDay.css";
import ApiServerClient from "../ApiServerClient";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faHouse } from "@fortawesome/free-solid-svg-icons";

const WordOfTheDay = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [exampleTranslated, setExampleTranslated] = useState("");

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
    const response = await ApiServerClient.getRandomWord();
    const data = response.data;
    setWord(data.language.english.word);
    // set language here
    const language = "spanish";
    setTranslation(data.language[language].word);
    setDefinition(data.language.english.definition);
    setExample(data.language.english.example);
    setExampleTranslated(data.language[language].example);
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

  return (
    <div className="wotd">
      <Container fluid className="homeContainer">
        <FontAwesomeIcon icon={faHouse} className="houseIcon" />
      </Container>
      <Container fluid className="wotd-container">
        <div className="d-flex justify-content-center align-items-center">
          <h1>{translation}</h1>
          <FontAwesomeIcon
            className="i"
            icon={faVolumeHigh}
            onClick={() => speakText(translation, "es-ES")}
          />
        </div>
        <h2>{word}</h2>
        <br />
        <br />
        <h2>'{exampleTranslated}'</h2>
        <h3>'{example}'</h3>
      </Container>
      <Container fluid className="descContainer">
        <div className="descBox">
          <div className="descTop"><h3>Definition</h3></div>
          <hr />
          <h3>{definition}</h3>
        </div>
      </Container>
    </div>
  );
};

export default WordOfTheDay;
