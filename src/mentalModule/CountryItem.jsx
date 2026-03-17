import React, { useState, useEffect } from 'react';

// Sub-component for individual Country
const Country = ({ name, capital }) => (
  <div style={{ border: '1px solid #eee', padding: '10px', margin: '5px' }}>
    <strong>{name}</strong>: {capital}
  </div>
);

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make sure the URL ends in /all
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data); // Check your console!
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtering strictly by the capital name
  const filtered = countries.filter((c) => {
    const capName = c.capital ? c.capital[0].toLowerCase() : "";
    return capName.includes(query.toLowerCase());
  });

  if (loading) return <div>Fetching countries...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filter by Capital</h2>
      <input 
        placeholder="Type a capital name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '250px' }}
      />

      <div>
        {filtered.map((c) => (
          <Country 
            key={c.cca3} 
            name={c.name.common} 
            capital={c.capital ? c.capital[0] : "No Capital"} 
          />
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;