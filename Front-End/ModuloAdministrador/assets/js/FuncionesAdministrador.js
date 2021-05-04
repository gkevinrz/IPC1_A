let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://34.72.234.227:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
/////////////////////////////
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
  
  function ConvertirDataDoctores(Doctor){
    var data ={
      "NombreDoc":Doctor.NombreDoc,
      "ApellidoDoc":Doctor.ApellidoDoc,
      "FechaDoc":Doctor.FechaDoc,
      "GeneroDoc":Doctor.GeneroDoc,
      "EspecialidadDoc":Doctor.EspecialidadDoc,
      "UserDoc":Doctor.UserDoc,
      "TelefonoDoc":Doctor.TelefonoDoc
    }
    return data
  }
function ConvertirVendidos(Vendido){
var data={
"Nombre Medicamento":Vendido.NombreMedicamento,
"Cantidad Vendida":Vendido.CantidadVendida
}

return data
}
function CrearPdfMedicina(){
  fetch('http://34.72.234.227:5000/ReporteMedicamento')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeaders([
      "Nombre Medicamento",
      "Cantidad Vendida"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},ConvertirVendidos(data[i])))
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
  
    doc.table(50, 1, datos, headers, styles);
    doc.save("Reporte_MasVendidos.pdf")
  })
}

  function ConvertirDataPacientes(Paciente){
  let dataPacientes={
    "NombrePac": Paciente.NombrePac,
    "ApellidoPac":Paciente.ApellidoPac,
    "FechaPac":Paciente.FechaPac,
    "GeneroPac":Paciente.GeneroPac,
    "UserPac":Paciente.UserPac,
    "TelefonoPac":Paciente.TelefonoPac
  }
  return dataPacientes
  }




  function ConvertirDataEnfermeras(Enfermera){
    let dataEnfermeras={
        
    
        
        "NombreEnf": Enfermera.NombreEnf,
        "ApellidoEnf":Enfermera.ApellidoEnf,
        "FechaEnf":Enfermera.FechaEnf,
        "GeneroEnf":Enfermera.GeneroEnf,
        "UserEnf":Enfermera.UserEnf,
        "TelefonoEnf":Enfermera.TelefonoEnf
      }
return dataEnfermeras
  }
 function ConvertirDataMedicamentos(Medicamento){
    let dataMedicina={
  

       
        "NombreMed": Medicamento.NombreMed,
        "DescripcionMed":Medicamento.DescripcionMed,
        "PrecioMed":Medicamento.PrecioMed,
        "CantidadMed":Medicamento.CantidadMed
      }
    return dataMedicina
 }

  //crear PDF PACIENTES
  function CrearPDFPacientes(){
    fetch('http://34.72.234.227:5000/VerPacientes')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "NombrePac",
        "ApellidoPac",
        "FechaPac",
        "GeneroPac",
        "UserPac",
        "TelefonoPac"

      ]);
      // Insertamos la data
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},ConvertirDataPacientes(data[i])))
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
    
      doc.table(0, 1, datos, headers, styles);
      doc.save("Reporte_Pacientes.pdf")
    })
  }
  



//CREAR PDF DOCTORE

  ////////////////////////
  function CrearPDFDoctores(){
    
    fetch('http://34.72.234.227:5000/VerDoctores')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "NombreDoc",
        "ApellidoDoc",
        "FechaDoc",
        "GeneroDoc",
        "EspecialidadDoc",
        "UserDoc",
        "TelefonoDoc"

      ]);
      // Insertar la data
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},ConvertirDataEnfermeras(data[i])))
      }
      console.log(datos)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.table(0, 1, datos, headers, { autoSize: true });
      doc.save("Reporte_Doctores.pdf")
    })
  }
  
//////PDF ENFERMERAS
function CrearPDFEnfermeras(){
    
    fetch('http://34.72.234.227:5000/VerEnfermeras')
    .then(response => response.json())
    .then(data=>{
    
      let headers = createHeaders([
        "NombreEnf",
        "ApellidoEnf",
        "FechaEnf",
        "GeneroEnf",
        "UserEnf",
        "TelefonoEnf"

      ]);
      // Insertar la data
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},ConvertirDataEnfermeras(data[i])))
      }
      console.log(datos)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.table(0, 1, datos, headers, { autoSize: true });
      doc.save("Reporte_Enfermeras.pdf")
    })
  }


