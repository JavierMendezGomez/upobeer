document.write("<script type='text/javascript' src='js/UpoBeer_classes.js'></script>");

class Controlador {
/*	var modelo = new QuintoCar([],[],[],[]);
*/
    constructor (){
		this.modelo = new UpoBeer([],[],[],[]);
    }

    //Dar de alta un tipo turismo
    altaCerveza(id,nombre,porcentaje,precio,stock,foto)
    {
    	return this.modelo.altaCerveza(new Cerveza(id,nombre,porcentaje,precio,stock,foto));
    }

    //Dar de alta un cliente
    altaCliente(usuario,dni,nombre,apellidos,fechaNac,direccion,telefono)
    {
    	return this.modelo.altaCliente(new Cliente(usuario,dni,nombre,apellidos,fechaNac,direccion,telefono));
    }

    altaOperario(usuario,dni,nombre,apellidos,fechaNac,direccion,telefono,supervisor)
    {
        return this.modelo.altaOperario(new Operario(usuario,dni,nombre,apellidos,fechaNac,direccion,telefono,supervisor));
    }

    comprobarUsuario(usuario,clave)
    {
        return this.modelo.comprobarUsuario(usuario,clave);   
    }

    comprobarRegistro(usuarioNuevo,dni,nombre,apellidos,fecha,direccion,telefono)
    {
        return this.modelo.comprobarRegistro(usuarioNuevo,dni,nombre,apellidos,fecha,direccion,telefono);   
    }

    listadoClientes()
	{
	 	//Listado clientes registrados
		return this.modelo.listadoClientes();
	}

    listadoVehiculos()
	{
	 	//Listado vehiculos registrados
		return this.modelo.listadoVehiculos();
	}

	listadoVehiculosVenta()
	{
	 	//Listado vehiculos a la venta
		return this.modelo.listadoALaVenta();
	}
}
