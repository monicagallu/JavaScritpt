// Variables Globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = 0;

const productosDisponibles = [
    { id: 1, nombre: "Camiseta", precio: 20 },
    { id: 2, nombre: "Botella", precio: 10 },
    { id: 3, nombre: "Mat de clase", precio: 30 },
    { id: 4, nombre: "Ticket Clase", precio: 15 },
    { id: 5, nombre: "Esterilla", precio: 45 },
    { id: 6, nombre: "Pelota", precio: 10 },
    { id: 7, nombre: "Manta", precio: 18 },
    { id: 8, nombre: "leggins", precio: 21 },
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
    
    // Toastify: Notificación
    Toastify({
        text: `${producto.nombre} agregado al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast();
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

function mostrarFechaCompra() {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATETIME_MED);
    const fechaCompraElement = document.getElementById("fecha-compra");

    if (fechaCompraElement) {
        fechaCompraElement.innerText = `Fecha de compra: ${fecha}`;
    } else {
        console.error("Elemento para mostrar la fecha de compra no encontrado.");
    }
}

function realizarCompra() {
    if (carrito.length > 0) {
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total: €${totalCompra}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Compra realizada!',
                    'Gracias por tu compra.',
                    'success'
                );
                mostrarFechaCompra(); // Muestra la fecha después de confirmar la compra
                vaciarCarrito(); // Limpia el carrito
            }
        });
    } else {
        Swal.fire(
            'El carrito está vacío',
            'Por favor, añade productos antes de comprar.',
            'error'
        );
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

// Modal para información adicional
var modal = document.getElementById("infoModal");
var btn = document.getElementById("btn-more-info");
var span = document.getElementById("close");

btn.onclick = function() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const obtenerProductos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.5; // 50% de probabilidad de éxito
            if (exito) {
                resolve(productosDisponibles);
            } else {
                reject("Error al cargar los productos.");
            }
        }, 2000);
    });
};

const cargarProductos = async () => {
    try {
        const productos = await obtenerProductos();
        console.log("Productos cargados:", productos);
        productosCopia.length = 0; 
        productosCopia.push(...productos); // Actualiza la copia local
        renderProductos();

    } catch (error) {
        Swal.fire(
            'Error',
            error.message || 'No se pudieron cargar los productos.',
            'error'
        );
    }
};

function mostrarFechaCompra() {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATETIME_MED);
    const fechaCompraElement = document.getElementById("fecha-compra");

    if (fechaCompraElement) {
        fechaCompraElement.innerText = `Fecha de compra: ${fecha}`;
    } else {
        console.error("Elemento para mostrar la fecha de compra no encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarFechaCompra();
});

[
    {
        "id": 1,
        "nombre": "Producto 1",
        "precio": 20,
        "descripcion": "Descripción del Producto 1"
    },
    {
        "id": 2,
        "nombre": "Producto 2",
        "precio": 30,
        "descripcion": "Descripción del Producto 2"
    },
    {
        "id": 3,
        "nombre": "Producto 3",
        "precio": 40,
        "descripcion": "Descripción del Producto 3"
    }
]

function mostrarProductos(productos) {
    const productosLista = document.getElementById("productos-lista");
    productosLista.innerHTML = ""; // Limpiar contenido previo
    productos.forEach(producto => {
        const productoHTML = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">Precio: €${producto.precio}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                    </div>
                </div>
            </div>`;
        productosLista.innerHTML += productoHTML;
    });
}

function enviarCompra(carrito) {
    fetch('https://jsonplaceholder.typicode.com/posts', { // URL de prueba
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrito)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al enviar los datos: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Compra realizada:", data);
        Swal.fire({
            title: 'Compra realizada',
            text: '¡Gracias por tu compra!',
            icon: 'success'
        });
    })
    .catch(error => {
        console.error("Error al realizar la compra:", error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo procesar la compra',
            icon: 'error'
        });
    });
}

// Llama esta función después de realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos antes de realizar la compra',
            icon: 'warning'
        });
        return;
    }
    enviarCompra(carrito); // carrito es el array con los productos seleccionados
}


// Llamada inicial para cargar productos
cargarProductos();

// Eventos
renderProductos();
renderCarrito();
calcularTotal();
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
document.getElementById("btn-buscar").addEventListener("click", filtrarProductos);
