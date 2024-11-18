// Variables globales
let carrito = [];
let totalCompra = 0;

const productosDisponibles = [
    { nombre: "Camiseta Pilates", precio: 20 },
    { nombre: "Botella de Agua", precio: 10 },
    { nombre: "Mat de Yoga", precio: 30 },
    { nombre: "Ticket Clase Pilates", precio: 15 },
    { nombre: "Experiencia fin de semana", precio: 450},
];

// Función para mostrar productos
const mostrarProductos = () => {
    let contenido = "<h3>Productos Disponibles</h3><ul>";
    productosDisponibles.forEach((producto, index) => {
        contenido += `<li>${index + 1}. ${producto.nombre} - €${producto.precio} 
            <button class="btn btn-sm btn-success ms-2" onclick="agregarProducto(${index})">Agregar</button></li>`;
    });
    contenido += "</ul>";
    document.getElementById("resultado").innerHTML = contenido;
};

// Función para agregar producto al carrito
const agregarProducto = (index) => {
    const productoSeleccionado = productosDisponibles[index];
    carrito.push(productoSeleccionado);
    totalCompra += productoSeleccionado.precio;
    document.getElementById("resultado").innerHTML = `<p class="text-success">"${productoSeleccionado.nombre}" agregado al carrito. Total: €${totalCompra}</p>`;
};

// Función para listar productos en el carrito
const listarCarrito = () => {
    if (carrito.length === 0) {
        document.getElementById("resultado").innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        let contenido = "<h3>Productos en el Carrito</h3><ul>";
        carrito.forEach((producto, index) => {
            contenido += `<li>${index + 1}. ${producto.nombre} - €${producto.precio}</li>`;
        });
        contenido += "</ul>";
        document.getElementById("resultado").innerHTML = contenido;
    }
};

// Función para mostrar el total de la compra
const mostrarTotal = () => {
    document.getElementById("resultado").innerHTML = `<p>Total de la compra: €${totalCompra}</p>`;
};

// Función para finalizar la compra
const finalizarCompra = () => {
    if (carrito.length === 0) {
        document.getElementById("resultado").innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        let resumen = "<h3>Resumen de la Compra</h3><ul>";
        carrito.forEach((producto) => {
            resumen += `<li>${producto.nombre} - €${producto.precio}</li>`;
        });
        resumen += `</ul><p>Total a pagar: €${totalCompra}</p>`;
        document.getElementById("resultado").innerHTML = resumen;

        // Reiniciar carrito
        carrito = [];
        totalCompra = 0;
    }
};

// Eventos para los botones
document.getElementById("btnMostrarProductos").addEventListener("click", mostrarProductos);
document.getElementById("btnMostrarCarrito").addEventListener("click", listarCarrito);
document.getElementById("btnMostrarTotal").addEventListener("click", mostrarTotal);
document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);
