// [x]
class Conductor extends Persona {
    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, sTipoCarnet) {
        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.tipoCarnet = sTipoCarnet;
    }
    toHTMLTableRow(){
	let oFila=document.createElement("TR");
	oFila.insertCell(-1).textContent=dni;
	oFila.insertCell(-1).textContent=nombre;
	oFila.insertCell(-1).textContent=apellidos;
	oFila.insertCell(-1).textContent=fechaNacimiento;
	oFila.insertCell(-1).textContent=direccion;
	oFila.insertCell(-1).textContent=telefono;
	oFila.insertCell(-1).textContent=tipoCarnet;
    }
}
