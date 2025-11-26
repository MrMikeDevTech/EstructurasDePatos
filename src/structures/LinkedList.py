class NodoLista:
    def __init__(self, valor):
        self.valor = valor
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.inicio = None

    def insertar(self, valor):
        nuevo = NodoLista(valor)
        if self.inicio is None:
            self.inicio = nuevo
            return
        actual = self.inicio
        while actual.siguiente:
            actual = actual.siguiente
        actual.siguiente = nuevo

    def buscar(self, valor):
        actual = self.inicio
        while actual:
            if actual.valor == valor:
                return True
            actual = actual.siguiente
        return False

    def eliminar(self, valor):
        if self.inicio is None:
            return False

        if self.inicio.valor == valor:
            self.inicio = self.inicio.siguiente
            return True

        actual = self.inicio
        while actual.siguiente:
            if actual.siguiente.valor == valor:
                actual.siguiente = actual.siguiente.siguiente
                return True
            actual = actual.siguiente

        return False

    def obtener_todos(self):
        elementos = []
        actual = self.inicio
        while actual:
            elementos.append(actual.valor)
            actual = actual.siguiente
        return elementos
