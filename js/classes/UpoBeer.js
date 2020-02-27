async function jQAjaxPost(parametros){
    let url="/php/ajax.php";

    let datosRecibidos=await $.post(url, parametros);

    return datosRecibidos;
}

async function jQAjaxGet(parametros){
    let url="/php/ajax.php";

    let datosRecibidos=await $.get(url, parametros);
    
    return datosRecibidos;
}

function jsAjaxGetSync(parametros){
    let oAjax = new XMLHttpRequest();
    //Se le envía directamente el cliente o lo que sea, como un objeto, no como parámetros
    let oURLSearchParams=new URLSearchParams(parametros);
    oURLSearchParams.forEach(function(value,key){
	if(value=="true")
	    oURLSearchParams.set(key,1);
	else if (value=="false")
	    oURLSearchParams.set(key,0);
    });
    
    oAjax.open("GET", "/php/ajax.php?"+oURLSearchParams.toString(),false);
    //Asociar manejador de evento de la respuesta, comentado por si acaso
    //oAjax.addEventListener("readystatechange", function(){},false);
    oAjax.send();
    return JSON.parse(oAjax.responseText);
}
function jsAjaxPostSync(parametros){
    let oAjax = new XMLHttpRequest();
    //Se le envía directamente el cliente o lo que sea, como un objeto, no como parámetros
    let oURLSearchParams=new URLSearchParams(parametros);
    oURLSearchParams.forEach(function(value,key){
	if(value=="true")
	    oURLSearchParams.set(key,1);
	else if (value=="false")
	    oURLSearchParams.set(key,0);
    });
    
    oAjax.open("POST", "/php/ajax.php",false);
    oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //Asociar manejador de evento de la respuesta, comentado por si acaso
    //oAjax.addEventListener("readystatechange", function(){},false);
    
    oAjax.send(oURLSearchParams.toString());
    return JSON.parse(oAjax.responseText);
}

// [x]
class UpoBeer {   
    /* CONSTRUCTOR */
    constructor(){
	this.tCervezas=[];
	this.tPedidos=[];
	this.tClientes=[];
	this.tOperarios=[];

	this.cargarClientes();
	this.cargarOperarios();
	this.cargarCervezas();
	this.cargarPedidos();
	
	//Cosas necesarias para envío
	this.tConductores=[];
	this.tVehiculos=[];
	this.contadorVehiculos=0;
    }
    
