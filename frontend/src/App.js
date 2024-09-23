// src/App.js
import React from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Watermelon",
    "Grapes",
    "Strawberry"
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SearchBar placeholder="Search fruits..." data={data} />
    </div>
  );
}

export default App;
