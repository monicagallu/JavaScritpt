// Clase Producto
class Producto {
    constructor(id, nombre, precio, descripcion = "") {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

// Variables Globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = 0;

const productosDisponibles = [
    new Producto(1, "Camiseta", 20),
    new Producto(2, "Botella", 10),
    new Producto(3, "Mat de clase", 30),
    new Producto(4, "Ticket Clase", 15),
    new Producto(5, "Esterilla", 45),
    new Producto(6, "Pelota", 10),
    new Producto(7, "Manta", 18),
    new Producto(8, "Leggins", 21),
];

// Función para renderizar productos
const renderProductos = () => {
    const contenedor = document.getElementById("productos-lista");
    contenedor.innerHTML = "";
    productosDisponibles.forEach(producto => {
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

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

// Función para agregar productos al carrito
const agregarAlCarrito = (e) => {
    const idProducto = parseInt(e.target.dataset.id);
    const producto = productosDisponibles.find(p => p.id === idProducto);

    if (producto) {
        carrito.push(producto);
        guardarCarrito();
        renderCarrito();
        calcularTotal();

        Toastify({
            text: `${producto.nombre} agregado al carrito`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
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

        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }
};

// Función para eliminar productos del carrito
const eliminarDelCarrito = (e) => {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    guardarCarrito();
    renderCarrito();
    calcularTotal();
};

// Función para calcular el total
const calcularTotal = () => {
    totalCompra = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    document.getElementById("total").innerText = `Total: €${totalCompra}`;
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
    calcularTotal();
};

// Guardar carrito en LocalStorage
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Filtrar productos por nombre
const filtrarProductos = () => {
    const filtro = document.getElementById("filtro-nombre").value.toLowerCase();
    const productosFiltrados = productosDisponibles.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro)
    );
    const contenedor = document.getElementById("productos-lista");
    contenedor.innerHTML = "";
    productosFiltrados.forEach(producto => {
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

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

// Función para realizar la compra
const realizarCompra = () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos antes de realizar la compra',
            icon: 'warning'
        });
        return;
    }

    Swal.fire({
        title: '¿Confirmar compra?',
        text: `Total: €${totalCompra}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra.',
                icon: 'success'
            });
            vaciarCarrito();
        }
    });
};

// Función para manejar el botón de Workshop
const manejarWorkshop = () => {
    const modal = document.getElementById("infoModal");
    const closeButton = document.getElementById("close");

    if (modal && closeButton) {
        modal.style.display = "block";

        closeButton.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    } else {
        console.error("No se encontraron los elementos del modal");
    }
};

// Eventos
renderProductos();
renderCarrito();
calcularTotal();
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
document.getElementById("btn-buscar").addEventListener("click", (e) => {
    e.preventDefault();
    filtrarProductos();
});
document.getElementById("realizar-compra").addEventListener("click", realizarCompra);
document.getElementById("btn-more-info").addEventListener("click", manejarWorkshop);
