var oUpoBeer = new UpoBeer();
var contadorCervezas=0;
var contadorPedidos=0;

class Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        this.dni = sDni;
        this.nombre = sNombre;
        this.apellidos = sApellidos;
        this.fechaNacimiento = dFechaNacimiento;
        this.direccion = sDireccion;
        this.telefono = sTelefono;

    }

    validarDNI(sDni) {

        var numero;
        var letr;
        var letra;
        var expresion_regular_dni;

        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if (expresion_regular_dni.test(sDni) == true) {
            numero = dni.substr(0, dni.length - 1);
            letr = dni.substr(dni.length - 1, 1);
            numero = numero % 23;
            letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero + 1);
            if (letra != letr.toUpperCase()) {
                alert('Dni erroneo, la letra del NIF no se corresponde');
                return false;
            } else {
                return true;
            }
        } else {
            alert('Dni erroneo, formato no válido');
            return false;
        }

    }

    validarTelefono(sTelefono) {

        expresion_regular_telefono=/^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            return true;
        }
        else
        {
            alert("Teléfono erroneo, formato no válido");
            return false;
        }

    }

    modificarDireccion(sDireccion) {
        this.direccion = sDireccion;
        return true;
    }

    modificarTelefono(sTelefono) {

        expresion_regular_telefono=/^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            this.telefono = sTelefono;
            return true;
        }
        else
        {
            alert("Teléfono erroneo, formato no válido");
            return false;
        }
        
    }

}

class Cliente extends Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);

    }

    altaPedido() {

        for (let i = 0; i < oUpoBeer.tClientes.length; i++) {
            if (oUpoBeer.tClientes[i] == this) {
                let oLineasPedido = [];
                contadorPedidos++;
                oUpoBeer.altaPedido(new Pedido(this, oLineasPedido));
                return true;
            }
        }

        return false;

        //REVISIÓN

    }

    bajaPedido(idPedido) {

        for (let i = 0; i < oUpoBeer.tPedidos.length; i++) {
            if (oUpoBeer.tPedidos[i].cliente == this) {
                if (oUpoBeer.tPedidos[i].idPedido == idPedido) {
                    oUpoBeer.bajaPedido(idPedido);
                    return true;
                }
            }
        }

        return false;
    }

    listadoPedidos() {

        let oArrayPedidos = [];

        for (let i = 0; i < oUpoBeer.tPedidos.length; i++) {
            if (oUpoBeer.tPedidos[i].cliente == this) {
                oArrayPedidos.push(oUpoBeer.tPedidos[i]);
            }
        }

        return oArrayPedidos;
    }



    toHTMLRow() {
        let fila = "<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento +
            "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td></tr>";
        return fila;
    }

}

class Conductor extends Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, sTipoCarnet) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.tipoCarnet = sTipoCarnet;
    }


}

class Operario extends Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, bSupervisor) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.supervisor = bSupervisor;

    }

    altaOperario(sDNI) {

        for (let i = 0; i < oUpoBeer.tOperarios.length; i++) {
            if (oUpoBeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    oUpoBeer.altaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
    }

    bajaOperario(sDNI) {

        for (let i = 0; i < oUpoBeer.tOperarios.length; i++) {
            if (oUpoBeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    oUpoBeer.bajaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
    }

    altaCerveza(nombre, alcohol, precio, stock, foto) {
        
        for (let i = 0; i < oUpoBeer.tOperarios.length; i++) {
            if (oUpoBeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    contadorCervezas++;
                    let cerveza=new Cerveza(contadorCervezas,nombre,alcohol,precio,stock,foto);
                    oUpoBeer.altaCerveza(cerveza);
                    return true;
                }
            }
        }
        return false;

    }

    bajaCerveza(idCerveza) {

        for (let i = 0; i < oUpoBeer.tOperarios.length; i++) {
            if (oUpoBeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    {
                        for (let y = 0; y < oUpoBeer.catalogo.length; y++) {
                            if (oUpoBeer.catalogo[y].idCerveza == idCerveza) {
                                oUpoBeer.bajaCerveza(idCerveza);
                                return true;
                            }
                        }
                    }

                }
            }
        }
        return false;

    }

    añadirStock(cantidad) {

        //no se si cantidad es una cerveza o un id, si fuese stock necesito explicación.

    }

    cambiarEstadoPedido(estado) {

        //define estado, faltan parametros?

    }

    toHTMLRow() {
        let fila = "<tr><td>" + this.dni + "</td><td>" + this.nombre + "</td><td>" + this.apellidos + "</td><td>" + this.fechaNacimiento +
            "</td><td>" + this.direccion + "</td><td>" + this.telefono + "</td>";

        if (this.supervisor == true) {
            fila += "<td>Supervisor</td></tr>";
        }
        else {
            fila += "<td>Operario</td></tr>";
        }

        return fila;
    }

}

