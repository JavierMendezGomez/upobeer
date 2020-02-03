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
            //throw 'Cliente.dni : formato no válido para DNI.';
            return false;
        }
    }

    validarTelefono(sTelefono) {
        let expresion_regular_telefono = /^[\d]{9}$/;
	
        if (expresion_regular_telefono.test(sTelefono) == true) {
            return true;
        }
        else {
            //throw "Cliente.telefono : Teléfono erroneo, formato no válido";
            //alert("Teléfono erroneo, formato no válido");
            return false;
        }
    }
    
    //Añadido para comprobar que el cliente/operario es mayor de edad
    validarFechaNacimiento(dFechaNacimiento)
    {
    	let hoy = new Date();
	console.log(hoy);
    let mayoriaEdad = 1000 * 60 * 60 * 24 * 365 * 18; //18 años en milisegundos
	   console.log(mayoriaEdad);
    let fechaMin = new Date(hoy - mayoriaEdad);
     console.log(fechaMin);
     console.log(dFechaNacimiento);
     console.log(fechaMin < dFechaNacimiento);
	if(fechaMin < dFechaNacimiento)
	{
	    //throw "Cliente.fechaNacimiento : Fecha de nacimiento erronea, menor de 18 años";
        //alert("Fecha de nacimiento erronea, menor de 18 años");
        return false;
    }
	else{
	    return true;
	}
    }
    modificarTelefono(sTelefono) {
    if(this.validarTelefono(sTelefono)){
		this.telefono = sTelefono;
		return true;
    }
    return false;
    }

    modificarDireccion(sDireccion) {
        this.direccion = sDireccion;
        return true;
    }
}
