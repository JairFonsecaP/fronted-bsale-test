import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import Error404View from "./views/Error404View.js";
import CartView from "./views/CartView.js";
import SearchView from "./views/SearchView.js";
import { noLoading, parseRequestUrl, showLoading } from "./js/utils.js";
import Header from "./js/components/Header.js";
import Footer from "./js/components/Footer.js";

/**
 * SISTEMA DE RUTEO
 */
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
  "/cart/:id": CartView,
  "/cart": CartView,
  "/search/:id": SearchView,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = request.search
    ? `/search/:id`
    : (request.resource ? `/${request.resource}` : "/") +
      (request.id ? "/:id" : "") +
      (request.verb ? `/${request.verb}` : "");

  const view = routes[parseUrl] ? routes[parseUrl] : Error404View;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await view.render();
  await view.after_render();
  const footer = document.getElementById("footer-container");
  footer.innerHTML = await Footer.render();
  noLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
