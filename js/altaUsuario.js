$( function() {
    $( "#datepicker" ).datepicker();
  } );

function comprobarRegistro() {

	var usuarioNuevo = formularioRegistro.usuario.value;
	var dni = formularioRegistro.dni.value;
	var nombre = formularioRegistro.nombre.value;
	var apellidos = formularioRegistro.apellidos.value;
	var fecha = formularioRegistro.fecha.value.split("/").reverse().join("/");
	var direccion = formularioRegistro.direccion.value;
	var telefono = formularioRegistro.telefono.value;
	if (usuarioNuevo == "" || dni == "" || nombre == "" || apellidos == "" || fecha == "" || direccion == "" || telefono == "")
		crearDialog("Debe rellenar todos los campos");
	else if (this.modelo.comprobarRegistro(usuarioNuevo, dni, nombre, apellidos, fecha, direccion, telefono)) {
		crearDialog("Registrado ok");
		revisarSwitch();
	}
	else
		crearDialog("Error, ya existe ese dni");

}