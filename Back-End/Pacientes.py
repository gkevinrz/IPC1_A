class Pacientes:
    def __init__(self,NombrePac,ApellidoPac,FechaPac,GeneroPac,UserPac,PasswordPac,TelefonoPac):
        self.NombrePac=NombrePac
        self.ApellidoPac=ApellidoPac
        self.FechaPac=FechaPac
        self.GeneroPac=GeneroPac
        self.UserPac=UserPac
        self.PasswordPac=PasswordPac
        self.TelefonoPac=TelefonoPac

    def getNombrePaciente(self):
        return self.NombrePac

    def getApellidoPaciente(self):
        return self.ApellidoPac

    def getFechaPaciente(self):
        return self.FechaPac
    
    def getGeneroPaciente(self):
        return self.GeneroPac

    def getUserPaciente(self):
        return self.UserPac
    
    def getPasswordPaciente(self):
        return self.PasswordPac

    def geTelefonoPaciente(self):
        return self.TelefonoPac




