class CompraMedicamento:
    def __init__(self,NombreMedicamento,PrecioMedicamento,CantidadMedicamento,SubTotalMedicamento):
        self.NombreMedicamento=NombreMedicamento
        self.PrecioMedicamento=PrecioMedicamento
        self.CantidadMedicamento=CantidadMedicamento
        self.SubTotalMedicamento=SubTotalMedicamento
    
    def getNombreMedicamento(self):
        return self.NombreMedicamento
    def getPrecioMedicamento(self):
        return self.PrecioMedicamento
    def getCantidadMedicamento(self):
        return self.CantidadMedicamento
    def getSubTotalMedicamento(self):
        return self.SubTotalMedicamento       

