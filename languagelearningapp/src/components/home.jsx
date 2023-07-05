import React from "react";
import "../css/home.css";
import { ReactComponent as CalendarCheckIcon } from "../imgs/icons/calendar-check-regular.svg";
import { ReactComponent as GraduationCapIcon } from "../imgs/icons/graduation-cap-solid.svg";
import { ReactComponent as CircleCheckIcon } from "../imgs/icons/circle-check-solid.svg";
import { ReactComponent as ProgressIcon } from "../imgs/icons/bars-progress-solid.svg";
import { ReactComponent as CogWheelIcon } from "../imgs/icons/gear-solid.svg";
import Navbar from "./navbar";
import { motion } from "framer-motion";

export default function Home(props) {
  const buttons = [
    { Icon: CalendarCheckIcon, text: "Word of the Day" },
    { Icon: GraduationCapIcon, text: "Learn" },
    { Icon: CircleCheckIcon, text: "Review" },
    { Icon: ProgressIcon, text: "Progress" },
    { Icon: CogWheelIcon, text: "Settings" },
  ];

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        y: { duration: 0.05 },
        opacity: { duration: 1 },
      },
    }),
    whileTap: { scale: 0.1 },
  };

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="homeDiv"
    >
      <div className="main-content">
        <motion.div
          className="buttons-container"
          initial="hidden"
          animate="visible"
        >
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              className="home-btn"
              custom={index}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileTap="whileTap"
              onClick={() => {
                let newPage = button.text.toLowerCase().replace(/\s+/g, "_");
                props.setPage && props.setPage(newPage);
              }}
            >
              <button.Icon className="home-btn-icon" />
              {button.text}
            </motion.button>
          ))}
        </motion.div>
        <Navbar />
      </div>
    </motion.div>
  );
}
