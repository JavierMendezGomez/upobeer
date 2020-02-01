// [x]
class Vehiculo{

    constructor(matricula,marca,modelo,tipo,anoFabricacion){
	this.idVehiculo=modelo.contadorVehiculos+1;
	modelo.contadorVehiculos++;
	if(validarMatricula(matricula))
	    this.matricula;
	this.marca;
	this.modelo;
	this.tipo;
	this.anoFabricacion;
    }

    validarMatricula(matricula){
	let valido=false;
	
	let numero;
        let letras;
        let expresion_regular_matricula = /^\d{4}[ABCDFGHJKLMNPQRSTVWXYZ]$/;

        if (expresion_regular_matricula.test(matricula) == true) {
	    return true;
        } else {
            throw 'Vehiculo.matricula : formato no válido para  matrícula';
        }
    }
    
    toHTMLTableRow(){
	let oFila=document.createElement("TR");
	oFila.insertCell(-1).textContent=idVehiculo;
	oFila.insertCell(-1).textContent=matricula;
	oFila.insertCell(-1).textContent=marca;
	oFila.insertCell(-1).textContent=modelo;
	oFila.insertCell(-1).textContent=tipo;
	oFila.insertCell(-1).textContent=anyoFabricacion;
    }
}
