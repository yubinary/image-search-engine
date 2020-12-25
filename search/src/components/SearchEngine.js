import React, { useState } from 'react';

export default function SearchResult({ getImages }) {
  const [searchTerm, setSearchTerm] = useState("");

  // apply whatever inside the input field to state
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  // when form submitted, send get request to API
  const handleSubmit = event => {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    getImages(searchTerm);
  }

  return (
    <div>
      <div className="search">
        <h2>Looking for a Photo?</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}></input>
        </form>
      </div>
    </div>
  )
}