from Doctores import Doctores
import json
import re
class GestorDoctores:
    def __init__(self):
        self.ArrayDoctores=[]
        #self.ArrayDoctores.append(Doctores('Kevin','Ruiz','11/05/1999','M','KevCirujanoo','123','Cirujano','44423222'))
    
    def ExisteDoctor(self,UserDoctor):
        for i in self.ArrayDoctores:
            if i.getUserDoctor()==UserDoctor:
                return True
        return False

    def InicarSesionDoctor(self,UsernameDoctor,PasswordDoctor):
        for x in self.ArrayDoctores:
            if x.getUserDoctor()==UsernameDoctor and x.getPasswordDoctor()==PasswordDoctor:
                return True
        return False

    def VerDoctores(self):
        return json.dumps([Doctores.__dict__ for Doctores in self.ArrayDoctores])

    def ActualizarDoctor(self,UserDoctor,DoctorActualizado):
        for x in self.ArrayDoctores:
            if x.getUserDoctor()==UserDoctor:
                self.ArrayDoctores[self.ArrayDoctores.index(x)]=DoctorActualizado
                return True
        return False
    def ObtenerDoctor(self,UserDoctor):
        for x in self.ArrayDoctores:
            if x.getUserDoctor()==UserDoctor:
                return json.dumps(x.__dict__)

    def EliminarDoctor(self,UserDoctor):
        for x in self.ArrayDoctores:
            if x.getUserDoctor()==UserDoctor:
                self.ArrayDoctores.remove(x)
                return True
        return False
     
    def InsertarDoctor(self,NombreD,ApellidoD,FechaD,GeneroD,UserD,PasswordD,EspecialidadD,TelefonoD):
        Doctor_Nuevo=Doctores(NombreD,ApellidoD,FechaD,GeneroD,UserD,PasswordD,EspecialidadD,TelefonoD)
        self.ArrayDoctores.append(Doctor_Nuevo)

    
    def CargaDoctores(self,InformacionDoctores):
        QuitarSaltosDoctores=re.split('\n',InformacionDoctores)
        filaDoctores=1
        while filaDoctores<len(QuitarSaltosDoctores):
            QuitarComasDoctores=re.split(',',QuitarSaltosDoctores[filaDoctores])
            self.InsertarDoctor(QuitarComasDoctores[0],QuitarComasDoctores[1],QuitarComasDoctores[2],QuitarComasDoctores[3],QuitarComasDoctores[4],QuitarComasDoctores[5],QuitarComasDoctores[6],QuitarComasDoctores[7])
            filaDoctores=filaDoctores+1



        


