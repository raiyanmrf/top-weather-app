export default class Event {
  static create(event, elem, callback) {
    elem.addEventListener(event, callback);
  }

  static submit(elem, callback = null) {
    Event.create("submit", elem, function (e) {
      e.preventDefault();

      const formData = new FormData(elem);
      let obj = {};
      for (const [key, value] of formData) {
        obj[key] = value;
      }

      callback && callback(e, obj);
    });
  }
  static click(elem, callback = null) {
    // console.log(elem);
    Event.create("click", elem, function (e) {
      e.stopPropagation();
      callback && callback(e);
    });
  }
}
