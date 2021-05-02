from flask import Flask,request,jsonify
from flask_cors import CORS
from GestionPacientes import GestorPacientes
from GestionDoctores import GestorDoctores
from GestionEnfermeras import GestorEnfermeras
from GestionMedicamentos import GestorMedicamentos
from Pacientes import Pacientes
from Enfermeras import Enfermeras
from Doctores import Doctores
from Medicamentos import Medicamentos
from VendidoMedicamento import VendidosMedicamentos
#MODULO PACIENTE
from GestionCitas import GestorCitas
from CitaPaciente import CitaPaciente
from GestorCompra import GestorCompra
from GestionVendido import GestorVendido

app=Flask(__name__)
app.config["DEBUG"]=True


CORS(app)
GestorPaciente=GestorPacientes()
GestorDoctor=GestorDoctores()
GestorEnfermera=GestorEnfermeras()
GestorMedicamento=GestorMedicamentos()
GestorCitaP=GestorCitas()
GestorCompras=GestorCompra()
GestorVendidos=GestorVendido()
@app.route('/',methods=['GET'])
def home():
    return 'Hola mundo2'
#Crear Paciente
@app.route('/CrearPaciente',methods=['POST'])
def CrearPaciente():
    InformacionPaciente=request.json
    if GestorPaciente.ExistePaciente(InformacionPaciente['userPaciente']):
         return '{"data":"Existe"}'
    else:
        if GestorDoctor.ExisteDoctor(InformacionPaciente['userPaciente']):
            return '{"data":"Existe"}'
        else:
            if GestorEnfermera.ExisteEnfermera(InformacionPaciente['userPaciente']):
                return '{"data":"Existe"}'
            else:
                GestorPaciente.InsertarPaciente(InformacionPaciente['nombrePaciente'],InformacionPaciente['apellidoPaciente'],InformacionPaciente['fechaPaciente'],InformacionPaciente['generoPaciente'],InformacionPaciente['userPaciente'],InformacionPaciente['passwordPaciente'],InformacionPaciente['telefonoPaciente'])
                return '{"data":"Creado"}'

#VerPacientes



 #Iniciar Sesion segun user
@app.route('/IniciarSesion/<Username>/<Password>')
def IniciarSesion(Username,Password):
    if Username=='admin' and Password=='1234':
        return '{"data":"Admin"}'
    elif GestorPaciente.IniciarSesion(Username,Password):
        return '{"data":"Paciente"}'
    elif GestorDoctor.InicarSesionDoctor(Username,Password):
        return '{"data":"Doctor"}'
    elif GestorEnfermera.IniciarSesionEnfermera(Username,Password):
        return '{"data":"Enfermera"}'
    else:
        return '{"data":"Error"}'
    
    

    #Cargar Datos a Tabla y Ver Pacientes
@app.route('/VerPacientes',methods=['GET'])
def verPacientes():
    return GestorPaciente.VerPacientes()

    #Cargar Datos a Tabla Doctores y Ver Doctores
@app.route('/VerDoctores',methods=['GET'])
def verDoctores():
    return GestorDoctor.VerDoctores()

#CARGA ENFERMERAS A TABLA EN Y VER ENFERMERAS
@app.route('/VerEnfermeras',methods=['GET'])
def verEnfermeras():
    return GestorEnfermera.VerEnfermeras()
#CARGA MEDICINA A  TABLA
@app.route('/VerMedicina',methods=['GET'])
def verMedicina():
    return GestorMedicamento.VerMedicamentos()
#RUTAS PARA ELIMINAR-------------------------------

#ELIMINAR DOCTOR DESDE TABLA A DOCTOR
@app.route('/EliminarDoctor/<UserDoctor>',methods=['DELETE'])
def EliminarDoctor(UserDoctor):
    if (GestorDoctor.EliminarDoctor(UserDoctor)):
        return '{"data":"DEliminado"}'
    return '{"data":"Error"}'

#------ AQUI TERMINA DOCTOR ELIMINAR DESDE TABLA

