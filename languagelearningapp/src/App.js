import Home from "./components/home";
import DummyPage from "./components/dummyPage";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReviewCustomisation from "./components/review-customisation";

import "./App.css";
import WordOfTheDay from "./components/WordOfTheDay";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="App">
      <ReviewCustomisation />
      {/* <AnimatePresence mode="wait">
        {page === "home" ? (
          <Home setPage={setPage} />
        ) : (
          <WordOfTheDay setPage={setPage} />
        )}
      </AnimatePresence> */}
    </div>
  );
}
