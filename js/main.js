// Variables Globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = 0;

const productosDisponibles = [
    { id: 1, nombre: "Camiseta", precio: 20 },
    { id: 2, nombre: "Botella", precio: 10 },
    { id: 3, nombre: "Mat de clase", precio: 30 },
    { id: 4, nombre: "Ticket Clase", precio: 15 }
];

// Operador avanzado: Spread
const productosCopia = [...productosDisponibles];

// Función para renderizar productos
const renderProductos = () => {
    const contenedor = document.getElementById("productos-lista");
    contenedor.innerHTML = "";
    productosCopia.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">€${producto.precio}</p>
                        <button class="btn btn-primary agregar" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
    });

    // Asignar eventos a los botones
    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

// Función para agregar productos al carrito
const agregarAlCarrito = (e) => {
    const idProducto = parseInt(e.target.dataset.id);
    const producto = productosDisponibles.find(p => p.id === idProducto);

    if (producto) {
        carrito = [...carrito, producto]; // Operador avanzado
        guardarCarrito();
        renderCarrito();
        calcularTotal();
    }
};

// Función para renderizar el carrito
const renderCarrito = () => {
    const contenedor = document.getElementById("carrito-lista");
    contenedor.innerHTML = "";
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
    } else {
        carrito.forEach((producto, index) => {
            contenedor.innerHTML += `
                <div class="list-group-item d-flex justify-content-between">
                    ${producto.nombre} - €${producto.precio}
                    <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
                </div>`;
        });

        // Asignar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }
};

// Función para eliminar productos del carrito
const eliminarDelCarrito = (e) => {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1); // Eliminar del array
    guardarCarrito();
    renderCarrito();
    calcularTotal();
};

// Función para calcular el total
const calcularTotal = () => {
    totalCompra = carrito.reduce((acc, producto) => acc + producto.precio, 0); // Reduce
    document.getElementById("total").innerText = `Total: €${totalCompra}`;
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
    calcularTotal();
};

function realizarCompra() {
    if (carrito.length > 0) {
        alert("Compra realizada con éxito.");
        vaciarCarrito();
    } else {
        alert("El carrito está vacío.");
    }
}

// Guardar carrito en LocalStorage
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para filtrar productos por nombre
const filtrarProductos = () => {
    const filtro = document.getElementById("filtro-nombre").value.toLowerCase(); // Obtener el valor del input

    if (filtro.trim() !== "") {
        const productosFiltrados = productosCopia.filter(producto =>
            producto.nombre.toLowerCase().includes(filtro) // Filtrar productos que contienen el texto
        );
        renderProductos(productosFiltrados); // Llamar a la función para renderizar los productos filtrados
    } else {
        renderProductos(productosCopia); // Si el filtro está vacío, mostrar todos los productos
    }
};

var modal = document.getElementById("infoModal");
var btn = document.getElementById("btn-more-info");
var span = document.getElementById("close");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Evento para activar el filtro con el botón de búsqueda
document.getElementById("btn-buscar").addEventListener("click", filtrarProductos);

// Evento para activar el filtro con el botón de búsqueda
document.getElementById("btn-buscar").addEventListener("click", filtrarProductos);

// Evento de filtro con el botón de búsqueda
document.getElementById("btn-buscar").addEventListener("click", filtrarProductos);

// Eventos
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Inicialización
renderProductos();
renderCarrito();
calcularTotal();
