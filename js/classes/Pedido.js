class Pedido {

    constructor(oCliente,tLineasPedido)
    {
	this.idPedido=modelo.contadorPedidos+1;
	modelo.contadorPedidos++;
	this.cliente=oCliente;
	this.tLineasPedido=tLineasPedido;
	this.estado="espera";
	this.fechaInicio = new Date();
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

    validarIntervaloFecha()
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
	this.fechaFin=new Date();
	this.fechaFin.setDate(this.fechaInicio.getDate() + (diasPrep + diasEnvio));

	let fechaSalida=new Date();
	fechaSalida.setDate(this.fechaInicio.getDate() + (diasPrep));
	fechaEntrega.setDate(this.fechaInicio.getDate() + (diasPrep + diasEnvio));
	this.envio = new Envio(fechaSalida, fechaEntrega);
    }

    insertarLineaPedido(oLineaPedido)
    {
	for(let i = 0; i < this.tLineasPedido.length; i++)
	{
	    if(this.tLineasPedido[i].producto.idCerveza == oLineaPedido.producto.idCerveza)
		return false; //Producto repetido en dos lineas pedido diferentes
	}
	return this.tLineasPedido.push(oLineaPedido);
    }

    cambiarEstado(estado){
	let estadoCambiado=false;
	    
	    switch(estado){
	    case "pendiente":
		this.envio=null;
		this.estado="pendiente";
		estadoCambiado=true;
		break;
	    case "preparacion":
		//poner todas las fechas en orden
		this.validarIntervaloFecha();
		this.estado="preparacion";
		estadoCambiado=true;
		break;
	    case "enviado":
		this.estado="enviado";
		estadoCambiado=true;
		break;
	    case "finalizado":
		this.estado="finalizado";
		estadoCambiado=true;
		break;
	    default:
		estadoCambiado=false;
	    }
	    
	    return estadoCambiado;
	}

    toHTMLRow(){

	let oFila = document.createElement("TR");
        let oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.idPedido;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.cliente.nombre;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.cliente.apellidos;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.tLineasPedido.length;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.estado;

        oCelda = oFila.insertCell(-1);
		oCelda.textContent = this.fechaInicio;
		
		oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.fechaFin;

        return oFila;
    }
}
