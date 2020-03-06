
function comprobarUsuario() {

	usuario = formularioInicio.usuario.value;
	clave = formularioInicio.clave.value;
	console.log(usuario + ", " + clave);
	tipo = this.modelo.comprobarUsuario(usuario, clave);
	if (tipo != "ninguno")
	{
		revisarSwitch();
	}
	else
	{
		crearDialog("Usuario incorrecto");
	}
}