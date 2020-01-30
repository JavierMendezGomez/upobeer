class Conductor extends Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, sTipoCarnet) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.tipoCarnet = sTipoCarnet;
    }


}
