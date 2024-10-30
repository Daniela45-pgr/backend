const admin=require("firebase-admin");
const keys=require("../keys.json");


admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const bd=admin.firestore();
const usuariosBD=bd.collection("miejemploDB");
const productosBD=bd.collection("productos");
const ventasBD = bd.collection("ventas");

module.exports = {
    usuariosBD,
    productosBD,
    ventasBD
}