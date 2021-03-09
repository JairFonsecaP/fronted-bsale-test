import { getProduct } from "../js/api.js";
import {
  parseRequestUrl,
  showLoading,
  noLoading,
  toThousand,
} from "../js/utils.js";

const ProductView = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);

    noLoading();
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <a href="/"><p class="back-to-home"><< Buscar más productos</p></a>
    <div class="detail-card">
      <h2 class="detail-name">${product.name}</h2>
      <img src="${product.url_image}" alt="${product.name}" class="detail-img"/>
      <ul class="detail-information">
        ${
          product.discount
            ? `<li class="product-original-price">PRECIO INICIAL: $ ${toThousand(
                product.price
              )}</li>`
            : ``
        }
        ${
          product.discount
            ? `<li class="product-discount">DESCUENTO: ${product.discount} %</li>`
            : ``
        }
        ${
          product.discount
            ? `<li class="product-final-price">PRECIO: $ ${toThousand(
                product.price - (product.price * product.discount) / 100
              )}</li>`
            : `<li class="product-final-price">PRECIO: $ ${toThousand(
                product.price
              )}</li>`
        }
      
      <button class="detail-buy" id="add-button">Agregar a carrito</button></ul>
    </div>`;
  },
};
export default ProductView;
