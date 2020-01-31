//INICIALIZAR MODELO
var modelo = new UpoBeer();
var tipo = "cliente";
var usuario = "";
var clave = "";
document.getElementById("enlaceRegistro").addEventListener("click", showRegistro);
document.getElementById("logoInicio").addEventListener("click", revisarSwitch);
revisarSwitch();

function revisarSwitch()
{
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
	  	document.querySelector("#datosSesion").appendChild(datosOperario);
	    document.getElementById("operario").style.display = "inline";
	    console.log("se muestra operario");
	    break;
	  case 'supervisor':
	    console.log('El kilogramo de Cerezas cuesta $3.00.');
	    break;
	}
}

function ocultarTodo()
{
	ocultarForms();
	document.querySelectorAll(".elemento").forEach(function(element){element.style.display="none"});	
}

function ocultarForms()
{
	document.querySelectorAll(".conditional").forEach(function(element){element.style.display="none"});	
}


function showRegistro(){ 
	document.querySelector("#inicio").style.display = "none";
	document.querySelector("#registro").style.display = "inline";
}


//Datos de ejemplo
modelo.altaCliente(new Cliente("user1","11111111A","Cliente1","Ap","1997-08-12","C/Mesina","111111111"));
modelo.altaCliente(new Cliente("user2","11111111B","Cliente2","Ap","1993-04-16","C/Mesina","111111111"));
modelo.altaCliente(new Cliente("user3","11111111C","Cliente2","Ap","1994-09-22","C/Mesina","111111111"));
modelo.altaOperario(new Cliente("user4","11111111D","Operario1","Ap","1997-08-12","C/Mesina","111111111",true));
modelo.altaOperario(new Cliente("user5","11111111E","Operario2","Ap","1997-08-12","C/Mesina","111111111",false));
modelo.altaCerveza(new Cerveza("Cruzcampo",11,3.50,200));
modelo.altaCerveza(new Cerveza("Radler",9,4.50,200));
modelo.altaCerveza(new Cerveza("Hamstel",12,3,200));
modelo.altaCerveza(new Cerveza("Alhambra",14,4.20,200));

function comprobarUsuario(){

	usuario = formularioInicio.usuario.value;
	clave = formularioInicio.clave.value;
	console.log(usuario + ", " + clave);
	tipo = this.modelo.comprobarUsuario(usuario,clave);
	if(tipo != "ninguno")
		revisarSwitch();
	else
		alert("Usuario incorrecto");
}

function comprobarRegistro(){

	var usuarioNuevo = formularioRegistro.usuario.value;
	var dni = formularioRegistro.dni.value;
	var nombre = formularioRegistro.nombre.value;
	var apellidos = formularioRegistro.apellidos.value;
	var fecha = formularioRegistro.fecha.value;
	var direccion = formularioRegistro.direccion.value;
	var telefono = formularioRegistro.telefono.value;
	if(usuarioNuevo==""||dni==""||nombre==""||apellidos==""||fecha==""||direccion==""||telefono=="")
		alert("Debe rellenar todos los campos");
	else if(this.modelo.comprobarRegistro(usuarioNuevo,dni,nombre,apellidos,fecha,direccion,telefono))
	{
		alert("Registrado ok");
		revisarSwitch();
	}
	else
		alert("Error, ya existe ese dni");

}

function show_frmAltaPedido(){
	ocultarForms();
	frmAltaPedido.reset();
	crearComboCatalogo();
	document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").addEventListener("change",actualizaDatosAlta);
	document.querySelector("#divFrmAltaPedido").style.display = "block";
}

var pedido;

function crearComboCatalogo(){
	document.querySelector("#selCatalogo").remove();
	let select = modelo.comboCatalogo();
	document.querySelector(".selectCatalogo").appendChild(select);
	frmAltaPedido.txtPrecioUnidad.value = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value).precio;

}

function actualizaDatosAlta(){
	frmAltaPedido.txtPrecioUnidad.value = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value).precio;
}


function submit_frmAltaPedido(){
	let producto = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value);
	let cliente = modelo.buscarCliente(clave);
	if(pedido == undefined)
		pedido = modelo.altaPedido(new Pedido(cliente,[]));
	pedido.insertarLineaPedido(new LineaPedido(producto, frmAltaPedido.txtCantidad));
}

function show_frmBajaPedido(){
	ocultarForms();
	frmBajaPedido.reset();
	crearComboPedidos();
	frmBajaPedido.comboPedidos.addEventListener("change",actualizaDatosAlta);
	document.querySelector("#divFrmBajaPedido").style.display = "block";
}

var pedido;

function crearComboPedidos(){
	document.querySelector("#selPedido").remove();
	let select = modelo.comboPedidos();
	document.querySelector(".selectPedido").appendChild(select);
}

function actualizaDatosBaja(){
	frmBajaPedido.txtLineas.value = modelo.buscarPedido(frmBajaPedido.selectPedido.selectedOptions[0].value).tLineasPedido.length;
	frmBajaPedido.txtTotal.value = modelo.buscarPedido(frmBajaPedido.selectPedido.selectedOptions[0].value).precioTotal();
}


function submit_frmBajaPedido(){
	let producto = modelo.buscarCerveza(document.querySelector("#frmAltaPedido > div.row.selectCatalogo > select").selectedOptions[0].value);
	let cliente = modelo.buscarCliente(clave);
	if(pedido == undefined)
		pedido = modelo.altaPedido(new Pedido(cliente,[]));
	pedido.insertarLineaPedido(new LineaPedido(producto, frmAltaPedido.txtCantidad));
}


function show_frmAltaCerveza(){
	ocultarForms();
	frmAltaCerveza.reset();
	document.querySelector("#divFrmAltaCerveza").style.display = "block";
}

function show_frmAnadirStock(){

	ocultarForms();
	frmAnadirStock.reset();
	document.querySelector("#divAnadirStock").style.display = "block";

	let combocervezas=document.querySelector("#selProducto");
	let option=document.createElement("option");

	while(combocervezas.hasChildNodes())
	{
		combocervezas.removeChild(combocervezas.firstChild);
	}

	for(let i=0;i<modelo.tCervezas.length;i++)
	{
		option.value=modelo.tCervezas[i].nombre;
		option.textContent=modelo.tCervezas[i].nombre;
		combocervezas.appendChild(option);
	}

}