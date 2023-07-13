import React, { useState, useEffect } from "react";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import WordOfTheDay from "./components/WordOfTheDay";
import Settings from "./components/Settings";
import ReviewSettings from "./components/review-customisation";
import Learn from "./components/Learn";
import ReviewChoice from "./components/ReviewChoice";
import Testing from "./components/Testing";
import ReviewTrueFalse from "./components/ReviewTrueFalse";
import ReviewResults from "./components/ReviewResults";
import LearnResults from "./components/LearnResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReviewContext from "./ReviewContext";

export default function App() {
  const [page, setPage] = useState("home");
  const [textSize, setTextSize] = useState("medium");

  // Learn states
  const [progress, setProgress] = useState(0);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const initialQuestionLength = 10;
  const [questions, setQuestions] = React.useState(
    Array.from({ length: initialQuestionLength }, () => ({}))
  );

  useEffect(() => {
    document.body.className = `${textSize}-text`;
  }, [textSize]);

  // Reset all questions to empty objects
  const clearQuestions = () => {
    setQuestions(Array.from({ length: initialQuestionLength }, () => ({})));
    setQuestionIndex(0);
    console.log("Questions cleared");
    setPage("learn");
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "word_of_the_day":
        return <WordOfTheDay setPage={setPage} />;
      case "review":
        return <ReviewSettings setPage={setPage} />;
      case "review_choice":
        return <ReviewChoice setPage={setPage} />;
      case "review_true_false":
        return <ReviewTrueFalse setPage={setPage} />;
      case "settings":
        return <Settings setPage={setPage} textSize={textSize} setTextSize={setTextSize} />;
      case "learn":
        return (
          <Learn
            setPage={setPage}
            questions={questions}
            setQuestions={setQuestions}
            progress={progress}
            setProgress={setProgress}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            initialQuestionLength={initialQuestionLength}
          />
        );
      case "review_results":
        return <ReviewResults setPage={setPage} />;
      case "learn_results":
        return (
          <LearnResults
            setPage={setPage}
            questions={questions}
            initialQuestionLength={initialQuestionLength}
            setQuestionIndex={setQuestionIndex}
            setQuestions={setQuestions}
            clearQuestions={clearQuestions}
          />
        );
      default:
        return <Home setPage={setPage} />;
    }
  };

  const [qAmount, setQAmount] = useState(1);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <ReviewContext.Provider value={{qVal: qAmount, qFunc: setQAmount}}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wotd" element={<WordOfTheDay />} />
              <Route path="/review" element={<ReviewSettings />} />
              <Route path="/review/choice" element={<ReviewChoice />} />
              <Route path="/review/truefalse" element={<ReviewTrueFalse />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>
          </Router>
        </ReviewContext.Provider>
      </AnimatePresence>
    </div>
  );
}
