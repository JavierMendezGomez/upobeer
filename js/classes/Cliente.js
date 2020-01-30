class Cliente extends Persona {

    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;

    }

    altaPedido() {

    	/*	
		for (let i = 0; i < upobeer.tClientes.length; i++) {
		if (upobeer.tClientes[i] == this) {
        */

        //Comprobacion no necesaria? Para acceder al metodo tengo que estar en this
    	if(upobeer.buscarCliente(this.dni) == this && upobeer.buscarPedido(this))
    	{
            let oLineasPedido = [];
            upobeer.altaPedido(new Pedido(this, oLineasPedido));
            return true;
        }

        return false;

        //REVISIÓN

    }

    bajaPedido(idPedido) {

        for (let i = 0; i < upobeer.tPedidos.length; i++) {
            if (upobeer.tPedidos[i].cliente == this) {
                if (upobeer.tPedidos[i].idPedido == idPedido) {
                    upobeer.bajaPedido(idPedido);
                    return true;
                }
            }
        }

        return false;
    }

    listadoPedidos() {

        let oArrayPedidos = [];

        for (let i = 0; i < upobeer.tPedidos.length; i++) {
            if (upobeer.tPedidos[i].cliente == this) {
                oArrayPedidos.push(upobeer.tPedidos[i]);
            }
        }

        return oArrayPedidos;
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

        /*
        let fila = "<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento +
            "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td></tr>";
        return fila;
        */
    }

}
