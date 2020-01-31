class Operario extends Persona {

    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, bSupervisor) {
        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;
        this.supervisor = bSupervisor;

    }
    altaOperario(oOperario) {
	/*
        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    upobeer.altaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
	*/
	
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.altaOperario(oOperario);
	} else {
	    return false;
	}
    }
    bajaOperario(sDNI) {
	/*
        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    upobeer.bajaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
	*/

	if(modelo.buscarSupervisor(this))
	{
	    return modelo.bajaOperario(sDNI);
	} else {
	    return false;
	}
    }
    altaCerveza(oCerveza) {
	/*
	for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    let cerveza = new Cerveza(contadorCervezas, nombre, alcohol, precio, stock, foto);
                    upobeer.altaCerveza(cerveza);
                    return true;
                }
            }
        }
        return false;
	*/
	
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.altaCerveza(oCerveza);
	} else {
	    return false;
	}
    }
    bajaCerveza(idCerveza) {
	/*
        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    {
                        for (let y = 0; y < upobeer.catalogo.length; y++) {
                            if (upobeer.catalogo[y].idCerveza == idCerveza) {
                                upobeer.bajaCerveza(idCerveza);
                                return true;
                            }
                        }
                    }

                }
            }
        }
        return false;
	*/
	if(modelo.buscarSupervisor(this))
	{
	    return modelo.bajaCerveza(idCerveza);
	} else {
	    return false;
	}
    }
    añadirStock(idCerveza, cantidad) {
	/*
        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                {
                    for (let y = 0; y < upobeer.catalogo.length; y++) {
                        if (upobeer.catalogo[y].idCerveza == idCerveza) {
                            upobeer.catalogo[y].stock += cantidad;
                            return true;
                        }
                    }

                }
            }
        }
        return false;
	*/
	if(modelo.buscarOperario(this))
	{
	    let oCerveza=modelo.buscarCerveza(idCerveza);
	    if(oCerveza != undefined){
		return oCerveza.añadirStock(cantidad);
	    } else {
		return false;
	    }
	} else {
	    return false;
	}
    }

    cambiarEstadoPedido(idPedido, estado) {
	/*
	//Revisar si es supervisor
    	for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
		{
		    let pedido = upobeer.buscarPedido(idPedido);
		    if(pedido != undefined)
		    {
		    	pedido.estado = estado;
		    	return true;
		    }
		}
	    }
	    return false;
	}
	*/
    	/*
          for (let i = 0; i < upobeer.tOperarios.length; i++) {
          if (upobeer.tOperarios[i] == this) {
          {
          for (let y = 0; y < upobeer.tPedidos.length; y++) {
          if (upobeer.tPedidos[y].idPedido == idPedido) {
          upobeer.tPedidos[y].estado = estado;
          return true;
          }
          }

          }
          }
          }
          return false;
	*/

	if(modelo.buscarOperario(this)){
	    let oPedido=modelo.buscarPedido(idPedido);
	    if(oPedido!=undefined){
		return oPedido.cambiarEstado(estado);
	    } else {
		return false;
	    }
	} else {
	    return false;
	}
    }

    toHTMLRow() {

        let oFila = document.createElement("tr");
        let oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.dni;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.nombre;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.apellidos;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.fechaNacimiento;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.direccion;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = this.telefono;

        if (this.supervisor == true) {
            oCelda = oFila.insertCell(-1);
            oCelda.textContent = "Supervisor";
        }
        else {
            oCelda = oFila.insertCell(-1);
            oCelda.textContent = "Operario";
        }

        return oFila;

        /*

        let fila = "<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento +
            "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td>";

        if (this.supervisor == true) {
            fila += "<td>Supervisor</td></tr>";
        }
        else {
            fila += "<td>Operario</td></tr>";
        }

        return fila;
        */
    }

}
