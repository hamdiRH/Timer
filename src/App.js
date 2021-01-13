import React, { useState, useEffect } from "react";

const App = () => {
  const [on, setOn] = useState(false);
  const [timems, settimems] = useState(0);
  const [interval, setinterval] = useState(null);
  const timeenms = (ms) => {
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;

    const hours = Math.floor(ms / msPerHour);
    const hoursRest = ms % msPerHour;
    const minutes = Math.floor(hoursRest / msPerMinute);
    const minutesRest = hoursRest % msPerMinute;
    const seconds = Math.floor(minutesRest / msPerSecond);

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  };
  const start = () => {
    if (interval) {
      clearInterval(interval);
      setinterval(0);
      setOn(false);
    } else setOn(true);
  };
  useEffect(() => {
    if (on) {
      const interval = setInterval(() => {
        settimems((timems) => timems + 1000);
      }, 1000);
      setinterval(interval);
      return () => clearInterval(interval);
    }
  }, [on]);
  const reset = () => {
    clearInterval(interval);
    settimems(0);
    setinterval(null);
  };
  return (
    <div className="time-container">
      <div className="time-inner-container">
        <div className="time-digits">{timeenms(timems)}</div>
        <div className="time-text">
          <div className="time-text-item">Hour</div>
          <div className="time-text-item">Minute</div>
          <div className="time-text-item">Second</div>
        </div>
      </div>
      <br />
      <br />
      <input
        className="btn"
        type="button"
        value={interval ? "Pause" : "Start"}
        onClick={start}
      />
      <input className="btn" type="button" value="Reset" onClick={reset} />
    </div>
  );
};

export default App;
