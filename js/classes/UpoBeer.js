class UpoBeer {   
    /* CONSTRUCTOR */
    constructor(catalogo, tPedidos, tClientes, tOperarios){
	this.catalogo=[];
	this.tPedidos=[];
	this.tClientes=[];
	this.tOperarios=[];

	//Cosas necesarias para envío
	this.tConductores=[];
	this.tVehiculos=[]
    }

    /* MÉTODOS */
    /** Alta y baja de cosas */
    altaCliente(oCliente){
    	if(this.buscarCliente(oCliente.dni) == undefined)
	    return this.tClientes.push(oCliente); //Devuelve length del array que si es positivo es como true
    	return false;
    }
    bajaCliente(oCliente){
	this.tClientes=this.tClientes.filter(function(cliente){
	    cliente.dni!=oCliente.dni;
	});
    }
    altaOperario(oOperario){
    	if(this.buscarOperario(oOperario.dni) == undefined)
	    return this.tOperarios.push(oOperario);
    	return false;
    }
    bajaOperario(oOperario){
	this.tOperarios=this.tOperarios.filter(function(operario){
	    operario.dni!=oOperario.dni;
	});
    }
    altaPedido(oPedido){
	if(this.buscarPedido(oPedido.idPedido) == undefined)
    	    return this.catalogo.push(oVehiculo);
    	return false;
    }
    bajaPedido(oPedido){
	this.tPedidos=this.tPedidos.filter(function(pedido){
	    pedido.idPedido!=oPedido.idPedido;
	});
    }
    altaCerveza(oCerveza){
    	if(this.buscarCerveza(oCerveza.idCerveza) == undefined)
    	    return this.catalogo.push(oVehiculo);
    	return false;
    }
    bajaCerveza(oCerveza){
	this.tCervezas=this.tCervezas.filter(function(cerveza){
	    cerveza.idCerveza!=oCerveza.idCerveza;
	});
    }

    //Cosas necesarias para envío
    altaConductor(oConductor){
    	if(this.buscarConductor(oConductor.dni) == undefined)
	    return this.tConductores.push(oConductor);
    	return false;
    }
    bajaConductor(oConductor){
	this.tConductors=this.tConductores.filter(function(operario){
	    operario.dni!=oConductor.dni;
	});
    }
    altaVehiculo(oVehiculo){
    	if(this.buscarVehiculo(oVehiculo.matricula) == undefined)
	    return this.tVehiculos.push(oVehiculo);
    	return false;
    }
    bajaVehiculo(oVehiculo){
	this.tVehiculos=this.tVehiculos.filter(function(vehiculo){
	    vehiculo.matricula!=oVehiculo.matricula;
	});
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
    buscarCliente(oCliente){
	return this.tPedidos.filter(function(oPedido_iterado){
	    return (oPedido_iterado.cliente == oCliente);
	});
    }

    //cosas necesarias para envío
    buscarConductor(dni){
	return this.tConductores.filter(function(oConductor_iterado){
	    return (oConductor_iterado.dni == dni);
	});
    }
    buscarVehiculo(dni){
	return this.tVehiculos.filter(function(oVehiculo_iterado){
	    return (oVehiculo_iterado.dni == dni);
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

    listadoPedidos(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tPedidos.forEach(function(pedido){
	    let oFila = oTBody.insertRow(-1);
	    oFila=pedido.toHTMLTableRow;
	})
    }

    listadoCervezas(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tCervezas.forEach(function(cerveza){
	    let oFila = oTBody.insertRow(-1);
	    oFila=cerveza.toHTMLTableRow;
	})	
    }

    listadoClientes(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tClientes.forEach(function(cliente){
	    let oFila = oTBody.insertRow(-1);
	    oFila=cliente.toHTMLTableRow;
	})
    }

    listadoOperarios(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tOperarios.forEach(function(operario){
	    let oFila = oTBody.insertRow(-1);
	    oFila=operario.toHTMLTableRow();	    
	})
    }
}
