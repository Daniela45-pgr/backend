class Venta {
    constructor(data) {
        this.idUsuario = data.idUsuario;
        this.idProducto = data.idProducto;
        this.cantidad = data.cantidad;
        this.fechaHora = new Date().toISOString(); // Se puede asignar aquí
        this.estatus = "vendido"; // Establece el estatus aquí
    }

    get getVenta() {
        return {
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            cantidad: this.cantidad,
            fechaHora: this.fechaHora,
            estatus: this.estatus
        };
    }
}

module.exports = Venta;
