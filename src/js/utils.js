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

export const rerender = async (component) => {
  document.getElementById(
    "main-container"
  ).innerHTML = await component.render();
  await component.after_render();
};

export const toThousand = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const showLoading = () => {
  document.getElementById("loading").classList.add("active");
};

export const noLoading = () => {
  document.getElementById("loading").classList.remove("active");
};
