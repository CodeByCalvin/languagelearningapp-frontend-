import React from "react";
import "../css/home.css";
import { ReactComponent as CalendarCheckIcon } from "../imgs/icons/calendar-check-regular.svg";
import { ReactComponent as GraduationCapIcon } from "../imgs/icons/graduation-cap-solid.svg";
import { ReactComponent as CircleCheckIcon } from "../imgs/icons/circle-check-solid.svg";
import { ReactComponent as ProgressIcon } from "../imgs/icons/bars-progress-solid.svg";
import { ReactComponent as CogWheelIcon } from "../imgs/icons/gear-solid.svg";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

export default function Home() {
  const buttons = [
    { Icon: CalendarCheckIcon, text: "Word of the Day" },
    { Icon: GraduationCapIcon, text: "Learn" },
    { Icon: CircleCheckIcon, text: "Review" },
    { Icon: ProgressIcon, text: "Progress" },
    { Icon: CogWheelIcon, text: "Settings" },
  ];

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.07,
      },
    }),
    whileTap: { scale: 0.9 },
  };

  return (
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
          >
            <button.Icon className="home-btn-icon" />
            {button.text}
          </motion.button>
        ))}
      </motion.div>
      <Navbar />
    </div>
  );
}
