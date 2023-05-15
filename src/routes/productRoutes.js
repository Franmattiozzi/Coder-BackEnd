const express = require('express');
const router = express.Router();
const productManager = require('../src/managers/productManager');

router.get('/', (req, res) => {
    const limit = req.query.limit; 
    const products = productManager.getProducts(limit); 
  
    res.json(products);
  });
  