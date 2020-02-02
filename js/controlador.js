//INICIALIZAR MODELO
var modelo = new UpoBeer();
var tipo = "ninguno";
var usuario = "";
var clave = "";
document.getElementById("enlaceRegistro").addEventListener("click", showRegistro);
document.getElementById("logoInicio").addEventListener("click", revisarSwitch);
document.getElementById("selPedido").addEventListener("change", cambioComboEstados);
revisarSwitch();

function revisarSwitch() {
	switch (tipo) {
		case 'ninguno':
			ocultarTodo();
			document.querySelector("#cabeceraInicio").style.display = "inline";
			document.querySelector("#inicio").style.display = "inline";
			document.getElementById("registro").style.display = "none";
			console.log("se muestra ninguno");
			break;
		case 'cliente':
			ocultarTodo();
			let datos = document.createElement("text");
			datos.textContent = usuario + ", " + clave;
			document.querySelector("#datosSesion").appendChild(datos);
			document.getElementById("cliente").style.display = "inline";
			console.log("se muestra cliente");
			break;
		case 'operario':
			ocultarTodo();
			let datosOperario = document.createElement("text");
			datosOperario.textContent = usuario + ", " + clave;
			document.querySelector("#datosSesionOperario").appendChild(datosOperario);
			document.getElementById("operario").style.display = "inline";
			console.log("se muestra operario");
			break;
		case 'supervisor':
			ocultarTodo();
			let datosSupervisor = document.createElement("text");
			datosSupervisor.textContent = usuario + ", " + clave;
			document.querySelector("#datosSesionSupervisor").appendChild(datosSupervisor);
			document.getElementById("supervisor").style.display = "inline";
			console.log("se muestra supervisor");
			break;
	}
}

function ocultarTodo() {
	ocultarForms();
	document.querySelectorAll(".elemento").forEach(function (element) { element.style.display = "none" });
}

function ocultarForms() {
	document.querySelectorAll(".conditional").forEach(function (element) { element.style.display = "none" });
	document.querySelectorAll(".table").forEach(function (element) { element.style.display = "none" });
}


function showRegistro() {
	document.querySelector("#inicio").style.display = "none";
	document.querySelector("#registro").style.display = "inline";
}


//Datos de ejemplo
modelo.altaCliente(new Cliente("user1", "11111111A", "Cliente1", "Ap", "1997-08-12", "C/Mesina", "111111111"));
modelo.altaCliente(new Cliente("user2", "11111111B", "Cliente2", "Ap", "1993-04-16", "C/Mesina", "111111111"));
modelo.altaCliente(new Cliente("user3", "11111111C", "Cliente2", "Ap", "1994-09-22", "C/Mesina", "111111111"));
modelo.altaOperario(new Operario("user4", "11111111D", "Operario1", "Ap", "1997-08-12", "C/Mesina", "111111111", true));
modelo.altaOperario(new Operario("user5", "11111111E", "Operario2", "Ap", "1997-08-12", "C/Mesina", "111111111", false));
modelo.altaCerveza(new Cerveza("Cruzcampo", 11, 3.50, 200));
modelo.altaCerveza(new Cerveza("Radler", 9, 4.50, 200));
modelo.altaCerveza(new Cerveza("Hamstel", 12, 3, 200));
modelo.altaCerveza(new Cerveza("Alhambra", 14, 4.20, 200));
modelo.altaPedido(new Pedido(new Cliente("user16", "11114111A", "Clientfde1", "A32p", "1991-08-12", "C/Mesdina", "111111111"), null));
modelo.altaPedido(new Pedido(new Cliente("user143", "11114131A", "Clientfdfsdfe1", "A323p", "1971-08-12", "C/Mefsdsdina", "111111111"), null));

function comprobarUsuario() {

	usuario = formularioInicio.usuario.value;
	clave = formularioInicio.clave.value;
	console.log(usuario + ", " + clave);
	tipo = this.modelo.comprobarUsuario(usuario, clave);
	if (tipo != "ninguno")
		revisarSwitch();
	else
		alert("Usuario incorrecto");
}

function comprobarRegistro() {

	var usuarioNuevo = formularioRegistro.usuario.value;
	var dni = formularioRegistro.dni.value;
	var nombre = formularioRegistro.nombre.value;
	var apellidos = formularioRegistro.apellidos.value;
	var fecha = formularioRegistro.fecha.value;
	var direccion = formularioRegistro.direccion.value;
	var telefono = formularioRegistro.telefono.value;
	if (usuarioNuevo == "" || dni == "" || nombre == "" || apellidos == "" || fecha == "" || direccion == "" || telefono == "")
		alert("Debe rellenar todos los campos");
	else if (this.modelo.comprobarRegistro(usuarioNuevo, dni, nombre, apellidos, fecha, direccion, telefono)) {
		alert("Registrado ok");
		revisarSwitch();
	}
	else
		alert("Error, ya existe ese dni");

}

