import React, { useState } from 'react';
import axios from 'axios';
import SearchEngine from "./SearchEngine.js";
import { BiComment, BiHeart, BiLike } from "react-icons/bi";
import "../styles/SearchResult.css";

export default function SearchResult() {
  const [images, setImages] = useState([]);

  // helper function to clean color object
  function makeListParameter(color) {
    let result = [];
    for (const key in color) {
      if (color[key]) result.push(key);
    } return result.join(",");
  }

  // when form submitted, send get request to API
  function getImages(searchTerm, order, orie, minWidth, minHeight, color) {
    const API_KEY = "19383178-42909148a8b02e3e78ee4e9be";
    let searchURL = "&q=" + encodeURIComponent(searchTerm);
    let orderURL = order ? "&order=" + order : "";
    let orieURL = orie ? "&orientation=" + orie : "";
    let widthURL = minWidth ? "&min_width=" + minWidth : "";
    let heightURL = minHeight ? "&min_height=" + minHeight : "";
    let colorURL = color ? "&colors=" + makeListParameter(color) : "";
    let defaultURL = "&image_type=photo&pretty=true";
    let URL = "https://pixabay.com/api/?key=" + API_KEY + searchURL + orderURL + orieURL + widthURL + heightURL + colorURL + defaultURL;

    console.log(URL)
    axios.get(URL)
      .then(result => {
        setImages(result.data.hits);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function displayTags(tags) {
    let lst = tags.split(",");
    let result = [];
    for (let t of lst) {
      result.push(
        <div className="tag">
          <p>{t}</p>
        </div>
      )
    } return result
  }

  function displayStats(comments, favorites, likes) {
    return (
      <div className="stat">
        <BiComment className="stat-icon" /><p>{comments}</p>
        <BiHeart className="stat-icon" /><p>{favorites}</p>
        <BiLike className="stat-icon" /><p>{likes}</p>
      </div>
    )
  }

  function displayImages(images, n) {
    let result = [];
    for (let i = n; i < images.length; i += 4) {
      let image = images[i];
      result.push(
        <div className="card">
          <img src={image.largeImageURL} alt={image.id} />
          <div className="container">
            <div className="stats">
              {displayStats(image.comments, image.favorites, image.likes)}
            </div>
            <div className="tags">
              {displayTags(image.tags)}
            </div>
          </div>
        </div>
      )
    }
    return result;
  }

  function createColumns(images) {
    let result = [];
    let imagesCopy = JSON.parse(JSON.stringify(images));
    for (let n = 0; n < 4; n++) {
      result.push(
        <div className="column">
          {displayImages(imagesCopy, n)}
        </div>
      )
    } return result;
  }

  return (
    <div>
      <SearchEngine getImages={getImages} />
      <div className="images">
        <div className="row">
          {createColumns(images)}
        </div>
      </div>
    </div >
  )
}