import React, { useState, useEffect } from "react";

const TimedDisplay = () => {
  const [number, setNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => prev + 1);
    }, 1000);
    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsVisible(true);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Timer Challenge</h1>
      <p>{number}</p>
      <p style={{ color: isVisible ? "orange" : "green" }}>
        {isVisible ? "Done ✅" : "Data...."}
      </p>
    </div>
  );
};

export default TimedDisplay;
