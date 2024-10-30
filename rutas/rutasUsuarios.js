var rutas=require("express").Router();


var {mostrarUsuarios,nuevoUsuario,borrarUsuario,buscarPorId,editarUsuario}=require("../bd/usuarioBD")

rutas.get("/",async(req,res) =>{

   var usuariosValidos = await mostrarUsuarios(); 
   res.json(usuariosValidos);
   
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuariosValido = await buscarPorId(req.params.id);
    res.json(usuariosValido);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
   
    var usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
})

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
})

rutas.put("/editarUsuario/:id", async (req, res) => {
    var usuarioEditado = await editarUsuario(req.params.id, req.body);
    res.json(usuarioEditado);
 });
module.exports=rutas;