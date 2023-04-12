class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error(`El código ${code} ya existe`);
      return;
    }

    const newProduct = {
      id: this.nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.nextId++;

    console.log(`Producto ${newProduct.title} agregado con éxito`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.error(`Producto con id ${id} Not Found`);
      return;
    }

    return product;
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Camiseta",
  "Camiseta de Juventus",
  12000,
  "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/camiseta-juventus-adidas-oficial-blanca-36645964-100020dw5455001-1.jpg",
  "1",
  3
);

productManager.addProduct(
  "Gorra",
  "Gorra de Phoenix Suns",
  5500,
  "https://media.newera.com.ar/catalog/product/cache/06cfaa02c67cf3a5c3c05d775284c631/6/0/60243119-gorra-new-era-phoenix-suns-nba22-draft-920_1_.jpg",
  "2",
  4
);

const products = productManager.getProducts();
console.log(products);

const product = productManager.getProductById(1);
console.log(product);

const notFoundProduct = productManager.getProductById(3);
console.log(notFoundProduct);
