const express = require("express");
 const cors = require("cors");

const usuarioRutas = require("./rutas/rutasUsuarios");
const rutasVenta = require("./rutas/rutasVenta");
const rutasProducto = require("./rutas/rutasProducto");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Esto es importante para que req.body funcione
app.use(cors());
app.use("/usuarios", usuarioRutas);
app.use("/ventas", rutasVenta);
app.use("/productos", rutasProducto);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});

