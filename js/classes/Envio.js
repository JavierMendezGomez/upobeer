class Envio{
    constructor(fechaSalida, fechaEntrega){
	this.idEnvio=modelo.contadorEnvios+1;
	modelo.contadorEnvios++;
	this.fechaSalida=new Date(fechaSalida);
	this.fechaEntrega=new Date(fechaEntrega);
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
    toHTMLRow(){
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
