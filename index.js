'use strict';

/*
 CASALINI, SABRINA NATALIA - LÓPEZ, JUAN RAMÓN
 */

let productos = [
    {
        id: 1,
        nombre: 'Shampoo sólido de coco',
        descripcion: 'Un cabello fresco, más vital y manejable en pocos pasos, de la mano de Sentida Botánica. Libre de crueldad: elaborado sin lastimar animales.',
        precio: 1800,
        imagen: 'images/shampoo.jpg',
        categoría: 'Higiene',
    },
    {
        id: 2,
        nombre: 'Labial vegano coral',
        descripcion: 'Mantiene los labios super humectados. Combate paspaduras, y repara grietas y resequedad. Manteca de cacao, manteca de karité',
        precio: 3000,
        imagen: 'images/labial.jpg',
        categoría: 'Cosmética',
    },
    {
        id: 3,
        nombre: 'Cepillo de dientes de bambú',
        descripcion: 'Cepillo totalmente sustentable hecho con materiales biodegradables que brindan un estilo de vida más eco firendly.',
        precio: 1500,
        imagen: 'images/cepillo.jpg',
        categoría: 'Higiene',
    },
    {
        id: 4,
        nombre: 'Perfume vegano floral',
        descripcion: 'Fórmula vegana y muy fresca, realizada con alcohol de origen natural. El envase procede de materiales reciclados.',
        precio: 5000,
        imagen: 'images/perfume.jpeg',
        categoría: 'Cosmética',
    },
    {
        id: 5,
        nombre: 'Cuaderno hojas recicladas',
        descripcion: 'Cuaderno Ecológico/Reciclado Tamaño A5 liso tapa dura 1,5 mm forrado en papel kraft FSC Ecológico con 100 hojas interiores lisas en papel reciclado. ',
        precio: 1200,
        imagen: 'images/cuaderno.jpeg',
        categoría: 'Artículos de oficina',
    },
    {
        id: 6,
        nombre: 'Lapicera biodegradable',
        descripcion: 'bolígrafo de perforación de papel ecológico con botón de plástico negro.Tinta negra. Medidas: 9 x 164 mm',
        precio: 1700,
        imagen: 'images/boligrafo.jpg',
        categoría: 'Artículos de oficina',
    },
];


class Carrito {

    static obtenerProductosAgregados () {

        let valores = Object.values(window.localStorage);

    }

    // -------------- Crear contador de cantidad de items agregados al carrito y acumulador de precio total en el LocalStorage -----------------//

    static crearContadorAcumulador = () => {

        if (!(window.localStorage.getItem('cantidadTotalItems') !== undefined && window.localStorage.getItem('cantidadTotalItems'))){
            window.localStorage.setItem("cantidadTotalItems", 0);
        };
        
        if (!(window.localStorage.getItem("montoTotal") !== undefined && window.localStorage.getItem("montoTotal"))){
            window.localStorage.setItem("montoTotal", 0);
        };

    };

    // -------------- Funciones para actualizar cantidad de productos y precio total----------------- //

    static actualizarItems = () => {
        document.querySelector("#items-agregados").innerText =  window.localStorage.getItem("cantidadTotalItems");
    };

    static actualizarPrecioTotal = () => {
        document.querySelector("#monto-total").innerText ="";
        document.querySelector("#monto-total").innerText = window.localStorage.getItem("montoTotal");
    };

    // -------------- Método estático para agregar al carrito ----------------- //
    static agregarAlCarrito (id, precio, nombre, descripcion, imagen, categoría) {

        precio = parseFloat(precio);

        if (localStorage.getItem(id)){ // Si el producto ya existe le sumo 1 a la cantidad
            let nuevaCantidad = JSON.parse(localStorage.getItem(id)).cantidad + 1;
            localStorage.setItem(id, JSON.stringify({
                id: id,
                cantidad: nuevaCantidad,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                categoría: categoría
            })); 

        } else { // Si el producto no existe lo agrego al local storage
            localStorage.setItem(id, JSON.stringify({
                id: id,
                cantidad: 1,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                categoría: categoría
            }));  
        }

        //actualizo cantidad total de productos en el local storage
        let cantidadTotalProductos =  Number(window.localStorage.getItem("cantidadTotalItems"));
        cantidadTotalProductos++;
        window.localStorage.setItem("cantidadTotalItems", cantidadTotalProductos);

        //actualizo monto total de productos en el local storage
        let montoTotal = Number(window.localStorage.getItem("montoTotal"));
        montoTotal += precio;
        window.localStorage.setItem("montoTotal", montoTotal);

        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();

    }

