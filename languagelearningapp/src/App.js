import React, { useState } from "react";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import DummyPage from "./components/dummyPage";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

import ReviewChoice from "./components/ReviewChoice";
import ReviewCustomisation from "./components/review-customisation";
import WordOfTheDay from "./components/WordOfTheDay";

import Review from "./components/review-customisation";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "word_of_the_day":
        return <WordOfTheDay setPage={setPage} />;

      case "review":
        return <ReviewChoice setPage={setPage} />;
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