    /* MÉTODOS */
    cargarClientes(){
	this.tClientes=[];
	let parametros={
	    object: "Cliente",
	    operation: "selectall"
	};
	let _this=this; //copia de this para las funciones implícitas. Si no no rula
	jQAjaxGet(parametros).then(function(datosRecibidos){
	    datosRecibidos.resultdata.forEach(function(datosCliente){
		let oCliente= new Cliente(datosCliente.usuario,
					  datosCliente.dni,
					  datosCliente.nombre,
					  datosCliente.apellidos,
					  datosCliente.fechaNacimiento,
					  datosCliente.direccion,
					  datosCliente.telefono);
		_this.tClientes.push(oCliente);
	    });
	});
    }
    cargarOperarios(){
	this.tOperarios=[];
	let parametros={
	    object: "Operario",
	    operation: "selectall"
	};
	let _this=this; //copia de this para las funciones implícitas. Si no no rula
	jQAjaxGet(parametros).then(function(datosRecibidos){
	    datosRecibidos.resultdata.forEach(function(datosOperario){
		let oOperario= new Operario(datosOperario.usuario,
					    datosOperario.dni,
					    datosOperario.nombre,
					    datosOperario.apellidos,
					    datosOperario.fechaNacimiento,
					    datosOperario.direccion,
					    datosOperario.telefono,
					    datosOperario.supervisor);
		_this.tOperarios.push(oOperario);
	    });
	});
    }
    cargarCervezas(){
	this.tCervezas=[];
	let parametros={
	    object: "Cerveza",
	    operation: "selectall"
	};
	let _this=this; //copia de this para las funciones implícitas. Si no no rula
	jQAjaxGet(parametros).then(function(datosRecibidos){
	    datosRecibidos.resultdata.forEach(function(datosCerveza){
		let oCerveza= new Cerveza(datosCerveza.nombre,
					  datosCerveza.porcentaje,
					  datosCerveza.precio,
					  datosCerveza.stock,
					  datosCerveza.idCerveza);
		_this.tCervezas.push(oCerveza);
	    });
	});
    }
    async cargarPedidos(){
	this.tPedidos=[];
	let parametrosPedidos={
	    object: "Pedido",
	    operation: "selectall"
	};

	//declarar un objeto para ir almacenando los pedidos, para después
	//acoplarles las líneas de pedidos. Es temporal.
	//Las claves serán idPedidos
	let coleccionPedidos={};
	let _this=this; //copia de this para las funciones implícitas. Si no no rula

	let promesa = new Promise(function(){
	    jQAjaxGet(parametrosPedidos).then(function(datosRecibidosPedidos){
		datosRecibidosPedidos.resultdata.forEach(function(datosPedido){
		    let oPedido= new Pedido(_this.buscarCliente(datosPedido.dniCliente),
					    undefined,
					    datosPedido.idPedido);
		    //Meter el pedido a medio construir en la colección de pedidos (...)
		    coleccionPedidos[oPedido.idPedido]=oPedido;
		    //(...) y también en el array tPedidos. Como JS es por referencia no tiene que
		    //haber más problema. Lo del objeto colección era para poder tener una especie
		    //de array asociativo.
		    _this.tPedidos.push(coleccionPedidos[oPedido.idPedido]);
		});
		
		// Ahora sacar todas las líneas de pedido en bloque e ir asignándoselas a cada
		// pedido ya guardado
		let parametrosLineasPedidos={
		    object: "LineaPedido",
		    operation: "selectall"
		};
		jQAjaxGet(parametrosLineasPedidos).then(function(datosRecibidosLineasPedidos){
		    datosRecibidosLineasPedidos.resultdata.forEach(function(datosLineaPedido){
			//generar la línea de pedido
			let oLineaPedido= new LineaPedido(_this.buscarCerveza(datosLineaPedido.idCerveza),
							  datosLineaPedido.cantidad);
			//asignar en la colección de pedidos ducha línea al pedido correspondiente
			coleccionPedidos[datosLineaPedido.idPedido].tLineasPedido.push(oLineaPedido);
		    });
		});
	    });
	});
	await promesa;
    }
    
