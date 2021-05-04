let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://34.72.234.227:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
///PDF




document.getElementById("PrincipalDoctor").innerHTML=`Bienvenida ${sessionStorage.getItem("UsuarioIniciado")}`



//MODIFICAR PERFIL
function ModificarPerfilD(){
  let UserDoctor=sessionStorage.getItem("UsuarioIniciado");

  fetch(`http://34.72.234.227:5000/ModificarDoctor/${UserDoctor}`)
  .then(Respuesta => Respuesta.json())
  .then(Data =>{
    let FechaNacimientoDoc=`${Data.FechaDoc}`.split("/");
    document.getElementById("INombreNuevoD").value=`${Data.NombreDoc}`;
    document.getElementById("IApellidoNuevoD").value=`${Data.ApellidoDoc}`;
    document.getElementById("ITelNuevoD").value=`${Data.TelefonoDoc}`;
    document.getElementById("InputDiaNuevoD").value=`${FechaNacimientoDoc[0]}`;
    document.getElementById("MesNuevoD").value=`${FechaNacimientoDoc[1]}`;
    document.getElementById("InputAñoNuevoD").value=`${FechaNacimientoDoc[2]}`;
document.getElementById("IEspeciNuevoD").value=`${Data.EspecialidadDoc}`;
   document.getElementById("IUsuarioNuevoD").value=`${Data.UserDoc}`;
    document.getElementById("IContraseñaNuevaD").value=`${Data.PasswordDoc}`;
    document.getElementById("GeneroNuevoD").value=`${Data.GeneroDoc}`;
});
}
/////////////////BOTON PARA MODIFICAR

function botonModificarD(){
  let UserDoctor=sessionStorage.getItem("UsuarioIniciado");

  let NombreDocAct=document.getElementById("INombreNuevoD").value;
  let ApellidoDocAct=document.getElementById("IApellidoNuevoD").value;
 let TelefonoDocAct=document.getElementById("ITelNuevoD").value;
 let FechaNacDocAct=document.getElementById("InputDiaNuevoD").value+'/'+document.getElementById("MesNuevoD").value+'/'+document.getElementById("InputAñoNuevoD").value;
 let UsuarioDocAct=document.getElementById("IUsuarioNuevoD").value;
 let PasswordDocAct=document.getElementById("IContraseñaNuevaD").value;
 let EspecialidadDocAct=document.getElementById("IEspeciNuevoD").value
  let GeneroDocAct=document.getElementById("GeneroNuevoD").value;
  if(`${UserDoctor}`==`${UsuarioDocAct}`){
      fetch(`http://34.72.234.227:5000/ModificarDoctorDatos/${UserDoctor}`, {
          method: 'PUT',
          headers,
          body:`{
              "nombreDoctorAct":"${NombreDocAct}",
              "apellidoDoctorAct":"${ApellidoDocAct}",
              "fechaDoctorAct":"${FechaNacDocAct}",
              "generoDoctorAct":"${GeneroDocAct}",
              "userDoctorAct":"${UsuarioDocAct}",
              "passwordDoctorAct":"${PasswordDocAct}",
              "especialidadDoctorAct":"${EspecialidadDocAct}",
              "telefonoDoctorAct":"${TelefonoDocAct}"
              }`
        })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
        if(result.data=="Actualizado"){
          swal({
            icon: "success",
          });
                location.reload();
          }    
        })
        .catch(error => {
          console.error('Error:', error);
        });


  }else{
  fetch(`http://34.72.234.227:5000/ModificarDoctor/${UserDoctor}`, {
      method: 'PUT',
      headers,
      body:`{
        "nombreDoctorAct":"${NombreDocAct}",
        "apellidoDoctorAct":"${ApellidoDocAct}",
        "fechaDoctorAct":"${FechaNacDocAct}",
        "generoDoctorAct":"${GeneroDocAct}",
        "userDoctorAct":"${UsuarioDocAct}",
        "passwordDoctorAct":"${PasswordDocAct}",
        "especialidadDoctorAct":"${EspecialidadDocAct}",
        "telefonoDoctorAct":"${TelefonoDocAct}"
        }`
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      if(result.data=="Existe"){
        Swal.fire({
          title: 'Intenta de nuevo',
          text: 'Este Usuario ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        location.reload();

      }else if(result.data=="Actualizado"){
        sessionStorage.setItem("UsuarioIniciado",UsuarioDocAct)
        Swal.fire({
          title: 'Actualizado',
          text: 'Se actualizó el paciente',
          icon: 'success',
          confirmButtonText: 'Ok'
        
        });
            location.reload();
      }    
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}

