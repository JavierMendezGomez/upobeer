
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

}

class Conductor extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,sTipoCarnet) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.tipoCarnet=sTipoCarnet;
    }

}

class Operario extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,bSupervisor) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.supervisor=bSupervisor;

    }

}