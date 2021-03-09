# fronted-bsale-test

Prueba desarrollada para cumplir los requerimientos del ejercicio de postulación planteado por Bsale Chile

En el presente repositrio se desarrolla la actividad planteada por Bsale, consta de un repositorio de FrontEnd y un repositorio de Backend que se puede encontrar en
[BACKEND](https://github.com/JairFonsecaP/backend-bsale) totalmente desacoplados, en el [README.md](https://github.com/JairFonsecaP/backend-bsale/blob/master/README.md)
de ese repositorio se encuentra toda la documentación del backend.

El FrontEnd se desarrolló segun lo planteado usando solo Vanilla Javasrcipt sin ningún otro framework o libreria en la parte del cliente como se solicitaba.
Solo se uso el modulo de node "live-server" para hacer el despliegue, para correrlo en el localhost se usa el comando "npm run dev" y queda corriendo en el puerto "8080" , todo el proyecto se encuentra en la carpeta "src" que consta de los documentos de CSS, JS y uno de HTML.
Se manejaron componentes y vistas para hacer dinamico el sitio web, al ingresar a la [pagina](https://frontend-bsale-test.herokuapp.com) se encuentra un sitio totalmente responsive
en el que se pueden ver ordenados todos los productos por Categorias que al hacer click sobre alguno de ellos se puede ver el detalle del producto;
en esta ruta se puede ver el producto, su precio original, su descuento y el valor total con el descuento aplicado, así como también un boton para poder guardar en el carrito las
selecciones que se van haciendo.
En la vista del carrito de compras se puede observar todos los productos que se ingresaron y se puede elegir la cantidad de cada uno de los productos para asi hacer una compra mayor o menor,
tambien cada item tiene un boton donde elimina el producto por si no se quiere adquirir en el momento, al terminar todos los items, se muestra la cantidad
de productos que se agregaron en total y un subtotal con lo que se tendria que pagar sin descuento, luego muestra el descuento total que aplica para todos los
items agregados y en seguida el valor total de la compra ya con el descuento aplicado, ya por ultimo muesta un boton de pagar el cual deja limpio el carrito de compras y redirige la pagina principal.

En caso de no haber producto, se muestra un mensaje informando que no hay productos y un boton que lleva a la pagina principal para que se puedan elegir.

Las consultas se pueden hacer desde el header donde hay una entrada de texto y se pueden buscar los productos o cualquier coincidencia que haya entre el nombre y lo que digito el usuario en dicho cuadro.

#### app.js

## VISTAS

Ya en el proyecto se puede encontrar un archivo llamado "app.js" que importa todas las vistas que se generaron y tambien hace el sistema de ruteo a través de la aplicación llamando a cada vista o componente segun sea la peticion del cliente,
y en caso de no encontrar el producto retornara una vista 404 que informa que no puedo ser encontrada la vista que se buscaba.

#### HomeView.js

En la carpeta "views" estan todas las vistas que genera la aplicacion, empezando por "HomeView.js" que hace la peticion por medio de "fetch" solicitando al backend
la lista de todos los productos y categorias para iterarlas por medio del metodo ".map" para poderlas renderizar en el navegador.

#### ProductView.js

La vista "ViewProduct", tiene un boton que esta escuchando para en el momento de ser accionado pueda tomar el id del producto actual y poderlo guardar en el "localStorage"
permitiendo asi saber que productos quiere el cliente comprar ,luego de obtener la respuesta tiene un medoto asincrono que envia el id del producto y obtiene todo el objeto para
mostrarlo en la pantalla.

#### SearchView.js

Tiene un metodo que busca la consulta que está haciendo el usuario y lo pasa por parametro en la url haciendo asi la consulta al backend
luego valida si hay productos que coincidan con la consulta y los entrega para renderizarlos.

#### CartView.js

No solo se encarga de renderizar los productos que estan en el "localStorage" tambien tiene el metodo de agregar productos al carrito
recibiendo el id y validandolo si existe o si tiene que agregarlo nuevamente, tambien contiene el metodo que quita un producto del "localStorage"
activado por el boton de eliminar un porducto y puede editar la cantidad de prodcutos de cada item por medio de un menu desplegable en la vista,
que permite elegir la cantida que se desea comprar, por último tiene el metodo de comprar que redirigue al home y elimina todos los productos
que habia en el "localStorage".

#### Error404View.js

Al detectar una pagina que no existe devuelve en mensaje al cliente que no se encontró la pagina solicitada.

## COMPONENTES

En la carpeta "js" hay otra carpeta que hace alucion a los componentes que se van a utilizar, en este caso el "header" y "footer"

#### Header.js

Renderiza el header que se va a mostrar en todas las paginas con el logo de bsale, el campo de texto para hacer consultas
y una barra de navegación que lleva a las diferentes categorias, en la versión movil esta barra está oculta mostrando solamente un menu desplegable al accionarlo con un tap.

#### Footer.js

El footer solamente contiene un pequeño texto de relleno.

## MODULOS CREADOS

En la carpeta "js" además de tener los componentes también están algunos modulos creados que se usaban recurrentemente

#### utils.js

El metodo parseRequestUrl toma la peticion del cliente y retrona objetos con la información que viene en la url y se los puede entregar al router para que genere las vistas que se necesitan.

En el metodo rerender recibe como parametro el componente que se va a renderizar nuevamente ya que se invoca cuando sufre algún cambio.

toThousand es un metodo que recibe como parametro un Number y devuelve un String separado por un punto cada 3 numeros para hacer mucho más facil la lectura de los valores por parte del cliente.

Y por ultimo el showLoading y el noLoading son dos metodos que cunado esté cargando una vista el usuario sepa que está cargando la vista.

#### localStorage.js

Este archivo es el encargado de entregar todos los productos que estan actualmente en el localStorage en el value "cartItems" mediante el metodo getCartItems,
también puede modificar o poner más productos cuando el usuario los agregue, este metodo recibe un array con objetos que son los productos y se puede llamar con la función setCartItems.
Por ultimo el metodo deleteCartItems, elimina todos los elementos que estén en el campo "cartItems" del localStorage.

#### config.js

Exporta la url del backend para usar en donde se requiera hacer consultas.

#### api.js

Tiene el metodo getProduct que recibe un id de un prodcuto y hace la peticion al backend el retorna un objeto que corresponde al id solicitado.
Mientras que el metodo searchProducts recibe un un string que si es más de dos debe ir separado por un "+" y hace la petición al backend el cual ya devuelve solo las coincidencias del string entregados con los nombres de los productos.

## HTML

En el documento index.html se importa de un tercero el script:

```html
<script
  src="https://kit.fontawesome.com/5cd85102cd.js"
  crossorigin="anonymous"
></script>
```

El cual trae los iconos usados en la aplicación.
contiene un div con id "loading" que es el encargado de morar cuando se están procesando los datos,
tambien se inserta el header, el main y el footer mediante el id de cada uno.

## CSS

Solo se hizo una hoja de estilos y se manejo la convencion de que cada view se iniciaba el nombre de la clase de la vista, ejemplo: los estilos de la vista carrito empiezan por la palabra "cart".
Para hacer el diseño responsive se uso solamente una media query en los 768px.
