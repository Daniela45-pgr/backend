const { productosBD } = require("./Conexion");
const Producto = require("../clases/Producto");
const { encriptarPassword, validarPassword } = require("../middlewares/funcionesPassword");

function validar(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.precio != undefined && producto.stock != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validar(producto1.datos)) {
            productosValidos.push(producto1.datos);
        }
    });
    return productosValidos;
}

async function buscarPorId(id) {
    let productoValido;
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    if (validar(producto1.datos)) {
        productoValido = producto1.datos;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    let productoGuardado = false;

    if (validar(producto1.datos)) {
        await productosBD.doc().set(producto1.datos);
        productoGuardado = true;
    }
    return productoGuardado;
}

async function borrarProducto(id) {
    let productoBorrado = false;
    if (await buscarPorId(id) != undefined) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

async function editarProducto(id, data) {
    const producto = await buscarPorId(id);
    let productoEditado = false;

    if (producto && validar(data)) {
        await productosBD.doc(id).update(data);
        productoEditado = true;
    }
    return productoEditado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorId,
    editarProducto
};
