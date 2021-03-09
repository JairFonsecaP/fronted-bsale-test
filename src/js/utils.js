/**
 *
 * PARSEA LA URL ASIGNANDOLE UN FORMATO MÁS SENCILLO PARA EL RUTEO
 */
export const parseRequestUrl = () => {
  if (document.location.search) {
    const url = document.location.search.toLowerCase();
    const request = url.split("=");

    return {
      action: request[0],
      search: request[1],
    };
  } else {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");

    return {
      resource: request[1],
      id: request[2],
      action: request[3],
    };
  }
};
/**
 *
 * @RENDERIZA NUEVAMENTE LA VISTA QUE SUFRIO ALGUN CAMBIO
 */
export const rerender = async (component) => {
  document.getElementById(
    "main-container"
  ).innerHTML = await component.render();
  await component.after_render();
};
/**
 *
 * @param {NUMBER}
 * @returns EL NUMERO PERO STRING SEPARADO POR UN PUNTO CADA 3 DIGITOS
 */
export const toThousand = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/**
 * ACTIVA UNA PEQUEÑA AYUDA QUE PERMITE VER CUANDO NO SE A TERMINADO
 * DE CARGAR TODO EL CONTENIDO DE LA PAGINA
 */
export const showLoading = () => {
  document.getElementById("loading").classList.add("active");
};

/**
 * DESACTIVA LA AYUDA QUE PERMITE VER CUANDO NO SE HAN TERMINADO DE
 * CARGAR TODOS LOS OBJETOS
 */
export const noLoading = () => {
  document.getElementById("loading").classList.remove("active");
};
