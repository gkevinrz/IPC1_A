from Enfermeras import Enfermeras
import json
import re
class GestorEnfermeras:

    def __init__(self):
        self.ArrayEnfermeras=[]
      

    def IniciarSesionEnfermera(self,UsernameEnf,PasswordEnf):
        for x in self.ArrayEnfermeras:
            if x.getUserEnfermera()==UsernameEnf and x.getPasswordEnfermera()==PasswordEnf:
                return True
        return False

    def ExisteEnfermera(self,UserEnfermera):
        for i in self.ArrayEnfermeras:
            if i.getUserEnfermera()==UserEnfermera:
                return True
        return False

    def EliminarEnfermera(self,UserEnfermera):
        for i in self.ArrayEnfermeras:
            if i.getUserEnfermera()==UserEnfermera:
                self.ArrayEnfermeras.remove(i)
                return True
        return False

    def VerEnfermeras(self):
        return json.dumps([Enfermeras.__dict__ for Enfermeras in self.ArrayEnfermeras])

    def ObtenerEnfermera(self,UserEnfermera):
        for i in self.ArrayEnfermeras:
            if i.getUserEnfermera()==UserEnfermera:
                return json.dumps(i.__dict__)

    def ActualizarEnfermera(self,UserEnfermera,EnfermeraActualizada):
        for i in self.ArrayEnfermeras:
            if i.getUserEnfermera()==UserEnfermera:
                self.ArrayEnfermeras[self.ArrayEnfermeras.index(i)]=EnfermeraActualizada
                return True
        return False
 
    def InsertarEnfermera(self,NombreEnf,ApellidoEnf,FechaEnf,GeneroEnf,UserEnf,PasswordEnf,TelefonoEnf):
        Enfermera_Nueva=Enfermeras(NombreEnf,ApellidoEnf,FechaEnf,GeneroEnf,UserEnf,PasswordEnf,TelefonoEnf)
        self.ArrayEnfermeras.append(Enfermera_Nueva)


    def CargaEnfermeras(self,InformacionEnfermeras):
        QuitarSaltosEnfermeras=re.split('\n',InformacionEnfermeras)      
        filaEnfermeras=1
        while filaEnfermeras<len(QuitarSaltosEnfermeras):
            QuitarComasEnfermeras=re.split(',',QuitarSaltosEnfermeras[filaEnfermeras])
            self.InsertarEnfermera(QuitarComasEnfermeras[0],QuitarComasEnfermeras[1],QuitarComasEnfermeras[2],QuitarComasEnfermeras[3],QuitarComasEnfermeras[4],QuitarComasEnfermeras[5],QuitarComasEnfermeras[6])
            filaEnfermeras=filaEnfermeras+1




