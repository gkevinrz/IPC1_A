let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
///PDF
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
function ConvertirDataPedido(Pedido){
  var data ={
    "Nombre Medicamento":Pedido.NombreMedicamento,
    "Precio":Pedido.PrecioMedicamento,
    "Cantidad":Pedido.CantidadMedicamento,
    "SubTotal":"Q"+Pedido.SubTotalMedicamento
  }

  return data

}
function CrearPDFPedido(){
 fetch('http://localhost:5000/VerPedidoPaciente')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeaders([
      "Nombre Medicamento",
      "Precio",
      "Cantidad",
      "SubTotal"

    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},ConvertirDataPedido(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
  let styles = {
      autoSize: false,
      printHeaders: true,
      columnWidths: 30
      }
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  
    doc.table(50,10, datos, headers, styles);
    doc.save("Pedido.pdf")
  })
  
  fetch('http://localhost:5000/VerPedidoPaciente')
  .then(response => response.json())
  .then(data=>{
    for(var i=0;i<data.length;i++){
      fetch('http://localhost:5000/RegistrarPedido',{
    method:'POST',
    headers,
    body: `{
            "nombreMedic":"${data[i].NombreMedicamento}",
            "cantidadMedic":"${data[i].CantidadMedicamento}"
            }`
      }).then(resp=>resp.json).then(respuestaa=>{
        location.reload()
    
      
      })



    }
 
    fetch(`http://localhost:5000/CerrarSesionPaciente`)
    .then(response => response.json())
    .then(data =>{
     if(data.data=="cerrar"){
    
      
     }
    
    });

  })
 




}







