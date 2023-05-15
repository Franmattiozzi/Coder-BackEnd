const express = require('express');
const router = express.Router();

// Aquí van las rutas para el carrito

module.exports = router;
router.post('/', (req, res) => {
    // Crea un nuevo carrito con un id generado automáticamente y sin productos
  });
  router.get('/:cid', (req, res) => {
    // Obtiene el carrito con el id cid y devuelve su contenido
  });
  router.post('/:cid/product/:pid', (req, res) => {
    // Agrega el producto con id pid al carrito con id cid, aumentando su cantidad si ya existe
  });
      