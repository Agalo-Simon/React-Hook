import React, { useEffect, useState } from "react";

const StringStream = () => {
  const [displayString, setDisplayString] = useState([]);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const words = ["React", "is", "powerful", "and", "flexible", "extra"];
    const interval = setInterval(() => {
      setDisplayString((prev) => {
        if (prev.length < words.length) {
          // const newWords = words[prev.length];
          return [...prev, words[prev.length]];
        }
      });
    }, 2000);
    const timer = setInterval(() => {
      clearInterval(interval);
      setIsFinish(true);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <p>[{displayString.join(" ")}]</p>
      <p style={{ color: isFinish ? "orange" : "green", fontWeight: "bold" }}>
        {isFinish ? "Done locked ✅" : "Streaming...."}
      </p>

      <p>
        Current State: <str>{JSON.stringify(displayString)}</str>
      </p>
    </div>
  );
};

export default StringStream;
