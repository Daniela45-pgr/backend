const { ventasBD, usuariosBD, productosBD } = require("./Conexion"); 
const Venta = require("../clases/Venta");

async function nuevaVenta(data) {
    try {
        if (!data.idUsuario || !data.idProducto) {
            throw new Error("idUsuario y idProducto son requeridos");
        }

        
        data.fecha = new Date().toISOString(); 

        const venta = new Venta(data);
        await ventasBD.add(venta.getVenta);
        return { success: true, message: "Venta creada exitosamente" };
    } catch (error) {
        return { success: false, message: "Error al crear la venta", error: error.message };
    }
}


async function mostrarVentas() {
    try {
        const snapshot = await ventasBD.get();
        const ventas = [];

        for (const doc of snapshot.docs) {
            const ventaData = doc.data();
            if (!ventaData.idUsuario || !ventaData.idProducto) {
                console.warn(`Venta con ID ${doc.id} omite por falta de ID de usuario o producto.`);
                continue; 
            }

            const usuarioDoc = await usuariosBD.doc(ventaData.idUsuario).get();
            const nombreUsuario = usuarioDoc.exists ? usuarioDoc.data().nombre : "Usuario no encontrado";

            
            const productoDoc = await productosBD.doc(ventaData.idProducto).get();
            const nombreProducto = productoDoc.exists ? productoDoc.data().nombre : "Producto no encontrado";

            let fecha = "Fecha no disponible";
            if (ventaData.fechaHora && typeof ventaData.fechaHora === "string") {
                fecha = new Date(ventaData.fechaHora).toLocaleString();
            }

            ventas.push({
                id: doc.id,
                nombreUsuario,
                nombreProducto,
                cantidad: ventaData.cantidad,
                fecha,
                estatus: ventaData.estatus
            });
        }
        return ventas;

    } catch (error) {
        return []; 
    }
}


async function buscarVentaPorID(id) {
    try {
        const venta = await ventasBD.doc(id).get();
        if (!venta.exists) {
            console.log("Venta no encontrada con ID:", id);
            return null;
        }
        const ventaData = { id: venta.id, ...venta.data() };
        console.log("Venta encontrada:", ventaData); 
        return ventaData;
    } catch (error) {
        console.error("Error al buscar la venta por ID:", error.message); 
        return null;
    }
}

async function cancelarVenta(id) {
    try {
        const venta = await ventasBD.doc(id).get();
        if (!venta.exists) {
            console.log("Venta no encontrada con ID para cancelar:", id); 
            return { success: false, message: "Venta no encontrada" };
        }
        await ventasBD.doc(id).update({ estatus: "cancelado" });
        console.log("Venta cancelada exitosamente con ID:", id); 
        return { success: true, message: "Venta cancelada exitosamente" };
    } catch (error) {
        console.error("Error al cancelar la venta:", error.message); 
        return { success: false, message: "Error al cancelar la venta", error: error.message };
    }
}

async function editarVenta(id, data) {
    try {
        const venta = await ventasBD.doc(id).get();
        if (!venta.exists) {
            return { success: false, message: "Venta no encontrada" };
        }

        
        const updateData = {};
        if (data.nombreProducto) updateData.nombreProducto = data.nombreProducto;
        if (data.cantidad) updateData.cantidad = data.cantidad;

        
        await ventasBD.doc(id).update(updateData);
        return { success: true, message: "Venta actualizada exitosamente" };
    } catch (error) {
        console.error("Error al editar la venta:", error.message);
        return { success: false, message: "Error al editar la venta", error: error.message };
    }
}


module.exports = {
    nuevaVenta,
    mostrarVentas,
    buscarVentaPorID,
    cancelarVenta,
    editarVenta
};
