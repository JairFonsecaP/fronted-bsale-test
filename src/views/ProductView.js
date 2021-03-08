import { getProduct } from "../js/api.js";
import { parseRequestUrl } from "../utils.js";

const ProductView = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `<h1>${product.name}</h1>
    <img src="${product.url_image}" alt="${product.name}"/>
    <p>PRECIO: ${product.price}</p>
    <p>DESCUENTO: ${product.discount}</p>`;
  },
};
export default ProductView;
