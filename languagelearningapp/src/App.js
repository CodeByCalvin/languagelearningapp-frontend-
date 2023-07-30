import React, { useState, useEffect, useCallback, useContext } from "react";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import WordOfTheDay from "./pages/WordOfTheDay";
import Settings from "./pages/Settings";
import ReviewSettings from "./pages/review-customisation";
import Learn from "./pages/Learn";
import ReviewChoice from "./pages/ReviewChoice";
import Testing from "./components/Testing";
import ReviewTrueFalse from "./pages/ReviewTrueFalse";
import ReviewResults from "./pages/ReviewResults";
import LearnResults from "./pages/LearnResults";
import Progress from "./components/Progress/Progress";
import { Routes, Route, useNavigate } from "react-router-dom";
import ReviewContext from "./context/ReviewContext";
import AppContext from "./context/AppContext";
import ReviewMatch from "./pages/ReviewMatch";
import { UserProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import TestNavbar from "./components/testingNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Userpage from "./pages/userpage";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/word-of-the-day" element={<WordOfTheDay navigateToPage={navigateToPage} />} />
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
        <Route path="/review" element={<ReviewSettings navigateToPage={navigateToPage} />} />
        <Route path="/review/choice" element={<ReviewChoice navigateToPage={navigateToPage} />} />
        <Route
          path="/review/truefalse"
          element={<ReviewTrueFalse navigateToPage={navigateToPage} />}
        />
        <Route
          path="/review/match"
          element={<ReviewMatch navigateToPage={navigateToPage} />}
        />
        <Route path="/review/results" element={<ReviewResults navigateToPage={navigateToPage} />} />
        <Route
          path="/settings"
          element={<Settings navigateToPage={navigateToPage} />}
        />
        <Route
          path="/progress"
          element={<Progress navigateToPage={navigateToPage} />}
        />
        <Route
          path="/userpage"
          element={<Userpage navigateToPage={navigateToPage} />} // Pass the navigateToPage function as a prop
        />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  const [reviewSettings, setReviewSettings] = useState({
    qAmount: 1,
    timer: true,
  });

  const [appSettings, setAppSettings] = useState({
    selectedLanguage: "English",
    learnLanguage: "French",
    selectedLanguageCode: "GB",
    learnLanguageCode: "FR",
  });

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <UserProvider>
          <ReviewContext.Provider value={{ rVal: reviewSettings, rFunc: setReviewSettings }}>
            <AppContext.Provider value={{ aVal: appSettings, aFunc: setAppSettings }}>
              {/* <TestNavbar /> */}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: "#7950f2",
                    color: "#fff",
                    fontSize: "20px",
                  },
                }}
              />
              <RoutesWrapper />
            </AppContext.Provider>
          </ReviewContext.Provider>
        </UserProvider>
      </AnimatePresence>
    </div>
  );
}
