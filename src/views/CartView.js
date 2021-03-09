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
    const qtySelect = document.getElementsByClassName("qty-select");
    Array.from(qtySelect).forEach((qty) => {
      qty.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.id === parseInt(qty.id));

        addToCart({ ...item, quantity: Number(e.target.value) }, true);
      });
    });

    const deleteButton = document.getElementsByClassName("delete-button");
    Array.from(deleteButton).forEach((button) => {
      button.addEventListener("click", () => {
        removeToCart(button.id);
      });
    });

    document.getElementById("pay-button").addEventListener("click", () => {
      deleteCartItems();
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
    <div>
      <ul>
          ${
            cartItems.length === 0
              ? `<li>El carrito está vacio</li>`
              : `${cartItems
                  .map(
                    (product) => ` 
          <li>
            <div>            
              <div>
                <img src="${product.image}" alt="${product.name}"/>
              </div> 
             <a href="/#/product/${product.id}"> <h4>${
                      product.name
                    }</h4></a>       
              <p>$ ${toThousand(product.price)}</p>
              <p>Cantidad: ${product.quantity}</p>
              <select id="${product.id}" class="qty-select">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) =>
                  product.quantity === x
                    ? `<option selected value="${x}">${x}</option>`
                    : `<option  value="${x}">${x}</option>`
                )}
              </select>
            </div>
            <div>
              <p>Precio: $ ${toThousand(product.price * product.quantity)}</p>
            </div>
            <button type="button" id="${product.id}" class="delete-button">
                Eliminar
            </button>
          </li>`
                  )
                  .join("\n")}`
          }
      </ul>
      <div>
        <h4>
          Subtotal (${cartItems.reduce(
            (a, c) => a + c.quantity,
            0
          )} productos) : 
          $ ${toThousand(
            cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
          )}
        </h4>
        <h3>
          Descuento: - $ ${toThousand(
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
        <button id="pay-button">
            Pagar
        </button>
      </div>
      
    </div>`;
  },
};

export default CartView;
