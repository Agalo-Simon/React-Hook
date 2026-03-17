import React, { useEffect, useState } from "react";

const GrowingList = () => {
  const [data, setData] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>{
        const newList = prev.length+1
        return [...prev, newList]
      });
    }, 1000);
    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsDone(true);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <div>
      [{data.join(",")}]
      </div>

      {isDone ? (
        <p style={{color: isDone? "orange": "green" }}>The stream will stop in 5 seconds</p>
      ) : (
        <p style={{color: isDone? "orange": "green" }}>Receiving Data.....</p>
      )}
    </div>
  );
};

export default GrowingList;
