import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

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
        <form onSubmit={handleSubmit}>
          <FaSearch className="icon" />
          <input
            className="input"
            type="text"
            placeholder="Looking for images?"
            value={searchTerm}
            onChange={handleChange}></input>
        </form>
      </div>
    </div>
  )
}