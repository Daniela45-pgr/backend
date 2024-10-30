var rutas = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, editarProducto } = require("../bd/productoBD");

rutas.get("/", async (req, res) => {
    var productosValidos = await mostrarProductos();
    console.log(productosValidos);
    res.json(productosValidos);
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

rutas.post("/nuevoProducto", async (req, res) => {
    var productoGuardado = await nuevoProducto(req.body);
    res.json(productoGuardado);
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.put("/editarProducto/:id", async (req, res) => {
    var productoEditado = await editarProducto(req.params.id, req.body);
    res.json(productoEditado);
});

module.exports = rutas;
