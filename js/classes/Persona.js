class Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {
	if (this.validarDNI(sDni)){
	    this.dni = sDni;
	}
        this.nombre = sNombre;
        this.apellidos = sApellidos;
	if(this.validarFechaNacimiento(dFechaNacimiento)){
	    this.fechaNacimiento = dFechaNacimiento;
	}
        this.direccion = sDireccion;
	if(this.validarTelefono(sTelefono)){
	    this.telefono = sTelefono;
	}
    }

    validarDNI(sDni) {
	let valido=false;
	
	let numero;
        let letr;
        let letra;
        let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if (expresion_regular_dni.test(sDni) == true) {
            /*numero = sDni.substr(0, sDni.length - 1);
              letr = sDni.substr(sDni.length - 1, 1);
              numero = numero % 23;
              letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
              letra = letra.substring(numero, numero + 1);
              if (letra != letr.toUpperCase()) {
	      throw 'Cliente.dni : la letra del NIF no se corresponde.';
              } else {*/
	    return true;
            /*}*/
        } else {
            throw 'Cliente.dni : formato no válido para DNI.';
        }
    }

    validarTelefono(sTelefono) {
        let expresion_regular_telefono = /^[\d]{9}$/;
	
        if (expresion_regular_telefono.test(sTelefono) == true) {
            return true;
        }
        else {
            throw "Cliente.telefono : Teléfono erroneo, formato no válido";
        }
    }
    
    //Añadido para comprobar que el cliente/operario es mayor de edad
    validarFechaNacimiento(dFechaNacimiento)
    {
    	let hoy = new Date();
	let mayoriaEdad = 1000 * 60 * 60 * 24 * 365 * 18; //18 años en milisegundos
	let fechaMin = new Date(hoy - mayoriaEdad);
	if(fechaMin > dFechaNacimiento)
	{
	    throw "Cliente.fechaNacimiento : Fecha de nacimiento erronea, menor de 18 años";
	}
	else{
	    return true;
	}
    }
    modificarTelefono(sTelefono) {
	try{
	    if(validarTelefono(sTelefono)){
		this.telefono = sTelefono;
		return true;
	    }
	} catch (e) {
	    return false;
	}
    }
}
