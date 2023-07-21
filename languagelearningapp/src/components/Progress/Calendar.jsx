import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/calendarOverrides.css";

const style = {
  learned: "circle-learned",
  reviewed: "circle-reviewed",
};

export default function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());

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
        classes.push(style.learned);
      }

      // Check if the date is in the reviewedWordsDates array
      if (props.reviewedWordsDates.includes(formattedDate)) {
        classes.push(style.reviewed);
      }

      // Return the classes as a space-separated string
      return classes.join(" ");
    }
  };

  return (
    <Calendar value={value} onChange={onChange} tileClassName={tileClassName} />
  );
}