function show_frmAltaPedido() {
	ocultarForms();
	frmAltaPedido.reset();
	crearComboCatalogo();
	document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").addEventListener("change", actualizaDatosAlta);
	document.querySelector("#divFrmAltaPedido").style.display = "block";
}

var pedido;

function crearComboCatalogo() {
	document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").remove();
	let select = modelo.comboCatalogo();
	document.querySelector(".selectCatalogo").appendChild(select);
	frmAltaPedido.txtPrecioUnidad.value = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value).precio;

}

function actualizaDatosAlta() {
	frmAltaPedido.txtPrecioUnidad.value = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value).precio;
}


function submit_frmAltaPedido() {
	let producto = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value);
	let cliente = modelo.buscarCliente(clave);
	pedido = modelo.altaPedido(new Pedido(cliente, []));
	if (pedido == undefined) {
		console.log(pedido);
		pedido.insertarLineaPedido(new LineaPedido(producto, frmAltaPedido.txtCantidad));
	}
}

function show_frmBajaPedido() {
	ocultarForms();
	frmBajaPedido.reset();
	crearComboPedidos();
	frmBajaPedido.comboPedidos.addEventListener("change", actualizaDatosAlta);
	document.querySelector("#divFrmBajaPedido").style.display = "block";
}

var pedido;

function crearComboPedidos() {
	document.querySelector("#frmBajaPedido > div.row.selectPedido > select").remove();
	let select = modelo.comboPedidos();
	document.querySelector(".selectPedido").appendChild(select);
}

function actualizaDatosBaja() {
	frmBajaPedido.txtLineas.value = modelo.buscarPedido(frmBajaPedido.selectPedido.selectedOptions[0].value).tLineasPedido.length;
	frmBajaPedido.txtTotal.value = modelo.buscarPedido(frmBajaPedido.selectPedido.selectedOptions[0].value).precioTotal();
}


function submit_frmBajaPedido() {
	let producto = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value);
	let cliente = modelo.buscarCliente(clave);
	if (pedido == undefined)
		pedido = modelo.altaPedido(new Pedido(cliente, []));
	pedido.insertarLineaPedido(new LineaPedido(producto, frmAltaPedido.txtCantidad));
}

function show_lstPedidosRegistrados() {
	ocultarForms();
	console.log(modelo.listadoPedidos(modelo.buscarCliente(clave)));
	if (document.querySelector("#cliente").style.display == "none")
		if (document.querySelector("#operario").style.display == "none") {
			document.querySelector("#supervisor .formularios").appendChild(modelo.listadoPedidos(modelo.buscarCliente(clave)));
		}
		else
			document.querySelector("#operario .formularios").appendChild(modelo.listadoPedidos(modelo.buscarCliente(clave)));
	else
		document.querySelector("#cliente .formularios").appendChild(modelo.listadoPedidos(modelo.buscarCliente(clave)));
}

function show_frmModificarPerfil() {
	ocultarForms();
	frmModificarCliente.reset();
	cargarDatosCliente();
	document.querySelector("#divFrmModificarCliente").style.display = "block";
}

function cargarDatosCliente() {
	frmModificarCliente.txtNombre.value = modelo.buscarCliente(clave).nombre;
	frmModificarCliente.txtApellidos.value = modelo.buscarCliente(clave).apellidos;
	frmModificarCliente.txtDireccion.value = modelo.buscarCliente(clave).direccion;
	frmModificarCliente.txtTelefono.value = modelo.buscarCliente(clave).telefono;
}

function submit_frmModificarCliente() {
	let cliente = modelo.buscarCliente(clave);
	let telefonoNuevo = frmModificarCliente.txtTelefono.value;
	let direccionNueva = frmModificarCliente.txtDireccion.value;
	if (telefonoNuevo != "" && direccionNueva != "") {
		cliente.modificarTelefono(telefonoNuevo);
		cliente.modificarDireccion(direccionNueva);
	}
	alert("Perfil actualizado");
	cargarDatosCliente();
}

function show_lstCatalogo() {
	ocultarForms();
	if (document.querySelector("#cliente").style.display == "none")
		if (document.querySelector("#operario").style.display == "none") {
			document.querySelector("#supervisor .formularios").appendChild(modelo.listadoCervezas());
		}
		else
			document.querySelector("#operario .formularios").appendChild(modelo.listadoCervezas());
	else
		document.querySelector("#cliente .formularios").appendChild(modelo.listadoCervezas());
}



//Parte de Operario


function show_frmAltaCerveza() {
	ocultarForms();
	frmAltaCerveza.reset();
	document.querySelector("#divFrmAltaCerveza").style.display = "block";
}

