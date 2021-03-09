import { getProduct } from "../js/api.js";
import {
  getCartItems,
  setCartItems,
  deleteCartItems,
} from "../js/localStorage.js";
import {
  parseRequestUrl,
  rerender,
  showLoading,
  toThousand,
  noLoading,
} from "../js/utils.js";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.id === item.id);

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) => (x.id === existItem.id ? item : x));
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartView);
  }
};
const removeToCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.id !== parseInt(id)));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartView);
  }
};
const CartView = {
  after_render: () => {
    const qtySelect = document.getElementsByClassName("cart-qty-select");
    Array.from(qtySelect).forEach((qty) => {
      qty.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.id === parseInt(qty.id));

        addToCart({ ...item, quantity: Number(e.target.value) }, true);
      });
    });

    const deleteButton = document.getElementsByClassName("cart-delete-button");

    Array.from(deleteButton).forEach((button) => {
      button.addEventListener("click", () => {
        removeToCart(button.id);
      });
    });

    document.getElementById("pay-button").addEventListener("click", () => {
      document.location.hash = "/";
    });
  },

  render: async () => {
    showLoading();
    const request = parseRequestUrl();

    if (request.id) {
      const product = await getProduct(request.id);

      addToCart({
        id: product.id,
        name: product.name,
        image: product.url_image,
        price: product.price,
        discount: product.discount,
        category: product.category,
        quantity: 1,
      });
    }
    const cartItems = getCartItems();
    noLoading();
    return `
    <a href="/"><p class="back-to-home"><< Buscar más productos</p></a>
    <div>
      <ul class="list-cart">
          ${
            cartItems.length === 0
              ? `<li class="empty-cart">El carrito está vacio</li>`
              : `${cartItems
                  .map(
                    (product) => `                     
          <li class="cart-card">
            <div class="cart-info"> 
              <img src="${product.image}" alt="${
                      product.name
                    }" class="cart-img"/>
              <a href="/#/product/${
                product.id
              }" class="cart-name-product"> <h4>${product.name}</h4></a>  
              <div class="cart-qty">     
              <p class="cart-unit-price">Precio Unitario: $${toThousand(
                product.price
              )}</p> 
              <p class="cart-unit-price">Cantidad: &nbsp
              <select id="${product.id}" class="cart-qty-select">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) =>
                  product.quantity === x
                    ? `<option selected value="${x}">${x}</option>`
                    : `<option  value="${x}">${x}</option>`
                )}
              </select></p>
              </div>
            </div>
            <div class="cart-total-delete">
              <p class="cart-product-total">Total: $ ${toThousand(
                product.price * product.quantity
              )}</p>
            
            <button type="button" id="${product.id}" class="cart-delete-button">
                Eliminar
            </button>
            </div>
          </li>`
                  )
                  .join("\n")}`
          }
      </ul>
      ${
        cartItems.length > 0
          ? `
          <div class="cart-total">
      <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.quantity, 0)} productos) : 
        $ ${toThousand(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))}
      </h3>
      <h3>
        Descuento: $ -${toThousand(
          cartItems.reduce(
            (a, c) => a + (c.quantity * c.price * c.discount) / 100,
            0
          )
        )} 
      </h3>
      <h2>
          TOTAL = $ ${toThousand(
            cartItems.reduce(
              (a, c) =>
                a +
                c.price * c.quantity -
                (c.quantity * c.price * c.discount) / 100,
              0
            )
          )}
      </h2>
      <button id="pay-button" class="detail-buy">
          Pagar
      </button>
    </div>`
          : `<a href="/" class="button-cart-empty" id="pay-button">Haz click aquí para ver todos nuestros productos</a>`
      }
      
      
    </div>`;
  },
};

export default CartView;
