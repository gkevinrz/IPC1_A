let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://34.72.234.227:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
///PDF

document.getElementById("PrincipalEnfermera").innerHTML=`Bienvenida ${sessionStorage.getItem("UsuarioIniciado")}`
function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0
    });
  }
  return result;
}








//MODIFICAR PERFIL
function ModificarPerfilE(){
  let UserEnfermera=sessionStorage.getItem("UsuarioIniciado");

  fetch(`http://34.72.234.227:5000/ModificarEnfermera/${UserEnfermera}`)
  .then(Respuesta => Respuesta.json())
  .then(Data =>{
    let FechaNacimientoEnf=`${Data.FechaEnf}`.split("/");
    document.getElementById("INombreNuevoE").value=`${Data.NombreEnf}`;
    document.getElementById("IApellidoNuevoE").value=`${Data.ApellidoEnf}`;
    document.getElementById("ITelNuevoE").value=`${Data.TelefonoEnf}`;
    document.getElementById("InputDiaNuevoE").value=`${FechaNacimientoEnf[0]}`;
    document.getElementById("MesNuevoE").value=`${FechaNacimientoEnf[1]}`;
    document.getElementById("InputAñoNuevoE").value=`${FechaNacimientoEnf[2]}`

   document.getElementById("IUsuarioNuevoE").value=`${Data.UserEnf}`;
    document.getElementById("IContraseñaNuevaE").value=`${Data.PasswordEnf}`;
    document.getElementById("GeneroNuevoE").value=`${Data.GeneroEnf}`;
});
}
/////////////////BOTON PARA MODIFICAR

function botonModificarE(){
  let UserEnfermera=sessionStorage.getItem("UsuarioIniciado");

  let NombreEnfermeraAct=document.getElementById("INombreNuevoE").value;
  let ApellidoEnfermeraAct=document.getElementById("IApellidoNuevoE").value;
 let TelefonoEnfermeraAct=document.getElementById("ITelNuevoE").value;
 let FechaNacEnfermeraAct=document.getElementById("InputDiaNuevoE").value+'/'+document.getElementById("MesNuevoE").value+'/'+document.getElementById("InputAñoNuevoE").value;
 let UsuarioEnfermeraAct=document.getElementById("IUsuarioNuevoE").value;
 let PasswordEnfermeraAct=document.getElementById("IContraseñaNuevaE").value;
  let GeneroEnfermeraAct=document.getElementById("GeneroNuevoE").value;
  if(`${UserEnfermera}`==`${UsuarioEnfermeraAct}`){
      fetch(`http://34.72.234.227:5000/ModificarEnfermeraDatos/${UserEnfermera}`, {
          method: 'PUT',
          headers,
          body:`{
              "nombreEnferAct":"${NombreEnfermeraAct}",
              "apellidoEnferAct":"${ApellidoEnfermeraAct}",
              "fechaEnferAct":"${FechaNacEnfermeraAct}",
              "generoEnferAct":"${GeneroEnfermeraAct}",
              "userEnferAct":"${UsuarioEnfermeraAct}",
              "passwordEnferAct":"${PasswordEnfermeraAct}",
              "telefonoEnferAct":"${TelefonoEnfermeraAct}"
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
  fetch(`http://34.72.234.227:5000/ModificarEnfermera/${UserEnfermera}`, {
      method: 'PUT',
      headers,
      body:`{
        "nombreEnferAct":"${NombreEnfermeraAct}",
        "apellidoEnferAct":"${ApellidoEnfermeraAct}",
        "fechaEnferAct":"${FechaNacEnfermeraAct}",
        "generoEnferAct":"${GeneroEnfermeraAct}",
        "userEnferAct":"${UsuarioEnfermeraAct}",
        "passwordEnferAct":"${PasswordEnfermeraAct}",
        "telefonoEnferAct":"${TelefonoEnfermeraAct}"
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
        sessionStorage.setItem("UsuarioIniciado",UsuarioEnfermeraAct)
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
cantidadcitas=0;


function cargarcitasenfermera(){
  let HtmlTextoTablaMedicina2=``;
    fetch('http://34.72.234.227:5000/VerCitasPendientes')
    .then(response2 => response2.json())
    .then(data2 =>{

      let   cantidadcitas=data2.length
      var i;
      for(i=0;i<data2.length;i++){
          HtmlTextoTablaMedicina2+=`
          <tr>

          <td>${data2[i].FechaCita}</td>
          <td>${data2[i].HoraCita}</td>
          <td>${data2[i].MotivoCita}</td>
          <td>
          <select id="Combo${i}"> 
             </select>
          </td>
          <td>
              <ul class="list-inline m-0">
                  <li class="list-inline-item">
                  <button id="BotonAceptar${i}" onclick="fun('${data2[i].FechaCita}')"type="button" class="btn btn-success">Aceptar</button>
                  </li>
              </ul>
         
          </td>
        </tr>
       `}
      document.getElementById("TablaCitasPendientes").innerHTML = HtmlTextoTablaMedicina2; 
      
      cargardoctores(cantidadcitas)

     })
     

    }
  
    function cargardoctores(r){
      let HtmlTextoTablaMedicina2=``;
      fetch('http://34.72.234.227:5000/VerDoctores')
      .then(response2 => response2.json())
      .then(data2 =>{
        var i;
        for(i=0;i<data2.length;i++){
       
          HtmlTextoTablaMedicina2+=`<option value="${data2[i].NombreDoc}">${data2[i].NombreDoc}</option>`
        }


       for(var z=0;z<r;z++){
        document.getElementById(`Combo${z}`).innerHTML = HtmlTextoTablaMedicina2;   
        let a=document.getElementById(`Combo0`).value
        document.getElementById(`BotonAceptar${z}`).onclick=function(){
          alert(a)
        
        }
       }
       
          })

        
       
       
        
          } 
  
      
    
      

    

 
    
      


  
/*  fetch(`http://34.72.234.227:5000/VerDoctores`)
    .then(response => response.json())
    .then(data2 =>{
      for(var l=0;l<data.length;l++){
     for(var z=0;z<data2.length;z++){
    document.getElementById(`Combo${l}`).innerHTML+=`<option value="${data2[z].NombreDoc}">${data2[z].NombreDoc}</option>`
    }
   
  }
    });*/
   
         
           
  
  

function fun(s){
  alert(s)
}





