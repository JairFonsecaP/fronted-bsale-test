import { apiUrl } from "./config.js";

export const getProduct = async (id) => {
  try {
    const productApi = await fetch(`${apiUrl}products/detail/${id}`, {
      "Content-Type": "application/json",
    });

    if (!productApi || !productApi.ok) {
      return `<div>Error cargando el producto</div>`;
    } else {
      const product = await productApi.json();

      return product;
    }
  } catch (e) {
    return { error: e.message };
  }
};

export const searchProducts = async (query) => {
  try {
    const searchApi = await fetch(`${apiUrl}products/search/${query}`, {
      "Content-Type": "application/json",
    });
    if (!searchApi || !searchApi.ok) {
      return `<div>Error cargando el producto</div>`;
    } else {
      const products = await searchApi.json();

      return products;
    }
  } catch (e) {
    return { error: e.message };
  }
};
