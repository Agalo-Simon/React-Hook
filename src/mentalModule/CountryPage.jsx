import React, { useState, useEffect } from 'react';

// Separate Component for each country
const CountryItem = ({ name, capital }) => (
  <div style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
    <strong>{name}</strong> - <span>{capital}</span>
  </div>
);

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter Logic: Targeting the capital specifically
  const filteredCountries = countries.filter((country) => {
    // 1. Check if capital exists (some countries don't have one in the API)
    // 2. Access the first element of the array [0]
    const capital = country.capital ? country.capital[0].toLowerCase() : "";
    return capital.includes(query.toLowerCase());
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Filter by capital..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />

      {filteredCountries.length > 0 ? (
        filteredCountries.map((c) => (
          <CountryItem 
            key={c.cca3} 
            name={c.name.common} 
            capital={c.capital ? c.capital[0] : "N/A"} 
          />
        ))
      ) : (
        <p>No capitals match "{query}"</p>
      )}
    </div>
  );
};

export default CountriesPage;