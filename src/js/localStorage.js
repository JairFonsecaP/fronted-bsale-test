/**
 * METODO QUE RETORNA TODOS LOS PRODUCTOS QUE ESTAN EN EL LOCALSTORAGE PARA
 * Y QUE SON LOS AGREGADOS POR EL CLIENTE PARA POSTERIOR COMPRA
 */
export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  return cartItems;
};
/**
 * METODO QUE AGREGA O QUITA ELEMENTOS INDIVIDUALES EN EL LOCAL STORAGE
 * PARA POSTERIORMENTE MOSTRARLOS EN LA VISTA DEL CARRITO
 */
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
/**
 * AL REALIZAR LA COMPRA SE ELIMINAN TODOS LOS ELEMENTOS GUARDADOS
 */
export const deleteCartItems = () => {
  localStorage.removeItem("cartItems");
};
