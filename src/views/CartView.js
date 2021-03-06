/**
 * IMPORTACIONES
 */
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

/**
 * BUSCA SI EL PRODUCTO YA SE ENCUENTRA EN EL LOCALSTORAGE
 * SI LO ENCUENTRA DEVUELVE EL MISMO ARRAY SI NO EXISTE
 * DEVUELVE EL ARRAY YA EXISTENTE Y LE AGREGA EL NUEVO PRODUCTO
 */
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
/**
 * LLAMA AL METODO DESDE LOCALSTORAGE.JS PARA ELIMINAR UN PRODUCTO DEL LOCAL STORAGE
 * RECIBE EL ID DEL PRODUCTO
 **/
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
    /**
     * METODO QUE AGREGA VOLUMEN AL LOCALSTORAGE SEGUN LO QUE EL CLIENTE SELECCIONE EN LA VISTA
     */
    const qtySelect = document.getElementsByClassName("cart-qty-select");
    Array.from(qtySelect).forEach((qty) => {
      qty.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.id === parseInt(qty.id));
        addToCart({ ...item, quantity: Number(e.target.value) }, true);
      });
    });

    /**
     * LLAMA AL METODO QUE ELIMINA UN ELEMENTO DEL LOCAL STORAGE
     * ENVIA EL ID DEL PRODUCTO A ELIMINAR
     */

    const deleteButton = document.getElementsByClassName("cart-delete-button");
    Array.from(deleteButton).forEach((button) => {
      button.addEventListener("click", () => {
        removeToCart(button.id);
      });
    });

    /**
     * LLAMA METODO QUE ELIMINA TODOS LOS PRODUCTOS DE LOCALSTORAGE
     */
    document.getElementById("pay-button").addEventListener("click", () => {
      deleteCartItems();
      document.location.hash = "/";
    });
  },

  render: async () => {
    showLoading();
    const request = parseRequestUrl();
    /**
     *TRAE EL PRODUCTO QUE SE ESTA AGREGANDO Y LLAMA AL METODO DE AGREGAR
     LE ENTREGA UN OBJETO CON TODO LOS CAMPOS NECESARIOS PARA MOSTRAR EN LA VISTA CARRITO
     */
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
    /**
     * OBTIENE TODOS LOS PRODUCTOS DEL LOCAL STORAGE PARA
     * MOSTRARLOS EN LA VISTA DEL CARRITO
     */
    const cartItems = getCartItems();
    noLoading();
    /**
     * RENDERIZA EL HTML
     */
    return `
    <a href="/"><p class="back-to-home"><< Buscar m??s productos</p></a>
    <div>
      <ul class="list-cart">
          ${
            cartItems.length === 0
              ? `<li class="empty-cart">El carrito est?? vacio</li>`
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
      <button id="pay-button" class="pay-buy">
          Pagar
      </button>
    </div>`
          : `<a href="/" class="button-cart-empty" id="pay-button">Haz click aqu?? para ver todos nuestros productos</a>`
      }
      
      
    </div>`;
  },
};

export default CartView;
