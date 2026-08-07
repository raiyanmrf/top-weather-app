import { ICON_URL } from "./asset/utils.js";

export class WeatherData {
  constructor(json, unit) {
    this.resolvedAddress = json.resolvedAddress;
    this.description = json.description;
    this.current = json.currentConditions;
    this.unit = unit;
    this.day = json.days[0];
  }

  format() {
    const unit = this.unit === "metric" ? "°C" : "°F";
    const speed = this.unit === "metric" ? "km/h" : "mph";
    const depth = this.unit === "metric" ? "mm" : "inch";
    const perc = "%";
    return {
      average: {
        label: "Average Temperature",
        value: this.current?.temp + unit,
        unit,
      },
      feelslike: {
        label: "Feels Like",
        value: this.current?.feelslike + unit,
        unit,
      },

      address: {
        label: "Location",
        value: this.resolvedAddress,
      },
      description: {
        label: "Description",
        value: this.description,
      },
      condition: {
        label: "Condition",
        value: this.current?.conditions,
      },
      icon: {
        label: "Icon",
        value: this.current?.icon,
        url: ICON_URL + this.current?.icon + ".png?raw=true",
      },

      moment: {
        label: "Time",
        epoch: this.current?.datetimeEpoch,
        date: this.day?.datetime,
        time: this.current?.datetime,
      },
      precipitation: {
        label: "Precipitation",
        value: this.current?.precip + perc,
        unit: perc,
      },
      humidity: {
        label: "Humidity",
        value: this.current?.humidity + perc,
        unit: perc,
      },
      windspeed: {
        label: "Wind Speed",
        value: this.current?.windspeed + speed,
        unit: speed,
      },
    };
  }
}
