import React, { useState } from "react";

const RealTimeSearch = () => {
  const items = ["Apple", "Orange", "Mangoes", "Banana" ,""];
  const [query, setQuery] = useState("");

  const filterItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..............."
      />
      {items &&
        <ul>
          {filterItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default RealTimeSearch;
