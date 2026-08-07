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
    return {
      average: {
        label: "Average Temperature",
        value: this.current?.temp,
        unit,
      },
      feelslike: {
        label: "Feels Like",
        value: this.current?.feelslike,
        unit,
      },
      dew: {
        label: "Dew Point",
        value: this.current?.dew,
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
        url: ICON_URL + this.current?.icon + ".png",
      },

      time: {
        label: "Time",
        epoch: this.current?.datetimeEpoch,
        date: this.day?.datetime,
        time: this.current?.datetime,
      },
      sunset: {
        label: "Sunset",
        value: this.current?.sunset,
      },
      sunrise: {
        label: "Sunrise",
        value: this.current?.sunrise,
      },
    };
  }
}
