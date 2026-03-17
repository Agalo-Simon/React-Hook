import React, { useState, useEffect } from 'react';

const CountryWeather = ({ countryName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;

    const getFullDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Step 1: Fetch Country Details
        const countryRes = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!countryRes.ok) throw new Error("Country not found");
        
        const countryData = await countryRes.json();
        const country = countryData[0]; // Get the first match

        // Step 2: Extract Coordinates (latlng is usually [lat, lon])
        const [lat, lon] = country.capitalInfo.latlng;
        const capital = country.capital[0];

        // Step 3: Fetch Weather using coords from Step 1
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        if (!weatherRes.ok) throw new Error("Weather data unavailable");
        
        const weatherData = await weatherRes.json();

        // Step 4: Log to console (as per your requirement) and set state
        console.log(`Country: ${country.name.common}`);
        console.log(`Capital: ${capital}`);
        console.log(`Current Temp: ${weatherData.current_weather.temperature}°C`);

        setData({
          name: country.name.common,
          capital: capital,
          temp: weatherData.current_weather.temperature
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFullDetails();
  }, [countryName]);

  if (loading) return <p>Searching for {countryName}...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!data) return <p>Enter a country to see details.</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>{data.name}</h2>
      <p><strong>Capital:</strong> {data.capital}</p>
      <p><strong>Current Temperature:</strong> {data.temp}°C</p>
    </div>
  );
};

// Main App to provide the search input
export default function CountryWeth() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter country (e.g. France)" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Get Weather</button>
      </form>
      
      <hr />
      
      <CountryWeather countryName={submittedSearch} />
    </div>
  );
}