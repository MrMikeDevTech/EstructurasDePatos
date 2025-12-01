class NodoArbol:
    def __init__(self, key, valor):
        self.key = key
        self.valor = valor
        self.izq = None
        self.der = None

class ArbolBinarioBusqueda:
    def __init__(self):
        self.raiz = None

    def insertar(self, key, valor):
        if self.raiz is None:
            self.raiz = NodoArbol(key, valor)
        else:
            self._insertar(self.raiz, key, valor)

    def _insertar(self, nodo, key, valor):
        if key < nodo.key:
            if nodo.izq is None:
                nodo.izq = NodoArbol(key, valor)
            else:
                self._insertar(nodo.izq, key, valor)
        else:
            if nodo.der is None:
                nodo.der = NodoArbol(key, valor)
            else:
                self._insertar(nodo.der, key, valor)

    def buscar(self, key):
        return self._buscar(self.raiz, key)

    def _buscar(self, nodo, key):
        if nodo is None:
            return None
        if key == nodo.key:
            return nodo.valor
        elif key < nodo.key:
            return self._buscar(nodo.izq, key)
        else:
            return self._buscar(nodo.der, key)

    def _minimo(self, nodo):
        actual = nodo
        while actual.izq:
            actual = actual.izq
        return actual

    def eliminar(self, key):
        self.raiz = self._eliminar(self.raiz, key)

    def _eliminar(self, nodo, key):
        if nodo is None:
            return nodo

        if key < nodo.key:
            nodo.izq = self._eliminar(nodo.izq, key)
        elif key > nodo.key:
            nodo.der = self._eliminar(nodo.der, key)
        else:
            if nodo.izq is None:
                return nodo.der
            elif nodo.der is None:
                return nodo.izq

            temp = self._minimo(nodo.der)
            nodo.key = temp.key
            nodo.valor = temp.valor
            nodo.der = self._eliminar(nodo.der, temp.key)

        return nodo

    def inorden(self):
        return self._inorden(self.raiz, [])

    def _inorden(self, nodo, lista):
        if nodo:
            self._inorden(nodo.izq, lista)
            lista.append((nodo.key, nodo.valor))
            self._inorden(nodo.der, lista)
        return lista

    def preorden(self):
        return self._preorden(self.raiz, [])

    def _preorden(self, nodo, lista):
        if nodo:
            lista.append((nodo.key, nodo.valor))
            self._preorden(nodo.izq, lista)
            self._preorden(nodo.der, lista)
        return lista

    def postorden(self):
        return self._postorden(self.raiz, [])

    def _postorden(self, nodo, lista):
        if nodo:
            self._postorden(nodo.izq, lista)
            self._postorden(nodo.der, lista)
            lista.append((nodo.key, nodo.valor))
        return lista

    def obtener_todos(self):
        return self.inorden()
