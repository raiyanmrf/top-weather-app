import "./styles.css";
import Template from "./template.js";

const App = () => {
  console.log("Hello World");
  const page = new Template();
  page.loadCard();
};

App();
