import { getProduct } from "../js/api.js";
import { getCartItems, setCartItems } from "../js/localStorage.js";
import { parseRequestUrl } from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartView = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl;
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product.id,
        name: product.name,
        image: product.url_imgage,
        price: product.price,
        discount: product.discount,
        quantity: 1,
      });
    }
    return `<h1>${getCartItems().length}</h1>`;
  },
};

export default CartView;
