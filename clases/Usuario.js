class Usuario {
    constructor(data) {
        this._id = data.id; // Solo asigna el id directamente
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }


    set id(id) {
        this._id = id;
    }
 
  set nombre(nombre){
      const nombreRegex=/^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
      if (nombreRegex.test(nombre)){
          this._nombre=nombre;    
      }  
  }

  set usuario(usuario=""){
      if (usuario.length>0) {
          this._usuario=usuario;
      }
     
  }

  set password(password=""){
      if (password.length>0) {
          this._password=password;
      }
      
  }

  set salt(salt){
      this._salt=salt;
  }

  set tipoUsuario(tipoUsuario){
      this._tipoUsuario=tipoUsuario;
  }

  get id() {
    return this._id;
  }
  
  get nombre(){
      return this._nombre;
  }

  get usuario(){
      return this._usuario;
  }

  get password(){
      return this._password;
  }

  get datos(){
      if (this.id!=undefined) {
          return {
              id:this._id,
              nombre:this.nombre,
              usuario:this.usuario,
              password:this.password,
              salt:this.salt,
              tipoUsuario:this.tipoUsuario
          }
      }else{
          return {
             
              nombre:this.nombre,
              usuario:this.usuario,
              password:this.password,
              salt:this.salt,
              tipoUsuario:this.tipoUsuario
          }
      }
      
  }

  get salt(){
      return this._salt;
  }

  get tipoUsuario(){
      return this._tipoUsuario;
  }

}

module.exports=Usuario;

/*data={
  id:"fkjd",
  nombre:"Miguel Hidalgo",
  usuario:"hidalgo",
  password:"abc"
}

const usuario1=new Usuario(data);
console.log(usuario1);*/