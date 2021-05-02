from CitaPaciente import CitaPaciente

import json


class GestorCitas:
    def __init__(self):
        self.ArrayCitas=[]

    def CrearCitaNueva(self,UserPaciente,FechaCita,HoraCita,MotivoCita,EstadoCita):
        CitaNueva=CitaPaciente(UserPaciente,FechaCita,HoraCita,MotivoCita,EstadoCita)
        self.ArrayCitas.append(CitaNueva)

    def VerCitas(self):
        return json.dumps([Cita.__dict__ for Cita in self.ArrayCitas])



    def VerCitasPaciente(self,UserPaciente):
        for i in self.ArrayCitas:
            if i.getUserPacienteCita()==UserPaciente:
                return json.dumps(i.__dict__)

    def VerificarPendiente(self,UserPaciente):
        for i in self.ArrayCitas:
            if i.getUserPacienteCita()==UserPaciente and i.getCita()=='Pendiente':
                return True
        return False
    def VerificarAceptado(self, UserPaciente):
        for i in self.ArrayCitas:
            if i.getUserPacienteCita()==UserPaciente and i.getCita()=='Aceptada':
                return True
        return False

    def VerificarCompletada(self, UserPaciente):
        for i in self.ArrayCitas:
            if i.getUserPacienteCita()==UserPaciente and i.getCita()=='Completada':
                return True
        return False

    def VerificarRechazada(self, UserPaciente):
        for i in self.ArrayCitas:
            if i.getUserPacienteCita()==UserPaciente and i.getCita()=='Rechazada':
                return True
        return False
        

            

            