    // -------------- Método estático para eliminar del carrito ----------------- //

    static eliminarDelCarrito(id){

        let cantidad = JSON.parse(localStorage.getItem(id)).cantidad;
        let precio = JSON.parse(localStorage.getItem(id)).precio;
        let subtotal = cantidad * precio;

        localStorage.removeItem(id); //elimino el item del local storage

        //actualizo cantidad total de productos en el local storage
        let cantidadTotalProductos =  Number(window.localStorage.getItem("cantidadTotalItems"));
        cantidadTotalProductos -= cantidad;
        window.localStorage.setItem("cantidadTotalItems", cantidadTotalProductos);

        //actualizo monto total de productos en el local storage
        let montoTotal = Number(window.localStorage.getItem("montoTotal"));
        montoTotal -= subtotal;
        window.localStorage.setItem("montoTotal", montoTotal);

        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();

        cerrarCarrito();
        verCarrito();
    };

    // -------------- Método estático para vaciar el carrito ----------------- //
    static vaciarCarrito(){
        window.localStorage.clear();
        Carrito.crearContadorAcumulador();
        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();
        cerrarCarrito();
        verCarrito();
    };


}


// ------------------------------------------------------ 

document.addEventListener("DOMContentLoaded", ()=>{

    Carrito.actualizarItems();
    Carrito.actualizarPrecioTotal();
    Carrito.crearContadorAcumulador();

    productos.forEach(producto => {
        crearCardProducto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoría);
    });

    filtrarPorCategoria();
});

// -------------- Función para crear card producto con elementos del DOM -----------------//

const crearCardProducto = (id, nombre, descripcion, precio, imagen, categoría) => {

    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = imagen; 
    img.alt = nombre;
    let divInfo = document.createElement("div");
    let h3nombre = document.createElement("h3");
    h3nombre.innerText = nombre;
    let pDescripcion = document.createElement("p");
    pDescripcion.innerText = descripcion;
    let pPrecio = document.createElement("p");
    pPrecio.innerText = precio;
    let pCategoria = document.createElement("p");
    pCategoria.innerText = categoría; 
    let boton = document.createElement("button");
    boton.innerText = "+ Agregar al carrito";
    boton.id = id;
    boton.setAttribute("onclick", `Carrito.agregarAlCarrito(${id}, ${precio}, "${nombre}")`);
    boton.className = "btn-agregar";
    

    let btnVerDetalle = document.createElement("button");
    btnVerDetalle.innerText = "Ver detalle";
    btnVerDetalle.id = id;
    btnVerDetalle.setAttribute("onclick", `verProducto(${id}, "${nombre}", "${imagen}", "${descripcion}", ${precio}, "${categoría}")`); 

    divInfo.appendChild(h3nombre);
    divInfo.appendChild(pDescripcion);
    divInfo.appendChild(pPrecio);
    divInfo.appendChild(pCategoria);
    divInfo.appendChild(boton);
    divInfo.appendChild(btnVerDetalle);

    div.appendChild(img);
    div.append(divInfo);

    document.getElementById("productos").appendChild(div);
}

// -------------- Función para filtrar por categorías -----------------//

