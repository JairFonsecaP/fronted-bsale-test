/**
 * IMPORTACIONES
 */
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
    /**
     * PARSEA LA URL PARA BUSCAR LA QUERY
     */
    const request = parseRequestUrl();
    let find = request.search.split("+");
    find = find.reduce((a, c) => a + c + " ", "").slice(0, -1);
    /**
     * LLAMA A METODO QUE BUSCA LA CONSULTA
     * Y DEVUELVE LOS PRODUCTOS ENCONTRADOS
     */
    const products = await searchProducts(request.search);
    noLoading();
    /**
     * VALIDA QUE SEA UNA CONSULTA CON RESULTADOS
     */
    if (products.length === 0) {
      return `<h2>Lo sentimos no se pudo encontrar "${find}"</h2>`;
    }
    /**
     * RENDERIZA LO ENCONTRADO
     */
    return `
    <a href="/"><p class="back-to-home"><< Buscar más productos</p></a>
    <div class="section">      
        ${products
          .map(
            (product) =>
              `
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
          )
          .join("")}</div>
        </div>`;
  },
};

export default SearchView;
