
//Petición síncrona para cargar el XML
function loadXMLDoc(filename) {
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", filename, false);
    
    xhttp.send();

    return xhttp.responseXML;
}


function cargarDatosUpoBeerXML(){
    let oXML = loadXMLDoc("/UpoBeer.xml");
    //sacar clientes
    let nodeListCervezas=oXML.querySelectorAll("cerveza");
    let nodeArrayCervezas=Array.prototype.slice.call(nodeListCervezas);

    nodeArrayCervezas.forEach(function(nodeCerveza){
	console.log(nodeCerveza);
	let nombre=nodeCerveza.getAttribute("nombre");
	let porcentaje=nodeCerveza.getAttribute("porcentaje");
	let precio=nodeCerveza.getAttribute("precio");
	let stock=nodeCerveza.getAttribute("stock");
	let foto=nodeCerveza.getAttribute("foto");
	modelo.altaCerveza(new Cerveza(nombre,porcentaje,precio,stock));
    });
    
    let nodeListClientes=oXML.querySelectorAll("cliente");
    let nodeArrayClientes=Array.prototype.slice.call(nodeListClientes);
    nodeArrayClientes.forEach(function(nodeCliente){
	let usuario=nodeCliente.getAttribute("usuario");
	let dni=nodeCliente.getAttribute("dni");
	let nombre=nodeCliente.getAttribute("nombre");
	let apellidos=nodeCliente.getAttribute("apellidos");
	let fechaNacimiento=nodeCliente.getAttribute("fechaNacimiento");
	let direccion=nodeCliente.getAttribute("direccion");
	let telefono=nodeCliente.getAttribute("telefono");
	modelo.altaCliente(new Cliente(usuario,dni,nombre,apellidos,fechaNacimiento,direccion,telefono));
    });

    let nodeListOperarios=oXML.querySelectorAll("operario");
    let nodeArrayOperarios=Array.prototype.slice.call(nodeListOperarios);
    nodeArrayOperarios.forEach(function(nodeOperario){
	let usuario=nodeOperario.getAttribute("usuario");
	let supervisor=nodeOperario.getAttribute("supervisor");
	let dni=nodeOperario.getAttribute("dni");
	let nombre=nodeOperario.getAttribute("nombre");
	let apellidos=nodeOperario.getAttribute("apellidos");
	let fechaNacimiento=nodeOperario.getAttribute("fechaNacimiento");
	let direccion=nodeOperario.getAttribute("direccion");
	let telefono=nodeOperario.getAttribute("telefono");
	modelo.altaOperario(new Operario(usuario,dni,nombre,apellidos,fechaNacimiento,direccion,telefono,supervisor));
    });
}

function exportarDatosUpoBeerXML(){
    let oXML=document.createElement("upobeer");
    let cervezas=document.createElement("cervezas");
    oXML.appendChild(cervezas);
    modelo.tCervezas.forEach(function(oCerveza){
	let cerveza=document.createElement("cerveza");
	cervezas.appendChild(cerveza);
	for (let prop in oCerveza) {
            if (!oCerveza.hasOwnProperty(prop))
		continue;
	    else
		cerveza.setAttribute(prop,oCerveza[prop]);
	}
    });
    
    let clientes=document.createElement("clientes");
    oXML.appendChild(clientes);
    let cliente=document.createElement("cliente");
    modelo.tClientes.forEach(function(oCliente){
	let cliente=document.createElement("cliente");
	clientes.appendChild(cliente);
	for (let prop in oCliente) {
	    if (!oCliente.hasOwnProperty(prop))
		continue;
	    else
		cliente.setAttribute(prop,oCliente[prop]);
	}
    });
    
    let operarios=document.createElement("operarios");
    let operario=document.createElement("operario");
    oXML.appendChild(operarios);
    modelo.tOperarios.forEach(function(oOperario){
	let operario=document.createElement("operario");
	operarios.appendChild(operario);
	for (let prop in oOperario) {
	    if (!oOperario.hasOwnProperty(prop))
		continue;
	    else
		operario.setAttribute(prop,oOperario[prop]);
	}
    });
    return oXML;
}
