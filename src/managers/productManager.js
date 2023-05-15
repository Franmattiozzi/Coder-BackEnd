const fs = require('fs');

const PRODUCTOS_FILE_PATH = './data/productos.json';

function obtenerProductos() {
  return JSON.parse(fs.readFileSync(PRODUCTOS_FILE_PATH, 'utf-8'));
}

function guardarProductos(productos) {
  fs.writeFileSync(PRODUCTOS_FILE_PATH, JSON.stringify(productos));
}

function agregarProducto(nuevoProducto) {
  const productos = obtenerProductos();
  const nuevoProductoConId = { ...nuevoProducto, id: productos.length + 1 };
  productos.push(nuevoProductoConId);
  guardarProductos(productos);
  return nuevoProductoConId;
}

function actualizarProducto(productoId, nuevosDatos) {
  const productos = obtenerProductos();
  const productoIndex = productos.findIndex((prod) => prod.id === parseInt(productoId));
  if (productoIndex === -1) {
    throw new Error('Producto no encontrado');
  }
  const productoActualizado = { ...productos[productoIndex], ...nuevosDatos, id: parseInt(productoId) };
  productos[productoIndex] = productoActualizado;
  guardarProductos(productos);
  return productoActualizado;
}

function eliminarProducto(productoId) {
  const productos = obtenerProductos();
  const productoIndex = productos.findIndex((prod) => prod.id === parseInt(productoId));
  if (productoIndex === -1) {
    throw new Error('Producto no encontrado');
  }
  const productoEliminado = productos.splice(productoIndex, 1);
  guardarProductos(productos);
  return productoEliminado;
}

module.exports = {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
};