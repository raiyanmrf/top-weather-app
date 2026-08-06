import DOM from "./dom.js";

export default class Template {
  constructor() {
    this.content = this.loadContent();
  }

  loadContent() {
    const body = DOM.select("body");
    const elem = DOM.create("main", { id: "content" }, ["Hello World"]);
    body.append(elem);

    return elem;
  }
}
