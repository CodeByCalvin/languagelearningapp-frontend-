import React, { useEffect, useState } from "react";
import "../css/WordOfTheDay.css";
import ApiServerClient from "../ApiServerClient";
import { Container, Row, Col } from "react-bootstrap";

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

  return (
    <div className="wotd">
      <Container fluid className="wotd-container">
        <h1>{translation}</h1>
        <h2>{word}</h2>
        <br />
        <br />
        <h2>{exampleTranslated}</h2>
        <h3>{example}</h3>
        <br />
        <br />
        <h3>{definition}</h3>
      </Container>
    </div>
  );
};

export default WordOfTheDay;
