import { apiUrl } from "../js/config.js";
import {
  noLoading,
  parseRequestUrl,
  showLoading,
  toThousand,
} from "../js/utils.js";

const url = apiUrl;
showLoading();
const HomeView = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();

    const productsApi = await fetch(url + "products/list", {
      "Content-Type": "application/json",
    });
    const categoriesApi = await fetch(url + "category/list", {
      "Content-Type": "application/json",
    });

    if (!productsApi || !productsApi.ok) {
      return `<div>Error cargando los productos</div>`;
    }
    if (!categoriesApi || !categoriesApi.ok) {
      return `<div>Error cargando los productos</div>`;
    }

    const products = await productsApi.json();

    const categories = await categoriesApi.json();

    return categories
      .map(
        (category) =>
          `<div>
        <h2 class = "category"> ${category.name.toUpperCase()}</h2>
        <div class="section">      
        ${products
          .map((product) =>
            product.category === category.id
              ? `
      <a href="/#/product/${product.id} ">  
            
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
                ? `<p class="product-final-price">$ ${toThousand(
                    product.price - (product.price * product.discount) / 100
                  )}</p>`
                : `<p class="product-final-price">$ ${toThousand(
                    product.price
                  )}</p>`
            }         
            
            
            ${
              product.discount > 0
                ? `<p class="product-discount">${product.discount} %</p>`
                : ``
            }
            ${
              product.discount > 0
                ? `<p class="product-original-price">$ ${toThousand(
                    product.price
                  )}</p>`
                : ``
            }
            
          </div>
            <div class="add-cart">
            <i class="fas fa-plus"></i>
              
            </div>
        </div>
      </a> `
              : ``
          )
          .join("")}</div>
        </div>`
      )
      .join("");
  },
};

export default HomeView;
