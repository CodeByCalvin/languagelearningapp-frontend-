import React, { useState, useEffect, useCallback } from "react";
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ReviewContext from "./ReviewContext";

// This function converts button names to route paths
function getRouteFromButtonName(buttonName) {
  return "/" + buttonName.toLowerCase().split(" ").join("-");
}

function RoutesWrapper() {
  const navigate = useNavigate();
  const navigateToPage = useCallback(
    (pageName) => {
      const route = getRouteFromButtonName(pageName);
      if (route) {
        navigate(route);
      } else {
        console.error(`Invalid page name: ${pageName}`);
      }
    },
    [navigate]
  );

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
    navigateToPage("learn");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/word-of-the-day"
        element={<WordOfTheDay navigateToPage={navigateToPage} />}
      />
      <Route
        path="/learn"
        element={
          <Learn
            questions={questions}
            setQuestions={setQuestions}
            progress={progress}
            setProgress={setProgress}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            initialQuestionLength={initialQuestionLength}
            navigateToPage={navigateToPage}
          />
        }
      />
      <Route
        path="/learn/results"
        element={
          <LearnResults
            questions={questions}
            initialQuestionLength={initialQuestionLength}
            setQuestionIndex={setQuestionIndex}
            setQuestions={setQuestions}
            clearQuestions={clearQuestions}
            navigateToPage={navigateToPage}
          />
        }
      />
      <Route
        path="/review"
        element={<ReviewSettings navigateToPage={navigateToPage} />}
      />
      <Route path="/review/choice" element={<ReviewChoice />} />
      <Route path="/review/truefalse" element={<ReviewTrueFalse />} />
      <Route
        path="/settings"
        element={<Settings navigateToPage={navigateToPage} />}
      />
    </Routes>
  );
}

export default function App() {
  // const renderPage = () => {
  //   switch (page) {
  //     case "home":
  //       return <Home setPage={setPage} />;
  //     case "word_of_the_day":
  //       return <WordOfTheDay setPage={setPage} />;
  //     case "review":
  //       return <ReviewSettings setPage={setPage} />;
  //     case "review_choice":
  //       return <ReviewChoice setPage={setPage} />;
  //     case "review_true_false":
  //       return <ReviewTrueFalse setPage={setPage} />;
  //     case "settings":
  //       return (
  //         <Settings
  //           setPage={setPage}
  //           textSize={textSize}
  //           setTextSize={setTextSize}
  //         />
  //       );
  //     case "learn":
  //       return (
  //         <Learn
  //           setPage={setPage}
  //           questions={questions}
  //           setQuestions={setQuestions}
  //           progress={progress}
  //           setProgress={setProgress}
  //           questionIndex={questionIndex}
  //           setQuestionIndex={setQuestionIndex}
  //           initialQuestionLength={initialQuestionLength}
  //         />
  //       );
  //     case "review_results":
  //       return <ReviewResults setPage={setPage} />;
  //     case "learn_results":
  //       return (
  //         <LearnResults
  //           setPage={setPage}
  //           questions={questions}
  //           initialQuestionLength={initialQuestionLength}
  //           setQuestionIndex={setQuestionIndex}
  //           setQuestions={setQuestions}
  //           clearQuestions={clearQuestions}
  //         />
  //       );
  //     default:
  //       return <Home setPage={setPage} />;
  //   }
  // };

  const [qAmount, setQAmount] = useState(1);

  return (
    <div className="App">
      <ReviewContext.Provider value={{ qVal: qAmount, qFunc: setQAmount }}>
        <Router>
          <RoutesWrapper />
        </Router>
      </ReviewContext.Provider>
    </div>
  );
}
