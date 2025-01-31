const fs = require('fs');
const path = require("path")

class ProductManager {
    products;
    path;

    constructor(productsFile) {
        this.counter = 1
        this.path = productsFile;
        this.products = this.getProductsFromFile();
        if (!fs.existsSync(productsFile)) {
            fs.writeFileSync(productsFile, JSON.stringify([]));
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(product => product.code === code)) {
            throw new Error("El código del producto ya existe");
        }

        
        const id  = this.counter++;

        const newProduct = {
            id ,
            
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            date: new Date().toLocaleDateString()
        }

        this.products.push(newProduct);
        this.saveProductsToFile(this.products);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }
        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProductsToFile(this.products);
        return this.products[index];
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProductsToFile(this.products);
    }

    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path);
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo:", error.message);
            return [];
        }
    }

    saveProductsToFile(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error("Error al guardar en el archivo:", error.message);
        }
    }
}

module.exports = ProductManager

// Ejemplo de uso
//const manager = new ProductManager(path.join(__dirname, "..", "data", "productos.json"));

/* try {
    // Agregar un nuevo producto
    const newProduct = manager.addProduct("Frida Maceta", "Maceta con forma de Frida Kalo de 20 cm de alto", 30000, undefined, "b4cd", 2);
    console.log("Producto agregado:", newProduct);
    const newProduct2 = manager.addProduct("Gato Mate", "Mate con forma de gato", 25000, undefined, "b5cd", 8);
    console.log("Producto agregado:", newProduct);
    const newProduct3 = manager.addProduct("Gato Maceta", "Maceta con de Gato", 2000, undefined, "b6cd", 12);
    console.log("Producto agregado:", newProduct);
    const newProduct4 = manager.addProduct("Gordita Voladoras", "Maceta colgante", 15000, undefined, "b7cd", 4);
    console.log("Producto agregado:", newProduct);
    const newProduct5 = manager.addProduct("Tetera", "Tetera de 500 ml", 15000, undefined, "b8cd", 1);
    console.log("Producto agregado:", newProduct);
    const newProduct6 = manager.addProduct("Gato Iman", "iman con forma de cara de gato", 2000, undefined, "b9cd", 15);
    console.log("Producto agregado:", newProduct);
    const newProduct7 = manager.addProduct("Gato cascavel", "Cascavel con forma de gato", 5000, undefined, "b0cd", 8);
    console.log("Producto agregado:", newProduct);
    const newProduct8 = manager.addProduct("Gato Chupetin", "Tutor de gato", 4500, undefined, "b1cd", 10);
    console.log("Producto agregado:", newProduct);
    const newProduct9 = manager.addProduct("Pajarito Tutor", "Tutor con forma de pajaro", 2000, undefined, "b2cd", 20);
    console.log("Producto agregado:", newProduct);
    const newProduct10 = manager.addProduct("Gato Recostado", "Maceta con forma gato recostado", 25000, undefined, "b3cd", 2);
    console.log("Producto agregado:", newProduct);

    // Obtener todos los productos
    const allProducts = manager.getProducts();
    console.log("Todos los productos:", allProducts);

    // Obtener un producto por su ID
    const productId = newProduct.id;
    const productById = manager.getProductById(productId);
    console.log("Producto encontrado por ID:", productById);

    // Actualizar un producto
    const updatedProduct = manager.updateProduct(productId, { price: 120 }); // Actualizamos solo el precio
    console.log("Producto actualizado:", updatedProduct);

    // Eliminar un producto
    manager.deleteProduct(productId);
    console.log("Producto eliminado con éxito"); 

    // Verificar que el producto haya sido eliminado
    const remainingProducts = manager.getProducts();
    console.log("Productos restantes:", remainingProducts);
} catch (error) {
    console.error("Error:", error.message);
}
 */