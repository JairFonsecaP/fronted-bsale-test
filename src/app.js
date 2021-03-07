import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import Error404View from "./views/Error404View.js";
import { parseRequestUrl } from "./utils.js";

const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
};

const router = async () => {
  const request = parseRequestUrl();

  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  const view = routes[parseUrl] ? routes[parseUrl] : Error404View;

  const main = document.getElementById("products-container");

  main.innerHTML = await view.render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
