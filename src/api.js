import {
  DEFAULT_REGION,
  DEFAULT_UNIT,
  GIPHY,
  WEATHER_URL,
} from "./asset/utils.js";
import { WeatherData } from "./data.js";

const fetchWeatherData = async (
  region = DEFAULT_REGION,
  unit = DEFAULT_UNIT,
) => {
  const url = createWeatherURL(region, unit);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    // console.log(json);

    return new WeatherData(json, unit);
  } catch (error) {
    console.log("Oops", error);
  }
};

const createWeatherURL = (region, unit) => {
  const url = WEATHER_URL;
  return `${url}${region}?unitGroup=${unit}&key=7F6998QVQJ4RL5QLQL2TYN9TX&contentType=json`;
};

function getGiph(search, url = GIPHY) {
  const query = search.replace(/\s/g, "-").trim().toLowerCase() + "-nature";
  url = `${url}&s=${query}`;
  console.log(url);
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((result) => {
      const src = result.data.images.original.url;
      console.log(src);
      return src;
    })
    .catch((err) => console.error("Error fetching the image:", err));
}