const filtrarPorCategoria = () => {
    
    document.getElementById("filtrarPor").addEventListener("click", (e) =>{

        

        //Obtengo la categoría seleccionada
        let categoriaSeleccionada = e.target.textContent;

        if (categoriaSeleccionada !== "Todos  | Cosmética | Artículos de oficina | Higiene"){
            //Limpio el html del div productos
            document.getElementById("productos").innerHTML = "";
            //Muestro banner con oferta
            verBanner();
            //Lo elimino en 10 segundos
            setTimeout(cerrarBanner, 10000);
        }

        //Aplico el filtro de categorías
        if (categoriaSeleccionada === "Todos"){
            productos.forEach(producto => {
                crearCardProducto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoría);
            });
        } else {
            for (let i=0; i < productos.length; i++){
                if (categoriaSeleccionada === productos[i].categoría){
                    crearCardProducto(productos[i].id, productos[i].nombre, productos[i].descripcion, productos[i].precio, productos[i].imagen, productos[i].categoría);
                }
            };
        }; 
 
    });

};

// -------------- Funciones para crear y eliminar ventana modal de carrito----------------- //

const verCarrito = () => {

    let div = document.createElement("div");
    div.id = "modalCarrito";
    div.classList.add("modal");
    //<a class="cerrar" href="javascript:void(0)" onclick="cerrarCarrito()">X</a>
    let aX = document.createElement("a");
    aX.href = "javascript:void(0)";
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarCarrito()");
    //<p>Items: <span>3</span> - Total: <span>$0</span></p>
    let pItemsTotal = document.createElement("p");
    let textItempsTotal = document.createTextNode("Items: ");
    pItemsTotal.append(textItempsTotal);
    let spanCantidadTotal = document.createElement("span");
    spanCantidadTotal.innerText = localStorage.getItem("cantidadTotalItems");
    pItemsTotal.append(spanCantidadTotal);
    let textMontoTotal = document.createTextNode(" - Total: $");
    pItemsTotal.append(textMontoTotal);
    let spanMontoTotal = document.createElement("span");
    spanMontoTotal.innerText = localStorage.getItem("montoTotal");
    pItemsTotal.append(spanMontoTotal);
    //<hr />
    let hr = document.createElement("hr");
    // <ul>
    let ul = document.createElement("ul");
    listarProductosCarrito(ul);
    // <button>Vaciar</button>
    let btnVaciar = document.createElement("button");
    btnVaciar.innerText = "Vaciar";
    btnVaciar.setAttribute("onclick", "Carrito.vaciarCarrito()")
    
    div.appendChild(aX);
    div.appendChild(pItemsTotal);
    div.appendChild(hr);
    div.appendChild(ul);
    div.appendChild(btnVaciar);

    // <button>Ir al checkout</button> (Solo si hay productos en el carrito)
    if (window.localStorage.getItem("montoTotal") != 0){
        let btnCkeckout = document.createElement("button");
        btnCkeckout.innerText = "Ir al checkout";
        btnCkeckout.setAttribute("onclick", "verCheckout()")
        div.appendChild(btnCkeckout);
    };
    
    document.querySelector("body").appendChild(div);

};


const cerrarCarrito = () => {
    let modalCarrito = document.querySelector("#modalCarrito");
    document.querySelector("body").removeChild(modalCarrito);
}

const listarProductosCarrito = (ul) => {

    let carrito = window.localStorage;
    let valores = Object.values(carrito);

    for(let i=0; i < valores.length; i++){

        if (isNaN(JSON.parse(valores[i])) ){ // Descarto los acumuladores y contadores

            let id = JSON.parse(valores[i]).id;
            let precio = JSON.parse(valores[i]).precio;
            let cantidad = JSON.parse(valores[i]).cantidad;
            let subtotal = cantidad * precio;

            let nombre = JSON.parse(valores[i]).nombre;

            //Creo un li por cada item del carrito -- <li>Nombre del producto <span>$0</span> <span>0 items</span> <span>subtotal $</span><a href="#">Eliminar</a></li>
            let li = document.createElement("li");

            let spanNombre = document.createElement("span");
            spanNombre.innerText = `${nombre}`;
            let spanPrecio = document.createElement("span");
            spanPrecio.innerText = `$${precio}`;
            let spanCantidad = document.createElement("span");
            spanCantidad.innerText = `${cantidad} items`;
            let spanSubtotal = document.createElement("span");
            spanSubtotal.innerText = `Subtotal: $${subtotal}`;
            let aEliminar = document.createElement("a");
            aEliminar.innerText = "Eliminar";
            aEliminar.href = `#${id}`;
            aEliminar.setAttribute("onclick", `Carrito.eliminarDelCarrito(${id})`);

            li.appendChild(spanNombre);
            li.appendChild(spanPrecio);
            li.appendChild(spanCantidad);
            li.appendChild(spanSubtotal);
            li.appendChild(aEliminar);
            
            ul.appendChild(li)

        }
        
    }
    
}

