import React, { useContext, useState } from 'react';
import {AppContext} from './context/AppContext.jsx'

const InputHistory = () => {

  const {name, phone} = useContext(AppContext);
  

  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]); // This stores your array of entries

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Every time the user types, we add the current string to the history array
    // We use the spread operator [...] to keep old items and add the new one
    setHistory([...history, newValue]);
  };

  const isOverLimit = value.length > 10;

  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Phone: {phone}</p>


      <h4 style={{ color: isOverLimit ? 'red' : 'black' }}>
        Current: {value} (Total changes: {history.length})
      </h4>
      
      <input style={{color: isOverLimit? 'orange': 'black',
        borderColor:isOverLimit?'red':'black',
      }}
        type="text" 
        value={value} 
        onChange={handleChange} 
      />

      <hr />
      <h5>History Log:</h5>

      <ul>
        {/* We map through the array to display every "count" of time */}
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputHistory;