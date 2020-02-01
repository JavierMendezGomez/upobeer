// [x]
class Operario extends Persona {

    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, bSupervisor) {
        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;
        this.supervisor = bSupervisor;

    }
    altaOperario(oOperario) {
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.altaOperario(oOperario);
	} else {
	    return false;
	}
    }
    bajaOperario(sDNI) {
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.bajaOperario(sDNI);
	} else {
	    return false;
	}
    }
    altaCerveza(oCerveza) {
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.altaCerveza(oCerveza);
	} else {
	    return false;
	}
    }
    bajaCerveza(idCerveza) {
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.bajaCerveza(idCerveza);
	} else {
	    return false;
	}
    }
    añadirStock(idCerveza, cantidad) {
	if(modelo.buscarOperario(this))
	{
	    let oCerveza=modelo.buscarCerveza(idCerveza);
	    if(oCerveza != undefined){
		return oCerveza.añadirStock(cantidad);
	    } else {
		return false;
	    }
	} else {
	    return false;
	}
    }

    cambiarEstadoPedido(idPedido, estado) {
	if(modelo.buscarOperario(this)){
	    let oPedido=modelo.buscarPedido(idPedido);
	    if(oPedido!=undefined){
		return oPedido.cambiarEstado(estado);
	    } else {
		return false;
	    }
	} else {
	    return false;
	}
    }

    toHTMLTableRow() {

        let oFila = document.createElement("tr");
        let oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.dni;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.nombre;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.apellidos;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.fechaNacimiento;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.direccion;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.telefono;

        if (this.supervisor == true) {
            oCelda = oFila.insertCell(-1);
            oCelda.textContent = "Supervisor";
        }
        else {
            oCelda = oFila.insertCell(-1);
            oCelda.textContent = "Operario";
        }

        return oFila;
    }
}
