// [x]
class LineaPedido {

    constructor(producto,cantidad)
    {
        this.producto=producto;
        this.cantidad=cantidad;
    }
    get precioLinea(){
	return (this.producto.precio * this.cantidad);
    }

    toHTMLTableRow(){
        let oFila = document.createElement("tr");
        let oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.dni;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.producto.nombre;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.cantidad;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.precioLinea;

        return oFila;
    }
}
