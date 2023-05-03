const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: products.length + 1,
      ...product
    };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return newProduct;
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
    const products = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(products);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    const updatedProduct = {
      ...products[productIndex],
      ...updatedFields
    };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(this.path, JSON.stringify(products));
    return updatedProduct;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(filteredProducts));
  }
}

const productManager = new ProductManager('./products.json');

// Agregar un producto
const newProduct = {
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'https://imagen.com/producto1.jpg',
  code: 'PRD001',
  stock: 20
};
const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Agregar otro producto
const anotherProduct = {
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 19.99,
  thumbnail: 'https://imagen.com/producto2.jpg',
  code: 'PRD002',
  stock: 15
};
const addedProduct2 = productManager.addProduct(anotherProduct);
console.log('Producto agregado:', addedProduct2);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por id
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(`Producto con id ${productId}:`, productById);

// Actualizar un producto por id
const productIdToUpdate = 2;
const updatedProductFields = {
  title: 'Producto 2 - actualizado',
  price: 24.99,
  stock: 10
};
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedProductFields);
console.log(`Producto con id ${productIdToUpdate} actualizado:`, updatedProduct);

// Eliminar un producto por id
const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
console.log(`Producto con id ${productIdToDelete} eliminado`);