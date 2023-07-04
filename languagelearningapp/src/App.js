
import Home from "./components/home";
import DummyPage from "./components/dummyPage";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import "./App.css";
import WordOfTheDay from "./components/WordOfTheDay";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="App">

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <Home setPage={setPage} />
        ) : (
          <WordOfTheDay setPage={setPage} />
        )}
      </AnimatePresence>

    </div>
  );
}
