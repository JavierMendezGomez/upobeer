// [x]
class LineaPedido {

    constructor(producto,iCantidad)
    {
        this.producto=producto;
        this.cantidad=iCantidad;
    }

    get precioLinea(){
	return this.producto.precio * this.cantidad;
    }
    
    validarCantidad(cantidad)
    {
    	//Me he inventado un max de 1000 por pedido por si se te cuela un cero al pedir
    	if(cantidad <= 0 || cantidad > 1000  || cantidad <= this.producto.stock)
    	    return false;
	else
	    return true;
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
