//INICIALIZAR MODELO
var modelo = new UpoBeer();
var tipo = "ninguno";
var usuario = "";
var clave = "";
document.getElementById("logoInicio").addEventListener("click", revisarSwitch);
document.getElementById("selPedido").addEventListener("change", cambioComboEstados);
revisarSwitch();

document.getElementById("botonIniciarSesion").addEventListener("click", cargarMenuSesion);
document.getElementById("botonCrearCuenta").addEventListener("click", cargarCrearCuenta);

function cargarMenuSesion() {

	$("#formularios div:not('#inicio')").hide();

	// Verifico si ya he cargado el formulario antes

	$("#formularios").load("formularios/inicio_sesion.html",
		function () {
			$.getScript("js/inicioSesion.js");
		});



}

function cargarCrearCuenta() {

	$("#formularios div:not('#registro')").hide();


	$("#formularios").load("formularios/registro.html",
		function () {
			$.getScript("js/altaUsuario.js");
		});



}

function revisarSwitch() {
	switch (tipo) {
		case 'ninguno':
			ocultarTodo();
			document.querySelector("#cabeceraInicio").style.display = "inline";
			console.log("se muestra ninguno");
			break;
		case 'cliente':
			ocultarTodo();
			let datos = document.createElement("text");
			datos.textContent = usuario + ", " + clave;
			document.querySelector("#datosSesion").appendChild(datos);
			// Verifico si ya he cargado el formulario antes

			$("#formularios").load("formularios/cliente.html",
				function () {
					$.getScript("js/prueba.js");
				});
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
let cliente1 = new Cliente("user1", "11111111A", "Cliente1", "Ap", "1997-08-12", "C/Mesina", "111111111");
modelo.altaCliente(cliente1);
let cliente2 = new Cliente("user2", "11111111B", "Cliente2", "Ap", "1993-04-16", "C/Mesina", "111111111");
modelo.altaCliente(cliente2);
modelo.altaCliente(new Cliente("user3", "11111111C", "Cliente2", "Ap", "1994-09-22", "C/Mesina", "111111111"));
modelo.altaOperario(new Operario("oper1", "11111111D", "Operario1", "Ap", "1997-08-12", "C/Mesina", "111111111", true));
modelo.altaOperario(new Operario("oper2", "11111111E", "Operario2", "Ap", "1997-08-12", "C/Mesina", "111111111", false));
let cerveza1 = new Cerveza("Cruzcampo", 11, 3.50, 2000);
modelo.altaCerveza(cerveza1);
let cerveza2 = new Cerveza("Radler", 9, 4.50, 2000);
modelo.altaCerveza(cerveza2);
let cerveza3 = modelo.altaCerveza(new Cerveza("Amstel", 12, 3.9, 2000));
let cerveza4 = modelo.altaCerveza(new Cerveza("Alhambra", 14, 4.20, 2000));
let pedido1 = modelo.altaPedido(new Pedido(cliente1, []));
let pedido2 = modelo.altaPedido(new Pedido(new Cliente("user3", "11111111C", "Cliente2", "Ap", "1994-09-22", "C/Mesina", "111111111"), []));
pedido1.insertarLineaPedido(new LineaPedido(cerveza1, 40));

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
	var fecha = new Date(formularioRegistro.fecha.value);
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
	frmAltaPedido.txtPrecioUnidad.value = frmAltaPedido.comboCatalogo.selectedOptions[0].dataset.precio;
}

function actualizaDatosAlta() {
	frmAltaPedido.txtPrecioUnidad.value = frmAltaPedido.comboCatalogo.selectedOptions[0].dataset.precio;
}

function submit_frmAltaPedido() {
	let producto = modelo.buscarCerveza(frmAltaPedido.comboCatalogo.value);
	let clienteActual = modelo.buscarCliente(clave);
	if (pedido == undefined) {
		pedido = modelo.altaPedido(new Pedido(clienteActual, []));
	}
	console.log()
	let lineaPedido = new LineaPedido(producto, frmAltaPedido.txtCantidad.value);
	modelo.insertarLineaPedido(pedido.idPedido, lineaPedido);
}

function show_frmBajaPedido() {
	ocultarForms();
	frmBajaPedido.reset();
	crearComboPedidos();
	frmBajaPedido.comboPedidos.addEventListener("change", actualizaDatosBaja);
	document.querySelector("#divFrmBajaPedido").style.display = "block";
}

function crearComboPedidos() {
	document.querySelector("#frmBajaPedido > div.row.selectPedido > select").remove();
	let select = modelo.comboPedidos(modelo.buscarCliente(clave));
	document.querySelector(".selectPedido").appendChild(select);
	actualizaDatosBaja();
}

function actualizaDatosBaja() {
	let oPedido = modelo.buscarPedido(frmBajaPedido.comboPedidos.value);
	frmBajaPedido.txtLineas.value = oPedido.tLineasPedido.length;
	frmBajaPedido.txtTotal.value = oPedido.precioTotal();
}

function submit_frmBajaPedido() {
	let idPedido = frmBajaPedido.comboPedidos.value;
	if (idPedido != -1)
		modelo.bajaPedido(idPedido);
	crearComboPedidos();
}

function show_lstPedidosRegistrados() {
	ocultarForms();
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
	cliente = modelo.buscarCliente(clave);
	frmModificarCliente.txtNombre.value = cliente.nombre;
	frmModificarCliente.txtApellidos.value = cliente.apellidos;
	frmModificarCliente.txtDireccion.value = cliente.direccion;
	frmModificarCliente.txtTelefono.value = cliente.telefono;
}

function submit_frmModificarCliente() {
	let cliente = modelo.buscarCliente(clave);
	let telefonoNuevo = frmModificarCliente.txtTelefono.value;
	let direccionNueva = frmModificarCliente.txtDireccion.value;
	if (telefonoNuevo != "" && direccionNueva != "" && cliente.validarTelefono(telefonoNuevo)) {
		cliente.modificarTelefono(telefonoNuevo);
		cliente.modificarDireccion(direccionNueva);
		modelo.modificarPersona(cliente);
		alert("Perfil actualizado");
		cargarDatosCliente();
	}
	else
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
	let cantidad = parseInt(frmAnadirStock.txtCantidad.value);

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
	if (telefonoNuevo != "" && direccionNueva != "" && operario.validarTelefono(telefonoNuevo)) {
		operario.modificarTelefono(telefonoNuevo);
		operario.modificarDireccion(direccionNueva);
		alert("Perfil actualizado");
		cargarDatosOperario();
	}
	else {
		alert("No puede dejar en blanco ningún campo y debe introducir un teléfono válido");
		cargarDatosOperario();
	}
}

// Parte supervisor

function show_frmAltaOperario() {

	ocultarForms();
	frmAltaOperario.reset();
	document.querySelector("#divAltaOperario").style.display = "block";

}

function submit_frmAltaOperario() {

	let sUsuario = frmAltaOperario.txtUsuario.value;
	let sDni = frmAltaOperario.txtDni.value;
	let sNombre = frmAltaOperario.txtNombre.value;
	let sApellidos = frmAltaOperario.txtApellidos.value;
	let dFechaNacimiento = new Date(frmAltaOperario.dFechaNacimiento.value);
	let sDireccion = frmAltaOperario.txtDireccion.value;
	let sTelefono = frmAltaOperario.txtTelefono.value;
	let bSupervisor;
	let bValido = true;
	let sError = "";

	if (frmAltaOperario.selSupervisor.value == "si")
		bSupervisor = true;
	else
		bSupervisor = false;

	let oOperario = new Operario(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, bSupervisor);

	if (sUsuario == "") {
		bValido = false;
		sError += "No se puede dejar en blanco el campo usuario";
	}

	if (oOperario.validarDNI(sDni) != true) {
		bValido = false;
		sError += "\nDebe introducir un dni válido";
	}

	if (sNombre == "") {
		bValido = false;
		sError += "\nNo se puede dejar en blanco el campo nombre";
	}

	if (sApellidos == "") {
		bValido = false;
		sError += "\nNo se puede dejar en blanco el campo apellidos";
	}

	if (oOperario.validarFechaNacimiento(dFechaNacimiento) != true) {
		bValido = false;
		sError += "\nDebe ser mayor de edad";
	}

	if (sDireccion == "") {
		bValido = false;
		sError += "\nNo se puede dejar en blanco el campo dirección";
	}

	if (oOperario.validarTelefono(sTelefono) != true) {
		bValido = false;
		sError += "\nDebe introducir un teléfono válido";
	}

	if (bValido == false) {
		alert(sError);
	}
	else {
		if (modelo.altaOperario(oOperario)) {
			alert("Acción realizada con exito");
			frmAltaOperario.reset();
		}
		else
			alert("Ese operario ya existe");
	}

}

function show_frmBajaOperario() {

	ocultarForms();
	frmBajaOperario.reset();
	document.querySelector("#divBajaOperario").style.display = "block";

	let comboOperarios = document.querySelector("#selOperario");
	let option = null;

	while (comboOperarios.hasChildNodes()) {
		comboOperarios.removeChild(comboOperarios.firstChild);
	}

	for (let i = 0; i < modelo.tOperarios.length; i++) {
		if (modelo.tOperarios[i].supervisor == false) {
			option = document.createElement("option");
			option.value = modelo.tOperarios[i].dni;
			option.textContent = modelo.tOperarios[i].nombre + " - " + modelo.tOperarios[i].dni;
			comboOperarios.appendChild(option);
		}
	}

}

function submit_frmBajaOperario() {

	modelo.bajaOperario(frmBajaOperario.selOperario.value);
	alert("Acción realizada con éxito");
	show_frmBajaOperario();
}

function show_frmAltaCerveza() {

	ocultarForms();
	frmAltaCerveza.reset();
	document.querySelector("#divAltaCerveza").style.display = "block";

}

function submit_frmAltaCerveza() {

	let sNombre = frmAltaCerveza.txtNombre.value;
	let iPorcentaje = parseInt(frmAltaCerveza.txtPorcentaje.value);
	let fPrecio = parseFloat(frmAltaCerveza.txtPrecio.value);
	let iStock = parseInt(frmAltaCerveza.txtStock.value);
	let bValido = true;
	let sError = "";
	let oCerveza = new Cerveza(sNombre, iPorcentaje, fPrecio, iStock);

	if (sNombre == "") {
		bValido = false;
		sError += "No puede dejar en blanco el campo nombre";
	}

	if (oCerveza.validarPrecioUnidad(fPrecio) != true) {
		bValido = false;
		sError += "\nEl precio no puede ser ni inferior a 0 ni superior a 100";
	}

	if (bValido == false)
		alert(sError);
	else {
		if (modelo.altaCerveza(oCerveza) == false) {
			alert("Esa cerveza ya está dada de alta");
		}
		else {
			alert("Acción realizada con éxito");
			frmAltaCerveza.reset();
		}
	}

}

function show_frmBajaCerveza() {

	ocultarForms();
	frmBajaCerveza.reset();
	document.querySelector("#divBajaCerveza").style.display = "block";

	let comboCervezas = document.querySelector("#selCerveza");
	let option = null;

	while (comboCervezas.hasChildNodes()) {
		comboCervezas.removeChild(comboCervezas.firstChild);
	}

	for (let i = 0; i < modelo.tCervezas.length; i++) {

		option = document.createElement("option");
		option.value = modelo.tCervezas[i].idCerveza;
		option.textContent = modelo.tCervezas[i].nombre + " - " + modelo.tCervezas[i].idCerveza;
		comboCervezas.appendChild(option);

	}

}

function submit_frmBajaCerveza() {

	modelo.bajaCerveza(frmBajaCerveza.selCerveza.value);
	alert("Acción realizada con éxito");
	show_frmBajaCerveza();

}

function cargarDatosSupervisor() {
	frmModificarSupervisor.txtNombre.value = modelo.buscarOperario(clave).nombre;
	frmModificarSupervisor.txtApellidos.value = modelo.buscarOperario(clave).apellidos;
	frmModificarSupervisor.txtDireccion.value = modelo.buscarOperario(clave).direccion;
	frmModificarSupervisor.txtTelefono.value = modelo.buscarOperario(clave).telefono;
}

function show_frmModificarPerfilSupervisor() {

	ocultarForms();
	frmModificarSupervisor.reset();
	cargarDatosSupervisor();
	document.querySelector("#divFrmModificarSupervisor").style.display = "block";

}

function submit_frmModificarSupervisor() {

	let operario = modelo.buscarOperario(clave);
	let telefonoNuevo = frmModificarSupervisor.txtTelefono.value;
	let direccionNueva = frmModificarSupervisor.txtDireccion.value;

	if (telefonoNuevo != "" && direccionNueva != "" && operario.validarTelefono(telefonoNuevo)) {
		operario.modificarTelefono(telefonoNuevo);
		operario.modificarDireccion(direccionNueva);
		alert("Perfil actualizado");
		cargarDatosSupervisor();
	}
	else {
		alert("No puede dejar en blanco ningún campo y debe introducir un teléfono válido");
		cargarDatosSupervisor();
	}
}

function load_XMLFromFile() {

	let xmlString;
	let xmlDoc;
	uploadText().then(function (text) {
		xmlString = text;
		console.log(xmlString);
		let parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlString, "text/xml");
		console.log(xmlDoc);
		cargarDatosUpoBeerXML(xmlDoc);
	});
}

function save_XMLFile() {
	let oXML = exportarDatosUpoBeerXML();
	let xmlTextIndented = formatXML(oXML.outerHTML);
	download("document/xml", "UpoBeer.xml", xmlTextIndented);
}
