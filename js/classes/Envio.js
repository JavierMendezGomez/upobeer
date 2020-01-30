class Envio{
    constructor(idEnvio, fechaSalida){
	this.idEnvio=idEnvio,
	this.fechaSalida=new Date(fechaSalida);
    }
    comprobarEntrega(fechaEntrega){
	fechaEntrega=new Date(fechaEntrega);
	if(this.validarIntervaloFecha(this.fechaSalida,fechaEntrega)){
	    return true;
	}
    }
    validarIntervaloFecha(fechaInicial,fechaFinal){
	fechaFinal = new Date(fechaFinal);
	fechaInicial = new Date(fechaInicial);
	if(fechaFinal.getTime()>fechaInicial.getTime()){
	    return true;
	} else {
	    throw "Intervalo de fechas no válido";
	}
    }
    toString(){
	let oFila=document.createElement("TR");

	let oCeldaIdEnvio=oFila.insertCell(-1);
	oCeldaIdEnvio.textContent=this.idEnvio;
	let oCeldaFechaSalida=oFila.insertCell(-1);
	oCeldaFechaSalida.textContent=this.fechaSalida;
	let oCeldaFechaEntrega=oFila.insertCell(-1);
	oCeldaFechaEntrega.textContent=this.fechaEntrega;

	return oFila;
    }
}
