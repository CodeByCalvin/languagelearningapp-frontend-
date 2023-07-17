import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/calendarOverrides.css";

const style = {
  learned: "circle-learned",
  reviewed: "circle-reviewed",
};

export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  // Dummy data (alternating between learned and reviewed)
  const activityDates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date,
      type: i % 2 === 0 ? "learned" : "reviewed", //
    };
  });

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      for (let i = 0; i < activityDates.length; i++) {
        if (
          activityDates[i].date.getYear() === date.getYear() &&
          activityDates[i].date.getMonth() === date.getMonth() &&
          activityDates[i].date.getDate() === date.getDate()
        ) {
          return style[activityDates[i].type];
        }
      }
    }
  };

  return <Calendar tileClassName={tileClassName} />;
}