////PDF MEDICAMENTOS
function CrearPDFMedicamentos(){
    
    fetch('http://34.72.234.227:5000/VerMedicina')
    .then(response => response.json())
    .then(data=>{
    
      let headers = createHeaders([
        "NombreMed",
        "DescripcionMed",
        "PrecioMed",
        "CantidadMed"

      ]);
      // Insertar la data
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},ConvertirDataMedicamentos(data[i])))
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
      doc.table(70, 1, datos, headers, styles);
      doc.save("Reporte_Medicamentos.pdf")
    })
  }
//







///CARGAR PACIENTES
function CargarPacientes(){
let FileCSVPacientes=document.getElementById("InputPacientes").files[0];
if(FileCSVPacientes){
let LectorPacientes=new FileReader();
LectorPacientes.readAsText(FileCSVPacientes,"UTF-8");
LectorPacientes.onload=function(e){
    let contenidoPacientes={

    Datos:e.target.result
    }
    fetch('http://34.72.234.227:5000/CargaPacientes',{
   method:'POST',
   headers,
   body:JSON.stringify(contenidoPacientes),
    }).then(respuesta=>respuesta.json()).then(resultado=>{
        if(resultado.data=="Cargados"){
            Swal.fire({
                title: 'Carga',
                text: 'Pacientes Cargados Exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              
              });

        }   

     // location.reload();
    }).catch(error=>{
        console.error('Error:', error);

    });
}
LectorPacientes.onerror=function(e){

}
}
}


///////////////////// CARGAR DOCTORES
function CargarDoctores(){
    let FileCSVDoctores=document.getElementById("InputDoctores").files[0];
    if(FileCSVDoctores){
    let LectorDoctores=new FileReader();
    LectorDoctores.readAsText(FileCSVDoctores,"UTF-8");
    LectorDoctores.onload=function(e){
        let contenidoDoctores={
    
        Datos:e.target.result
        }
        fetch('http://34.72.234.227:5000/CargaDoctores',{
       method:'POST',
       headers,
       body:JSON.stringify(contenidoDoctores),
        }).then(respuesta=>respuesta.json()).then(resultado=>{
            if(resultado.data=="Cargados"){
                Swal.fire({
                    title: 'Carga',
                    text: 'Doctores Cargados Exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  
                  });
    
            }   
         // location.reload();
        }).catch(error=>{
            console.error('Error:', error);
        });
    }
    LectorDoctores.onerror=function(e){
    
    }
    }
}
function CargarEnfermeras(){
    let FileCSVEnfermeras=document.getElementById("InputEnfermeras").files[0];
    if(FileCSVEnfermeras){
    let LectorEnfermeras=new FileReader();
    LectorEnfermeras.readAsText(FileCSVEnfermeras,"UTF-8");
    LectorEnfermeras.onload=function(e){
        let contenidoEnfermeras={
    
        Datos:e.target.result
        }
        fetch('http://34.72.234.227:5000/CargaEnfermeras',{
       method:'POST',
       headers,
       body:JSON.stringify(contenidoEnfermeras),
        }).then(respuesta=>respuesta.json()).then(resultado=>{
            if(resultado.data=="Cargados"){
                Swal.fire({
                    title: 'Carga',
                    text: 'Enfermeras Cargadas Exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  
                  });
    
            }   
         // location.reload();
        }).catch(error=>{
            console.error('Error:', error);
        });
    }
    LectorEnfermeras.onerror=function(e){
    
    }
    }  
}
function CargaMedicamentos(){
    let FileCSVMedicina=document.getElementById("InputMedicinas").files[0];
    if(FileCSVMedicina){
    let LectorMedicina=new FileReader();
    LectorMedicina.readAsText(FileCSVMedicina,"UTF-8");
    LectorMedicina.onload=function(e){
        let contenidoMedicina={
    
        Datos:e.target.result
        }
        fetch('http://34.72.234.227:5000/CargaMedicina',{
       method:'POST',
       headers,
       body:JSON.stringify(contenidoMedicina),
        }).then(respuesta=>respuesta.json()).then(resultado=>{
            if(resultado.data=="Cargados"){
                Swal.fire({
                    title: 'Carga',
                    text: 'Medicamentos Cargados Exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  
                  });
    
            }   
         // location.reload();
        }).catch(error=>{
            console.error('Error:', error);
        });
    }
    LectorMedicina.onerror=function(e){
    
    }
    }  

}



