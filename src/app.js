const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/carts', cartsRouter);

const productosRouter = express.Router();
app.use('/api/productos', productosRouter);

productosRouter.get('/', (req, res) => {
  const { limit } = req.query;
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));

  if (limit) {
    return res.json(productos.slice(0, limit));
  }

  return res.json(productos);
});

productosRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const producto = productos.find((prod) => prod.id === pid);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  return res.json(producto);
});

productosRouter.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));

  const id = uuidv4();

  const nuevoProducto = {
    id,
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails,
  };

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  productos.push(nuevoProducto);

  fs.writeFileSync('productos.json', JSON.stringify(productos));

  return res.status(201).json(nuevoProducto);
});

productosRouter.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const productoIndex = productos.findIndex((prod) => prod.id === pid);

  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const productoActualizado = {
    ...productos[productoIndex],
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };

  productos[productoIndex] = productoActualizado;

  fs.writeFileSync('productos.json', JSON.stringify(productos));

  return res.json(productoActualizado);
});

productosRouter.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const productoIndex = productos.findIndex((prod) => prod.id === parseInt(pid));
  if (productoIndex === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    productos.splice(productoIndex, 1);
    fs.writeFileSync('productos.json', JSON.stringify(productos));
    res.status(200).json(productos);
  }
});

app.listen(8080, () => console.log('Servidor escuchando en puerto 8080'));