//MODIFICAR PERFIL
function ModificarPerfilP(){
  let UserPacienteCita=sessionStorage.getItem("UsuarioIniciado");

  fetch(`http://localhost:5000/ModificarPaciente/${UserPacienteCita}`)
  .then(Respuesta => Respuesta.json())
  .then(Data =>{
    let FechaNacimiento=`${Data.FechaPac}`.split("/");
    document.getElementById("INombreNuevo").value=`${Data.NombrePac}`;
    document.getElementById("IApellidoNuevo").value=`${Data.ApellidoPac}`;
    document.getElementById("ITelNuevo").value=`${Data.TelefonoPac}`;
    document.getElementById("InputDiaNuevo").value=`${FechaNacimiento[0]}`;
    document.getElementById("MesNuevo").value=`${FechaNacimiento[1]}`;
    document.getElementById("InputAñoNuevo").value=`${FechaNacimiento[2]}`

   document.getElementById("IUsuarioNuevo").value=`${Data.UserPac}`;
    document.getElementById("IContraseñaNueva").value=`${Data.PasswordPac}`;
    document.getElementById("GeneroNuevo").value=`${Data.GeneroPac}`;
});
}
/////////////////BOTON PARA MODIFICAR
let UserPacienteCita=sessionStorage.getItem("UsuarioIniciado");
function botonModificarP(){
  

  let NombrePacienteAct=document.getElementById("INombreNuevo").value;
  let ApellidoPacienteAct=document.getElementById("IApellidoNuevo").value;
 let TelefonoPacienteAct=document.getElementById("ITelNuevo").value;
 let FechaNacPacienteAct=document.getElementById("InputDiaNuevo").value+'/'+document.getElementById("MesNuevo").value+'/'+document.getElementById("InputAñoNuevo").value;
 let UsuarioPacienteAct=document.getElementById("IUsuarioNuevo").value;
 let PasswordPacienteAct=document.getElementById("IContraseñaNueva").value;
  let GeneroPacietneAct=document.getElementById("GeneroNuevo").value;


  if(`${UserPacienteCita}`==`${UsuarioPacienteAct}`){
      fetch(`http://localhost:5000/ModificarPacienteDatos/${UserPacienteCita}`, {
          method: 'PUT',
          headers,
          body:`{
              "nombrePacienteAct":"${NombrePacienteAct}",
              "apellidoPacienteAct":"${ApellidoPacienteAct}",
              "fechaPacienteAct":"${FechaNacPacienteAct}",
              "generoPacienteAct":"${GeneroPacietneAct}",
              "userPacienteAct":"${UsuarioPacienteAct}",
              "passwordPacienteAct":"${PasswordPacienteAct}",
              "telefonoPacienteAct":"${TelefonoPacienteAct}"
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
  fetch(`http://localhost:5000/ModificarPaciente/${UserPacienteCita}`, {
      method: 'PUT',
      headers,
      body:`{
          "nombrePacienteAct":"${NombrePacienteAct}",
          "apellidoPacienteAct":"${ApellidoPacienteAct}",
          "fechaPacienteAct":"${FechaNacPacienteAct}",
          "generoPacienteAct":"${GeneroPacietneAct}",
          "userPacienteAct":"${UsuarioPacienteAct}",
          "passwordPacienteAct":"${PasswordPacienteAct}",
          "telefonoPacienteAct":"${TelefonoPacienteAct}"
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
        sessionStorage.setItem("UsuarioIniciado",UsuarioPacienteAct)

          Swal.fire({
              title: 'Actualizado',
              text: 'Se actualizó el paciente',
              icon: 'success',
              confirmButtonText: 'Ok'
            
            });
location.reload()
            
      }    
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }
}










//Muestro Usuario que inicia sesion


let FormCita=document.getElementById("FormSolicitarCita");
FormCita.addEventListener("submit",function(e){
    e.preventDefault();
   
   let UserPacienteCita=sessionStorage.getItem("UsuarioIniciado");
let FechaSpliteado=document.getElementById("InputFechaCita").value.split("-");
let FechaCita=FechaSpliteado[2]+"/"+FechaSpliteado[1]+"/"+FechaSpliteado[0];

   let HoraCita=document.getElementById("InputHoraCita").value;
   let MotivoCita=document.getElementById("InputMotivoCita").value;
   fetch('http://localhost:5000/SolicitarCita',
   {
       method:'POST',
       headers,
       body: `{
               "userPaciente":"${UserPacienteCita}",
               "fechaCita":"${FechaCita}",
               "horaCita":"${HoraCita}",
               "motivoCita":"${MotivoCita}"
               }`
   })
   .then(response => response.json())
   .then(
       result => {
           console.log('Success:', result);
           if(result.data=='Creada'){
            Swal.fire({
                title: `Cita Creada`,
                text: 'Estar atento a la cita',
                icon: 'success',
                confirmButtonText: 'De acuerdo'
              });
              CargarCitas()
             
              this.reset();
           }else if(result.data=='Pendiente'){
            Swal.fire({
                title: `Pendiente`,
                text: 'Tu cita aún está en espera',
                icon: 'info',
                confirmButtonText: 'De acuerdo'
              });
              CargarCitas()
           }else if(result.data="Aceptada"){
            Swal.fire({
              title: `Cita Aceptada`,
              text: 'Debes esperar hasta el día de la cita',
              icon: 'info',
              confirmButtonText: 'De acuerdo'
            });
            CargarCitas()
           }
     
         }
   )
   .catch(error => {
       console.error('Error:', error)
   });
       });
////////////////////
function CargarCitas(){
     
    let UserPacienteCita=sessionStorage.getItem("UsuarioIniciado");
    let tablaCitasPaciente=``;
fetch(`http://localhost:5000/VerCitaPaciente/${UserPacienteCita}`)
.then(response => response.json())
.then(data =>{
    tablaCitasPaciente+=`<tr>
   
    <td>${data.MotivoCita}</td>
    <td>Pendiente</td>

  </tr>
 `

document.getElementById("CitasPaciente").innerHTML = tablaCitasPaciente;

});
}

//Carga Medicamento
function CargarMedicina(){
let ContenidoMedicinas="";
 fetch('http://localhost:5000/VerMedicina')
 .then(response => response.json())
 .then(data =>{
     var i;
     let Indice=data.length;
     for(i=0;i<data.length;i++){
         if(data[i].CantidadMed==0){
    continue
         }else{
          ContenidoMedicinas+= `
          <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <p class="bg-primary">${data[i].NombreMed}</p> 
 
            <div class="caption">
              <p>${data[i].DescripcionMed}</p>
              <span class="label label-primary" id="PrecioMedicina">Q${data[i].PrecioMed}</span>
               <h4>Cantidad:</h4>
              <input id ="InputCantidad${i}" type="number" min="1" max="1"  >
              <button id ="BotonAgregar${i}" onclick="AgregarMedicamento('${i}','${data[i].NombreMed}','${data[i].PrecioMed}','${data[i].CantidadMed}','${data[i].DescripcionMed}')" "type="button" aria-label="Right Align"class="btn btn-default btn-lg"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>Agregar</button>
               </div>
          </div>
        </div>`
         }
     }
    
      
     
     document.getElementById("CardsMedicina").innerHTML = ContenidoMedicinas;
     
     for(var x=0;x<data.length;x++){
       if (data[x].CantidadMed==0){
continue
       }else{
        document.getElementById(`InputCantidad${x}`).max=`${data[x].CantidadMed}`;
       }
        
   /*     let s=document.getElementById(`InputCantidad0`).value
document.getElementById(`BotonAgregar${x}`).onclick=function(){
  
    alert(s);
}*/
       // document.getElementById(`BotonAgregar${x}`).onclick=AgregarMedicamento(document.getElementById(`InputCantidad${x}`).value);
     }

 });


}
/**/

//NombreMedicamento,CantidadMedicamento,PrecioMedicamentof


function AgregarMedicamento(indice,NombreMedicamento,PrecioMedicamento,CantidadTotal,Descripcion){
 let id= document.getElementById(`InputCantidad${indice}`).value
fetch('http://localhost:5000/ComprarMedicina',
{
    method:'POST',
    headers,
    body: `{
            "nombreMedi":"${NombreMedicamento}",
            "precioMedi":"${PrecioMedicamento}",
            "cantidadMedi":"${id}",
            "cantidadTotal":"${CantidadTotal}",
            "mismaDescripcion":"${Descripcion}"
            }`
})
.then(response => response.json())
.then(
    result => {
        console.log('Success:', result);
        if(result.data="Agregado"){
          location.reload()
        }else if(result.data="Actualizado"){
      
          location.reload()
        }
  
      }
)
.catch(error => {
    console.error('Error:', error)
  
        })
 



}
/////////CARGAR TABLA PEDIDO
function CargarPedido(){
let tablaPedido=``;
let total=0;
fetch(`http://localhost:5000/VerPedidoPaciente`)
.then(response => response.json())
.then(data =>{
  for(var i=0;i<data.length;i++){
    total+=data[i].SubTotalMedicamento;
    tablaPedido+=`
    <tr>
    <td>${i}</td>
    <td>${data[i].NombreMedicamento}</td>
    <td>${data[i].PrecioMedicamento}</td>
    <td>${data[i].CantidadMedicamento}</td>
    <td>Q ${data[i].SubTotalMedicamento}</td>
    <td>
        <ul class="list-inline m-0">
            <li class="list-inline-item">
                <button class="btn btn-outline-light btn-sm rounded-0" type="button" id="BotonRestar"  onclick="restarProducto('${data[i].NombreMedicamento}','${data[i].PrecioMedicamento}','${data[i].CantidadMedicamento}')" data-toggle="tooltip" data-placement="top" title="Restar"><i class="fas fa-minus"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-light btn-sm rounded-0" type="button" id="BotonAgregar" onclick="sumarProducto('${data[i].NombreMedicamento}','${data[i].PrecioMedicamento}','${data[i].CantidadMedicamento}')"data-toggle="tooltip" data-placement="top" title="Agregar"><i class="fas fa-plus"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-light btn-sm rounded-0" type="button"id="BotonQuitar"onclick="EliminarProducto('${data[i].NombreMedicamento}')"data-toggle="tooltip" data-placement="top" title="Quitar"><i class="fas fa-times-circle"></i></button>

            </li>
        </ul>
   
    </td>
</tr>


 `
  }
document.getElementById("TablaPedido").innerHTML = tablaPedido;
document.getElementById("idTotal").innerHTML=`Total: Q  ${total}`;
});

}

function sumarProducto(NombreMedicamento,PrecioMedicamento,CantidadAgregar){
 fetch('http://localhost:5000/AgregarCompra',
  {
      method:'POST',
      headers,
      body: `{
              "nombreMedi":"${NombreMedicamento}",
              "precioMedi":"${PrecioMedicamento}"
              }`
  })
  .then(response => response.json())
  .then(
      result => {
          console.log('Success:', result);
          if(result.data="Actualizado"){
            swal("Medicamento Actualizado", {
              button: true,
              value: location.reload()
  
            });
          
          }else{
            swal("Medicamento Agotado", {
              button: true,
            
  
            });
          }
    
        }
  )
  .catch(error => {
      console.error('Error:', error)
    
          })


}

function restarProducto(NombreMedicamento,PrecioMedicamento,CantidadAgregar){
  fetch('http://localhost:5000/RestarCompra',
   {
       method:'POST',
       headers,
       body: `{
               "nombreMedi":"${NombreMedicamento}",
               "precioMedi":"${PrecioMedicamento}"
               }`
   })
   .then(response => response.json())
   .then(
       result => {
           console.log('Success:', result);
           if(result.data="Actualizado"){
             swal("Medicamento Actualizado", {
               button: true,
               value: location.reload()
   
             });
           
           }
     
         }
   )
   .catch(error => {
       console.error('Error:', error)
           })
 }
 //ELIMINAR PRODUCTO
 function EliminarProducto(NombreMedicamento){

     
  fetch(`http://localhost:5000/EliminarProducto/${NombreMedicamento}`,{
      method:'DELETE'
  })
  .then(res => res.json())
  .then(res=> {
      if(res.data=="Eliminado"){
        swal("Medicamento Eliminado", {
          button: true,
          value: location.reload()

        });
       
      }
  
       
  })
  }
 

function cerrarSesion(){
 
fetch(`http://localhost:5000/CerrarSesionPaciente`)
.then(response => response.json())
.then(data =>{
 if(data.data=="cerrar"){

  
 }

});

}