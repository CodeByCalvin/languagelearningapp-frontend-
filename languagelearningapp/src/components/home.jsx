import React from "react";
import "../css/home.css";
import { ReactComponent as CalendarCheckIcon } from "../imgs/icons/calendar-check-regular.svg";
import { ReactComponent as GraduationCapIcon } from "../imgs/icons/graduation-cap-solid.svg";
import { ReactComponent as CircleCheckIcon } from "../imgs/icons/circle-check-solid.svg";
import { ReactComponent as ProgressIcon } from "../imgs/icons/bars-progress-solid.svg";
import { ReactComponent as CogWheelIcon } from "../imgs/icons/gear-solid.svg";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="main-content">
      <div className="buttons-container">
        <button className="home-btn">
          <CalendarCheckIcon className="home-btn-icon" />
          Word of the Day
        </button>
        <button className="home-btn">
          <GraduationCapIcon className="home-btn-icon" />
          Learn
        </button>
        <button className="home-btn">
          <CircleCheckIcon className="home-btn-icon" />
          Review
        </button>
        <button className="home-btn">
          <ProgressIcon className="home-btn-icon" />
          Progress
        </button>
        <button className="home-btn">
          <CogWheelIcon className="home-btn-icon" />
          Settings
        </button>
      </div>
      <Navbar />
    </div>
  );
}
