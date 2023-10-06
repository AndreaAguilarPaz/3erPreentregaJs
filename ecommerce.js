const productos = [
    //Alimentacion
    {
        id: "babero-01",
        titulo: "babero 01",
        imagen: "./img/Alimentacion/baberoConMangas.jpg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3000
    },
    {
        id: "babero-02",
        titulo: "babero 02",
        imagen: "./img/Alimentacion/baberoImpermeableBolsillo.png",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 4000
    },
    {
        id: "babero-03",
        titulo: "babero 03",
        imagen: "./img/Alimentacion/baberoSiliconaBolsillo.png",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 4500
    },
    {
        id: "chupete-01",
        titulo: "chupete 01",
        imagen: "./img/Alimentacion/chupeteFrutas.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 2500
    },
    {
        id: "plato-01",
        titulo: "plato 01",
        imagen: "./img/Alimentacion/platoHelloKitty.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 1000
    },
    {
        id: "plato-02",
        titulo: "plato 02",
        imagen: "./img/Alimentacion/platoSiliconaAntideslizante.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3500
    },
    {
        id: "plato-03",
        titulo: "plato 03",
        imagen: "./img/Alimentacion/setPlatoAutito.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 5000
    },
    {
        id: "vaso-01",
        titulo: "vaso 01",
        imagen: "./img/Alimentacion/vasoAntiderrame.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3500
    },
    {
        id: "vaso-02",
        titulo: "vaso 02",
        imagen: "./img/Alimentacion/vasoConAsas.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3500
    },{
        id: "vaso-03",
        titulo: "vaso 03",
        imagen: "./img/Alimentacion/vasoConSorbete.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3500
    },{
        id: "vaso-04",
        titulo: "vaso 04",
        imagen: "./img/Alimentacion/vasoPlegable.jpeg",
        categoria: {
            nombre: "Alimentacion",
            id: "alimentacion"
        },
        precio: 3500
    },

    // Baño
    {
        id: "banquito-01",
        titulo: "Banquito 01",
        imagen: "./img/baño/banquitoStepPlegable.jpeg",
        categoria: {
            nombre: "Baño",
            id: "baño"
        },
        precio: 3500
    },
 
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias= document.querySelectorAll(".boton-categoria");
const tituloPrincipal=document.querySelector("#titulo-principal");
let botonesAgregar =document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML="";
    productosElegidos.forEach(producto=>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$ ${producto.precio}</p>
                        <button class="producto-agregar id=${producto.id}">Agregar</button>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton=> {
    boton.addEventListener("click",(e)=> {

        botonesCategorias.forEach(boton =>boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id !="todos") {
            const productoCategoria = productos.find(producto=> producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText= productoCategoria.categoria.nombre ;

            const productosBoton=productos.filter(producto =>producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else{
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar= document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton=> {
        boton.addEventListener("click", agregarAlCarrito)
    });
}


let productosEnCarrito ;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton  = e.currentTarget.id;
    const productoAgregado = productos.find( producto=>producto.id === idBoton);

    if (productosEnCarrito.some(producto =>producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id === idBoton);
        productosEnCarrito[index].cantidad++;   
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
     
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc+ producto.cantidad ,0);
    numerito.innerText= nuevoNumerito;  
}

 