// -------------- Funciones para crear y eliminar ventana modal de detalle producto----------------- //

const verProducto = (id, nombre, imagen, descripcion, precio, categoria) => {

    //<div class="modal" id="modalProducto"></div>
    let div = document.createElement("div");
    div.id = "modalProducto";
    div.classList.add("modal");
    //<a class="cerrar" href="javascript:void(0)">X</a>
    let aX = document.createElement("a");
    aX.href = "javascript:void(0)";
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarProducto()");
    //<img src="producto-de-ejemplo.jpg" alt="Nombre del producto" />
    let img = document.createElement("img");
    img.src = imagen;
    img.alt = nombre;
   //<h3>Producto</h3>
   let h3Nombre = document.createElement("h3");
   h3Nombre.innerText = nombre;
   //<p>Descripción</p>
   let pDescripcion = document.createElement("p");
   pDescripcion.innerText = descripcion;
   //<p>Precio: <span>$0</span></p>
    let pPrecio = document.createElement("p");
    let textPrecio = document.createTextNode("Precio: ");
    pPrecio.append(textPrecio);
    let spanPrecio = document.createElement("span");
    spanPrecio.innerText = precio;
    pPrecio.append(spanPrecio);
   //<p>Categoría</p>
   let pCategoria = document.createElement("p");
   pCategoria.innerText = categoria;
   // <button>Agregar</button>
   let btnAgregar = document.createElement("button");
   btnAgregar.innerText = "Agregar al carrito";
   btnAgregar.setAttribute("onclick",`Carrito.agregarAlCarrito(${id}, ${precio}, "${nombre}", "${descripcion}", "${imagen}", "${categoria}")`);


    div.appendChild(aX);
    div.appendChild(img);
    div.appendChild(h3Nombre);
    div.appendChild(pDescripcion);
    div.appendChild(pPrecio);
    div.appendChild(pCategoria);
    div.appendChild(btnAgregar);

    document.querySelector("body").appendChild(div);
    
};

const cerrarProducto = () => {
    let modalProducto = document.querySelector("#modalProducto");
    document.querySelector("body").removeChild(modalProducto);
}


// -------------- Funciones para crear y eliminar ventana modal de banner promocional ---------------- //

const generarNumAleatorio = (min, max) =>{
    //Funcion para generar un numero aleatorio que me permite ir variando el id del banner promocional
    return Math.floor((Math.random() * (max - min + 1)) + min); 
    
};


const obtenerProductoOferta = () =>{
    let numAleatorio = generarNumAleatorio(1,6); //Elijo numero aleatorio entre la cantidad de productos (por ID)
    productos.forEach(producto => {
        if(producto.id === numAleatorio){
            return producto.id, producto.nombre, producto.imagen, producto.descripcion, producto.precio, producto.categoría;
        }
    });

};


