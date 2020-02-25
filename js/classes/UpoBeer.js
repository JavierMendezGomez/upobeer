// [x]
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

    jQAjaxPost(parametros,objeto,alertar){
	let url="/php/ajax.php";
	Object.assign(parametros,objeto);

	let bHecho=false;
	let datosRecibidos;
	$.post(url, parametros)
	    .done(function(response){datosRecibidos=response; bHecho=true})
	    .fail(function(){bHecho=false;});

	if(bHecho){
	    return datosRecibidos;
	} else {
	    return false;
	}
    }

    jQAjaxGet(parametros,objeto,alertar){
	let url="/php/ajax.php";
	Object.assign(parametros,objeto);

	let bHecho=false;
	let datosRecibidos;
	$.get(url, parametros)
	    .done(function(response){datosRecibidos=response; bHecho=true})
	    .fail(function(){bHecho=false;});

	if(bHecho){
	    return datosRecibidos;
	} else {
	    return false;
	}
    }
    
    /* MÉTODOS */
    modificarPersona(oPersona){
	let parametros={
	    object: (oPersona.constructor.name),
	    operation: "updateonepk"
	};
	if(this.jQAjaxPost(parametros,oPersona).rowsaffected==1)
	    return true;
	else
	    return false;
    }
    
    /** Alta y baja de cosas */
    altaCliente(oCliente){
	let parametros={
	    object: "Cliente",
	    operation: "insertone"
	};
	if(this.jQAjaxPost(parametros,oCliente).rowsaffected==1)
	    return oCliente;
	else
	    return false;	   
    }
    bajaCliente(dni){
	let parametros={
	    object: "Cliente",
	    operation: "deleteonepk"
	};
	let objeto={dni:dni};
	if(this.jQAjaxPost(parametros,objeto).rowsaffected==1)
	    return true;
	else
	    return false;
    }
    altaOperario(oOperario){
    	let parametros={
	    object: "Operario",
	    operation: "insertone"
	};
	if(this.jQAjaxPost(parametros,oOperario).rowsaffected==1)
	    return oOperario;
	else
	    return false;
    }
    bajaOperario(dni){
	let parametros={
	    object: "Operario",
	    operation: "deleteonepk"
	};
	let objeto={dni:dni};
	if(this.jQAjaxPost(parametros,objeto))
	    return true;
	else
	    return false;
    }

    altaPedido(oPedido){
	let parametros={
	    object: "Pedido",
	    operation: "insertone"
	};
	let objeto={};
	Object.assign(objeto,oPedido);
	objeto.dniCliente=oPedido.cliente.dni;
	objeto.fechaInicio=ISODateString_noTime(oPedido.fechaInicio);
	if(objeto.fechaFin)
	    objeto.fechaFin=ISODateString_noTime(oPedido.fechaFin);
	delete objeto.cliente;
	delete objeto.tLineasPedido;
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto);
	if(JSONRecibido.rowsaffected==1){
	    oPedido.idPedido=JSONRecibido.insertid;

	    oPedido.tLineasPedido.forEach(function(oLineaPedido_iterar){
		let parametros={
		    object: "LineaPedido",
		    operation: "insertone"
		};
		let objeto={
		    idPedido : oPedido.idPedido,
		    idCerveza : oLineaPedido_iterar.producto.idCerveza,
		    cantidad : oLineaPedido_iterar.cantidad,
		};
		let JSONRecibido=this.jQAjaxPost(parametros,objeto);
		if(!JSONRecibido)
		    return false;
	    });
	    
	    return oPedido;
	}
	else
	    return false;
    }
    insertarLineaPedido(idPedido,oLineaPedido){
	let parametros={
	    object: "LineaPedido",
	    operation: "insertone"
	};
	let objeto={
	    idPedido : idPedido,
	    idProducto : oLineaPedido.producto.idCerveza,
	    cantidad : oLineaPedido.cantidad,
	};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto);
	if(JSONRecibido.rowsAffected==1){
	    return oLineaPedido;
	}
	else{
	    return false;
	}
    }
    bajaPedido(idPedido){
	let parametros={
	    object: "Pedido",
	    operation: "deleteonepk"
	};
	let objeto={idPedido:idPedido};
	if(this.jQAjaxPost(parametros,objeto))
	    return true;
	else
	    return false;
    }
    altaCerveza(oCerveza){
	let parametros={
	    object: "Cerveza",
	    operation: "insertone"
	};
	let JSONRecibido=this.jQAjaxPost(parametros,oCerveza);
	if(JSONRecibido.rowsaffected==1){
	    oCerveza.idCerveza=JSONRecibido.insertid;
	    return oCerveza;
	}
	else
	    return false;
    }
    bajaCerveza(idCerveza){
	let parametros={
	    object: "Cerveza",
	    operation: "deleteonepk"
	};
	let objeto={idCerveza:idCerveza};
	if(this.jQAjaxPost(parametros,objeto))
	    return true;
	else
	    return false;
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
	let parametros={
	    object: "Cerveza",
	    operation: "selectonepk"
	};
	let objeto={idCerveza:idCerveza};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	if(JSONRecibido){
	    let JSONCerveza=JSONRecibido.resultdata[0];
	    let oCerveza=new Cerveza();
	    Object.assign(oCerveza,JSONCerveza);
	    return oCerveza;
	} else {
	    return false;
	}
    }
    buscarCliente(dni){
	let parametros={
	    object: "Cliente",
	    operation: "selectonepk"
	};
	let objeto={dni:dni};
	
	let JSONRecibido=this.jQAjaxGet(parametros,objeto,false);
	if(JSONRecibido){
	    let JSONCliente=JSONRecibido.resultdata[0];
	    let oCliente=new Cliente();
	    Object.assign(oCliente,JSONCliente);
	    return oCliente;
	} else {
	    return false;
	}
    }
    buscarOperario(dni){
	let parametros={
	    object: "Operario",
	    operation: "selectonepk"
	};
	let objeto={dni:dni};
	
	let JSONRecibido=this.jQAjaxGet(parametros,objeto,false);
	if(JSONRecibido){
	    let JSONOperario=JSONRecibido.resultdata[0];
	    let oOperario=new Operario();
	    Object.assign(oOperario,JSONOperario);
	    return oOperario;
	} else {
	    return false;
	}
    }
    buscarSupervisor(dni){
	let parametros={
	    object: "Operario",
	    operation: "selectonepk"
	};
	let objeto={dni:dni};
	
	let JSONRecibido=this.jQAjaxGet(parametros,objeto);
	if(JSONRecibido){
	    let JSONOperario=JSONRecibido.resultdata[0];
	    let oOperario=new Operario();
	    Object.assign(oOperario,JSONOperario);
	    if(oOperario.supervisor)
		return oOperario;
	    else
		return false;
	} else {
	    return false;
	}
    }
    buscarPedido(multiParam){
	if(multiParam.constructor.name=="Cliente"){
	    let oCliente=multiParam;
	    let parametros={
		object: "Pedido",
		operation: "selectall"
	    };
	    let objeto={};
	    
	    let JSONRecibido=this.jQAjaxGet(parametros,objeto,false);
	    if(JSONRecibido){  
		let arrayOPedidos=[];
		let _this=this;
		JSONRecibido.resultdata.forEach(function(JSONPedido){
		    let oPedido=new Pedido();
		    Object.assign(oPedido,JSONPedido);
		    oPedido.cliente=_this.buscarCliente(oPedido.dniCliente);
		    delete oPedido.dniCliente;
		    oPedido.fechaInicio=new Date(oPedido.fechaInicio);
		    oPedido.fechaFin=new Date(oPedido.fechaFin);
		    arrayOPedidos.push(oPedido);
		});
		return arrayOPedidos.filter(function(oPedido_iterado){
		    return (oPedido_iterado.cliente.dni == oCliente.dni);
		});
	    } else {
		return false;
	    } 
	} else {
	    let idPedido=multiParam;
	    let parametros={
		object: "Pedido",
		operation: "selectonepk"
	    };
	    let objeto={idPedido:idPedido};
	    
	    let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	    if(JSONRecibido){  
		let JSONPedido=JSONRecibido.resultdata[0];
		let oPedido=new Pedido();
		Object.assign(oPedido,JSONPedido);
		return oPedido;
	    }else{
		return false;
	    }
	}
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
    	if(this.buscarCliente(clave) != false)
    	{
    	    if(this.buscarCliente(clave).usuario == usuario)
	        tipo = "cliente";
    	}
        else if(this.buscarSupervisor(clave) != false)
        {
    	    if(this.buscarSupervisor(clave).usuario == usuario)
	        tipo = "supervisor";
	}
        else if(this.buscarOperario(clave) != false)
        {
    	    if(this.buscarOperario(clave).usuario == usuario)
	        tipo = "operario";
	}

	setCookie(clave,tipo,365);

        return tipo;
    }
    
    comprobarRegistro(usuario,dni,nombre,apellidos,fecha,direccion,telefono)
    {
    	if(this.buscarCliente(dni) != false)
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
	oTabla.className="table table-stripped";
	let oTHead=oTabla.createTHead();	
	let oFila=document.createElement("TR");
	oFila.id = "th";
	oFila.insertCell(-1).textContent = "Nombre";
	oFila.insertCell(-1).textContent = "Apellidos";
	oFila.insertCell(-1).textContent = "Nº Lineas";
	oFila.insertCell(-1).textContent = "Tipos";
	oFila.insertCell(-1).textContent = "Estado";
	oFila.insertCell(-1).textContent = "Fecha";
	oFila.insertCell(-1).textContent = "";
	oTHead.appendChild(oFila);
	let oTBody=oTabla.createTBody();

	if(oCliente){
	    console.log(oCliente);
	    let pedido=this.buscarPedido(oCliente);
	    
	    if(pedido.length!=0)
		oTBody.appendChild(pedido.toHTMLTableRow());
	} else {
	    let oCliente=multiParam;
	    let parametros={
		object: "Pedido",
		operation: "selectall"
	    };
	    let objeto={};
	    
	    let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	    if(JSONRecibido){  
		let arrayOPedidos=[];
		JSONRecibido.resultdata.forEach(function(JSONPedido){
		    let oPedido=new Pedido();
		    Object.assign(oPedido,JSONPedido);
		    oTBody.appendChild(oPedido.toHTMLTableRow());
		});
	    } 
	}
	return oTabla;
    }
    comboPedidos(oCliente){
	let select=document.createElement("SELECT");
	select.name="comboPedidos";
	select.className="form-control";
	let pedidosCliente = this.buscarPedido(oCliente);
	if(pedidosCliente.length != 0){
	    pedidosCliente.forEach(function(pedido){
		if(pedido.estado == "espera"){
		    let option = document.createElement("OPTION");
		    option.value = pedido.idPedido;
		    option.textContent = pedido.fechaInicio;
		    select.appendChild(option);
		}
	    });
	} else {
		let option = document.createElement("OPTION");
		option.value = -1;
		option.textContent = "No tiene pedidos pendientes";
		select.appendChild(option);
	}
	return select;
    }
    
    listadoCervezas(){
	let oTabla=document.createElement("TABLE");
	oTabla.className="table table-stripped tablaCatalogo";
	let oTHead=oTabla.createTHead();
	let oFila=document.createElement("TR");
	oFila.id = "th";
	oFila.insertCell(-1).textContent = "Nombre";
	oFila.insertCell(-1).textContent = "Porcentaje";
	oFila.insertCell(-1).textContent = "Precio";
	oFila.insertCell(-1).textContent = "Stock";
	oFila.insertCell(-1).textContent = "";
	oTHead.appendChild(oFila);
	let oTBody=oTabla.createTBody();

	//
	let parametros={
	    object: "Cerveza",
	    operation: "selectall"
	};
	let objeto={};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	//
	if(JSONRecibido){  
	    let arrayOCervezas=[];
	    JSONRecibido.resultdata.forEach(function(JSONCerveza){
		let oCerveza=new Cerveza();
		Object.assign(oCerveza,JSONCerveza);
		oTBody.appendChild(oCerveza.toHTMLTableRow());
	    });
	}
	return oTabla;
    }
    comboCatalogo(){
	let select = document.createElement("SELECT");
	select.name="comboCatalogo";
	select.className="form-control";
	//
	let parametros={
	    object: "Cerveza",
	    operation: "selectall"
	};
	let objeto={};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	//
	if(JSONRecibido){
	    JSONRecibido.resultdata.forEach(function(JSONCerveza){
		let oCerveza=new Cerveza();
		Object.assign(oCerveza,JSONCerveza);
		console.log(oCerveza);
		let option = document.createElement("OPTION");
		option.value = oCerveza.idCerveza;
		option.dataset.porcentaje=oCerveza.porcentaje;
		option.dataset.precio=oCerveza.precio;
		option.textContent = oCerveza.nombre+" - "+oCerveza.porcentaje+"% alcohol";
		select.appendChild(option);
	    });
	}
	return select;
    }

    listadoClientes(){
	let oTabla=document.createElement("TABLE");
	oTabla.className="table table-stripped";
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	//
	let parametros={
	    object: "Cliente",
	    operation: "selectall"
	};
	let objeto={};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	if(JSONRecibido){
	    JSONRecibido.resultdata.forEach(function(JSONCliente){
		let oCliente=new Cliente();
		Object.assign(oCliente,JSONCliente);
		oTBody.appendChild(oCliente.toHTMLTableRow());
	    });
	}
	return oTabla;
    }

    listadoOperarios(){
	let oTabla=document.createElement("TABLE");
	oTabla.className="table table-stripped";
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	//
	let parametros={
	    object: "Operario",
	    operation: "selectall"
	};
	let objeto={};
	
	let JSONRecibido=this.jQAjaxPost(parametros,objeto,false);
	if(JSONRecibido){  
	    JSONRecibido.resultdata.forEach(function(JSONOperario){
		let oOperario=new Operario();
		Object.assign(oOperario,JSONOperario);
		oTBody.appendChild(oOperario.toHTMLTableRow());
	    });
	}

	return oTabla;
    }
}
