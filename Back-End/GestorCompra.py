from CompraMedicamento import CompraMedicamento
from GestionMedicamentos import GestorMedicamentos
from Medicamentos import Medicamentos
import json
gestorMedicamento=GestorMedicamentos()
class GestorCompra:
    def __init__(self):
        self.ArrayMedicinaCarrito=[]
        #self.ArrayMedicinaCarrito.append(CompraMedicamento('Ibu',5,3,15))
        #self.ArrayMedicinaCarrito.append(CompraMedicamento('Ibu2',4,3,12))
        #self.ArrayMedicinaCarrito.append(CompraMedicamento('Ibu3',2,3,6))
        #self.ArrayMedicinaCarrito.append(CompraMedicamento('Ibu4',2,3,6))
    
    def AgregarCarrito(self,NombreMedicamento,PrecioMedicamento,CantidadMedicamento,SubTotalMedicamento):
        for i in self.ArrayMedicinaCarrito:
            if i.getNombreMedicamento()==NombreMedicamento:
                sumar=CantidadMedicamento+i.getCantidadMedicamento()
                self.ArrayMedicinaCarrito[self.ArrayMedicinaCarrito.index(i)]=CompraMedicamento(NombreMedicamento,PrecioMedicamento,sumar,SubTotalMedicamento)
                return True
        self.ArrayMedicinaCarrito.append(CompraMedicamento(NombreMedicamento,PrecioMedicamento,CantidadMedicamento,SubTotalMedicamento))
        return False



    def VerPedido(self):
        return json.dumps([Carrito.__dict__ for Carrito in self.ArrayMedicinaCarrito])


    def QuitarMedicamento(self,NombreMedicamento):
        for i in self.ArrayMedicinaCarrito:
             if i.getNombreMedicamento()==NombreMedicamento:
                 self.ArrayMedicinaCarrito.remove(i)
                 return True
        return False

    def RestarPedido(self,NombreMedicamento,PrecioMedicamento,CantidadMedicamento,SubTotalMedicamento):
        for i in self.ArrayMedicinaCarrito:
            if i.getNombreMedicamento()==NombreMedicamento:
                restar=i.getCantidadMedicamento()-CantidadMedicamento
                self.ArrayMedicinaCarrito[self.ArrayMedicinaCarrito.index(i)]=CompraMedicamento(NombreMedicamento,PrecioMedicamento,restar,SubTotalMedicamento)
                return True






