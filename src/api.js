import { DEFAULT_REGION, DEFAULT_UNIT, WEATHER_URL } from "./asset/utils.js";
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

const data = await fetchWeatherData();

console.log(data.format());
