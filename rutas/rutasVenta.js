
var rutas = require("express").Router();
var { nuevaVenta, mostrarVentas, buscarVentaPorID, cancelarVenta, editarVenta } = require("../bd/ventaBD");

rutas.post("/nuevaVenta", async (req, res) => {
    const resultado = await nuevaVenta(req.body);
    res.json(resultado);
});

rutas.get("/mostrarVenta", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas); 
});

rutas.get("/buscarVentaPorID/:id", async (req, res) => {
    const ventaValida = await buscarVentaPorID(req.params.id);
    if (ventaValida) {
        res.json(ventaValida);
    } else {
        res.json({ success: false, message: "Venta no encontrada" });
    }
});

rutas.put("/cancelarVenta/:id", async (req, res) => {
    const resultado = await cancelarVenta(req.params.id);
    res.json(resultado);
});

rutas.put("/editarVenta/:id", async (req, res) => {
    const resultado = await editarVenta(req.params.id, req.body);
    res.json(resultado);
});

module.exports = rutas;