const verBanner = () => {

    //<div id="modalBanner" class="modal  banner"></div>
    let divModal = document.createElement("div");
    divModal.id = "modalBanner";
    divModal.classList.add("modal");
    divModal.classList.add("banner");
    //<div>
    let div = document.createElement("div");
    //<h3>OFERTA ESPECIAL</h3>
    let h3 = document.createElement("h3");
    h3.textContent = "OFERTA ESPECIAL";
    //<img src="/images/cepillo.jpg"/ alt="nombre producto">
    let img = document.createElement("img");
    //<p>Llevá 2 unidades de <strong>Cepillo de dientes bamboo</strong> y pagá sólo 1</p>
    let p = document.createElement("p");
    let texto1 = document.createTextNode("Llevá 5 unidades de ");
    p.append(texto1);
    let strong = document.createElement("strong");
    //<button onclick="verProducto()">+ Ver producto</button>
    let btnVerDetalle = document.createElement("button");
    btnVerDetalle.innerText = "Ver producto";

    //Personalizo el banner con el producto elegido de forma aleatoria
    let numAleatorio = generarNumAleatorio(1,6); //Elijo numero aleatorio entre la cantidad de productos (por ID)
    productos.forEach(producto => {
        if(producto.id === numAleatorio){
           //btnDetalle.setAttribute("onclick",`verProducto(${id}, ${precio}, "${nombre}", "${descripcion}", "${imagen}", "${categoria}")`);
           btnVerDetalle.setAttribute("onclick",`verProducto(${producto.id}, "${producto.nombre}", "${producto.imagen}", "${producto.descripcion}", ${producto.precio}, "${producto.categoría}")`);
           img.src = `${producto.imagen}`;
           img.alt = `${producto.nombre}`;
           strong.textContent = `${producto.nombre}`;
            p.append(strong);
            p.append(document.createTextNode(" y te bonificamos el envío."));
        }
    });

    divModal.append(div);
    div.append(h3);
    div.append(img);
    div.append(p);
    div.append(btnVerDetalle);

    document.querySelector("body").appendChild(divModal);
};

const cerrarBanner = () => {  
    let modalBanner = document.querySelector("#modalBanner");
    document.querySelector("body").removeChild(modalBanner);
};


// -------------- Funciones para crear y eliminar ventana modal de chekout ---------------- //

const listarProductosCheckout = (ul) => {

    let carrito = window.localStorage;
    let valores = Object.values(carrito);

    for(let i=0; i < valores.length; i++){

        if (isNaN(JSON.parse(valores[i])) ){ // Descarto los acumuladores y contadores

            let id = JSON.parse(valores[i]).id;
            let precio = JSON.parse(valores[i]).precio;
            let cantidad = JSON.parse(valores[i]).cantidad;
            let subtotal = cantidad * precio;

            let nombre = JSON.parse(valores[i]).nombre;

            //Creo un li por cada item del carrito -- <li>Nombre del producto <span>$0</span> <span>0 items</span> <span>subtotal $</span><a href="#">Eliminar</a></li>
            let li = document.createElement("li");

            let spanNombre = document.createElement("span");
            spanNombre.innerText = `${nombre}`;
            let spanPrecio = document.createElement("span");
            spanPrecio.innerText = `$${precio}`;
            let spanCantidad = document.createElement("span");
            spanCantidad.innerText = `${cantidad} items`;
            let spanSubtotal = document.createElement("span");
            spanSubtotal.innerText = `Subtotal: $${subtotal}`;

            li.appendChild(spanNombre);
            li.appendChild(spanPrecio);
            li.appendChild(spanCantidad);
            li.appendChild(spanSubtotal);
            
            ul.appendChild(li)

        };
    };  
};

