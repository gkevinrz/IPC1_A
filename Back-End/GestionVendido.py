from VendidoMedicamento import VendidosMedicamentos
from GestorCompra import GestorCompra
import json

gsCompra=GestorCompra()
class GestorVendido:
    def __init__(self):
        self.ArrayVendidos=[]
        #self.ArrayVendidos.append(VendidosMedicamentos('Ibu',10))
        #self.ArrayVendidos.append(VendidosMedicamentos('Ibu2',5))
        #self.ArrayVendidos.append(VendidosMedicamentos('Ibu3',6))


    def Registro(self,NombreMedicamento,CantidadMedicamento):
        for i in self.ArrayVendidos:
            if i.getNombreMedicamentoVendido()==NombreMedicamento:
                sumar=CantidadMedicamento+i.getCantidadVendida()
                self.ArrayVendidos[self.ArrayVendidos.index(i)]=VendidosMedicamentos(NombreMedicamento,sumar)
                return True
        self.ArrayVendidos.append(VendidosMedicamentos(NombreMedicamento,CantidadMedicamento))
        return False
                           

    def OrdenarArray(self):
        listanueva=sorted(self.ArrayVendidos, key=lambda x: x.CantidadVendida,reverse=True)
        return json.dumps([Nuevo.__dict__ for Nuevo in listanueva])
        # return json.dumps(Vendido.__dict__ for Vendido in self.ArrayVendidos)

    def VerRegistroPedidos(self):
        return json.dumps([Registro.__dict__ for Registro in self.ArrayVendidos])



