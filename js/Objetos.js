var oUpoBeer = new UpoBeer();

class Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono){

        this.dni=sDni;
        this.nombre=sNombre;
        this.apellidos=sApellidos;
        this.fechaNacimiento=dFechaNacimiento;
        this.direccion=sDireccion;
        this.telefono=sTelefono;

    }

    validarDNI(sDni)
    {
        /*
        if(sDni==this.dni)
            return true;
        else
            return false;
        */
        }

    validarTelefono(sTelefono)
    {
        /*
        if(sTelefono==this.telefono)
            return true;
        else
            return false;
        */
    }

    modificarDireccion(sDireccion)
    {
        this.direccion=sDireccion;
            return true;
    }

    modificarTelefono(sTelefono)
    {
        this.telefono=sTelefono;
            return true;
    }

}

class Cliente extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);

    }

    altaPedido(){

        for(let i=0;i<oUpoBeer.tPedidos.length;i++)
        {
            if(oUpoBeer.tPedidos[i].cliente==this)
            {
                return true;
            }
        }

        return false;

    }

    bajaPedido(idPedido){

        for(let i=0;i<oUpoBeer.tPedidos.length;i++)
        {
            if(oUpoBeer.tPedidos[i].cliente==this)
            {
                if(oUpoBeer.tPedidos[i].idPedido==idPedido)
                {
                    return true;
                }
            }
        }

        return false;
    }

    listadoPedidos(){

    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento + 
        "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td></tr>";
	    return fila;
	}

}

class Conductor extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,sTipoCarnet) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.tipoCarnet=sTipoCarnet;
    }


}

class Operario extends Persona {

    constructor(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono,bSupervisor) {

        super(sDni,sNombre,sApellidos,dFechaNacimiento,sDireccion,sTelefono);
        this.supervisor=bSupervisor;

    }

    altaOperario(sDNI){

    }

    bajaOperario(sDNI){

    }

    altaCerveza(nombre,alcohol,precio,stock,foto){

    }

    bajaCerveza(idCerveza){

    }

    añadirStock(cantidad){

    }

    cambiarEstadoPedido(estado) {

    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento + 
        "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td>";

        if(this.supervisor==true)
        {
            fila+="<td>Supervisor</td></tr>";
        }
        else
        {
            fila+="<td>Operario</td></tr>";
        }

	    return fila;
	}

}

class UpoBeer {

constructor(){

    this.catalogo=[];
    this.tPedidos=[];
    this.tClientes=[];
    this.tOperarios=[];

}

altaCliente(Cliente){


}

bajaCliente(sDNI){


}

altaOperario(sDNI){


}

bajaOperario(sDNI){


}

altaPedido(Pedido)
{

}

bajaPedido(idPedido){


}

altaCerveza(Cerveza){


}

bajaCerveza(idCerveza){


}

buscarCerveza(idCerveza){


}

buscarCliente(sDNI){


}

buscarPedido(idPedido){


}

buscarOperario(sDNI){


}



}