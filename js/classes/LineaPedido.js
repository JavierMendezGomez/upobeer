class LineaPedido {

    constructor(producto,iCantidad)
    {
        this.producto=producto;
        this.cantidad=iCantidad;
        this.precioLinea=(this.producto.precio * this.cantidad);
    }

    validarCantidad(cantidad)
    {
    	//Me he inventado un max de 1000 por pedido por si se te cuela un cero al pedir
    	if(cantidad <= 0 || cantidad > 1000  || cantidad <= this.producto.stock)
    	    return false;
	else
	    return true;
    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.producto.nombre + "</td><td>" + this.cantidad + "</td><td>" + this.precio + "</td>";

	return fila;
    }

}