//////////////CARGAR PACIENTE A LA TABLA
function CargarTablaPacientes(){
    let HtmlTextoTabla=``;
fetch('http://34.72.234.227:5000/VerPacientes')
.then(response => response.json())
.then(data =>{
var i;
for(i=0;i<data.length;i++){
    HtmlTextoTabla+=`<tr>
    <th scope="row">${i+1}</th>
    <td>${data[i].NombrePac}</td>
    <td>${data[i].ApellidoPac}</td>
    <td>${data[i].GeneroPac}</td>
    <td>${data[i].FechaPac}</td>
    <td>${data[i].TelefonoPac}</td>
    <td>${data[i].UserPac}</td>
    <td>
        <ul class="list-inline m-0">
            <li class="list-inline-item">
                <button class="btn btn-primary btn-sm rounded-0" type="button" id="BotonVer"  data-target="#PopVerPaciente" onclick="VerPerfilTabla('${data[i].NombrePac}','${data[i].ApellidoPac}','${data[i].GeneroPac}','${data[i].FechaPac}','${data[i].TelefonoPac}','${data[i].UserPac}')" data-toggle="tooltip" data-placement="top" title="Ver"><i class="far fa-eye"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-target="#PopModificarPaciente" data-placement="top" onclick="ModificarPacienteTabla('${data[i].UserPac}')" title="Modificar"><i class="fa fa-edit"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top"onclick="EliminarPacienteTabla('${data[i].UserPac}')" title="Eliminar"><i class="fa fa-trash"></i></button>
            </li>
        </ul>
   
    </td>
  </tr>
 `
///console.log(data[i].nombre,'prueba')
}
document.getElementById("ContenidoPacientes").innerHTML = HtmlTextoTabla;

});
}
///////////TERMINA CARGA DE PACIENTES
function CargarTablaDoctores(){
    let HtmlTextoTablaD=``;
fetch('http://34.72.234.227:5000/VerDoctores')
.then(response => response.json())
.then(data =>{
var i;
for(i=0;i<data.length;i++){
    HtmlTextoTablaD+=`<tr>
    <th scope="row">${i+1}</th>
    <td>${data[i].NombreDoc}</td>
    <td>${data[i].ApellidoDoc}</td>
    <td>${data[i].EspecialidadDoc}</td>
    <td>${data[i].GeneroDoc}</td>
    <td>${data[i].FechaDoc}</td>
    <td>${data[i].TelefonoDoc}</td>
    <td>${data[i].UserDoc}</td>
    <td>
        <ul class="list-inline m-0">
            <li class="list-inline-item">
                <button class="btn btn-primary btn-sm rounded-0" type="button" id="BotonVer"  data-target="#PopVerDoctor" onclick="VerPerfilTablaD('${data[i].NombreDoc}','${data[i].ApellidoDoc}','${data[i].GeneroDoc}','${data[i].FechaDoc}','${data[i].TelefonoDoc}','${data[i].EspecialidadDoc}','${data[i].UserDoc}')" data-toggle="tooltip" data-placement="top" title="Ver"><i class="far fa-eye"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-target="#PopModificarDoctor" data-placement="top" onclick="ModificarDoctorTabla('${data[i].UserDoc}')" title="Modificar"><i class="fa fa-edit"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" onclick="EliminarDoctorTabla('${data[i].UserDoc}')"title="Eliminar"><i class="fa fa-trash"></i></button>
            </li>
        </ul>
   
    </td>
  </tr>
 `
///console.log(data[i].nombre,'prueba')
}
document.getElementById("ContenidoDoctores").innerHTML = HtmlTextoTablaD;

});
}
function CargarTablaEnfermeras(){
    let HtmlTextoTablaEnfermera=``;
fetch('http://34.72.234.227:5000/VerEnfermeras')
.then(response => response.json())
.then(data =>{
var i;
for(i=0;i<data.length;i++){
    HtmlTextoTablaEnfermera+=`<tr>
    <th scope="row">${i+1}</th>
    <td>${data[i].NombreEnf}</td>
    <td>${data[i].ApellidoEnf}</td>
    <td>${data[i].GeneroEnf}</td>
    <td>${data[i].FechaEnf}</td>
    <td>${data[i].TelefonoEnf}</td>
    <td>${data[i].UserEnf}</td>
    <td>
        <ul class="list-inline m-0">
            <li class="list-inline-item">
                <button class="btn btn-primary btn-sm rounded-0" type="button" id="BotonVer"  data-target="#PopVerEnfermera" onclick="VerPerfilTablaEnfermera('${data[i].NombreEnf}','${data[i].ApellidoEnf}','${data[i].GeneroEnf}','${data[i].FechaEnf}','${data[i].TelefonoEnf}','${data[i].UserEnf}')" data-toggle="tooltip" data-placement="top" title="Ver"><i class="far fa-eye"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-target="#PopModificarEnfermera" data-placement="top" onclick="ModificarEnfermeraTabla('${data[i].UserEnf}')" title="Modificar"><i class="fa fa-edit"></i></button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" onclick="EliminarEnfermeraTabla('${data[i].UserEnf}')"title="Eliminar"><i class="fa fa-trash"></i></button>
            </li>
        </ul>
   
    </td>
  </tr>
 `
///console.log(data[i].nombre,'prueba')
}
document.getElementById("ContenidoEnfermeras").innerHTML = HtmlTextoTablaEnfermera;

});

}
function CargarTablaMedicina(){
    let HtmlTextoTablaMedicina=``;
    fetch('http://34.72.234.227:5000/VerMedicina')
    .then(response => response.json())
    .then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        HtmlTextoTablaMedicina+=`<tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].NombreMed}</td>
        <td>${data[i].DescripcionMed}</td>
        <td>${data[i].PrecioMed}</td>
        <td>${data[i].CantidadMed}</td>
        <td>
            <ul class="list-inline m-0">
                <li class="list-inline-item">
                    <button class="btn btn-primary btn-sm rounded-0" type="button" id="BotonVer"  data-target="#PopVerMedicina" onclick="VerPerfilTablaMedicina('${data[i].NombreMed}','${data[i].DescripcionMed}','${data[i].PrecioMed}','${data[i].CantidadMed}')" data-toggle="tooltip" data-placement="top" title="Ver"><i class="far fa-eye"></i></button>
                </li>
                <li class="list-inline-item">
                    <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-target="#PopModificarMedicina" data-placement="top" onclick="ModificarMedicinaTabla('${data[i].NombreMed}')" title="Modificar"><i class="fa fa-edit"></i></button>
                </li>
                <li class="list-inline-item">
                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" onclick="EliminarMedicamentoTabla('${data[i].NombreMed}')"title="Eliminar"><i class="fa fa-trash"></i></button>
                </li>
            </ul>
       
        </td>
      </tr>
     `
    ///console.log(data[i].nombre,'prueba')
    }
    document.getElementById("ContenidoMedicina").innerHTML = HtmlTextoTablaMedicina;
    
    });

}

