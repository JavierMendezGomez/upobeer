class UpoBeer {
    
    /* CONSTRUCTOR */
    constructor(catalogo, tPedidos, tClientes, tOperarios){
		this.catalogo=catalogo; //arroVehiculos
		this.tPedidos=tPedidos; //arroVentas
		this.tClientes=tClientes; //arroClientes
		this.tOperarios=tOperarios;
    }

    /* MÉTODOS */
    /** Alta de cosas */
    altaCliente(oCliente){
    	if(this.buscarCliente(oCliente.dni) == undefined)
			return this.tClientes.push(oCliente); //Devuelve length del array que si es positivo es como true
    	return false;
    }

    altaOperario(oOperario){
    	if(this.buscarOperario(oOperario.dni) == undefined)
			return this.tOperarios.push(oOperario);
    	return false;
    }

    altaCerveza(oCerveza){
    	if(this.buscarCerveza(oCerveza.idCerveza) == undefined)
    		return this.catalogo.push(oVehiculo);
    	return false;
    }

    /** Buscar cosas */
    buscarCerveza(idCerveza){
    	return this.catalogo.find(function(oCerveza_iterada){
    		return oCerveza_iterada.idCerveza == idCerveza;
    	});
    }
    buscarCliente(dni){
		return this.tClientes.find(function(oCliente_iterado){
		    return oCliente_iterado.dni == dni;
		});
    }
    buscarOperario(dni){
		return this.tOperarios.find(function(oOperario_iterado){
		    return (oOperario_iterado.dni == dni);
		});
    }
    buscarSupervisor(dni){
		return this.tOperarios.find(function(oOperario_iterado){
		    return (oOperario_iterado.dni == dni && oOperario_iterado.supervisor == true);
		});
	}
	buscarPedido(idPedido){
		return this.tPedidos.find(function(oPedido_iterado){
			return (oPedido_iterado.idPedido == idPedido);
		});
	}
	buscarPedido(oCliente){
		return this.tPedidos.filter(function(oPedido_iterado){
			return (oPedido_iterado.cliente == oCliente);
		});
	}
	/** Comprobar usuarios*/
    comprobarUsuario(usuario,clave)
    {
    	
    	//La clave es el dni, el usuario es unico
    	if(this.buscarCliente(clave) != undefined)
    	{
    		if(this.buscarCliente(clave).usuario == usuario)
	            tipo = "cliente";
    	}
        else if(this.buscarSupervisor(clave) != undefined)
        {
    		if(this.buscarSupervisor(clave).usuario == usuario)
	            tipo = "supervisor";
	    }
        else if(this.buscarOperario(clave) != undefined)
        {
    		if(this.buscarOperario(clave).usuario == usuario)
	            tipo = "operario";
	    }

	    setCookie(clave,tipo,365);

        return tipo;
    }
    comprobarRegistro(usuarioNuevo,dni,nombre,apellidos,fecha,direccion,telefono)
    {
    	if(this.buscarCliente(dni) != undefined)
    	{
    		console.log("Cliente encontrado");
    		return false;
    	}
    	else
    	{
    		console.log(usuarioNuevo + ", " + dni);
    		console.log(this.altaCliente(new Cliente(usuarioNuevo,dni,nombre,apellidos,fecha,direccion,telefono)));
    		return true;
    	}
    }
}
