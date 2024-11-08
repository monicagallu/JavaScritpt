// Variables globales
let carrito = [];
let totalCompra = 0;

const productosDisponibles = [
    { nombre: "Camiseta Pilates", precio: 20 },
    { nombre: "Botella de Agua", precio: 10 },
    { nombre: "Mat de Yoga", precio: 30 },
    { nombre: "Ticket Clase Pilates", precio: 15 }
];

// Función para mostrar los productos y permitir la selección
const mostrarProductos = () => {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - €${producto.precio}\n`;
    });
    mensaje += "\nIngresa el número del producto para agregar al carrito o '0' para finalizar.";
    let seleccion = parseInt(prompt(mensaje));

    // Validar la entrada del usuario
    if (isNaN(seleccion) || seleccion < 0 || seleccion > productosDisponibles.length) {
        alert("Selección inválida. Por favor, intenta de nuevo.");
        mostrarProductos(); // Llamada recursiva para reintentar
    } else if (seleccion === 0) {
        finalizarCompra();
    } else {
        agregarProducto(seleccion);
        mostrarProductos(); // Permitir agregar más productos
    }
};

// Función para agregar producto al carrito
function agregarProducto(seleccion) {
    const productoSeleccionado = productosDisponibles[seleccion - 1];
    carrito.push(productoSeleccionado);
    totalCompra += productoSeleccionado.precio;
    alert(`Has agregado "${productoSeleccionado.nombre}" al carrito. Total actual: €${totalCompra}`);
}

// Función para mostrar el total de la compra
const mostrarTotal = () => {
    alert("El total de la compra es €" + totalCompra);
    console.log("Total: €" + totalCompra);
};

// Función para listar productos en el carrito
const listarCarrito = () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        console.log("El carrito está vacío.");
    } else {
        let mensaje = "Productos en el carrito:\n";
        carrito.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - €${producto.precio}\n`;
        });
        alert(mensaje);  // Muestra el mensaje en un alert para visualizar la lista del carrito.
        console.log(mensaje);  // Muestra en consola para verificar.
    }
};

// Función para finalizar la compra
const finalizarCompra = () => {
    if (carrito.length === 0) {
        alert("No has agregado ningún producto al carrito.");
    } else {
        let resumen = "Resumen de tu compra:\n";
        carrito.forEach((producto, index) => {
            resumen += `${index + 1}. ${producto.nombre} - €${producto.precio}\n`;
        });
        resumen += `\nTotal a pagar: €${totalCompra}`;
        alert(resumen);
    }
    // Reiniciar carrito y total para una nueva compra
    carrito = [];
    totalCompra = 0;
};

// Programa principal
const opcionesMenu = "1- Agregar producto, 2- Salir";
let opcion;

do {
    opcion = parseInt(prompt("Ingrese la opción:\n" + opcionesMenu));

    switch (opcion) {
        case 1:
            mostrarProductos();
            break;
        case 2:
            listarCarrito();
            break;
        case 3:
            mostrarTotal();
            break;
        case 4:
            alert("Gracias por usar el carrito de compras. ¡Hasta luego!");
            break;
        default:
            alert("Opción no válida. Intente de nuevo.");
            break;
    }
} while (opcion !== 4);