function show_frmAnadirStock() {

	ocultarForms();
	frmAnadirStock.reset();
	document.querySelector("#divAnadirStock").style.display = "block";

	let combocervezas = document.querySelector("#selProducto");
	let option = null;

	while (combocervezas.hasChildNodes()) {
		combocervezas.removeChild(combocervezas.firstChild);
	}

	for (let i = 0; i < modelo.tCervezas.length; i++) {
		option = document.createElement("option");
		option.value = modelo.tCervezas[i].nombre;
		option.textContent = modelo.tCervezas[i].nombre;
		combocervezas.appendChild(option);
	}

	let div = document.querySelector("#divAnadirStock");

	if (document.querySelector("#operario").style.display == "none") {
		document.querySelector("#supervisor .formularios").appendChild(div);
	}

}

function submit_frmAnadirStock() {

	let nombreProducto = frmAnadirStock.selProducto.value;
	let cantidad = frmAnadirStock.txtCantidad.value;

	for (let i = 0; i < modelo.tCervezas.length; i++) {
		if (modelo.tCervezas[i].nombre == nombreProducto) {
			modelo.tCervezas[i].anadirStock(cantidad);
			alert("Stock actualizado");
		}
	}

}

function show_frmCambiarEstadoPedido() {

	ocultarForms();
	frmCambiarEstado.reset();
	document.querySelector("#divCambiarEstado").style.display = "block";

	let combopedidos = document.querySelector("#selPedido");
	let comboestadospedido = document.querySelector("#selEstadoActual");
	let option = null;

	while (combopedidos.hasChildNodes()) {
		combopedidos.removeChild(combopedidos.firstChild);
	}

	while (comboestadospedido.hasChildNodes()) {
		comboestadospedido.removeChild(comboestadospedido.firstChild);
	}

	for (let i = 0; i < modelo.tPedidos.length; i++) {
		option = document.createElement("option");
		option.value = modelo.tPedidos[i].idPedido;
		option.textContent = modelo.tPedidos[i].idPedido + " - " + modelo.tPedidos[i].cliente.nombre;
		combopedidos.appendChild(option);
	}

	for (let i = 0; i < modelo.tPedidos.length; i++) {
		if (modelo.tPedidos[i].idPedido == frmCambiarEstado.selPedido.value) {
			let option2 = document.createElement("option");
			option2.value = modelo.tPedidos[i].estado;
			option2.textContent = modelo.tPedidos[i].estado;
			comboestadospedido.appendChild(option2);
		}
	}

	let div = document.querySelector("#divCambiarEstado");

	if (document.querySelector("#operario").style.display == "none") {
		document.querySelector("#supervisor .formularios").appendChild(div);
	}
}

function cambioComboEstados() {

	let combopedidos = document.querySelector("#selPedido");
	let comboestadospedido = document.querySelector("#selEstadoActual");
	let option = null;

	while (comboestadospedido.hasChildNodes()) {
		comboestadospedido.removeChild(comboestadospedido.firstChild);
	}

	for (let i = 0; i < modelo.tPedidos.length; i++) {
		if (modelo.tPedidos[i].idPedido == frmCambiarEstado.selPedido.value) {
			let option2 = document.createElement("option");
			option2.value = modelo.tPedidos[i].estado;
			option2.textContent = modelo.tPedidos[i].estado;
			comboestadospedido.appendChild(option2);
		}
	}
}

function submit_frmCambiarEstadoPedido() {

	for (let i = 0; i < modelo.tPedidos.length; i++) {
		if (modelo.tPedidos[i].idPedido == document.querySelector("#selPedido").value) {
			modelo.tPedidos[i].estado = document.querySelector("#selEstadoACambiar").value;
			cambioComboEstados();
			alert("Estado actualizado");
		}
	}

}

function cargarDatosOperario() {
	frmModificarOperario.txtNombre.value = modelo.buscarOperario(clave).nombre;
	frmModificarOperario.txtApellidos.value = modelo.buscarOperario(clave).apellidos;
	frmModificarOperario.txtDireccion.value = modelo.buscarOperario(clave).direccion;
	frmModificarOperario.txtTelefono.value = modelo.buscarOperario(clave).telefono;
}

function show_frmModificarPerfilOperario() {

	ocultarForms();
	frmModificarOperario.reset();
	cargarDatosOperario();
	document.querySelector("#divFrmModificarOperario").style.display = "block";

}

function submit_frmModificarOperario() {

	let operario = modelo.buscarOperario(clave);
	let telefonoNuevo = frmModificarOperario.txtTelefono.value;
	let direccionNueva = frmModificarOperario.txtDireccion.value;
	if (telefonoNuevo != "" && direccionNueva != "") {
		operario.modificarTelefono(telefonoNuevo);
		operario.modificarDireccion(direccionNueva);
	}
	alert("Perfil actualizado");
	cargarDatosCliente();

}