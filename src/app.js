const express = require('express');
const app = express();
const port = 3000;

const ProductManager = require('./ProductManager');
const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const products = await productManager.getProducts();
  const product = products.find(p => p.id === pid);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
