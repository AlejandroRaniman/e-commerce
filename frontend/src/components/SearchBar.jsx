// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ placeholder, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const newFilter = data.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(newFilter);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '300px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      {searchTerm && (
        <div style={{ marginTop: '10px', maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd' }}>
          {filteredData.length > 0 ? (
            filteredData.map((value, key) => (
              <div key={key} style={{ padding: '10px', borderBottom: '1px solid #f1f1f1' }}>
                {value}
              </div>
            ))
          ) : (
            <div style={{ padding: '10px', color: '#aaa' }}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
