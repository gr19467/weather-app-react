import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weatherArr, setWeatherArr] = useState({});
  const [locations, setLocations] = useState("Salt Lake City");
  const [photos, setPhotos] = useState([]);
  const [saved, setSaved] = useState(0);

  const WEATHER_ID = '337b784e8b0065d7f1d9fdb82c881039';
  const UNSPLASH_ID = 'rGCzHkKeaFR7JbUtp-F0xY3sCLD1M3AvNkF1jn5TTfY';

  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${WEATHER_ID}&units=imperial`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeatherArr(object);
        console.log(weatherArr);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=${UNSPLASH_ID}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));

    for (let i = 0; i < saved.length; i++) {
      const location = saved[i];
      
    }
  }
  console.log(weatherArr);
  console.log("current location is " + locations);
  console.log("saved: " + saved);

  return (
    <div className="app">
      <div className="wrapper flex">
        <div className="search">
          <input
            type="text"
            //value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="flex info">
          <div className="leftSide">
            <h1>{weatherArr?.name}, {weatherArr?.sys?.country}</h1>
            <div className="app_image" style={{backgroundImage: `url(${photos})`}}></div>
          </div>
          <div className="middle">
            <div className="flex temp">
              <img src={require("./images/temp.png")} alt=""></img>
              <p>Temparature: {Math.round(weatherArr?.main?.temp)}º F</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/temp2.png")} alt=""></img>
              <p>Feels Like: {Math.round(weatherArr?.main?.feels_like)}º F</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/pressure.png")} alt=""></img>
              <p>Pressure: {Math.round(((weatherArr?.main?.pressure)*0.02952998057228486)*100)/100} in</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/humidity.png")} alt=""></img>
              <p>Humidity: {Math.round(weatherArr?.main?.humidity)}%</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/visibility.png")} alt=""></img>
              <p>Visibility: {Math.round((weatherArr?.visibility)/1609)} mi</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/wind.png")} alt=""></img>
              <p>Wind: {Math.round(weatherArr?.wind?.speed)} mph</p>
            </div>
            <button className="save" value={saved} onClick={(e) => setSaved(parseInt(e.target.value + 1))}>Save Location</button>
          </div>
          <div className="rightSide" id="rightSide">
            {Array.from(Array(Number(saved)).keys()).map((location, index) => (
              <div className="flex savedLocation" key={index}>{location}</div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;