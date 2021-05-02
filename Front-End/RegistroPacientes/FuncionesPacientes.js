let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
let FormRegistro=document.getElementById("FormRegistro");
let FormLogin=document.getElementById("FormLogin");





//Funcion para Login
FormLogin.addEventListener("submit",function(e){
e.preventDefault();

let UsernameForm=document.getElementById("InputUserLogin").value;
let PasswordForm=document.getElementById("InputPasLogin").value;

fetch(`http://localhost:5000/IniciarSesion/${UsernameForm}/${PasswordForm}`)
// Convirtiendo de string a texto
.then(response => response.json())
// Manejando la data
.then(data => {
    console.log(data.data)
    if(data.data=="Admin"){
      Swal.fire({
        title: 'Bienvenido',
        text: 'Módulo Administrador',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      window.location.href='../ModuloAdministrador/index.html'

    }else if(data.data=="Paciente"){
      
      Swal.fire({
        title: `Bienvenido ${UsernameForm}`,
        text: 'Módulo Paciente',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
 
       sessionStorage.setItem('UsuarioIniciado',`${UsernameForm}`)
        window.location='../ModuloPaciente/index.html'
      
    }else if(data.data=="Enfermera"){
      Swal.fire({
        title: `Bienvenido ${UsernameForm}`,
        text: 'Módulo Enfermera',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      sessionStorage.setItem('UsuarioIniciado',`${UsernameForm}`)
        window.location.href='../ModuloEnfermera/index.html'

    }else if (data.data=="Doctor"){
      Swal.fire({
        title: `Bienvenido ${UsernameForm}`,
        text: 'Módulo Doctor',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      sessionStorage.setItem('UsuarioIniciado',`${UsernameForm}`)
      window.location.href='../ModuloDoctor/index.html'


    }else{
      Swal.fire({
        title: `Este usuario no existe`,
        text: 'Error',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    }


})


});
//////Guardar


//Funcion para Registro

FormRegistro.addEventListener("submit",function(e){
   e.preventDefault();
  
  let NombrePaciente=document.getElementById("InputNombre").value;
  let ApellidoPaciente=document.getElementById("InputApellido").value;
  let FechaNacimiento=document.getElementById("InputDia").value +"/"+document.getElementById("Mes").value+"/"+document.getElementById("InputAño").value;
  let GeneroPaciente=document.getElementById("Genero").value;
  let UserPaciente=document.getElementById("InputUser").value;
  let PasswordPaciente=document.getElementById("InputPassword").value;
  let TelefonoPaciente=document.getElementById("InputTel").value;
  fetch('http://localhost:5000/CrearPaciente',
  {
      method:'POST',
      headers,
      body: `{
              "nombrePaciente":"${NombrePaciente}",
              "apellidoPaciente":"${ApellidoPaciente}",
              "fechaPaciente":"${FechaNacimiento}",
              "generoPaciente":"${GeneroPaciente}",
              "userPaciente":"${UserPaciente}",
              "passwordPaciente":"${PasswordPaciente}",
              "telefonoPaciente":"${TelefonoPaciente}"
              }`
  })
  .then(response => response.json())
  .then(
      result => {
          console.log('Success:', result);
          if(result.data=='Creado'){
              Swal.fire({
                  title: 'Creado',
                  text: 'Usuario Creado Correctamente',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                resetForm();
          }else if(result.data=="Existe"){
              Swal.fire({
                  title: 'Intenta de nuevo',
                  text: 'Este Usuario ya existe',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
                resetForm();
          }
    
        }
  )
  .catch(error => {
      console.error('Error:', error)
      Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error.Por favor verifica',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
          })
          resetForm();
 
      });
    
function resetForm(){
  FormRegistro.reset();
}
   
function IniciarSesion(){




}