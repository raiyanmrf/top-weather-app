import {
  DEFAULT_REGION,
  DEFAULT_UNIT,
  GIPHY,
  WEATHER_URL,
} from "./asset/utils.js";
import { WeatherData } from "./data.js";

export const fetchWeatherData = async (
  region = DEFAULT_REGION,
  unit = DEFAULT_UNIT,
) => {
  const url = createWeatherURL(region, unit);
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    const json = await response.json();

    // console.log(json);

    return new WeatherData(json, unit);
  } catch (error) {
    // console.log(error.message);
    throw error.message;
  }
};

const createWeatherURL = (region, unit) => {
  const url = WEATHER_URL;
  return `${url}${region}?unitGroup=${unit}&key=7F6998QVQJ4RL5QLQL2TYN9TX&contentType=json`;
};

export function getGiph(search, url = GIPHY) {
  const query = search.replace(/\s/g, "-").trim().toLowerCase() + "-nature";
  url = `${url}&s=${query}`;
  console.log(url);
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.statusText}`);
      return res.json();
    })
    .then((result) => {
      const src = result.data.images.original.url;
      console.log(src);
      return src;
    })
    .catch((err) => {
      console.log(err);
      throw err.message;
    });
}
