from Medicamentos import Medicamentos
import json
import re
class GestorMedicamentos:
    def __init__(self):
        self.ArrayMedicamentos=[]
        #self.ArrayMedicamentos.append(Medicamentos('Ibu',5,'Quita dolor de cabeza',30))
        #self.ArrayMedicamentos.append(Medicamentos('Ibu2',4,'Quita dolor de cabeza2',40))
        #self.ArrayMedicamentos.append(Medicamentos('Ibu3',2,'Quita dolor de cabeza3',50))


    def VerMedicamentos(self):
        return json.dumps([Medicamento.__dict__ for Medicamento in self.ArrayMedicamentos])
        

    
    def EliminarMedicina(self,NombreMedicamento):
        for i in self.ArrayMedicamentos:
            if i.getNombreMedicina()==NombreMedicamento:
                self.ArrayMedicamentos.remove(i)
                return True
        return False

    def ObtenerMedicamento(self,NombreMedicamento):
        for i in self.ArrayMedicamentos:
            if i.getNombreMedicina()==NombreMedicamento:
                return json.dumps(i.__dict__)

    def ActualizarMedicamento(self,NombreMedicamento,MedicamentoActualizado):
        for i in self.ArrayMedicamentos:
            if i.getNombreMedicina()==NombreMedicamento:
                self.ArrayMedicamentos[self.ArrayMedicamentos.index(i)]=MedicamentoActualizado
                return True
        return False

    def InsertarMedicamentos(self,NombreMed,PrecioMed,DescripcionMed,CantidadMed):
        Medicamento_Nuevo=Medicamentos(NombreMed,PrecioMed,DescripcionMed,CantidadMed)
        self.ArrayMedicamentos.append(Medicamento_Nuevo)
    
    def CargaMedicina(self,InformacionMedicamentos):
        QuitarSaltosMedicina=re.split('\n',InformacionMedicamentos)
        filaMedicina=1
        while filaMedicina<len(QuitarSaltosMedicina):
            QuitarComasMedicina=re.split(',',QuitarSaltosMedicina[filaMedicina])
            self.InsertarMedicamentos(QuitarComasMedicina[0],float(QuitarComasMedicina[1]),QuitarComasMedicina[2],int(QuitarComasMedicina[3]))
            filaMedicina=filaMedicina+1

    
            

