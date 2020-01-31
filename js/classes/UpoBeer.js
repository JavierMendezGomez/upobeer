class UpoBeer {   
    /* CONSTRUCTOR */
    constructor(){
	this.tCervezas=[];
	this.contadorCervezas=0;
	this.tPedidos=[];
	this.contadorPedidos=0;
	this.tClientes=[];
	this.tOperarios=[];
	//Cosas necesarias para envío
	this.tConductores=[];
	this.tVehiculos=[];
	this.contadorVehiculos=0;
    }

    /* MÉTODOS */
    /** Alta y baja de cosas */
    altaCliente(oCliente){
    	if(this.buscarCliente(oCliente.dni) == undefined){
	    return this.tClientes.push(oCliente); //Devuelve length del array que si es positivo es como true
	}
    	return false;
    }
    bajaCliente(dni){
	this.tClientes=this.tClientes.filter(function(cliente){
	    cliente.dni!=dni;
	});
    }
    altaOperario(oOperario){
    	if(this.buscarOperario(oOperario.dni) == undefined){
	    return this.tOperarios.push(oOperario);
	}
    	return false;
    }
    bajaOperario(dni){
	this.tOperarios=this.tOperarios.filter(function(operario){
	    operario.dni!=dni;
	});
    }

    altaPedido(oPedido){
	if(this.buscarPedido(oPedido.idPedido) == undefined){
    	this.tPedidos.push(oPedido);
    	return oPedido;
	}
    	return false;
    }
    bajaPedido(idPedido){
	this.tPedidos=this.tPedidos.filter(function(pedido){
	    pedido.idPedido!=idPedido;
	});
    }
    altaCerveza(oCerveza){
    	if(this.buscarCerveza(oCerveza.idCerveza) == undefined){
    	    return this.tCervezas.push(oCerveza);
	}
    	return false;
    }
    bajaCerveza(idCerveza){
	this.tCervezas=this.tCervezas.filter(function(cerveza){
	    cerveza.idCerveza!=idCerveza;
	});
    }

    //Cosas necesarias para envío
    altaConductor(oConductor){
    	if(this.buscarConductor(oConductor.dni) == undefined){
	    return this.tConductores.push(oConductor);
	}
    	return false;
    }
    bajaConductor(dni){
	this.tConductores=this.tConductores.filter(function(conductor){
	    conductor.dni!=dni;
	});
    }
    altaVehiculo(Vehiculo){
    	if(this.buscarVehiculo(oVehiculo.matricula) == undefined){
	    return this.tVehiculos.push(oVehiculo);
	}
    	return false;
    }
    bajaVehiculo(matricula){
	this.tVehiculos=this.tVehiculos.filter(function(vehiculo){
	    vehiculo.matricula!=matricula;
	});
    }
    
    /** Buscar cosas */
    buscarCerveza(idCerveza){
    	return this.tCervezas.find(function(oCerveza_iterada){
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
    buscarPedido(idPedido,dni){
	if(dni == null){
		console.log("id ok");
	if(typeof dni == undefined){
	    console.log("id ok");
	    return this.tPedidos.find(function(oPedido_iterado){
		return (oPedido_iterado.idPedido == idPedido);
	    });
	} else {
		console.log("id null");
	    return this.tPedidos.filter(function(oPedido_iterado){
		return (oPedido_iterado.cliente.dni == dni);
	    });
	}
    }
    buscarCliente(dni){
	return this.tClientes.find(function(oCliente_iterado){
	    return (oCliente_iterado.dni == dni);
	});
    }

    //cosas necesarias para envío
    buscarConductor(dni){
	return this.tConductores.find(function(oConductor_iterado){
	    return (oConductor_iterado.dni == dni);
	});
    }
    buscarVehiculo(matricula){
	return this.tVehiculos.find(function(oVehiculo_iterado){
	    return (oVehiculo_iterado.matricula == matricula);
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
 
    comprobarRegistro(usuario,dni,nombre,apellidos,fecha,direccion,telefono)
    {
    	if(this.buscarCliente(dni) != undefined)
    	{
	    console.log("No se puede crear el cliente. Ya existía un cliente con el mismo DNI.");
	    return false;
    	}
    	else
    	{
    	    console.log("Nuevo usuario: " + usuario + ", " + dni);
	    this.altaCliente(new Cliente(usuario,dni,nombre,apellidos,fecha,direccion,telefono));
    	    return true;
    	}
    }

    //oCliente es un parámetro opcional
    listadoPedidos(oCliente){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tPedidos.forEach(function(pedido){
	    if(oCliente!=undefined && pedido.cliente.dni==oCliente.dni){
		let oFila = oTBody.insertRow(-1);
		oFila=pedido.toHTMLTableRow;
	    }
	})
	return oTabla;
    }
    comboPedidos(oCliente){
	let select = document.createElement("SELECT");
	select.name="comboPedidos";
	select.className="form-control";
	if(this.buscarPedido(oCliente) != undefined)
		this.buscarPedido(oCliente).forEach(function(element){
		    let option = document.createElement("OPTION");
		    option.value = element.idPedido;
		    option.textContent = element.fecha;
		    select.appendChild(option);
		});
	else
	{
		 let option = document.createElement("OPTION");
	    option.value = "-1";
	    option.textContent = "No tiene pedidos pendientes";
	    select.appendChild(option);
	}
	return select;
    }
    
    listadoCervezas(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tCervezas.forEach(function(cerveza){
	    let oFila = oTBody.insertRow(-1);
	    oFila=cerveza.toHTMLTableRow;
	})

	return oTabla;
    }
    comboCatalogo(){
	let select = document.createElement("SELECT");
	select.name="comboCatalogo";
	select.className="form-control";
	this.tCervezas.forEach(function(element){
	    let option = document.createElement("OPTION");
	    option.value = element.idCerveza;
	    option.textContent = element.nombre+" - "+element.porcentaje+"% alcohol";
	    select.appendChild(option);
	});
	return select;
    }

    listadoClientes(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tClientes.forEach(function(cliente){
	    let oFila = oTBody.insertRow(-1);
	    oFila=cliente.toHTMLTableRow;
	})

	return oTabla;
    }

    listadoOperarios(){
	let oTabla=document.createElement("TABLE");
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tOperarios.forEach(function(operario){
	    let oFila = oTBody.insertRow(-1);
	    oFila=operario.toHTMLTableRow();	    
	})

	return oTabla;
    }
}
