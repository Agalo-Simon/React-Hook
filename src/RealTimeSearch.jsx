import React, { useState } from "react";

const RealTimeSearch = () => {
  const items = ["Apple", "Orange", "Mangoes", "Banana", "Guava"];
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
      {items && (
        <ul>
          {filterItems.map((item) => (
            <li key={item.id}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RealTimeSearch;