//CARGA DOCTORES

////TERMIA CARGA DOCTORES

function VerPerfilTabla(NombrePaciente, ApellidoPaciente,GeneroPaciente,FechaPaciente,TelefonoPaciente,UserPaciente){
    document.getElementById("tituloPaciente").innerHTML=`${NombrePaciente} ${ApellidoPaciente}`
    document.getElementById("infoName").innerHTML=`${NombrePaciente}`;
    document.getElementById("infoApellido").innerHTML=`${ApellidoPaciente}`;
    document.getElementById("infoGenero").innerHTML=`${GeneroPaciente}`;

    document.getElementById("infoFecha").innerHTML=`${FechaPaciente}`;
    document.getElementById("infoTel").innerHTML=`${TelefonoPaciente}`;
    document.getElementById("infoUser").innerHTML=`${UserPaciente}`;
   

    $("#PopVerPaciente").modal('show')
  
}
/////VER PERFIL DOCTOR
function VerPerfilTablaD(NombreDoctor, ApellidoDoctor,GeneroDoctor,FechaDoctor,TelefonoDoctor,EspecialidadDoctor,UserDoctor){
    document.getElementById("tituloDoctor").innerHTML=`Dr. ${NombreDoctor} ${ApellidoDoctor}`;
    document.getElementById("infoNameDoc").innerHTML=`${NombreDoctor}`;

    document.getElementById("infoApellidoDoc").innerHTML=`${ApellidoDoctor}`;
    document.getElementById("infoGeneroDoc").innerHTML=`${GeneroDoctor}`;
    document.getElementById("infoFechaDoc").innerHTML=`${FechaDoctor}`;
    document.getElementById("infoTelDoc").innerHTML=`${TelefonoDoctor}`;
    document.getElementById("infoEspeDoc").innerHTML=`${EspecialidadDoctor}`;
    document.getElementById("infoUserDoc").innerHTML=`${UserDoctor}`;
   

    $("#PopVerDoctor").modal('show')
  
}
//VER PERFIL ENFERMERA
function VerPerfilTablaEnfermera(NombreEnfermera, ApellidoEnfermera,GeneroEnfermera,FechaEnfermera,TelefonoEnfermera,UserEnfermera){
    document.getElementById("tituloEnfermera").innerHTML=` Enf. ${NombreEnfermera} ${ApellidoEnfermera}`;
    document.getElementById("infoNameE").innerHTML=`${NombreEnfermera}`;
    document.getElementById("infoApellidoE").innerHTML=`${ApellidoEnfermera}`;
    document.getElementById("infoFechaE").innerHTML=`${FechaEnfermera}`;
    document.getElementById("infoGeneroE").innerHTML=`${GeneroEnfermera}`;
    document.getElementById("infoTelE").innerHTML=`${TelefonoEnfermera}`;
    document.getElementById("infoUserE").innerHTML=`${UserEnfermera}`;
    $("#PopVerEnfermera").modal('show')

}



