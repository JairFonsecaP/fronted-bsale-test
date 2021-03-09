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
    <div>
      <h1>${product.name}</h1>
      <img src="${product.url_image}" alt="${product.name}"/>
      <ul>
        ${
          product.discount
            ? `<li>PRECIO INICIAL: $ ${toThousand(product.price)}</li>`
            : ``
        }
        ${product.discount ? `<li>DESCUENTO: $ ${product.discount}</li>` : ``}
        ${
          product.discount
            ? `<li>PRECIO: $ ${toThousand(
                product.price - (product.price * product.discount) / 100
              )}</li>`
            : `<li>PRECIO: $ ${toThousand(product.price)}</li>`
        }
      <button class="buy" id="add-button">Agregar a carrito</button>
    </div>`;
  },
};
export default ProductView;