const verCheckout = () => {
    //<div class="modal  banner  checkout" id="modalCheckout" >
    let divModal = document.createElement("div");
    divModal.id = "modalCheckout";
    divModal.classList.add("modal");
    divModal.classList.add("banner");
    divModal.classList.add("checkout");
    //<a  class="cerrar" onclick="cerrarCheckout()">X</a>
    let aX = document.createElement("a");
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarCheckout()");
    // <div>
    let div = document.createElement("div");
    //<h2>Chekout</h2>
    let h2Checkout = document.createElement("h2");
    h2Checkout.innerText = "Checkout"
    //<form>
    let form = document.createElement("form");
    //<h3>Datos personales</h3>
    let h3DatosPersonales = document.createElement("h3");
    h3DatosPersonales.innerText = "Datos personales";
    form.appendChild(h3DatosPersonales);
    //<div class="datos">
    let divDatos1 = document.createElement("div");
    divDatos1.classList.add("datos");
    // <input type="text" id="nombre" placeholder="Nombre" required>
    crearInput("inputNombre", "text", "nombre", divDatos1,"Nombre");
    //<input type="text" id="apellido" placeholder="Apellido">
    crearInput("inputApellido", "text", "apellido", divDatos1, "Apellido");
    //<input type="text" id="telefono" placeholder="Número de teléfono">
    crearInput("inputTelefono", "text", "telefono", divDatos1, "Número de teléfono");
    //<input type="email" id="email" placeholder="E-mail">
    crearInput("inputEmail", "email", "email", divDatos1, "E-mail");
    form.appendChild(divDatos1);

    //<h3>Detalle de la compra</h3>
    let h3DetalleCompra = document.createElement("h3");
    h3DetalleCompra.innerText = "Detalle de la compra";
    form.appendChild(h3DetalleCompra);
    //<ul>
    let ul = document.createElement("ul");
    listarProductosCheckout(ul);
    //<li><span class="totalCompra">TOTAL A PAGAR $10000 </span></li>
    let liTotal = document.createElement("li");
    let spanTotal = document.createElement("span");
    spanTotal.classList.add("totalCompra");
    spanTotal.innerText = `TOTAL A PAGAR $${window.localStorage.getItem("montoTotal")}`;
    liTotal.appendChild(spanTotal);
    ul.appendChild(liTotal);
    form.appendChild(ul);
    //<h3>Datos de envío</h3>
    let h3DatosEnvio = document.createElement("h3");
    h3DatosEnvio.innerText = "Datos de envío";
    form.appendChild(h3DatosEnvio);
    //<div class="datos">
    let divDatos2 = document.createElement("div");
    divDatos2.classList.add("datos");
    //<label for="fecha">Fecha de envío</label>
    crearLabel("labelFecha", "fecha", "Fecha de envío: ", divDatos2);
    //<input type="date" id="fecha" name="fecha">
    crearInput("inputFechaEnvio", "date", "fecha", divDatos2)
    //<label for="calleDireccion">Calle</label>
    crearLabel("labelCalleDireccion", "calleDireccion", "Calle: ", divDatos2);
    //<input type="text" id="calleDireccion" name="calleDireccion">
    crearInput("inputCalleDireccion", "text", "calleDireccion", divDatos2)
    //<label for="numeroDireccion">Número</label>
    crearLabel("labelNumeroDireccion", "numeroDireccion", "Número: ", divDatos2);
    //<input type="text" id="numeroDireccion" name="numeroDireccion">
    crearInput("inputNumeroDireccion", "text", "numeroDireccion", divDatos2)
    //<label for="cpDireccion">Código postal</label>
    crearLabel("labelCpDireccion", "cpDireccion", "Código postal: ", divDatos2);
    //<input type="text" id="cpDireccion" name="cpDireccion">
    crearInput("inputCpDireccion", "text", "cpDireccion", divDatos2)
    form.appendChild(divDatos2);

    //<h3>Métodos de pago</h3>
    let h3Pagos = document.createElement("h3");
    h3Pagos.innerText = "Método de pago";
    form.appendChild(h3Pagos);
    //<div class="datos">
    let divDatos3 = document.createElement("div");
    divDatos3.classList.add("datos");
    //<div class="radio-grupo">
    let divRadio = document.createElement("div");
    divRadio.classList.add("radio-grupo");
    divDatos3.appendChild(divRadio);
    //<input type="radio" id="efectivo" name="pago" value="efectivo" checked/>
    crearInput("inputEfectivo", "radio", "efectivo", divRadio, undefined, "pago")
    
    //<label for="efectivo">Efectivo</label>
    crearLabel("labelEfectivo", "efectivo", "Efectivo", divRadio);
    //<div class="radio-grupo">
    let divRadio2 = document.createElement("div");
    divRadio2.classList.add("radio-grupo");
    divDatos3.appendChild(divRadio2);
    //<input type="radio" id="tarjeta" name="pago" value="tarjeta" />
    crearInput("inputTarjeta", "radio", "tarjeta", divRadio2, undefined, "pago");
    //<label for="tarjeta">Tarjeta de débito/crédito</label>
    crearLabel("labelTarjeta", "tarjeta", "Tarjeta de crédito/débito", divRadio2);
    //<div class="tarjetas">
    let divTarjetas = document.createElement("div");
    divTarjetas.classList.add("tarjetas");
    //<input type="number" placeholder="Número de tarjeta">
    crearInput("inputNumTarjeta", "number", "numtTarjeta", divTarjetas, "Número de tarjeta");
    //<input type="text" placeholder="Titular de la tarjeta">
    crearInput("inputTitularTarjeta", "text", "titulartTarjeta", divTarjetas, "Titular de la tarjeta");
    //<input type="text" placeholder="Fecha de expiración">
    crearInput("inputFechaExp", "text", "fechaExp", divTarjetas, "Fecha de expiración");
    //<input type="number" placeholder="CVV">
    crearInput("inputCvv", "number", "cvv", divTarjetas, "CVV");
    //<input type="number" placeholder="Número de D.N.I">
    crearInput("inputDni", "number", "dni", divTarjetas, "Número de D.N.I");

    divRadio2.appendChild(divTarjetas);
    form.appendChild(divDatos3);

    // <input type="button">
    let inputSubmit = document.createElement("input");
    inputSubmit.type = "button";
    inputSubmit.value = "Finalizar compra"
    form.appendChild(inputSubmit);

    divModal.append(aX);
    div.appendChild(h2Checkout);
    div.appendChild(form);
    divModal.append(div);

    document.querySelector("body").appendChild(divModal);
    document.getElementById("efectivo").setAttribute("checked", true);
};

