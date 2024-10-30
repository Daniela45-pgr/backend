const { usuariosBD } = require("./Conexion");
const Usuario = require("../clases/Usuario");
const { encriptarPassword, validarPassword } = require("../middlewares/funcionesPassword");

function validar(usuario) {
    var valido = false;
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {

        valido = true;
    }
    return valido;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    usuariosValidos = [];
    usuarios.forEach(usuario => {    
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });

        if (validar(usuario1.datos)) {
            usuariosValidos.push(usuario1.datos);
        }
    });


    return usuariosValidos;
}

async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
    return usuario1.datos;
}



async function nuevoUsuario(data) {
    const { hash, salt } = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data)
    var usuariosValido = {};
    var usuarioGuardado = false;
    if (validar(usuario1.datos)) {
        usuariosValido = usuario1.datos;
        await usuariosBD.doc().set(usuariosValido);
        usuarioGuardado=true;
    }
    return usuarioGuardado;
}


async function borrarUsuario(id) {
    //console.log(await buscarPorId(id));
    var usuarioBorrado = false;
    if (await buscarPorId(id) != undefined) {
        //console.log("Se borrora al usuario");
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true;
    }
    return usuarioBorrado;
}

async function editarUsuario(id, data) {
    var usuarioEditado = false;
    const usuarioExistente = await buscarPorId(id);
    
    if (usuarioExistente) {
        const updateData = {};
        
        if (data.nombre) updateData.nombre = data.nombre;
        if (data.usuario) updateData.usuario = data.usuario;
        if (data.password) {
            const { hash, salt } = encriptarPassword(data.password);
            updateData.password = hash;
            updateData.salt = salt;
        }

        await usuariosBD.doc(id).update(updateData); 
        usuarioEditado = true;
    }
    
    return usuarioEditado;
}


module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    editarUsuario
};