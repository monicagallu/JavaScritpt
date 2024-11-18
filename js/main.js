// Variables globales
let carrito = [];
let totalCompra = 0;

const productosDisponibles = [
    { nombre: "Camiseta Pilates", precio: 20, categoria: "Ropa", descripcion: "Camiseta cómoda para practicar pilates" },
    { nombre: "Botella de Agua", precio: 10, categoria: "Accesorios", descripcion: "Botella reutilizable de 500ml" },
    { nombre: "Mat de Yoga", precio: 30, categoria: "Accesorios", descripcion: "Mat antideslizante para yoga y pilates" },
    { nombre: "Ticket Clase Pilates", precio: 15, categoria: "Clases", descripcion: "Entrada para una clase grupal de pilates" }
];

// Función para mostrar productos filtrados por categoría
const filtrarPorCategoria = () => {
    const categorias = [...new Set(productosDisponibles.map(producto => producto.categoria))]; // Obtener categorías únicas
    let mensaje = "Categorías disponibles:\n";
    categorias.forEach((categoria, index) => {
        mensaje += `${index + 1}. ${categoria}\n`;
    });
    mensaje += "\nSelecciona el número de la categoría para filtrar:";
    const seleccion = parseInt(prompt(mensaje));

    if (seleccion >= 1 && seleccion <= categorias.length) {
        const categoriaSeleccionada = categorias[seleccion - 1];
        const productosFiltrados = productosDisponibles.filter(producto => producto.categoria === categoriaSeleccionada);
        let mensajeProductos = `Productos en la categoría "${categoriaSeleccionada}":\n`;
        productosFiltrados.forEach((producto, index) => {
            mensajeProductos += `${index + 1}. ${producto.nombre} - €${producto.precio} (${producto.descripcion})\n`;
        });
        alert(mensajeProductos);
    } else {
        alert("Selección inválida. Intenta nuevamente.");
    }
};

// Función para calcular el total del carrito con un reduce
const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
};

// Función para agregar producto al carrito
function agregarProducto(seleccion) {
    const productoSeleccionado = productosDisponibles[seleccion - 1];
    carrito.push(productoSeleccionado);
    totalCompra = calcularTotal();
    alert(`Has agregado "${productoSeleccionado.nombre}" al carrito. Total actual: €${totalCompra}`);
}

// Función para mostrar resumen por categoría
const mostrarResumenPorCategoria = () => {
    const resumen = carrito.reduce((acc, producto) => {
        acc[producto.categoria] = (acc[producto.categoria] || 0) + producto.precio;
        return acc;
    }, {});

    let mensaje = "Resumen por categoría:\n";
    for (let categoria in resumen) {
        mensaje += `${categoria}: €${resumen[categoria]}\n`;
    }
    alert(mensaje);
};

// Función para mostrar productos disponibles
const mostrarProductos = () => {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - €${producto.precio} (${producto.descripcion})\n`;
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

// Programa principal mejorado con nuevas opciones
const opcionesMenu = `
1- Agregar producto
2- Filtrar por categoría
3- Listar carrito
4- Mostrar total
5- Mostrar resumen por categoría
6- Finalizar compra
7- Salir
`;

let opcion;

do {
    opcion = parseInt(prompt("Ingrese la opción:\n" + opcionesMenu));

    switch (opcion) {
        case 1:
            mostrarProductos();
            break;
        case 2:
            filtrarPorCategoria();
            break;
        case 3:
            listarCarrito();
            break;
        case 4:
            alert(`El total de la compra es €${calcularTotal()}`);
            break;
        case 5:
            mostrarResumenPorCategoria();
            break;
        case 6:
            finalizarCompra();
            break;
        case 7:
            alert("Gracias por usar el carrito de compras. ¡Hasta luego!");
            break;
        default:
            alert("Opción no válida. Intente de nuevo.");
            break;
    }
} while (opcion !== 7);

