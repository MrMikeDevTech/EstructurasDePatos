class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izq = None
        self.der = None

class ArbolBinarioBusqueda:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        if self.raiz is None:
            self.raiz = NodoArbol(valor)
        else:
            self._insertar(self.raiz, valor)

    def _insertar(self, nodo, valor):
        if valor < nodo.valor:
            if nodo.izq is None:
                nodo.izq = NodoArbol(valor)
            else:
                self._insertar(nodo.izq, valor)
        else:
            if nodo.der is None:
                nodo.der = NodoArbol(valor)
            else:
                self._insertar(nodo.der, valor)

    def buscar(self, valor):
        return self._buscar(self.raiz, valor)

    def _buscar(self, nodo, valor):
        if nodo is None:
            return False
        if valor == nodo.valor:
            return True
        elif valor < nodo.valor:
            return self._buscar(nodo.izq, valor)
        else:
            return self._buscar(nodo.der, valor)

    def _minimo(self, nodo):
        actual = nodo
        while actual.izq:
            actual = actual.izq
        return actual

    def eliminar(self, valor):
        self.raiz = self._eliminar(self.raiz, valor)

    def _eliminar(self, nodo, valor):
        if nodo is None:
            return nodo

        if valor < nodo.valor:
            nodo.izq = self._eliminar(nodo.izq, valor)
        elif valor > nodo.valor:
            nodo.der = self._eliminar(nodo.der, valor)
        else:
            if nodo.izq is None:
                return nodo.der
            elif nodo.der is None:
                return nodo.izq

            temp = self._minimo(nodo.der)
            nodo.valor = temp.valor
            nodo.der = self._eliminar(nodo.der, temp.valor)

        return nodo

    def inorden(self):
        return self._inorden(self.raiz, [])

    def _inorden(self, nodo, lista):
        if nodo:
            self._inorden(nodo.izq, lista)
            lista.append(nodo.valor)
            self._inorden(nodo.der, lista)
        return lista

    def preorden(self):
        return self._preorden(self.raiz, [])

    def _preorden(self, nodo, lista):
        if nodo:
            lista.append(nodo.valor)
            self._preorden(nodo.izq, lista)
            self._preorden(nodo.der, lista)
        return lista

    def postorden(self):
        return self._postorden(self.raiz, [])

    def _postorden(self, nodo, lista):
        if nodo:
            self._postorden(nodo.izq, lista)
            self._postorden(nodo.der, lista)
            lista.append(nodo.valor)
        return lista

    def obtener_todos(self):
        return self.inorden()
