import React from "react";
import "../css/home.css";
import { ReactComponent as CalendarCheckIcon } from "../imgs/icons/calendar-check-regular.svg";
import { ReactComponent as GraduationCapIcon } from "../imgs/icons/graduation-cap-solid.svg";
import { ReactComponent as CircleCheckIcon } from "../imgs/icons/circle-check-solid.svg";
import { ReactComponent as ProgressIcon } from "../imgs/icons/bars-progress-solid.svg";
import { ReactComponent as CogWheelIcon } from "../imgs/icons/gear-solid.svg";
import { ReactComponent as ProfileIcon } from "../imgs/icons/profile-icon.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Home(props) {
  const buttons = [
    {
      Icon: CalendarCheckIcon,
      text: "Word of the Day",
      route: "/word-of-the-day",
    },
    { Icon: GraduationCapIcon, text: "Learn", route: "/learn" },
    { Icon: CircleCheckIcon, text: "Review", route: "/review" },
    { Icon: ProgressIcon, text: "Progress", route: "/progress" },
    { Icon: CogWheelIcon, text: "Settings", route: "/settings" },
    { Icon: ProfileIcon, text: "Userpage", route: "/userpage" },
  ];

  const navigate = useNavigate();

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
                navigate(button.route);
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
