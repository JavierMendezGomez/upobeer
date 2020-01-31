class Vehiculo{

    constructor(matricula,marca,modelo,tipo,añoFabricacion){
	this.idVehiculo=modelo.contadorVehiculos+1;
	modelo.contadorVehiculos++;
	this.matricula;
	this.marca;
	this.modelo;
	this.tipo;
	this.anyoFabricacion;
    }

    toHTMLTableRow(){
	let oFila=document.createElement("TABLE");
	oFila.insertCell(-1).textContent=idVehiculo;
	oFila.insertCell(-1).textContent=matricula;
	oFila.insertCell(-1).textContent=marca;
	oFila.insertCell(-1).textContent=modelo;
	oFila.insertCell(-1).textContent=tipo;
	oFila.insertCell(-1).textContent=anyoFabricacion;
    }
}
