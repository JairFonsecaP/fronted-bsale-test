import { searchProducts } from "../js/api.js";
import {
  noLoading,
  parseRequestUrl,
  showLoading,
  toThousand,
} from "../js/utils.js";

const SearchView = {
  render: async () => {
    showLoading();
    const request = parseRequestUrl();
    let find = request.search.split("+");
    find = find.reduce((a, c) => a + c + " ", "").slice(0, -1);

    const products = await searchProducts(request.search);
    noLoading();
    if (products.length === 0) {
      return `<h2>Lo sentimos no se pudo encontrar "${find}"</h2>`;
    }
    return `
    <h2>Los productos que coinciden con "${find}" son: </h2>
        <div class="section">
            ${products
              .map(
                (product) =>
                  `<a href="/#/product/${product.id}">  
                
            <div class="product"> 
            <img
                src="${product.url_image}"
                alt="${product.name}"
                class="img-product"
            />
            <div class="product-information">
                <p class="product-name">${product.name}</p>           
                ${
                  product.discount > 0
                    ? `<p class="original-price">$ ${toThousand(
                        product.price
                      )}</p>`
                    : ``
                }
                ${
                  product.discount > 0
                    ? `<p class="discount">${toThousand(
                        product.discount
                      )} %</p>`
                    : ``
                }
                ${
                  product.discount > 0
                    ? `<p class="final-price">$ ${toThousand(
                        product.price - (product.price * product.discount) / 100
                      )}</p>`
                    : `<p class="final-price">$ ${toThousand(
                        product.price
                      )}</p>`
                }
            </div>
            <a href="/#/product/${
              product.id
            }" id="add button"><i id="add button" type="button" class="fas fa-cart-plus add-cart"></i></a>
                </div>
            </a> `
              )
              .join("")}
        </div>`;
  },
};

export default SearchView;
