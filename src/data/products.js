const express = require('express');
const router = express.Router();
const productManager = require('../managers/productManager');

router.get('/', function(req, res) {
  const limit = req.query.limit || 10;
  const products = productManager.getAllProducts(limit);
  res.json(products);
});

router.get('/:id', function(req, res) {
  const product = productManager.getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

router.post('/', function(req, res) {
  const product = req.body;
  const newProduct = productManager.createProduct(product);
  res.json(newProduct);
});

router.put('/:id', function(req, res) {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = productManager.updateProduct(id, product);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

router.delete('/:id', function(req, res) {
  const id = req.params.id;
  const deletedProduct = productManager.deleteProduct(id);
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;