    /***ALTAS***/
    altaCliente(oCliente){
	//primero comprobar si ya existe
    	if(!this.buscarCliente(oCliente.dni)){
	    //Meter en la BBDD
	    let parametros={
		object: "Cliente",
		operation: "insertone"
	    };
	    //A los parámetros se le meten todos los atributos de Cliente
	    Object.assign(parametros,oCliente);
	    console.log("aaaaa");
	    //Se ve si la petición ha insertado filas
	    if(jsAjaxPostSync(parametros).rowsaffected==1){
		//y devolver
		return oCliente;
	    }
	    else
		return false;
	}
    }
    modificarPersona(oPersona){
	console.log(oPersona);
	let oPersona_guardada;
	switch(oPersona.constructor.name){
	case "Cliente":
	    oPersona_guardada=this.buscarCliente(oPersona);
	    break;
	case "Operario":
	    oPersona_guardada==this.buscarOperario(oPersona);
	    break;
	default:
	    oPersona_guardada==this.buscarSupervisor(oPersona);
	    return false;
	}
	if(oPersona_guardada){
	    let parametros={
		object: (oPersona.constructor.name),
		operation: "updateonepk"
	    };
	    Object.assign(parametros,oPersona);
	    if(jsAjaxPostSync(parametros).rowsaffected==1){
		oPersona_guardada=oPersona;
		return true;
	    }
	    else
		return false;
	} else
	    return false;
    }
    altaOperario(oOperario){
	//primero comprobar si ya existe
    	if(!this.buscarOperario(oOperario.dni)){
	    //Meter en la BBDD
	    let parametros={
		object: "Operario",
		operation: "insertone"
	    };
	    //A los parámetros se le meten todos los atributos de Operario
	    Object.assign(parametros,oOperario);

	    //Se ve si la petición ha insertado filas
	    if(jsAjaxPostSync(parametros).rowsaffected==1){
		//meter en el array interno
		this.tOperarios.push(oOperario);
		//y devolver
		return oOperario;
	    }
	    else
		return false;
	}
    }
    altaPedido(oPedido){
	console.log(oPedido);
	if(oPedido.idPedido==undefined
	   || this.buscarPedido(oPedido.idPedido)==undefined
	   && this.buscarCliente(oPedido.cliente.dni) != undefined){
	    let parametros={
		object: "Pedido",
		operation: "insertone"
	    };

	    //Ajustar el objeto a la estructura de la base de datos
	    let objeto={};
	    Object.assign(objeto,oPedido);
	    objeto.dniCliente=oPedido.cliente.dni;
	    objeto.fechaInicio=ISODateString_noTime(oPedido.fechaInicio);
	    if(objeto.fechaFin)
		objeto.fechaFin=ISODateString_noTime(oPedido.fechaFin);
	    delete objeto.cliente;
	    delete objeto.tLineasPedido;
	    Object.assign(parametros,objeto);
	    
	    let datosRecibidos=jsAjaxPostSync(parametros);
	    console.log(datosRecibidos);
	    if(datosRecibidos.rowsaffected==1){
		oPedido.idPedido=datosRecibidos.insertid;

		oPedido.tLineasPedido.forEach(function(oLineaPedido_iterar){
		    let parametros={
			object: "LineaPedido",
			operation: "insertone",
			idPedido : oPedido.idPedido,
			idCerveza : oLineaPedido_iterar.producto.idCerveza,
			cantidad : oLineaPedido_iterar.cantidad,
		    };
		    let datosRecibidos=jsAjaxPostSync(parametros);
		    if(datosRecibidos.rowsaffected==1){
			
		    } else
			return false;
		    oPedido.idPedido=datosRecibidos.insertid;
		});

		//por fin, meter pedido en el array interno
		console.log(oPedido);
		this.tPedidos.push(oPedido);
		return oPedido;
		
	    } else
		return false;
	} else
	    return false;
    }
    insertarLineaPedido(idPedido,oLineaPedido){
	console.log(idPedido);
	let oPedido=this.buscarPedido(idPedido);
	if(oPedido){
	    let parametros={
		object: "LineaPedido",
		operation: "insertone",
		idPedido : idPedido,
		idProducto : oLineaPedido.producto.idCerveza,
		cantidad : oLineaPedido.cantidad,
	    };
	    
	    let datosRecibidos=jsAjaxPostSync(parametros);
	    console.log(datosRecibidos);
	    
	    if(datosRecibidos.rowsaffected==1){
		//meter por fin en el pedido correspondiente
		oPedido.tLineasPedido.push(oLineaPedido);
		return oLineaPedido;
	    }
	    else
		return false;
	}
    }
    altaCerveza(oCerveza){
	let parametros={
	    object: "Cerveza",
	    operation: "insertone"
	};
	Object.assign(parametros,oCerveza);
	let datosRecibidos=jsAjaxPostSync(parametros);
	if(datosRecibidos.rowsaffected==1){
	    oCerveza.idCerveza=datosRecibidos.insertid;
	    //meter en el array interno de cervezas
	    this.tCervezas.push(oCerveza);
	    //y devolver
	    return oCerveza;
	}
	else
	    return false;
    }