#AQUI COMIENZA ELIMINAR PACIENT DESDE TABLA
@app.route('/EliminarPaciente/<UserPaciente>',methods=['DELETE'])
def EliminarPaciente(UserPaciente):
    if (GestorPaciente.EliminarPaciente(UserPaciente)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'
#-----------AQUI TERMINA PACIENTE ELMINAR

#AQUI COMIENZA ELIMINAR ENFERMERA
@app.route('/EliminarEnfermera/<UserEnfermera>',methods=['DELETE'])
def EliminarEnfermera(UserEnfermera):
    if (GestorEnfermera.EliminarEnfermera(UserEnfermera)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#---------AQUI TERMINA ELIMINAR ENFERMERA DESDE TABLA
#AQUI COMIENZA ELIMINAR MEDICAMENTO
@app.route('/EliminarMedicamento/<NombreMedicamento>',methods=['DELETE'])
def EliminarMedicamento(NombreMedicamento):
    if (GestorMedicamento.EliminarMedicina(NombreMedicamento)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#-----------------RUTAS PARA ELIMINAR--------------------------

#--------------RUTAS PARA  MODIFICAR-------------------------------------
@app.route('/ModificarPaciente/<UserPaciente>',methods=['GET'])
def ModificarPerfilPaciente(UserPaciente):
    return GestorPaciente.ObtenerPaciente(UserPaciente)
@app.route('/ModificarPacienteDatos/<UserPaciente>',methods=['PUT'])
def ModificarPacienteDatos(UserPaciente):
    infoPaciente=request.json
    PacienteActualizado=Pacientes(infoPaciente['nombrePacienteAct'],infoPaciente['apellidoPacienteAct'],infoPaciente['fechaPacienteAct'],infoPaciente['generoPacienteAct'],infoPaciente['userPacienteAct'],infoPaciente['passwordPacienteAct'],infoPaciente['telefonoPacienteAct'])
    if(GestorPaciente.ActualizarPaciente(UserPaciente,PacienteActualizado)):
        return '{"data":"Actualizado"}'
    else:
        return '{"data":"Error"}'
@app.route('/ModificarPaciente/<UserPaciente>',methods=['PUT'])
def ModificarPaciente(UserPaciente):
    infoPaciente=request.json
    PacienteActualizado=Pacientes(infoPaciente['nombrePacienteAct'],infoPaciente['apellidoPacienteAct'],infoPaciente['fechaPacienteAct'],infoPaciente['generoPacienteAct'],infoPaciente['userPacienteAct'],infoPaciente['passwordPacienteAct'],infoPaciente['telefonoPacienteAct'])
    if GestorPaciente.ExistePaciente(infoPaciente['userPacienteAct']):
        return '{"data":"Existe"}'
    else:
        if GestorDoctor.ExisteDoctor(infoPaciente['userPacienteAct']):
            return '{"data":"Existe"}'
        else:
            if GestorEnfermera.ExisteEnfermera(infoPaciente['userPacienteAct']):
                return '{"data":"Existe"}'
            else:
                if(GestorPaciente.ActualizarPaciente(UserPaciente,PacienteActualizado)):
                    return '{"data":"Actualizado"}'
                else:
                    return '{"data":"Error"}'
#MODIFICAR DOCTOR------------------------------------------

@app.route('/ModificarDoctor/<UserDoctor>',methods=['GET'])
def ModificarPerfilDoctor(UserDoctor):
    return GestorDoctor.ObtenerDoctor(UserDoctor)
@app.route('/ModificarDoctorDatos/<UserDoctor>',methods=['PUT'])
def ModificarDoctorDatos(UserDoctor):
    infoDoctor=request.json
    DoctorActualizado=Doctores(infoDoctor['nombreDoctorAct'],infoDoctor['apellidoDoctorAct'],infoDoctor['fechaDoctorAct'],infoDoctor['generoDoctorAct'],infoDoctor['userDoctorAct'],infoDoctor['passwordDoctorAct'],infoDoctor['especialidadDoctorAct'],infoDoctor['telefonoDoctorAct'])
    if(GestorDoctor.ActualizarDoctor(UserDoctor,DoctorActualizado)):
        return '{"data":"Actualizado"}'
    else:
        return '{"data":"Error"}'

@app.route('/ModificarDoctor/<UserDoctor>',methods=['PUT'])
def ModificarDoctor(UserDoctor):
    infoDoctor=request.json
    DoctorActualizado=Doctores(infoDoctor['nombreDoctorAct'],infoDoctor['apellidoDoctorAct'],infoDoctor['fechaDoctorAct'],infoDoctor['generoDoctorAct'],infoDoctor['userDoctorAct'],infoDoctor['passwordDoctorAct'],infoDoctor['especialidadDoctorAct'],infoDoctor['telefonoDoctorAct'])
    if GestorPaciente.ExistePaciente(infoDoctor['userDoctorAct']):
        return '{"data":"Existe"}'
    else:
        if GestorDoctor.ExisteDoctor(infoDoctor['userDoctorAct']):
            return '{"data":"Existe"}'
        else:
            if GestorEnfermera.ExisteEnfermera(infoDoctor['userDoctorAct']):
                return '{"data":"Existe"}'
            else:
                if(GestorDoctor.ActualizarDoctor(UserDoctor,DoctorActualizado)):
                    return '{"data":"Actualizado"}'
                else:
                    return '{"data":"Error"}'

#MODIFICAR ENFERMERA------------------------------------------------
@app.route('/ModificarEnfermera/<UserEnfermera>',methods=['GET'])
def ModificarPerfilEnfermera(UserEnfermera):
    return GestorEnfermera.ObtenerEnfermera(UserEnfermera)
@app.route('/ModificarEnfermeraDatos/<UserEnfermera>',methods=['PUT'])
def ModificarEnfermeraDatos(UserEnfermera):
    infoEnfermera=request.json
    EnfermeraActualizada=Enfermeras(infoEnfermera['nombreEnferAct'],infoEnfermera['apellidoEnferAct'],infoEnfermera['fechaEnferAct'],infoEnfermera['generoEnferAct'],infoEnfermera['userEnferAct'],infoEnfermera['passwordEnferAct'],infoEnfermera['telefonoEnferAct'])
    if(GestorEnfermera.ActualizarEnfermera(UserEnfermera,EnfermeraActualizada)):
        return '{"data":"Actualizado"}'
    else:
        return '{"data":"Error"}'

@app.route('/ModificarEnfermera/<UserEnfermera>',methods=['PUT'])
def ModificarEnfermera(UserEnfermera):
    infoEnfermera=request.json
    EnfermeraActualizada=Enfermeras(infoEnfermera['nombreEnferAct'],infoEnfermera['apellidoEnferAct'],infoEnfermera['fechaEnferAct'],infoEnfermera['generoEnferAct'],infoEnfermera['userEnferAct'],infoEnfermera['passwordEnferAct'],infoEnfermera['telefonoEnferAct'])
    if GestorEnfermera.ExisteEnfermera(infoEnfermera['userEnferAct']):
        return '{"data":"Existe"}'
    else:
        if GestorPaciente.ExistePaciente(infoEnfermera['userEnferAct']):
            return '{"data":"Existe"}'
        else:
            if GestorDoctor.ExisteDoctor(infoEnfermera['userEnferAct']):
                return '{"data":"Existe"}'
            else:
                if (GestorEnfermera.ActualizarEnfermera(UserEnfermera,EnfermeraActualizada)):
                    return '{"data":"Actualizado"}'
                else:
                    return '{"data":"Error"}'

 #MODIFICAR MEDICAMENTO--------------------------------------
@app.route('/ModificarMedicamento/<NombreMedicamento>',methods=['GET'])
def ModificarPerfilMedicamento(NombreMedicamento):
    return GestorMedicamento.ObtenerMedicamento(NombreMedicamento)

    
@app.route('/ModificarMedicamento/<NombreMedicamento>',methods=['PUT'])
def ModificarMedicamento(NombreMedicamento):
    infoMedicamento=request.json
    PrecioConvertido=float(infoMedicamento['precioMedAct'])
    CantidadConvertido=int(infoMedicamento['cantidadMedAct'])
    MedicamentoActualizado=Medicamentos(infoMedicamento['nombreMedAct'],PrecioConvertido,infoMedicamento['descripcionMedAct'],CantidadConvertido)
    if (GestorMedicamento.ActualizarMedicamento(NombreMedicamento,MedicamentoActualizado)):
        return '{"data":"Actualizado"}'
    else:
        return '{"data":"Error"}'
#-------------------------------------------------------------
###CARGA PACIENTES
@app.route('/CargaPacientes',methods=['POST'])
def CargaMasivaPacientes():
    InfoPacientes=request.json
    GestorPaciente.CargaPacientes(InfoPacientes['Datos'])
    return '{"data":"Cargados"}'

@app.route('/CargaDoctores',methods=['POST'])
def CargaMasivaDoctores():
    InfoDoctores=request.json
    GestorDoctor.CargaDoctores(InfoDoctores['Datos'])
    return '{"data":"Cargados"}'  

@app.route('/CargaEnfermeras',methods=['POST'])
def CargaMasivaEnfermeras():
    InfoEnfermeras=request.json
    GestorEnfermera.CargaEnfermeras(InfoEnfermeras['Datos'])
    return '{"data":"Cargados"}'

@app.route('/CargaMedicina',methods=['POST'])
def CargaMasivaMedicamento():
    InfoMedicina=request.json
    GestorMedicamento.CargaMedicina(InfoMedicina['Datos'])
    return '{"data":"Cargados"}'
#----------------------------------------------------------------
    






#AQUUI TERMINA MODILO ADMINISTRADOR------------------------------

#AQUI EMPIEZA MODULO PACIENTE--------------------------
@app.route('/VerCitas',methods=['GET'])
def vercitas():
    return GestorCitaP.VerCitas()

@app.route('/SolicitarCita',methods=['POST'])
def CrearCita():
    InformacionCita=request.json
    if (GestorCitaP.VerificarPendiente(InformacionCita['userPaciente'])):
        return '{"data":"Pendiente"}'
    else:
        if (GestorCitaP.VerificarAceptado(InformacionCita['userPaciente'])):
            return '{"data":"Aceptada"}'
        else:
            if (GestorCitaP.VerificarCompletada(InformacionCita['userPaciente'])):
                GestorCitaP.CrearCitaNueva(InformacionCita['userPaciente'],InformacionCita['fechaCita'],InformacionCita['horaCita'],InformacionCita['motivoCita'].upper(),'Pendiente')
                return '{"data":"Completada"}'
            else:
                if (GestorCitaP.VerificarRechazada(InformacionCita['userPaciente'])):
                    GestorCitaP.CrearCitaNueva(InformacionCita['userPaciente'],InformacionCita['fechaCita'],InformacionCita['horaCita'],InformacionCita['motivoCita'].upper(),'Pendiente')
                    return '{"data":"Rechazada"}'
                else:
                    GestorCitaP.CrearCitaNueva(InformacionCita['userPaciente'],InformacionCita['fechaCita'],InformacionCita['horaCita'],InformacionCita['motivoCita'].upper(),'Pendiente')
                    return '{"data":"Creada"}'



@app.route('/VerCitaPaciente/<UserPaciente>',methods=['GET'])
def VerCitaPaciente(UserPaciente):
    if GestorCitaP.VerCitasPaciente(UserPaciente)==None:
        return '{"data":"None"}'
    else:
        return GestorCitaP.VerCitasPaciente(UserPaciente)
               
  #COMPRA MEDICINA
@app.route('/ComprarMedicina',methods=['POST'])
def ComprarMedicina():
    infoCompra=request.json
    SubTotal=(float(infoCompra['precioMedi'])*int(infoCompra['cantidadMedi']))
    resta=(int(infoCompra['cantidadTotal'])-int(infoCompra['cantidadMedi']))
    MedicamentoRestado=Medicamentos(infoCompra['nombreMedi'],float(infoCompra['precioMedi']),infoCompra['mismaDescripcion'],resta)
    if (GestorCompras.AgregarCarrito(infoCompra['nombreMedi'],infoCompra['precioMedi'],int(infoCompra['cantidadMedi']),SubTotal)):
        #GestorVendidos.Registro(infoCompra['nombreMedi'],int(infoCompra['cantidadMedi']))
        GestorMedicamento.ActualizarMedicamento(infoCompra['nombreMedi'],MedicamentoRestado)
        return '{"data":"Actualizado"}'
    else:
        #GestorVendidos.Registro(infoCompra['nombreMedi'],int(infoCompra['cantidadMedi']))
        GestorMedicamento.ActualizarMedicamento(infoCompra['nombreMedi'],MedicamentoRestado)
        return '{"data":"Agregado"}'


@app.route('/VerPedidoPaciente',methods=['GET'])
def VerPedidoPaciente():
    return GestorCompras.VerPedido()


@app.route('/AgregarCompra',methods=['POST'])
def AgregarCompra():
    infoCompra=request.json
    for i in GestorMedicamento.ArrayMedicamentos:
        if i.getCantidadMedicina()==0:
            return '{"data":"Agotado"}'
        else:
            if infoCompra['nombreMedi']==i.getNombreMedicina():
                des=i.getDescripcionMed()
                totals=i.getCantidadMedicina()
    
    for x in GestorCompras.ArrayMedicinaCarrito:
        if x.getNombreMedicamento()==infoCompra['nombreMedi']:
            nuevo=x.getSubTotalMedicamento()+float(infoCompra['precioMedi']) 
    resta=totals-1
    MedicamentoRestado=Medicamentos(infoCompra['nombreMedi'],float(infoCompra['precioMedi']),des,resta)
    if (GestorCompras.AgregarCarrito(infoCompra['nombreMedi'],infoCompra['precioMedi'],1,nuevo)):
        GestorMedicamento.ActualizarMedicamento(infoCompra['nombreMedi'],MedicamentoRestado)
        return '{"data":"Actualizado"}'

@app.route('/RestarCompra',methods=['POST'])
def RestarCompra():
    infoCompra=request.json
    for i in GestorMedicamento.ArrayMedicamentos:
        if infoCompra['nombreMedi']==i.getNombreMedicina():
            des=i.getDescripcionMed()
            totals=i.getCantidadMedicina()
    for x in GestorCompras.ArrayMedicinaCarrito:
        if x.getNombreMedicamento()==infoCompra['nombreMedi']:
            nuevo=x.getSubTotalMedicamento()-float(infoCompra['precioMedi']) 
    sum=totals+1
    MedicamentoSumado=Medicamentos(infoCompra['nombreMedi'],float(infoCompra['precioMedi']),des,sum)
    if (GestorCompras.RestarPedido(infoCompra['nombreMedi'],infoCompra['precioMedi'],1,nuevo)):
        GestorMedicamento.ActualizarMedicamento(infoCompra['nombreMedi'],MedicamentoSumado)
        return '{"data":"Actualizado"}'

#ELIMINAR PEDIDO
@app.route('/EliminarProducto/<NombreProducto>',methods=['DELETE'])
def EliminarProducto(NombreProducto):
    for i in GestorMedicamento.ArrayMedicamentos:
        if i.getNombreMedicina()==NombreProducto:
            descripcion=i.getDescripcionMed()
            precio=i.getPrecioMedicina()
            can=i.getCantidadMedicina() 
    for x in GestorCompras.ArrayMedicinaCarrito:
        if x.getNombreMedicamento()==NombreProducto:
            nuevacan=x.getCantidadMedicamento()

    MedicamentoActualizado=Medicamentos(NombreProducto,precio,descripcion,can+nuevacan)
    GestorMedicamento.ActualizarMedicamento(NombreProducto,MedicamentoActualizado)
    if (GestorCompras.QuitarMedicamento(NombreProducto)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'


@app.route('/RegistrarPedido',methods=['POST'])
def RegistrarPedido():
    infoPedido=request.json
    GestorVendidos.Registro(infoPedido['nombreMedic'],int(infoPedido['cantidadMedic']))

    return '{"data":"Registrado"}'


@app.route('/VerRegistroPedidos',methods=['GET'])
def VerRegistroPedidos():
    return GestorVendidos.VerRegistroPedidos()

    
@app.route('/CerrarSesionPaciente',methods=['GET'])
def CerrarSesionPaciente():
    GestorCompras.ArrayMedicinaCarrito.clear()
    return '{"data":"cerrar"}'
 




  












#AQUI TERMINA MODULO PACIENTE-------------------------------

#INICIAR SERVIDORE

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)


