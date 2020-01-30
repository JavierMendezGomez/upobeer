class Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        if(this.validarDNI(sDni))
            this.dni = sDni;
        this.nombre = sNombre;
        this.apellidos = sApellidos;
        if(this.validarFechaNacimiento(dFechaNacimiento))
	    this.fechaNacimiento = dFechaNacimiento;
        this.direccion = sDireccion;
        if(this.validarTelefono(sTelefono))
	    this.telefono = sTelefono;

    }

    validarDNI(sDni) {

        var numero;
        var letr;
        var letra;

        let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
        if (expresion_regular_dni.test(sDni) == true)
        {
            return true;
        }
        else
        {
            alert("Error en dni");
            return false;
        }
        /*
          if (expresion_regular_dni.test(sDni) == true) {
          numero = sDni.substr(0, dni.length - 1);
          letr = sDni.substr(dni.length - 1, 1);
          numero = numero % 23;
          letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
          letra = letra.substring(numero, numero + 1);
          if (letra != letr.toUpperCase()) {
          alert('Dni erroneo, la letra del NIF no se corresponde');
          return false;
          } else {
          return true;
          }
          } else {
          alert('Dni erroneo, formato no válido');
          return false;
          }
        */

    }

    validarTelefono(sTelefono) {

        let expresion_regular_telefono = /^[\d]{9}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            return true;
        }
        else {
            alert("Teléfono erroneo, formato no válido");
            return false;
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
	    alert("Fecha de nacimiento erronea, menor de 18 años");
	    return false;
	}
	else
	    return true;
    }

    modificarDireccion(sDireccion) {
        this.direccion = sDireccion;
        return true;
    }

    modificarTelefono(sTelefono) {

        expresion_regular_telefono = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            this.telefono = sTelefono;
            return true;
        }
        else {
            alert("Teléfono erroneo, formato no válido");
            return false;
        }

    }

}
