import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);

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
        setWeather(object);
        console.log(weather);
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
  }
  return (
    <div className="app">
      <div className="wrapper flex">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="flex info">
          <div>
            <h1>Current Conditon: {weather?.description}</h1>
            <div className="app_image" style={{backgroundImage: `url(${photos})`}}></div>
          </div>
          <div className="app_data">
            <div className="flex temp">
              <img src={require("./images/temp.png")} alt=""></img>
              <p>Temparature: {Math.round(weather?.main?.temp)}º F</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/temp2.png")} alt=""></img>
              <p>Feels Like: {Math.round(weather?.main?.feels_like)}º F</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/pressure.png")} alt=""></img>
              <p>Pressure: {Math.round(((weather?.main?.pressure)*0.02952998057228486)*100)/100} in</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/humidity.png")} alt=""></img>
              <p>Humidity: {Math.round(weather?.main?.humidity)}%</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/visibility.png")} alt=""></img>
              <p>Visibility: {Math.round((weather?.visibility)/1609)} mi</p>
            </div>
            <div className="flex temp">
              <img src={require("./images/wind.png")} alt=""></img>
              <p>Wind: {Math.round(weather?.wind?.speed)} mph</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;