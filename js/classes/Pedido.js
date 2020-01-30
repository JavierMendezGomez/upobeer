class Pedido {

    constructor(oCliente,tLineasPedido)
    {
	this.idPedido=contadorPedidos;
	contadorPedidos++;
	this.cliente=oCliente;
	this.tLineasPedido=tLineasPedido;
	this.estado="espera";
	this.fechaInicio=new Date(); //Fecha actual, cuando se hace el pedido
	this.fechaFin = new Date();
	this.validarIntervaloFecha(dFechaInicio,dFechaFin);
    }

    precioTotal()
    {
	let total = 0;
	for(let i = 0; i < this.tLineasPedido.length; i++)
	{
	    total += this.tLineasPedido[i].precioLinea;
	}
	return total;
    }

    validarIntervaloFecha(dFechaInicio,dFechaFin)
    {
	//Minimo 1 dia para preparacion, 3 dias para envio fijos
	let diasPrep = 1;
	let diasEnvio = 3;
	let cantidadTotal = 0;
	for(let i = 0; i < this.tLineasPedido.length; i++)
	{
	    cantidadTotal += this.tLineasPedido[i].cantidad;
	}
	diasPrep = Math.trunc(cantidadTotal / 100);
	//Suma los dias de prep y de envio a la fecha de inicio
	this.fechaFin.setDate(this.fechaInicio.getDate() + (diasPrep + diasEnvio));
    }

    insertarLineaPedido(oLineaPedido)
    {
	for(let i = 0; i < this.tLineasPedido.length; i++)
	{
	    if(tLineasPedido[i].producto.idCerveza == oLineaPedido.producto.idCerveza)
		return false; //Producto repetido en dos lineas pedido diferentes
	}
	if(new Date() > this.fechaInicio)
	    return false; //Se esta modificando el pedido tarde, ya esta en preparacion
	return this.tLineasPedido.push(oLineaPedido);
    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.idPedido + "</td><td>" + this.cliente.nombre + " " + this.cliente.apellidos + "</td><td>" 
            + this.tLineasPedido.length + "</td><td>" + this.estado + "</td><td>" 
            + this.fechaInicio + "</td>" + "</td><td>" + this.fechaFin + "</td>";

	return fila;
    }
}
