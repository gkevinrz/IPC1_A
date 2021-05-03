class CitaAceptada:
    def __init__(self,UserPacienteA,FechaCitaA,HoraCitaA,MotivoCitaA,DoctorAtiende):
        self.UserPacienteA=UserPacienteA
        self.FechaCitaA=FechaCitaA
        self.HoraCitaA=HoraCitaA
        self.MotivoCitaA=MotivoCitaA
        self.DoctorAtiende=DoctorAtiende

    def getPacienteAceptado(self):
        return self.UserPacienteA
    def getFechaCitaAceptada(self):
        return self.FechaCitaA
    def getHoraCitaAceptada(self):
        return self.HoraCitaA
    def getMotivoCitaAceptado(self):
        return self.MotivoCitaA
    def getDoctorAtiende(self):
        return self.DoctorAtiende
        