//VER PERFIL MEDICAMENTO

function VerPerfilTablaMedicina(NombreMedicina,DescripcionMedicina,PrecioMedicina,CantidadMedicina){
    document.getElementById("tituloMedicina").innerHTML=`${NombreMedicina}`;
    document.getElementById("infoNameMed").innerHTML=`${NombreMedicina}`;
    document.getElementById("infoMedicina").innerHTML=`${DescripcionMedicina}`;
    document.getElementById("infoPrecio").innerHTML=`${PrecioMedicina}`;
    document.getElementById("infoCantidad").innerHTML=`${CantidadMedicina}`;
    $("#PopVerMedicina").modal('show')

}
//////etrmina




//////////////////MODIFICAR PACIENTE
let guardarUserPaciente;
function ModificarPacienteTabla(UserPaciente){

    guardarUserPaciente=`${UserPaciente}`;
    fetch(`http://34.72.234.227:5000/ModificarPaciente/${UserPaciente}`)
    .then(response => response.json())
    .then(data =>{
        let FechaNacimiento=`${data.FechaPac}`.split("/");
        document.getElementById("INombreNuevoT").value=`${data.NombrePac}`;
        document.getElementById("IApellidoNuevoT").value=`${data.ApellidoPac}`;
        document.getElementById("ITelNuevoT").value=`${data.TelefonoPac}`;
        document.getElementById("InputDiaNuevoT").value=`${FechaNacimiento[0]}`;
        document.getElementById("MesNuevoT").value=`${FechaNacimiento[1]}`;
        document.getElementById("InputAñoNuevoT").value=`${FechaNacimiento[2]}`

       document.getElementById("IUsuarioNuevoT").value=`${data.UserPac}`;
        document.getElementById("IContraseñaNuevaT").value=`${data.PasswordPac}`;
        document.getElementById("GeneroNuevoT").value=`${data.GeneroPac}`;
    });
    


    $("#PopModificarPaciente").modal('show')

}

