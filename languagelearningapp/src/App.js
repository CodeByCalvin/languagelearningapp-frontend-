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

export default function App() {
  const [page, setPage] = useState("home");
  const [textSize, setTextSize] = useState("medium");

  useEffect(() => {
    document.body.className = `${textSize}-text`;
  }, [textSize]);

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
        return (
          <Settings
            setPage={setPage}
            textSize={textSize}
            setTextSize={setTextSize}
          />
        );
      case "learn":
        return <Learn setPage={setPage} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
    </div>
  );
}

