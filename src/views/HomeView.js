//const url = "https://backend-bsale-test.herokuapp.com/api/";
const url = "http://localhost:3000/api/";
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const HomeView = {
  render: async () => {
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
              ? `<a href="/#/product/${product.id}">  
            
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
                ? `<p class="final-price">$ ${
                    product.price - (product.price * product.discount) / 100
                  }</p>`
                : `<p class="final-price">$ ${product.price}</p>`
            }
            
          </div>
          <a href="/#/"><i class="fas fa-cart-plus add-cart"></i></a>
        </div></a> `
              : ``
          )
          .join("")}</div>
        </div>`
      )
      .join("");
  },
};

export default HomeView;
