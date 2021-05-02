from Pacientes import Pacientes
import json
import re
class GestorPacientes:
    def __init__(self):
        self.ArrayPacientes=[]
        self.ArrayPacientes.append(Pacientes('v','s','07/07/2002','M','Kev1','123','3'))

    def InsertarPaciente(self,NombreP,ApellidoP,FechaP,GeneroP,UserP,PasswordP,TelefonoP):
        Paciente_nuevo= Pacientes(NombreP,ApellidoP,FechaP,GeneroP,UserP,PasswordP,TelefonoP)
        self.ArrayPacientes.append(Paciente_nuevo)

    def VerPacientes(self):
        return json.dumps([ob.__dict__ for ob in self.ArrayPacientes])

    def ExistePaciente(self,UserP):
        for i in self.ArrayPacientes:
            if i.getUserPaciente()==UserP:
                return True
        return False

    def IniciarSesion(self,Userp,PasswordP):
        for x in self.ArrayPacientes:
            if x.getUserPaciente()==Userp and x.getPasswordPaciente()==PasswordP:
                return True
        return False

    def ObtenerPaciente(self,UserPaciente):
        for x in self.ArrayPacientes:
            if x.getUserPaciente()==UserPaciente:
                return json.dumps(x.__dict__)
    
    def ActualizarPaciente(self,UserPaciente,PacienteActualizado):
        for x in self.ArrayPacientes:
            if x.getUserPaciente()==UserPaciente:
                self.ArrayPacientes[self.ArrayPacientes.index(x)]=PacienteActualizado
                return True
        return False
    def EliminarPaciente(self,UserPaciente):
        for x in self.ArrayPacientes:
            if x.getUserPaciente()==UserPaciente:
                self.ArrayPacientes.remove(x)
                return True
        return False
    
    def CargaPacientes(self,InformacionPacientes):
        QuitarSaltosPacientes=re.split('\n',InformacionPacientes)
        filaPacientes=1
        while filaPacientes<len(QuitarSaltosPacientes):
            QuitarComasPacientes=re.split(',',QuitarSaltosPacientes[filaPacientes])
            self.InsertarPaciente(QuitarComasPacientes[0],QuitarComasPacientes[1],QuitarComasPacientes[2],QuitarComasPacientes[3],QuitarComasPacientes[4],QuitarComasPacientes[5],QuitarComasPacientes[6])
            filaPacientes=filaPacientes+1









