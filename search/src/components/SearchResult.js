import React, { useState } from 'react';
import axios from 'axios';
import SearchEngine from "./SearchEngine.js";
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

  function makeGrid(images) {
    let result = [];
    let imagesCopy = JSON.parse(JSON.stringify(images));
    for (let n = 0; n < images.length; n += 2) {
      result.push(
        <div className="column">
          {imagesCopy.splice(n, 3).map(image =>
            <div className="card">
              <img src={image.largeImageURL} alt={image.id} />
              <div className="container">
                <p>[{image.imageWidth}x{image.imageHeight}] {image.id}</p>
              </div>
            </div>
          )}
        </div>
      )
    }
    return result
  }

  return (
    <div>
      <SearchEngine getImages={getImages} />
      <div className="images">
        <div className="row">
          {makeGrid(images)}
        </div>
      </div>
    </div >
  )
}