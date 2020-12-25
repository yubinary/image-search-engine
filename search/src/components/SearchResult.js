import React, { useState } from 'react';
import axios from 'axios';
import SearchEngine from "./SearchEngine.js";
import { BiComment, BiHeart, BiLike } from "react-icons/bi";
import "../styles/SearchResult.css";

export default function SearchResult() {
  const [images, setImages] = useState([]);

  // when form submitted, send get request to API
  function getImages(searchTerm) {
    var API_KEY = "19383178-42909148a8b02e3e78ee4e9be";
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchTerm) + "&image_type=photo&pretty=true";

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