    /***BAJAS***/
    bajaCliente(dni){
	let parametros={
	    object: "Cliente",
	    operation: "deleteonepk",
	    dni:dni
	};
	if(jQAjaxPost(parametros).rowsaffected==1){
	    this.tClientes=this.tClientes.filter(function(cliente){
		cliente.dni!=dni;
	    });
	    return true;
	}
	else
	    return false;
    }
    bajaOperario(dni){
	let parametros={
	    object: "Operario",
	    operation: "deleteonepk",
	    dni:dni
	};
	if(jQAjaxPost(parametros)){
	    this.tOperarios=this.tOperarios.filter(function(operario){
		operario.dni!=dni;
	    });
	    return true;
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
	if(jsAjaxPostSync(parametros,objeto))
	    return true;
	else
	    return false;
    } 
    bajaPedido(idPedido){
	let parametros={
	    object: "Pedido",
	    operation: "deleteonepk",
	    idPedido:idPedido
	};
	if(jQAjaxPost(parametros)){
	    this.tPedidos=this.tPedidos.filter(function(pedido){
		return pedido.idPedido!=idPedido;
	    });
	    return true;
	} else
	    return false;
    }
   

    /** Buscar cosas */
    buscarCliente(dni){
	/*Primero ver si la cliente está en el array de clientes interno*/
	let oCliente=this.tClientes.find(function(oCliente_iterado){
    	    return oCliente_iterado.dni == dni;
    	});

	/*Después, si no se ha encontrado la cliente,refrescar la BBDD y volver a pedirla*/
	if(oCliente==undefined){
	    //cargar las clientes para que no falten más
	    this.cargarClientes();
	    //pero esta vez sacar una de escanqui de la base de datos
	    let parametros={
		object: "Cliente",
		operation: "selectonepk",
		dni:dni
	    };
	    let datosCliente=jsAjaxGetSync(parametros).resultdata[0];
	    if(datosCliente){
		oCliente=new Cliente(datosCliente.usuario,
				     datosCliente.dni,
				     datosCliente.nombre,
				     datosCliente.apellidos,
				     datosCliente.fechaNacimiento,
				     datosCliente.direccion,
				     datosCliente.telefono);
	    } else
		return false;
	}
	
	return oCliente;
    }
    buscarOperario(dni){
	/*Primero ver si la operario está en el array de operarios interno*/
	let oOperario=this.tOperarios.find(function(oOperario_iterado){
    	    return oOperario_iterado.dni == dni;
    	});

	/*Después, si no se ha encontrado la operario,refrescar la BBDD y volver a pedirla*/
	if(oOperario==undefined){
	    //cargar las operarios para que no falten más
	    this.cargarOperarios();
	    //pero esta vez sacar una de escanqui de la base de datos
	    let parametros={
		object: "Operario",
		operation: "selectonepk",
		dni:dni
	    };
	    let datosOperario=jsAjaxGetSync(parametros)
		.resultdata
		.find(function(datosOperario){return datosOperario.supervisor==false});
	    console.log(datosOperario);
	    if(datosOperario){
		oOperario=new Operario(datosOperario.usuario,
				       datosOperario.dni,
				       datosOperario.nombre,
				       datosOperario.apellidos,
				       datosOperario.fechaNacimiento,
				       datosOperario.direccion,
				       datosOperario.telefono,
				       datosOperario.supervisor);
	    } else
		return false;
	}
	return oOperario;
    }
    
    buscarSupervisor(dni){
	/*Primero ver si la operario está en el array de operarios interno*/
	let oOperario=this.tOperarios.find(function(oOperario_iterado){
    	    return oOperario_iterado.dni == dni;
    	});
	/*Después, si no se ha encontrado la operario,refrescar la BBDD y volver a pedirla*/
	if(oOperario==undefined){
	    //cargar las operarios para que no falten más
	    this.cargarOperarios();
	    //pero esta vez sacar una de escanqui de la base de datos
	    let parametros={
		object: "Operario",
		operation: "selectonepk",
		dni:dni
	    };
	    let datosOperario=jsAjaxGetSync(parametros)
		.resultdata
		.find(function(datosOperario){return datosOperario.supervisor==true});
	    if(datosOperario){
		oOperario=new Operario(datosOperario.usuario,
				       datosOperario.dni,
				       datosOperario.nombre,
				       datosOperario.apellidos,
				       datosOperario.fechaNacimiento,
				       datosOperario.direccion,
				       datosOperario.telefono,
				       datosOperario.supervisor);
	    } else
		return false;
	}
	return oOperario;
    }
    buscarCerveza(idCerveza){
	/*Primero ver si la cerveza está en el array de cervezas interno*/
	let oCerveza=this.tCervezas.find(function(oCerveza_iterada){
    	    return oCerveza_iterada.idCerveza == idCerveza;
    	});

	/*Después, si no se ha encontrado la cerveza,refrescar la BBDD y volver a pedirla*/
	if(oCerveza==undefined){
	    //cargar las cervezas para que no falten más
	    this.cargarCervezas();
	    //pero esta vez sacar una de escanqui de la base de datos
	    let parametros={
		object: "Cerveza",
		operation: "selectonepk",
		idCerveza:idCerveza
	    };
	    let datosCerveza=jsAjaxGetSync(parametros).resultdata[0];
	    if(datosCerveza!=undefined){
		oCerveza=new Cerveza(datosCerveza.nombre,
				     datosCerveza.porcentaje,
				     datosCerveza.precio,
				     datosCerveza.stock,
				     datosCerveza.idCerveza);
	    } else
		return false;
	}
	
	return oCerveza;
    }
    buscarPedido(multiParam){
	if(multiParam.constructor.name=="Cliente"){
	    let oCliente=multiParam;
	    let arrayoPedidos=this.tPedidos.filter(function(oPedido_iterado){
		return (oPedido_iterado.cliente.dni == oCliente.dni);
	    });
	    if(oPedido.length==0){
		this.cargarPedidos();
		arrayoPedidos=this.tPedidos.filter(function(oPedido_iterado){
		    return (oPedido_iterado.cliente.dni == oCliente.dni);
		});	
	    }
	    return arrayoPedidos;
	    
	} else {
	    let idPedido=multiParam;
	    let oPedido=this.tPedidos.find(function(oPedido_iterado){
		return (oPedido_iterado.idPedido == idPedido);
	    });
	    console.log(idPedido);
	    if(oPedido==undefined){
		this.cargarPedidos();
		oPedido=this.tPedidos.find(function(oPedido_iterado){
		    return (oPedido_iterado.idPedido == idPedido);
		});
		if(oPedido)
		    console.log(oPedido);
	    }
	    return oPedido;
	}
    }
    
    /** Comprobar usuarios*/
    comprobarUsuario(usuario,clave){
	let tipo=""
    	//La clave es el dni, el usuario es unico
    	if(this.buscarCliente(clave) != false)
    	    if(this.buscarCliente(clave).usuario == usuario)
	        tipo = "cliente";
        else if(this.buscarSupervisor(clave) != false)
    	    if(this.buscarSupervisor(clave).usuario == usuario)
	        tipo = "supervisor";
        else if(this.buscarOperario(clave) != false)
    	    if(this.buscarOperario(clave).usuario == usuario)
	        tipo = "operario";
	setCookie(clave,tipo,365);
	console.log(tipo);
        return tipo;
    }
    comprobarRegistro(usuario,dni,nombre,apellidos,fecha,direccion,telefono){
    	if(this.buscarCliente(dni) != false) {
	    console.log("No se puede crear el cliente. Ya existía un cliente con el mismo DNI.");
	    return false;
    	} else {
    	    console.log("Nuevo usuario: " + usuario + ", " + dni);
	    this.altaCliente(new Cliente(usuario,dni,nombre,apellidos,fecha,direccion,telefono));
    	    return true;
    	}
    }

    /*** Listados y cosas ****/
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
	    this.tPedidos.forEach(function(pedido){
		if(pedido.cliente.dni==oCliente.dni){
		    oTBody.appendChild(pedido.toHTMLTableRow());
		}
	    })
	} else {
	    this.tPedidos.forEach(function(pedido){
		oTBody.appendChild(pedido.toHTMLTableRow());
	    })  
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

	this.tCervezas.forEach(function(cerveza){
	    oTBody.appendChild(cerveza.toHTMLTableRow());
	});

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
	oTabla.className="table table-stripped";
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tClientes.forEach(function(cliente){
	    oTBody.appendChild(cliente.toHTMLTableRow());
	})

	return oTabla;
    }

