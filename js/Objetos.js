
class Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono){

        this.dni=sDni;
        this.nombre=sNombre;
        this.apellidos=sApellidos;
        this.fechaNacimiento=dFechaNacimiento;
        this.direccion=sDireccion;
        this.telefono=sTelefono;

    }

    validarDNI(sDni)
    {
        if(sDni==this.dni)
            return true;
        else
            return false;
    }

    validarTelefono(sTelefono)
    {
        if(sTelefono==this.telefono)
            return true;
        else
            return false;
    }

    modificarDireccion(sDireccion)
    {
        this.direccion=sDireccion;
            return true;
    }

    modificarTelefono(sTelefono)
    {
        this.telefono=sTelefono;
            return true;
    }

}

class Cliente extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);

    }

    altaPedido(){

    }

    bajaPedido(idPedido){

    }

    listadoPedidos(){

    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento + 
        "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td></tr>";
	    return fila;
	}

}

class Conductor extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,sTipoCarnet) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.tipoCarnet=sTipoCarnet;
    }

    toString(){

    }

}

class Operario extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,bSupervisor) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.supervisor=bSupervisor;

    }

    altaOperario(sDNI){

    }

    bajaOperario(sDNI){

    }

    altaCerveza(nombre,alcohol,precio,stock,foto){

    }

    bajaCerveza(idCerveza){

    }

    añadirStock(cantidad){

    }

    cambiarEstadoPedido(estado) {

    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento + 
        "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td><td>" + this.supervisor + "</td></tr>";
	    return fila;
	}

}