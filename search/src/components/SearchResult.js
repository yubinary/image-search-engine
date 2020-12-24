import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from "../styles/SearchResult.css"

export default function SearchResult() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    var API_KEY = "19383178-42909148a8b02e3e78ee4e9be";
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=cornell&image_type=photo&pretty=true";
    axios.get(URL)
      .then(result => {
        setImages(result.data.hits);
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  // const debounce = (fn, delay) => {
  //   let timeoutID;
  //   return function (...args) {
  //     if (timeoutID) {
  //       clearTimeout(timeoutID);
  //     }
  //     timeoutID = setTimeout(() => {
  //       fn(...args)
  //     }, delay)
  //   }
  // }

  // const throttle = (fn, delay) => {
  //   let last = 0;
  //   return function (...args) {
  //     const now = new Date().getTime();
  //     if (now - last < delay) return;
  //     else last = now;
  //     return fn(...args);
  //   }
  // }

  const submit = event => {
    event.preventDefault()
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
        <div class="column">
          {imagesCopy.splice(n, 3).map(image =>
            <div class="card">
              <img src={image.largeImageURL} />
              <div class="container">
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
      <div className="search">
        <h2>Looking for a Photo?</h2>
        <form onSubmit={submit}>
          <input
            className="input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}></input>
        </form>
      </div>
      <div className="message">
        <h4>Want to download a photo?</h4>
        <div className="details">
          <p>If you want to download a photo of you,
          want to use a high quality photo with credit,
          or recreate an image, fill out this one-minute form!</p>
          <p>You will be able to easily contact the photo editor and get the image through your email.</p>
        </div>
        <button><a href="https://docs.google.com/forms/d/e/1FAIpQLSeV3s01-jiwJ6yi1MXGmqXdczsub9rF3SsLvOsBZpHOhiMW3w/viewform">REQUEST FORM</a></button>
      </div>
      <div className="images">
        <div class="row">
          {makeGrid(images)}
        </div>
      </div>
    </div >
  )
}