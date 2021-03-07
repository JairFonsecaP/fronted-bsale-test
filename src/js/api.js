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
