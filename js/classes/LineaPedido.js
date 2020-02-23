// [x]
class LineaPedido {

    constructor(producto,cantidad)
    {
        this.producto=producto;
	if(this.validarCantidad(cantidad)){
            this.cantidad=cantidad;
	}
        
    }
    get precioLinea(){
	return (this.producto.precio * this.cantidad);
    }

    validarCantidad(cantidad)
    {
	cantidad=parseInt(cantidad);
	let stock=parseInt(this.producto.stock);
    	if(cantidad <= 0 || cantidad >= stock){
    	    return false;
	}
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
