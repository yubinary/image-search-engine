import React, { useState, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import Checkbox from "./Checkbox.js"

export default function SearchResult({ getImages }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [orie, setOrie] = useState("");
  const [minWidth, setMinWidth] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [color, setColor] = useState({});

  // debounce to send request every 500ms
  const debounce = (fn, delay) => {
    let timeoutID;
    return function (...args) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // used callback to avoid function being created every time
  const debounceMinWidth = useRef(
    debounce((event) =>
      getImages(searchTerm, order, orie, event.target.value, minHeight, color), 500
    )
  ).current;

  const debounceMinHeight = useRef(
    debounce((event) =>
      getImages(searchTerm, order, orie, minWidth, event.target.value, color), 500
    )
  ).current;

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

  function handleChangeMinWidth(event) {
    setMinWidth(event.target.value);
    debounceMinWidth(event);
  };

  function handleChangeMinHeight(event) {
    setMinHeight(event.target.value);
    debounceMinHeight(event)
  };

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
          <form>
            <input
              value={minWidth}
              placeholder="Min Width"
              onChange={handleChangeMinWidth}></input>
            <p>x</p>
            <input
              value={minHeight}
              placeholder="Min Height"
              onChange={handleChangeMinHeight}></input>
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