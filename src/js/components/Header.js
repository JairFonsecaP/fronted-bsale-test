const Header = {
  render: () => {
    return `<div class="header">
    <a href="/"
      ><img
        src="https://dojiw2m9tvv09.cloudfront.net/4/8/img-logos-logo-bsale-blanco.png?1448"
        alt="logo bsale"
        class="logo"
    /></a>
    <form method="GET" action="/?" class="form-search">
      <input
        type="text"
        name="search"
        class="search"
        placeholder=" Encuentra aquí lo que estás buscando"
      /><button type="submit" class="button-search">
        <i class="fas fa-search"></i> Buscar
      </button>
    </form>
  </div>
  <div class="menu-navbar">
    <input type="checkbox" id="menu-button" />
    <label for="menu-button" class="hamburger-menu"
      ><i class="fas fa-bars"></i
    ></label>
    <nav>
      <ul class="list-menu-hamburger">
        <a href="/"><li>Inicio</li></a>
        <a href="#bebida energetica"><li>Energetica</li></a>
        <a href="#pisco"><li>Pisco</li></a>
        <a href="#ron"><li>Ron</li></a>
        <a href="#bebida"><li>Bebida</li></a>
        <a href="#snack"><li>Snack</li></a>
        <a href="#cerveza"><li>Ceveza</li></a>
        <a href="#vodka"><li>Vodka</li></a>
        <a href="/#/cart"><li>Carrito</li></a>
      </ul>
    </nav>
  </div>`;
  },
  after_render: () => {},
};
export default Header;