function accionBotonModificar(){
    
   let NombrePacienteAct=document.getElementById("INombreNuevoT").value;
    let ApellidoPacienteAct=document.getElementById("IApellidoNuevoT").value;
   let TelefonoPacienteAct=document.getElementById("ITelNuevoT").value;
   let FechaNacPacienteAct=document.getElementById("InputDiaNuevoT").value+'/'+document.getElementById("MesNuevoT").value+'/'+document.getElementById("InputAñoNuevoT").value;
   let UsuarioPacienteAct=document.getElementById("IUsuarioNuevoT").value;
   let PasswordPacienteAct=document.getElementById("IContraseñaNuevaT").value;
    let GeneroPacietneAct=document.getElementById("GeneroNuevoT").value;
    if(`${guardarUserPaciente}`==`${UsuarioPacienteAct}`){
        fetch(`http://34.72.234.227:5000/ModificarPacienteDatos/${guardarUserPaciente}`, {
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


    }else{
    fetch(`http://34.72.234.227:5000/ModificarPaciente/${guardarUserPaciente}`, {
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
             
        }else if(result.data=="Actualizado"){
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
/////////////////TERMINA MODIFICAR PACIENTE
//ELIMINAR PACIENTE
let eliminarPaciente;
function EliminarPacienteTabla(UserPacienteEliminar){
eliminarPaciente=`${UserPacienteEliminar}`;
 
fetch(`http://34.72.234.227:5000/EliminarPaciente/${UserPacienteEliminar}`,{
    method:'DELETE'
})
.then(res => res.json())
.then(res=> {
    if(res.data=="Eliminado"){
    Swal.fire({
        title: 'Eliminado',
        text: 'Se eliminó el paciente',
        icon: 'success',
        confirmButtonText: 'Ok'
      
      });
      location.reload();
    }

     
})
}
/////////////////////ELIMINAR DOCTOR
function EliminarDoctorTabla(UserDoctorEliminar){

     
    fetch(`http://34.72.234.227:5000/EliminarDoctor/${UserDoctorEliminar}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(res=> {
        if(res.data=="DEliminado"){
        Swal.fire({
            title: 'Eliminado',
            text: 'Se eliminó doctor',
            icon: 'success',
            confirmButtonText: 'Ok'
          
          });
          location.reload();
        }
    
         
    })
    }
//ELIMINAR ENFERMERA
function EliminarEnfermeraTabla(UserEnfermeraEliminar){

     
    fetch(`http://34.72.234.227:5000/EliminarEnfermera/${UserEnfermeraEliminar}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(res=> {
        if(res.data=="Eliminado"){
        Swal.fire({
            title: 'Eliminado',
            text: 'Se eliminó enfermera',
            icon: 'success',
            confirmButtonText: 'Ok'
          
          });
          location.reload();
        }
    
         
    })
    }

//TERMINA ELIMINAR ENFERMERA


//ELIMINAR MEDICAMENTO
function EliminarMedicamentoTabla(NombreMedicamento){

     
    fetch(`http://34.72.234.227:5000/EliminarMedicamento/${NombreMedicamento}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(res=> {
        if(res.data=="Eliminado"){
        Swal.fire({
            title: 'Eliminado',
            text: 'Se eliminó medicamento',
            icon: 'success',
            confirmButtonText: 'Ok'
          
          });
          location.reload();
        }
    
         
    })
    }

//TERMINA ELIMINAR MEDICAMENTO




//TERMINA ELIMINAR PACIENTE

///COMIENZA MODIFICAR DOCTOR
let guardarUserDoctor;
function ModificarDoctorTabla(UserDoctor){
    guardarUserDoctor=`${UserDoctor}`;
    fetch(`http://34.72.234.227:5000/ModificarDoctor/${UserDoctor}`)
    .then(Respuesta => Respuesta.json())
    .then(Data =>{
 let FechaNacimientoDoc=`${Data.FechaDoc}`.split("/");
   document.getElementById("INombreNuevoDT").value=`${Data.NombreDoc}`;
   document.getElementById("IApellidoNuevoDT").value=`${Data.ApellidoDoc}`;
   document.getElementById("ITelNuevoDT").value=`${Data.TelefonoDoc}`;
   document.getElementById("InputDiaNuevoDT").value=`${FechaNacimientoDoc[0]}`;
   document.getElementById("MesNuevoDT").value=`${FechaNacimientoDoc[1]}`;
   document.getElementById("InputAñoNuevoDT").value=`${FechaNacimientoDoc[2]}`
   document.getElementById("IEspeciNuevoDT").value=`${Data.EspecialidadDoc}`;
  document.getElementById("IUsuarioNuevoDT").value=`${Data.UserDoc}`;
   document.getElementById("IContraseñaNuevaDT").value=`${Data.PasswordDoc}`;
   document.getElementById("GeneroNuevoDT").value=`${Data.GeneroDoc}`;
});
$("#PopModificarDoctor").modal('show')

}
function accionBotonModificarDoctor(){
    
    let NombreDoctorAct=document.getElementById("INombreNuevoDT").value;
     let ApellidoDoctorAct=document.getElementById("IApellidoNuevoDT").value;
    let TelefonoDoctorAct=document.getElementById("ITelNuevoDT").value;
    let FechaNacDoctorAct=document.getElementById("InputDiaNuevoDT").value+'/'+document.getElementById("MesNuevoDT").value+'/'+document.getElementById("InputAñoNuevoDT").value;
    let UsuarioDoctorAct=document.getElementById("IUsuarioNuevoDT").value;
    let PasswordDoctorAct=document.getElementById("IContraseñaNuevaDT").value;
    let EspecialidadDoctorAct=document.getElementById("IEspeciNuevoDT").value;
    let GeneroDoctorAct=document.getElementById("GeneroNuevoDT").value;
     if(`${UsuarioDoctorAct}`==`${guardarUserDoctor}`){
        fetch(`http://34.72.234.227:5000/ModificarDoctorDatos/${guardarUserDoctor}`, {
            method: 'PUT',
            headers,
            body:`{
                "nombreDoctorAct":"${NombreDoctorAct}",
                "apellidoDoctorAct":"${ApellidoDoctorAct}",
                "fechaDoctorAct":"${FechaNacDoctorAct}",
                "generoDoctorAct":"${GeneroDoctorAct}",
                "userDoctorAct":"${UsuarioDoctorAct}",
                "especialidadDoctorAct":"${EspecialidadDoctorAct}",
                "passwordDoctorAct":"${PasswordDoctorAct}",
                "telefonoDoctorAct":"${TelefonoDoctorAct}"
                }`
          })
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
        if(result.data=="Actualizado"){
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

     }else{
     fetch(`http://34.72.234.227:5000/ModificarDoctor/${guardarUserDoctor}`, {
         method: 'PUT',
         headers,
         body:`{
             "nombreDoctorAct":"${NombreDoctorAct}",
             "apellidoDoctorAct":"${ApellidoDoctorAct}",
             "fechaDoctorAct":"${FechaNacDoctorAct}",
             "generoDoctorAct":"${GeneroDoctorAct}",
             "userDoctorAct":"${UsuarioDoctorAct}",
             "especialidadDoctorAct":"${EspecialidadDoctorAct}",
             "passwordDoctorAct":"${PasswordDoctorAct}",
             "telefonoDoctorAct":"${TelefonoDoctorAct}"
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
              
         }else if(result.data=="Actualizado"){
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
       });}
 }
 let guardarUserEnfermera;
 function ModificarEnfermeraTabla(UserEnfermera){
     guardarUserEnfermera=`${UserEnfermera}`;
     fetch(`http://34.72.234.227:5000/ModificarEnfermera/${UserEnfermera}`)
     .then(Respuesta => Respuesta.json())
     .then(Data =>{
  let FechaNacimientoEnf=`${Data.FechaEnf}`.split("/");
    document.getElementById("INombreNuevoET").value=`${Data.NombreEnf}`;
    document.getElementById("IApellidoNuevoET").value=`${Data.ApellidoEnf}`;
    document.getElementById("ITelNuevoET").value=`${Data.TelefonoEnf}`;
    document.getElementById("InputDiaNuevoET").value=`${FechaNacimientoEnf[0]}`;
    document.getElementById("MesNuevoET").value=`${FechaNacimientoEnf[1]}`;
    document.getElementById("InputAñoNuevoET").value=`${FechaNacimientoEnf[2]}`;
       document.getElementById("IUsuarioNuevoET").value=`${Data.UserEnf}`;
    document.getElementById("IContraseñaNuevaET").value=`${Data.PasswordEnf}`;
    document.getElementById("GeneroNuevoET").value=`${Data.GeneroEnf}`;
 });
 $("#PopModificarEnfermera").modal('show')
 
 }
 function accionBotonModificarEnfermera(){
    let NombreEnfermeraAct=document.getElementById("INombreNuevoET").value;
     let ApellidoEnfermeraAct= document.getElementById("IApellidoNuevoET").value;
    let TelefonoEnfermeraAct=document.getElementById("ITelNuevoET").value;
    let FechaNacEnfermeraAct=document.getElementById("InputDiaNuevoET").value+'/'+ document.getElementById("MesNuevoET").value+'/'+document.getElementById("InputAñoNuevoET").value;
    let UsuarioEnfermeraAct= document.getElementById("IUsuarioNuevoET").value
    let PasswordEnfermeraAct=document.getElementById("IContraseñaNuevaET").value
    let GeneroEnfermeraAct= document.getElementById("GeneroNuevoET").value
     if(`${UsuarioEnfermeraAct}`==`${guardarUserEnfermera}`){
        fetch(`http://34.72.234.227:5000/ModificarEnfermeraDatos/${guardarUserEnfermera}`, {
            method: 'PUT',
            headers,
            body:`{
                "nombreEnferAct":"${ NombreEnfermeraAct}",
                "apellidoEnferAct":"${ApellidoEnfermeraAct}",
                "fechaEnferAct":"${FechaNacEnfermeraAct}",
                "generoEnferAct":"${GeneroEnfermeraAct}",
                "userEnferAct":"${ UsuarioEnfermeraAct}",
                "passwordEnferAct":"${PasswordEnfermeraAct}",
                "telefonoEnferAct":"${TelefonoEnfermeraAct}"
                }`
          })
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
        if(result.data=="Actualizado"){
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

     }else{
     fetch(`http://34.72.234.227:5000/ModificarEnfermera/${guardarUserEnfermera}`, {
         method: 'PUT',
         headers,
         body:`{
            "nombreEnferAct":"${ NombreEnfermeraAct}",
            "apellidoEnferAct":"${ApellidoEnfermeraAct}",
            "fechaEnferAct":"${FechaNacEnfermeraAct}",
            "generoEnferAct":"${GeneroEnfermeraAct}",
            "userEnferAct":"${ UsuarioEnfermeraAct}",
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
              
         }else if(result.data=="Actualizado"){
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
       });}
 }
/////////COMIENZA MODIFICAR MEDICINA
let guardarNombreMedicina;
function ModificarMedicinaTabla(NombreMedicamento){
    guardarNombreMedicina=`${NombreMedicamento}`;
    fetch(`http://34.72.234.227:5000/ModificarMedicamento/${NombreMedicamento}`)
    .then(Respuesta => Respuesta.json())
    .then(Data =>{

  document.getElementById("INombreNuevoMT").value=`${Data.NombreMed}`;
   document.getElementById("IDescripcionNuevaMT").value=`${Data.DescripcionMed}`;
   document.getElementById("IPrecioNuevoMT").value=`${Data.PrecioMed}`;
  document.getElementById("ICantidadNuevaMT").value=`${Data.CantidadMed}`;

});
$("#PopModificarMedicina").modal('show')

}

function accionBotonModificarMedicina(){
    let NombreMedicinaNuevo=  document.getElementById("INombreNuevoMT").value;
    let DescripcionMedicinaNueva=document.getElementById("IDescripcionNuevaMT").value;
    let PrecioNuevoMedicina=document.getElementById("IPrecioNuevoMT").value;
    let CantidadNuevaMedicina=   document.getElementById("ICantidadNuevaMT").value;
   
       fetch(`http://34.72.234.227:5000/ModificarMedicamento/${guardarNombreMedicina}`, {
           method: 'PUT',
           headers,
           body:`{
               "nombreMedAct":"${ NombreMedicinaNuevo}",
               "descripcionMedAct":"${ DescripcionMedicinaNueva}",
               "precioMedAct":"${PrecioNuevoMedicina}",
               "cantidadMedAct":"${CantidadNuevaMedicina}"
               }`
         })
         .then(response => response.json())
         .then(result => {
           console.log('Success:', result);
       if(result.data=="Actualizado"){
               Swal.fire({
                   title: 'Actualizado',
                   text: 'Se actualizó el medicamento',
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


/// BOTON PARA GENERAR REPORTE MAS VENDIDO()

//prueba PDF








