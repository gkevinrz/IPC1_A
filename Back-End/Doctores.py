class Doctores:
    def __init__(self,NombreDoc,ApellidoDoc,FechaDoc,GeneroDoc,UserDoc,PasswordDoc,EspecialidadDoc,TelefonoDoc):
        self.NombreDoc=NombreDoc
        self.ApellidoDoc=ApellidoDoc
        self.FechaDoc=FechaDoc
        self.GeneroDoc=GeneroDoc
        self.UserDoc=UserDoc
        self.PasswordDoc=PasswordDoc
        self.EspecialidadDoc=EspecialidadDoc
        self.TelefonoDoc=TelefonoDoc

    def getNombreDoctor(self):
        return self.NombreDoc

    def getApellidoDoctor(self):
        return self.ApellidoDoc

    def getFechaDoctor(self):
        return self.FechaDoc
    
    def getGeneroDoctor(self):
        return self.GeneroDoc

    def getUserDoctor(self):
        return self.UserDoc
    
    def getPasswordDoctor(self):
        return self.PasswordDoc

    def getTelefonoDoctor(self):
        return self.TelefonoDoc




