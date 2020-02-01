// [x]
class Cliente extends Persona {
    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {
        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;
    }

    altaPedido(oPedido){
	return modelo.altaPedido(oPedido);
    }

    bajaPedido(idPedido){
	return modelo.bajaPedido(idPedido);
    }
    
    arrayPedidos(){
	return modelo.buscarPedido(this.dni);
    }
    
    listadoPedidos() {
	modelo.listadoPedidos(this.dni);
    }

    toHTMLRow() {

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

        return oFila;
    }

}