const crearLabel = (letNombre, tagFor, innerText, elementoPadre) => {
    letNombre = document.createElement("label");
    letNombre.for = tagFor;
    letNombre.innerText = innerText;
    elementoPadre.appendChild(letNombre);
};

const crearInput = (letNombre, type, id, elementoPadre, placeholder, value, required) =>{
    letNombre = document.createElement("input");
    letNombre.type = type;
    letNombre.id = id;
    if (type == "radio"){
        letNombre.name = value;
        letNombre.value = id;
    } else{
        letNombre.name = id;
    };
   
    if (placeholder !== undefined){
        letNombre.placeholder = placeholder;
    };

    elementoPadre.appendChild(letNombre);
};

const cerrarCheckout = () => {
    let modalCheckout = document.querySelector("#modalCheckout");
    document.querySelector("body").removeChild(modalCheckout);
};

const validarDatosVacios = () => {

    let flag = true; 

    //Creo mensaje de error
    let msjError = document.createElement("span");
    msjError.innerText = "Los campos obligatorios no pueden quedar vacíos y debe elegir un método de pago.";
    msjError.classList.add("msjError");
    
   
   let inputs = document.querySelectorAll("input");
   
   // Destaco visualmente en rojo los campos que están vacíos
   for (let i = 0; i < inputs.length; i++){
    if (((inputs[i].value) == "") && (!inputs[i].parentElement.classList.contains("tarjetas"))){
        inputs[i].classList.add("error");
        flag = false;
    };

    //Destaco en rojo los inputs de pago con tarjeta solo si se selecciono ese modo de pago
    if((inputs[i].parentElement.classList.contains("tarjetas")) && ((inputs[i].value) == "") && (!document.getElementById("efectivo").checked)){
        inputs[i].classList.add("error");
        flag = false;
    };

    //Remuevo la clase error si los datos no están vacíos
    if ((inputs[i].value) !== "" && inputs[i].classList.contains("error")){
        inputs[i].classList.remove("error");
    };

    if ((inputs[i].classList.contains("error")) && (document.getElementById("efectivo").checked) && (inputs[i].parentElement.classList.contains("tarjetas"))){
        inputs[i].classList.remove("error");
    };


   };

   //Si no existe el msj de error, lo agrego al DOM
   if (!flag && document.querySelector(".msjError") == null) {
    document.querySelector("#modalCheckout > div > h2").after(msjError);
   };

   return flag;
};


