export const WEATHER_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
export const DEFAULT_REGION = "dhaka";
export const DEFAULT_UNIT = "metric";
export const ICON_URL = `https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/4th%20Set%20-%20Color/`;
export const GIPHY = `https://api.giphy.com/v1/gifs/translate?api_key=i8k1ueQ3WQHOgryIh2oNFQUc1iCT84TW`;
export function celsiusToFarenheiht(c) {
  return (c * 9) / 5 + 32;
}
export function farenheihtToCelsius(f) {
  return ((f - 32) * 5) / 9;
}

export const CELSIUS = "°C";
export const FARENHEIHT = "°F";
