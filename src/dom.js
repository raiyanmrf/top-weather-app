import Event from "./event.js";

export default class DOM {
  static create(tag, attrs = {}, children = [], event = []) {
    let elem = document.createElement(tag);

    return DOM.update(elem, attrs, children, event);
  }

  static bulkCreate(items) {
    let elements = [];

    items.forEach((item) => {
      const elem = DOM.create(
        item.tag,
        item?.attrs,
        item?.children,
        item?.event,
      );
      elements.push(elem);
    });

    return elements;
  }
  static bulkUpdate(items) {
    let elements = [];

    items.forEach((item) => {
      const elem = DOM.update(
        item.elem,
        item?.attrs,
        item?.children,
        item?.event,
      );
      elements.push(elem);
    });

    return elements;
  }

  static bulkExecute(action, items) {
    const args = action?.args || [];
    items.forEach((item) => {
      item[action](...args);
    });
  }
  static bulkSetAttr(atrr, items) {
    const { key, value } = attr;
    if (typeof value === "boolean") {
      items.forEach((item) => (item[key] = value));
    } else {
      items.forEach((item) => {
        item.setAttribute(key, value);
      });
    }
  }
  static bulkRemoveAttr(key, items) {
    items.forEach((item) => {
      item.removeAttribute(key);
    });
  }
  static update(elem, attrs = {}, children = [], event = []) {
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (typeof value === "boolean") {
          // console.log(key, value);
          elem[key] = value;
        } else elem.setAttribute(key, value);
      }
    }

    if (children) {
      elem.append(...children);
    }

    if (event) {
      const eventName = event[0];
      const callback = event[1];
      switch (eventName) {
        case "click":
          Event.click(elem, callback);
          break;

        case "submit":
          Event.submit(elem, callback);
          break;
      }
    }
    return elem;
  }

  static select(identifier) {
    return document.querySelector(identifier);
  }

  static selectAll(identifier) {
    return document.querySelectorAll(identifier);
  }

  static replaceWith(newElem, oldElemSelector) {
    const oldElem = DOM.select(oldElemSelector);
    if (oldElem) {
      oldElem.replaceWith(newElem);

      return true;
    }

    return false;
  }

  static HTMLtoElem(stringHTML) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringHTML, "text/html");

    return doc.body.firstElementChild;
  }

  static scrollIntoView(elem) {
    elem.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
}