//Envio de formulario de datos checkout
document.addEventListener("click", (e)=>{
    if (e.target.value === "Finalizar compra"){

        let flag = validarDatosVacios();
        if (flag){
            //Capturar datos ingresados por el usuario
            capturarDatos();
            //Visualizo mensaje "Gracias por su compra"
            verCheckoutMsjFinalizarCompra();
            //Vacío carrito
            Carrito.vaciarCarrito();
        }
        
    };
    
});

let datosUsuario = {};

const capturarDatos = () =>{
    let nombre = document.querySelector("input[id='nombre']").value;
    let fecha = document.querySelector("input[id='fecha']").value;
    let calle = document.querySelector("input[id='calleDireccion']").value;
    let numero = document.querySelector("input[id='numeroDireccion']").value;
    let cp = document.querySelector("input[id='cpDireccion']").value;
    let pago = "";

    if (document.querySelector("input[id='efectivo']").checked){
        pago = "Efectivo";
    } else{
        pago = "Tarjeta de crédito/débito";
    };

    datosUsuario = {
        nombre: nombre,
        fecha: fecha,
        calle: calle,
        numero: numero,
        cp : cp,
        pago: pago
    };
    
};


// -------------- Funciones para crear y eliminar ventana modal de chekout GRACIAS POR SU COMPRA ---------------- //

const verCheckoutMsjFinalizarCompra = () => {

    //Cierro modal checkout y modal carrito
    cerrarCheckout();
    cerrarCarrito();

    //<div class="modal  banner  checkout" id="modalCheckout" >
    let divModal = document.createElement("div");
    divModal.id = "modalCheckout";
    divModal.classList.add("modal");
    divModal.classList.add("banner");
    divModal.classList.add("checkout");
    //<a  class="cerrar" onclick="cerrarCheckout()">X</a>
    let aX = document.createElement("a");
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarCheckout()");
    // <div>
    let div = document.createElement("div");
    //<h2>Chekout</h2>
    let h2Checkout = document.createElement("h2");
    h2Checkout.innerText = `${datosUsuario.nombre}, gracias por tu compra`;
    div.appendChild(h2Checkout);
    //<p>Su compra será enviada el día <span>04/11/2022</span> a la dirección <span>Almafuerte 3172 (1754)</span></p>
    let pCompra = document.createElement("p");
    pCompra.innerText = "Su compra será enviada el día ";
    pCompra.append(document.createElement("span").innerText = `${datosUsuario.fecha}`);
    pCompra.appendChild(document.createTextNode(" a la dirección "));
    pCompra.append(document.createElement("span").innerText = `${datosUsuario.calle} ${`${datosUsuario.numero} (${datosUsuario.cp})`}`);
    div.appendChild(pCompra);
    //<p>Método de pago utilizado: <span>Efectivo</span></p>
    let pPago = document.createElement("p");
    pPago.innerText = "Método de pago utilizado: ";
    pPago.append(document.createElement("span").innerText = `${datosUsuario.pago}`);
    div.appendChild(pPago);
    //<h3>Detalle de la compra</h3>
    let h3DetalleCompra = document.createElement("h3");
    h3DetalleCompra.innerText = "Detalle de la compra";
    div.appendChild(h3DetalleCompra);
    //<ul>
    let ul = document.createElement("ul");
    listarProductosCheckout(ul);
    //<li><span class="totalCompra">TOTAL A PAGAR $10000 </span></li>
    let liTotal = document.createElement("li");
    let spanTotal = document.createElement("span");
    spanTotal.classList.add("totalCompra");
    spanTotal.innerText = `TOTAL $${window.localStorage.getItem("montoTotal")}`;
    liTotal.appendChild(spanTotal);
    ul.appendChild(liTotal);
    div.appendChild(ul);
    
    divModal.append(aX);
    divModal.append(div);
    

    document.querySelector("body").appendChild(divModal);

};