    listadoOperarios(){
	let oTabla=document.createElement("TABLE");
	oTabla.className="table table-stripped";
	let oTHead=oTabla.createTHead();
	let oTBody=oTabla.createTBody();

	this.tOperarios.forEach(function(operario){
	    oTBody.appendChild(operario.toHTMLTableRow());
	})

	return oTabla;
    }
/*
    
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
	    
	    let datosRecibidos=jQAjaxPost(parametros);
	    if(datosRecibidos){  
		let arrayOPedidos=[];
		datosRecibidos.resultdata.forEach(function(JSONPedido){
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
	
	let datosRecibidos=jQAjaxPost(parametros,objeto,false);
	//
	if(datosRecibidos){  
	    let arrayOCervezas=[];
	    datosRecibidos.resultdata.forEach(function(JSONCerveza){
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
	
	let datosRecibidos=jQAjaxPost(parametros,objeto,false);
	//
	if(datosRecibidos){
	    datosRecibidos.resultdata.forEach(function(JSONCerveza){
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
	
	let datosRecibidos=jQAjaxPost(parametros,objeto,false);
	if(datosRecibidos){
	    datosRecibidos.resultdata.forEach(function(JSONCliente){
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
	
	let datosRecibidos=jQAjaxPost(parametros,objeto,false);
	if(datosRecibidos){  
	    datosRecibidos.resultdata.forEach(function(JSONOperario){
		let oOperario=new Operario();
		Object.assign(oOperario,JSONOperario);
		oTBody.appendChild(oOperario.toHTMLTableRow());
	    });
	}

	return oTabla;
    }
*/
}
