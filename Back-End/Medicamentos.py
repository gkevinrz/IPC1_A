class Medicamentos:
    def __init__(self,NombreMed,PrecioMed,DescripcionMed,CantidadMed):
        self.NombreMed=NombreMed
        self.PrecioMed=PrecioMed
        self.DescripcionMed=DescripcionMed
        self.CantidadMed=CantidadMed
    def getNombreMedicina(self):
        return self.NombreMed
    def getPrecioMedicina(self):
        return self.PrecioMed
    def getDescripcionMed(self):
        return self.DescripcionMed
    def getCantidadMedicina(self):
        return self.CantidadMed