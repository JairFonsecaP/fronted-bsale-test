import data from "../js/data.js";
const url = "https://backend-bsale-test.herokuapp.com/api/";
//const url = "http://localhost:3000/api/";
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const HomeView = {
  render: async () => {
    const productApi = await fetch(url + "products/list", {
      "Content-Type": "application/json",
    });
    const categoriesApi = await fetch(url + "category/list", {
      "Content-Type": "application/json",
    });
    if (!productApi || !productApi.ok) {
      return `<div>Error cargando los productos</div>`;
    }
    if (!categoriesApi || !categoriesApi.ok) {
      return `<div>Error cargando los productos</div>`;
    }
    const products = await productApi.json();
    const categories = await categoriesApi.json();

    return categories.map(
      (category) =>
        `<div>
        <h2 class = "category"> ${category.name.toUpperCase()}</h2>
        <ul class="section">      
        ${products.map((product) =>
          category.id === product.category
            ? `<a href="/#/product/${product.id}">
            <li class="product">
          <img
            src="${product.url_image}"
            alt="${product.name}"
            class="img-product"
          />
  
          <div class="product-information">
            <p class="product-name">${product.name}</p>           
            ${
              product.discount > 0
                ? `<p class="original-price">$ ${product.price}</p>`
                : ``
            }
            ${
              product.discount > 0
                ? `<p class="discount">${product.discount} %</p>`
                : ``
            }
            ${
              product.discount > 0
                ? `<p class="final-price">$ ${toThousand(
                    product.price - (product.price * product.discount) / 100
                  )}</p>`
                : `<p class="final-price">$ ${toThousand(product.price)}</p>`
            }
          </div>
          <a href="/#/"><i class="fas fa-cart-plus add-cart"></i></a>
        </li> </a>`
            : ``
        )}<ul>
        </div>`
    );
  },
};

export default HomeView;
