import React, { useState } from "react";
import Calendar from "react-calendar";
import { DateTime } from "luxon"; // ✅ Using Luxon
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css"; // Custom styles

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());

  const handleDateChange = (date) => {
    const luxonDate = DateTime.fromJSDate(date);
    setSelectedDate(luxonDate);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar onChange={handleDateChange} value={selectedDate.toJSDate()} />
      <p>Selected Date: {selectedDate.toFormat("DDDD")} (Weekday: {selectedDate.weekdayLong})</p>
    </div>
  );
};


export default CalendarPage;
