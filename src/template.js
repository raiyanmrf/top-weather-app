import { fetchWeatherData } from "./api.js";
import DOM from "./dom.js";

export default class Template {
  constructor() {
    this.content = this.loadContent();
  }

  loadContent() {
    const body = DOM.select("body");
    const elem = DOM.create("main", { id: "content" }, []);
    body.append(elem);
    this.main = elem;
    return elem;
  }

  async loadCard() {
    const data = await fetchWeatherData();
    const card = this.weatherCard(data.format());
    this.main.append(card);
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
      feels,
      cond,
      temp,
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
}
