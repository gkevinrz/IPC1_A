from CitaPaciente import CitaPaciente
from CitaAceptada import CitaAceptada
import json


class GestorCitas:
    def __init__(self):
        self.ArrayCitasPendientes=[]
        self.ArrayCitasAceptadas=[]
        self.ArrayCitasCompletadas=[]


    def CrearCitaNueva(self,UserPaciente,FechaCita,HoraCita,MotivoCita):
        CitaNueva=CitaPaciente(UserPaciente,FechaCita,HoraCita,MotivoCita)
        self.ArrayCitasPendientes.append(CitaNueva)
    def VerCitaPaciente(self,UserPaciente):
        for i in self.ArrayCitasPendientes:
            if i.getUserPacienteCita()==UserPaciente:
                return json.dumps(i.__dict__)
    def CrearCitaAceptada(self,UserPaciente,FechaCita,HoraCita,MotivoCita,DoctorAtiende):
        Cita_Aceptada=CitaAceptada(UserPaciente,FechaCita,HoraCita,MotivoCita,DoctorAtiende)
        self.ArrayCitasAceptadas.append(Cita_Aceptada)

    def VerCitasPendientes(self):
        return json.dumps([CitaPendiente.__dict__ for CitaPendiente in self.ArrayCitasPendientes])

    def VerCitasAceptadas(self):
        return json.dumps([Aceptada.__dict__ for Aceptada in self.ArrayCitasAceptadas])

    def VerificarPendiente(self,UserPaciente):
        for i in self.ArrayCitasPendientes:
            if i.getUserPacienteCita()==UserPaciente:
                return True
        return False


    def VerificarAceptado(self, UserPaciente):
        for i in self.ArrayCitasAceptadas:
            if i.getUserPacienteCita()==UserPaciente:
                return True
        return False

    def VerificarCompletada(self, UserPaciente):
        for i in self.ArrayCitasCompletadas:
            if i.getUserPacienteCita()==UserPaciente:
                return True
        return False

        

            

            


