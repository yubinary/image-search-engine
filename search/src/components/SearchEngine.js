import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Checkbox from "./Checkbox.js"

export default function SearchResult({ getImages }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [orie, setOrie] = useState("");
  const [minWidth, setMinWidth] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [color, setColor] = useState({});


  // apply whatever inside the input field to state
  function handleChangeOrder(event) {
    setOrder(event.target.value);
    getImages(searchTerm, event.target.value, orie, minWidth, minHeight, color);
  };

  function handleChangeOrie(event) {
    setOrie(event.target.value);
    getImages(searchTerm, order, event.target.value, minWidth, minHeight, color);
  };

  function handleChangeColor(event) {
    let obj = { ...color, [event.target.name]: event.target.checked }
    setColor(obj);
    getImages(searchTerm, order, orie, minWidth, minHeight, obj);
  }

  // when form submitted, send get request to API
  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    getImages(searchTerm, order, orie, minWidth, minHeight, color);
  }

  const checkboxes = [
    {
      name: "grayscale",
      key: "grayscale",
      label: "grayscale",
    },
    {
      name: "red",
      key: "red",
      label: "red",
    },
    {
      name: "orange",
      key: "orange",
      label: "orange",
    },
    {
      name: "green",
      key: "green",
      label: "green",
    },
    {
      name: "blue",
      key: "blue",
      label: "blue",
    },
    {
      name: "brown",
      key: "brown",
      label: "brown",
    }
  ];

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
            onChange={(event) => setSearchTerm(event.target.value)}></input>
        </form>
      </div>
      <div className="advanced">
        <div className="sort order">
          <select onChange={handleChangeOrder}>
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
          </select>
          <div className="select-arrow"></div>
        </div>
        <div className="sort orie">
          <select onChange={handleChangeOrie}>
            <option value="all">All Shapes</option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
          <div className="select-arrow"></div>
        </div>
        <div className="filter min">
          <form onSubmit={handleSubmit}>
            <input
              value={minWidth}
              placeholder="Min Width"
              onChange={(event) => setMinWidth(event.target.value)}></input>
            <p>x</p>
            <input
              value={minHeight}
              placeholder="Min Height"
              onChange={(event) => setMinHeight(event.target.value)}></input>
          </form>
        </div>
        <div className="filter color">
          {
            checkboxes.map(item => (
              <div>
                <Checkbox id={item.name} name={item.name} checked={color[item.name]} onChange={handleChangeColor} />
                <label htmlFor={item.name}></label>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}