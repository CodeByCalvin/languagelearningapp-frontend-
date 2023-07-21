import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/calendarOverrides.css";

export default function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());
  const [currentClass, setCurrentClass] = useState("circle-learned");

  const switchWords = () => {
    setCurrentClass(
      currentClass === "circle-learned" ? "circle-reviewed" : "circle-learned"
    );
  };

  const tileClassName = ({ date, view }) => {
    let formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (view === "month") {
      let classes = [];

      // Check if the date is in the learnedWordsDates array
      if (props.learnedWordsDates.includes(formattedDate)) {
        classes.push(currentClass);
      }

      // Check if the date is in the reviewedWordsDates array
      if (props.reviewedWordsDates.includes(formattedDate)) {
        classes.push(currentClass);
      }

      // Return the classes as a space-separated string
      return classes.join(" ");
    }
  };

  return (
    <div>
      <div className="calendar-header">
        <button
          className={
            currentClass === "circle-learned"
              ? "calendar-switch switch-learned"
              : "calendar-switch switch-reviewed"
          }
          onClick={() => switchWords()}
        >
          {currentClass === "circle-learned"
            ? "Learned Words"
            : "Reviewed Words"}
        </button>
      </div>

      <Calendar
        value={value}
        onChange={onChange}
        tileClassName={tileClassName}
      />
    </div>
  );
}
