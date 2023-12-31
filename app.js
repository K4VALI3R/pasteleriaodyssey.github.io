//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {

    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    var igv = 0;
    var bruto = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('S/.', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        bruto = bruto + (precio * cantidad);
        igv = igv + bruto * 0.18;
        total = bruto + igv;
    }
    total = Math.round(total * 100) / 100;
    igv = Math.round(igv * 100) / 100;
    bruto = Math.round(bruto * 100) / 100;

    document.getElementsByClassName('carrito-precio-bruto')[0].innerText = 'S/.' + bruto.toLocaleString("es");
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/.' + total.toLocaleString("es");
    document.getElementsByClassName('carrito-precio-igv')[0].innerText = 'S/.' + igv.toLocaleString("es");

}

//GO TO TOP
window.onscroll = function () {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');

    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Seccion Información
let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];

let tabsPane = tabHeader.getElementsByTagName("div");

for (let i = 0; i < tabsPane.length; i++) {
    tabsPane[i].addEventListener("click", function () {
        tabHeader.getElementsByClassName("active")[0].classList.remove("active");
        tabsPane[i].classList.add("active");
        tabBody.getElementsByClassName("active")[0].classList.remove("active");
        tabBody.getElementsByTagName("div")[i].classList.add("active");

        tabIndicator.style.left = `calc(calc(100% / 4) * ${i})`;
    });
}
//Movimiento de la galeria 
const image = document.querySelectorAll('.image');

for (let [i, imageSelect] of image.entries()) {
    imageSelect.addEventListener('click', function focus() {
        resetFocus();
        imageSelect.classList.toggle('active')
    })

}

function resetFocus() {
    image.forEach(i => i.classList.remove('active'))

}
//desplegar menu
//const iconMenu = document.querySelector('#icono-menu');
//menu = document.querySelector('#menu');


//iconMenu.addEventListener('click', (e) => {

    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');


//});
//desplegar menu con X
//const cerrarMenuBtn = document.querySelector('#cerrar-menu-btn img');
//menu = document.querySelector('#menu');
//cerrarMenuBtn.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//cerrar para cada referencia
//const menudat = document.querySelector('.menudat');
//menu = document.querySelector('#menu');
//menudat.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//const menudat2 = document.querySelector('.menudat2');
//menu = document.querySelector('#menu');
//menudat2.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//const menudat3 = document.querySelector('.menudat3');
//menu = document.querySelector('#menu');
//menudat3.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//const menudat4 = document.querySelector('.menudat4');
//menu = document.querySelector('#menu');
//menudat4.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//const menudat5 = document.querySelector('.menudat5');
//menu = document.querySelector('#menu');
//menudat5.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//const menudat6 = document.querySelector('.menudat6');
//menu = document.querySelector('#menu');
//menudat6.addEventListener('click', () => {
    //menu.classList.toggle('active');
    //document.body.classList.toggle('opacity');

//});
//Dropmenu Cabecera
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const DropdownMenu = document.querySelector(".dropdown_menu");

toggleBtn.onclick = function () {
    DropdownMenu.classList.toggle("open");
    const isOpen = DropdownMenu.classList.contains("open");

    toggleBtnIcon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
};

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-btn");

    // Muestra la ventana emergente al cargar la página
    popup.style.display = "block";

    // Cierra la ventana emergente cuando se hace clic en el botón de cierre
    closeBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });

    // Cierra la ventana emergente si se hace clic en cualquier parte de fondo oscuro
    popup.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});