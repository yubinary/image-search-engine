import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyImage } from "react-lazy-images";
import SearchEngine from "../components/SearchEngine.js";
import Header from "../components/Header.js";
import { BiComment, BiHeart, BiLike, BiErrorAlt } from "react-icons/bi";
import "../styles/SearchResult.css";

export default function SearchResult() {
  const [images, setImages] = useState([]);
  const [isBottom, setisBottom] = useState(false);
  const [page, setPage] = useState(1);
  const [urlParam, setUrlParam] = useState("");

  // throttle to enable infinite scrolling
  const throttle = (fn, delay) => {
    let last = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - last < delay) return;
      else last = now;
      return fn(...args);
    }
  }

  useEffect(() => {
    function onScroll(event) {
      let scrollHeight = event.target.scrollingElement.scrollHeight;
      let scrollTop = event.target.scrollingElement.scrollTop;
      let clientHeight = event.target.scrollingElement.clientHeight
      setisBottom(scrollHeight - scrollTop < clientHeight + 600)
    }
    const throttleOnScroll = throttle(onScroll, 800);
    window.addEventListener('scroll', throttleOnScroll);

    // when reaches bottom, fetch to load more images
    if (isBottom) {
      setPage(page => page + 1);
      makeFetch(urlParam, page + 1)
    }
  }, [isBottom]);

  // make get request to pixabay API
  function makeFetch(url, page) {
    axios.get(url + page)
      .then(result => {
        if (page === 1) {
          setImages([]);
          setImages(result.data.hits);
        } else {
          // if page is greater than 1, load more images
          setImages([...images, ...result.data.hits])
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  // helper function to clean color object
  function makeListParameter(color) {
    let result = [];
    for (const key in color) {
      if (color[key]) result.push(key);
    } return result.join(",");
  }

  // when form submitted, send get request to API
  function makeUrl(searchTerm, order, orie, minWidth, minHeight, color) {
    const API_KEY = "19383178-42909148a8b02e3e78ee4e9be";
    let searchURL = "&q=" + encodeURIComponent(searchTerm);
    let orderURL = order ? "&order=" + order : "";
    let orieURL = orie ? "&orientation=" + orie : "";
    let widthURL = minWidth ? "&min_width=" + minWidth : "";
    let heightURL = minHeight ? "&min_height=" + minHeight : "";
    let colorURL = color ? "&colors=" + makeListParameter(color) : "";
    let defaultURL = "&image_type=photo&pretty=true&safesearch=true&page=";
    let URL = "https://pixabay.com/api/?key=" + API_KEY + searchURL + orderURL + orieURL + widthURL + heightURL + colorURL + defaultURL;

    setUrlParam(URL);
    // resets page to 1 when search engine used
    setPage(1)
    makeFetch(URL, 1);
  }

  // display tags
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

  // display stats
  function displayStats(comments, favorites, likes) {
    return (
      <div className="stat">
        <BiHeart className="stat-icon" /><p>{favorites}</p>
        <BiLike className="stat-icon" /><p>{likes}</p>
        <BiComment className="stat-icon" /><p>{comments}</p>
      </div>
    )
  }

  // display all images, used lazy loading 
  function displayImages(images, n) {
    let result = [];
    for (let i = n; i < images.length; i += 4) {
      let image = images[i];
      result.push(
        <div className="card">
          <LazyImage
            src={image.largeImageURL}
            alt={image.id}
            placeholder={({ imageProps, ref }) =>
              <div ref={ref} className="preloader">
              </div>
            }
            actual={({ imageProps }) => <img {...imageProps} />}
          />
          <div className="container">
            <div className="stats">
              {displayStats(image.comments, image.favorites, image.likes)}
            </div>
            <div className="tags">
              {displayTags(image.tags)}
            </div>
          </div>
        </div >
      )
    }
    return result;
  }

  // create four columns for image grid
  function createColumns(images, url) {
    let result = [];
    let imagesCopy = JSON.parse(JSON.stringify(images));
    if (imagesCopy.length === 0 && url.length > 117) {
      result.push(
        <div className="empty-column">
          <BiErrorAlt className="icon" />
          <h1>No images found</h1>
          <p>Please try searching with another term.</p>
        </div>
      )
    } else {
      for (let n = 0; n < 4; n++) {
        result.push(
          <div className="column">
            {displayImages(imagesCopy, n)}
          </div>
        )
      }
    }
    return result;
  }

  return (
    <div>
      <Header />
      <SearchEngine makeUrl={makeUrl} />
      <div className="images">
        <div className="row">
          {createColumns(images, urlParam)}
        </div>
      </div>
    </div >
  )
}