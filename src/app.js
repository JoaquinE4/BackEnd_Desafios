const express = require("express")
const ProductosJson = require("./data/productos.json")
const ProductManager = require("./classes/ProductManager")

const PORT = 8080

const app = express()
const productosJson = ProductosJson
const productManager = new ProductManager("./data/productos.json")

app.get("/", (req, res) => {
    res.send("Bienvenido!")
})

app.get("/productos", (req, res) => {

    let productos = productManager.getProducts()
    let limit = req.query.limit

    if (limit && limit > 0) {
        return res.json(productosJson.slice(0, limit))
    } else {
        res.json(productos)
    }
    res.json(productos)
})

app.get("/productos/:id", (req, res) => {
    let id = req.params.id
    id = Number(id)
    console.log(id, typeof id)
    if (isNaN(id)) {
        return res.json("Su valor no es un numero")
    } 
    
    try {
        let productId = productManager.getProductById(id);
        return res.json(productId);
    } catch (error) {
        return res.json({ error: error.message });
    }

})

app.listen(PORT, () => console.log("server Online"))