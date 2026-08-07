import { fetchWeatherData, getGiph } from "./api.js";
import { DEFAULT_REGION, DEFAULT_UNIT } from "./asset/utils.js";
import DOM from "./dom.js";

export default class Template {
  constructor() {
    this.content = this.loadContent();
    this.form = this.loadForm();
  }

  loadContent() {
    const body = DOM.select("body");
    const elem = DOM.create("main", { id: "content" }, []);
    body.append(elem);
    this.main = elem;

    return elem;
  }

  async loadGiph() {
    const icon = DOM.select(".icon");
    const altText = icon && icon.getAttribute("alt");
    console.log(altText);

    if (altText) {
      try {
        const giphUrl = await getGiph(altText);
        console.log(giphUrl);
        const img = DOM.create("img", { id: "giph-background", src: giphUrl });
        DOM.select(".card").prepend(img);
      } catch (err) {
        console.log(err);
      }
    }
  }
  loadForm() {
    const form = this.submitForm((e, obj) => {
      this.loadCard(obj.region, obj.unit);
    });
    console.log(form);
    this.main.append(form);
  }
  async loadCard(region = DEFAULT_REGION, unit = DEFAULT_UNIT) {
    const data = await fetchWeatherData(region.trim(), unit);
    const formattedData = data.format();
    const card = this.weatherCard(formattedData);
    this.main.append(card);

    this.loadGiph();
  }
  weatherCard(data) {
    const {
      average,
      feelslike,
      humidity,
      precipitation,
      windspeed,
      address,
      moment,
      condition,
      icon,
      description,
    } = data;
    console.log(data);
    const temp = DOM.create("span", { class: "avg-temp" }, [average.value]);
    const feels = DOM.create("span", { class: "feels-like" }, [
      `${feelslike.label} ${feelslike.value}`,
    ]);
    const humid = this.dataWithLabel("humidity", humidity);
    const precip = this.dataWithLabel("precipitation", precipitation);
    const wSpeed = this.dataWithLabel("windspeed", windspeed);
    const region = DOM.create("span", { class: "region" }, [address.value]);
    const time = DOM.create("span", { class: "time" }, [moment.time]);
    const desc = DOM.create("span", { class: "desc" }, [description.value]);
    const cond = DOM.create("span", { class: "condition" }, [condition.value]);
    const image = DOM.create("img", {
      class: "icon",
      src: icon.url,
      alt: icon.value,
    });

    const upper = DOM.create("div", { class: "upper" }, [region, time]);
    const middle = DOM.create("div", { class: "middle" }, [
      image,
      temp,
      feels,
      cond,
    ]);
    const lower = DOM.create("div", { class: "lower" }, [
      humid,
      precip,
      wSpeed,
    ]);

    const card = DOM.create("div", { class: "card" }, [upper, middle, lower]);

    return card;
  }

  dataWithLabel(className, obj) {
    let text = obj?.unit ? obj?.value + " " + obj.unit : obj.value;
    const label = DOM.create("span", {}, [obj.label]);
    const value = DOM.create("span", { class: "value" }, [obj.value]);
    return DOM.create("span", { class: `${className} label` }, [value, label]);
  }

  submitForm(callback = null) {
    const input = DOM.create("input", {
      type: "text",
      class: "search-input",
      name: "region",
      placeholder: "Enter a Region e.g. Dhaka",
      value: "",
      required: true,
    });

    const metric = DOM.create("input", {
      type: "radio",
      class: "radio-input",
      name: "unit",
      id: "metric",
      value: "metric",
      checked: true,
    });
    const metricLabel = DOM.create(
      "label",
      {
        class: "radio-label",
        for: "metric",
      },
      ["metric (°C)"],
    );
    const us = DOM.create("input", {
      type: "radio",
      class: "radio-input",
      name: "unit",
      id: "us",
      value: "us",
    });
    const usLabel = DOM.create(
      "label",
      {
        class: "radio-label",
        for: "us",
      },
      ["us (°F)"],
    );
    const submitBtn = DOM.create(
      "button",
      { type: "submit", class: "submit-btn" },
      ["CHECK"],
    );

    const metricDiv = DOM.create("div", { class: "radio-container" }, [
      metric,
      metricLabel,
    ]);
    const usDiv = DOM.create("div", { class: "radio-container" }, [
      us,
      usLabel,
    ]);

    const radioSection = DOM.create("div", { class: "radio-section" }, [
      metricDiv,
      usDiv,
    ]);

    const inputSection = DOM.create("div", { class: "input-section" }, [
      input,
      radioSection,
    ]);
    const form = DOM.create(
      "form",
      { id: "get-weather-form" },
      [inputSection, submitBtn],
      ["submit", callback],
    );

    return form;
  }
}
