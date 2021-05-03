class CitaPaciente:
    def __init__(self,UserPaciente,FechaCita,HoraCita,MotivoCita):
        self.UserPaciente=UserPaciente
        self.FechaCita=FechaCita
        self.HoraCita=HoraCita
        self.MotivoCita=MotivoCita

    def getUserPacienteCita(self):
        return self.UserPaciente
    
    def getFechaCitaPaciente(self):
        return self.FechaCita

    def getHoraCitaPaciente(self):
        return self.HoraCita
        
    def getMotivoCitaPaciente(self):
        return self.MotivoCita
