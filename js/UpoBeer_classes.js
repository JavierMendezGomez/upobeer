"use strict";


/*Parte de Emilio*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var contadorCervezas = 0;
var contadorPedidos = 0;
var tipo = "ninguno";

class Persona {

    constructor(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        if(this.validarDNI(sDni))
        	this.dni = sDni;
        this.nombre = sNombre;
        this.apellidos = sApellidos;
        if(this.validarFechaNacimiento(dFechaNacimiento))
	        this.fechaNacimiento = dFechaNacimiento;
        this.direccion = sDireccion;
        if(this.validarTelefono(sTelefono))
	        this.telefono = sTelefono;

    }

    validarDNI(sDni) {

        var numero;
        var letr;
        var letra;

        let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
        if (expresion_regular_dni.test(sDni) == true)
        {
        	return true;
        }
        else
        {
        	alert("Error en dni");
        	return false;
        }
        /*
        if (expresion_regular_dni.test(sDni) == true) {
            numero = sDni.substr(0, dni.length - 1);
            letr = sDni.substr(dni.length - 1, 1);
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
        */

    }

    validarTelefono(sTelefono) {

        let expresion_regular_telefono = /^[\d]{9}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            return true;
        }
        else {
            alert("Teléfono erroneo, formato no válido");
            return false;
        }

    }
    //Añadido para comprobar que el cliente/operario es mayor de edad
    validarFechaNacimiento(dFechaNacimiento)
    {
    	let hoy = new Date();
		let mayoriaEdad = 1000 * 60 * 60 * 24 * 365 * 18; //18 años en milisegundos
		let fechaMin = new Date(hoy - mayoriaEdad);
		if(fechaMin > dFechaNacimiento)
		{
			alert("Fecha de nacimiento erronea, menor de 18 años");
			return false;
		}
		else
			return true;
    }

    modificarDireccion(sDireccion) {
        this.direccion = sDireccion;
        return true;
    }

    modificarTelefono(sTelefono) {

        expresion_regular_telefono = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

        if (expresion_regular_telefono.test(sTelefono) == true) {
            this.telefono = sTelefono;
            return true;
        }
        else {
            alert("Teléfono erroneo, formato no válido");
            return false;
        }

    }

}

class Cliente extends Persona {

    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;

    }

    altaPedido() {

    	/*	
        for (let i = 0; i < upobeer.tClientes.length; i++) {
            if (upobeer.tClientes[i] == this) {
        */

        //Comprobacion no necesaria? Para acceder al metodo tengo que estar en this
    	if(upobeer.buscarCliente(this.dni) == this && upobeer.buscarPedido(this))
    	{
                let oLineasPedido = [];
                upobeer.altaPedido(new Pedido(this, oLineasPedido));
                return true;
        }

        return false;

        //REVISIÓN

    }

    bajaPedido(idPedido) {

        for (let i = 0; i < upobeer.tPedidos.length; i++) {
            if (upobeer.tPedidos[i].cliente == this) {
                if (upobeer.tPedidos[i].idPedido == idPedido) {
                    upobeer.bajaPedido(idPedido);
                    return true;
                }
            }
        }

        return false;
    }

    listadoPedidos() {

        let oArrayPedidos = [];

        for (let i = 0; i < upobeer.tPedidos.length; i++) {
            if (upobeer.tPedidos[i].cliente == this) {
                oArrayPedidos.push(upobeer.tPedidos[i]);
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

    constructor(sUsuario, sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono, bSupervisor) {

        super(sDni, sNombre, sApellidos, dFechaNacimiento, sDireccion, sTelefono);
        this.usuario = sUsuario;
        this.supervisor = bSupervisor;

    }

    altaOperario(sDNI) {

        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    upobeer.altaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
    }

    bajaOperario(sDNI) {

        for (let i = 0; i < upobeer.tOperarios.length; i++) {
            if (upobeer.tOperarios[i] == this) {
                if (this.supervisor == true) {
                    upobeer.bajaOperario(sDNI);
                    return true;
                }
            }
        }
        return false;
    }

    altaCerveza(nombre, alcohol, precio, stock, foto) {

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

    }

    bajaCerveza(idCerveza) {

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

    }

    añadirStock(idCerveza, cantidad) {

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

    }

    cambiarEstadoPedido(idPedido, estado) {
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












/*Parte de Andrea*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


class Pedido {

	constructor(oCliente,tLineasPedido)
	{
		this.idPedido=contadorPedidos;
		contadorPedidos++;
		this.cliente=oCliente;
		this.tLineasPedido=tLineasPedido;
		this.estado="espera";
		this.fechaInicio=new Date(); //Fecha actual, cuando se hace el pedido
		this.fechaFin = new Date();
		this.validarIntervaloFecha(dFechaInicio,dFechaFin);
	}

	precioTotal()
	{
		let total = 0;
		for(let i = 0; i < this.tLineasPedido.length; i++)
		{
			total += this.tLineasPedido[i].precioLinea;
		}
		return total;
	}

	validarIntervaloFecha(dFechaInicio,dFechaFin)
	{
		//Minimo 1 dia para preparacion, 3 dias para envio fijos
		let diasPrep = 1;
		let diasEnvio = 3;
		let cantidadTotal = 0;
		for(let i = 0; i < this.tLineasPedido.length; i++)
		{
			cantidadTotal += this.tLineasPedido[i].cantidad;
		}
		diasPrep = Math.trunc(cantidadTotal / 100);
		//Suma los dias de prep y de envio a la fecha de inicio
		this.fechaFin.setDate(this.fechaInicio.getDate() + (diasPrep + diasEnvio));
	}

	insertarLineaPedido(oLineaPedido)
	{
		for(let i = 0; i < this.tLineasPedido.length; i++)
		{
			if(tLineasPedido[i].producto.idCerveza == oLineaPedido.producto.idCerveza)
				return false; //Producto repetido en dos lineas pedido diferentes
		}
		if(new Date() > this.fechaInicio)
			return false; //Se esta modificando el pedido tarde, ya esta en preparacion
		return this.tLineasPedido.push(oLineaPedido);
	}

	toHTMLRow(){
        let fila ="<tr><td>" + this.idPedido + "</td><td>" + this.cliente.nombre + " " + this.cliente.apellidos + "</td><td>" 
        + this.tLineasPedido.length + "</td><td>" + this.estado + "</td><td>" 
        + this.fechaInicio + "</td>" + "</td><td>" + this.fechaFin + "</td>";

	    return fila;
	}
}

class LineaPedido {

    constructor(producto,iCantidad)
    {
        this.producto=producto;
        this.cantidad=iCantidad;
        this.precioLinea=(this.producto.precio * this.cantidad);
    }

    validarCantidad(cantidad)
    {
    	//Me he inventado un max de 1000 por pedido por si se te cuela un cero al pedir
    	if(cantidad <= 0 || cantidad > 1000  || cantidad <= this.producto.stock)
    		return false;
		else
			return true;
    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.producto.nombre + "</td><td>" + this.cantidad + "</td><td>" + this.precio + "</td>";

	    return fila;
	}

}

class Cerveza {

    constructor(sNombre,fPorcentaje,fPrecio,iStock)
    {
        this.idCerveza=contadorCervezas;
        contadorCervezas++;
        this.nombre=sNombre;
        this.porcentaje=fPorcentaje;
        this.precio=fPrecio;
        this.stock=iStock;
        this.foto="Img/beer/" + this.idCerveza + ".jpg";
    }

    añadirStock(cantidad)
    {
    	if(cantidad > 0)
    	{
	    	this.stock += cantidad;
	    	return true;
    	}
    	return false;
    }

    validarPrecioUnidad(fPrecio)
    {

    	//Me he inventado un max de 100€ por unidad por si se te cuela un cero al dar de alta
    	if(fPrecio <= 0 || fPrecio > 100)
    		return false;
		else
			return true;
    }

    toHTMLRow(){
        let fila ="<tr><td>" + this.idCerveza + "</td><td>" + this.nombre + "</td><td>" + this.porcentaje + "</td><td>" + this.precio + 
        "</td><td>" + this.stock + "</td><td>" + this.foto + "</td>";

	    return fila;
	}

}


// Sirve para establecer o modificar el valor de una cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Sirve para recuperar el valor almacenado para una cookie
function getCookie(cname) { // cookie name
    var name = cname + "=";
    var ca = document.cookie.split(';'); // Splitea los pares key (clave) / value (valor) name1=valor1;name2=valor2
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

// Sirve para borrar una cookie
function deleteCookie(cname) { // cookie name
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";  // Así es como se borra una cookie   
}


function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


























    //Parte quintocar por si sirve
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


    /* FUNCIONES ESTÁTICAS */
  /*  static makeHTMLTable (arrColumnHeadings,arrArrRows){
	let outputStr;
	outputStr = '<table border=2>';
	outputStr += UpoBeer.makeHTMLthRow(arrColumnHeadings);
	arrArrRows.forEach( function(arrRow){
	    outputStr += UpoBeer.makeHTMLrow(arrRow);
	});
	outputStr+='</table>';
	return outputStr;
    }
    static makeHTMLthRow(inputArray){
	let outputStr;
	outputStr='<tr>';
	inputArray.forEach(function(element){
	    outputStr+='<th>'+element+'</th>';
	});
	outputStr+='</tr>';
	return outputStr;
    }
    static makeHTMLrow(inputArray){
	let outputStr;
	outputStr='<tr>';
	inputArray.forEach(function(element){
	    outputStr+='<td>'+element+'</td>';
	});
	outputStr+='</tr>';
	return outputStr;
    }

    /** Realizar compraventa */
    /* Atención, sólo se podrán comprar y vender coches previamente registrados*/
 /*   comprar(matricula,nif,importe,fecha){
	//Crear objeto Date para la fecha
	fecha = new Date(fecha);
	
	/* Comprobar la disponibilidad del vehículo para ser comprado */
	//Primero hay que comprobar que el vehículo esté registrado
/*	let oVehiculo = this.catalogo.find(function(oVehiculo_iterado){
	    return oVehiculo_iterado.matricula == matricula;
	});
	if (oVehiculo != undefined ){
	    console.log("El vehículo se ha encontrado en el registro. Se continúa.");
	} else {
	    return "ERROR: No se puede efectuar la compra, el vehículo no está registrado";
	}
	
	//Después hay que comprobar que el vehículo ni se haya comprado ni se haya vendido antes.
	let oCompra_comprobar = this.arroCompras.find(function(oCompra_iterado){
	    return oCompra_iterado.oVehiculo.matricula == matricula;
	});
	let oVenta_comprobar = this.tPedidos.find(function(oVenta_iterado){
	    return oVenta_iterado.oVehiculo.matricula == matricula;	    
	});

	if( oCompra_comprobar != undefined ){
	    return "ERROR: Ya existía una compra registrada para la matrícula introducida.";
	} else if ( oVenta_comprobar != undefined) {
	    return "ERROR: Ya existía una venta registrada para la matrícula introducida.";
	} else {
	    console.log("No se ha encontrado ningún registro de compra o venta para dicha matrícula. Se continúa.")
	}

	/* Comprobar la existencia del cliente, no puede comprarse a quien no está registrado */
/*	let oCliente = this.tClientes.find(function(oCliente_iterado){
	    return oCliente_iterado.nif == nif;
	});
	if (oCliente != undefined){
	    console.log("Ya existía el cliente. Se continúa.");
	} else {
	    return "ERROR: No se puede efectuar la compra, el cliente no está registrado."
	}

	console.log(fecha instanceof Date);
	
	/* Comprobar la validez de la fecha */
/*	if (isValidDate(fecha)){
	    console.log("La fecha es válida. Se continúa.");
	} else {
	    return "ERROR: La fecha introducida no es válida."
	}
	
	/* Registrar la compra */
/*	let oCompra = new Compra(oCliente,oVehiculo,importe,fecha);
	this.arroCompras.push(oCompra);

	return "Compra registrada con éxito";
    }

    vender(matricula,nif,importeVenta,fechaVenta){
	/* Comprobar la disponibilidad del vehículo para ser vendido */
	//Primero hay que comprobar que el vehículo esté registrado
/*	let oVehiculo = catalogo.find(function(oVehiculo_iterado){
	    return oVehiculo_iterado.matricula == matricula;
	});
	if (oVehiculo != undefined ){
	    console.log("El vehículo se ha encontrado en el registro. Se continúa.");
	} else {
	    return "ERROR: No se puede efectuar la venta, el vehículo no está registrado";
	}
	
	//Después hay que comprobar que el vehículo se haya comprado pero no se haya vendido antes.
	let oCompra_comprobar = arroCompras.find(function(oCompra_iterado){
	    return oCompra_iterado.oVehiculo.matricula == matricula;
	});
	let oVenta_comprobar = tPedidos.find(function(oVenta_iterado){
	    return oVenta_iterado.oVehiculo.matricula == matricula;	    
	});

	let fechaCompra; //se guardan para después
	let importeCompra; //se guardan para después
	if( oCompra_comprobar != undefined ){
	    console.log("Hay un registro de compra para ese vehículo. Se continúa");
	    fechaCompra = oCompra_comprobar.fecha; //se guardan para después
	    importeCompra = oCompra_comprobar.importe; //se guardan para después
	} else {
	    return "ERROR: El vehículo nunca ha sido comprado, luego no puede ser vendido";
	}
	if ( oVenta_comprobar != undefined) {
	    return "ERROR: Ya existía una venta registrada para la matrícula introducida.";
	} else {
	    console.log("No se ha encontrado ningún registro de compra o venta para dicha matrícula. Se continúa.")
	}

	/* Comprobar la validez de la fecha */
/*	if (isValidDate(fecha) && fechaVenta > fechaCompra){
	    console.log("La fecha es válida. Se continúa.");
	} else {
	    return "ERROR: La fecha introducida no es válida."
	}

	/* Comprobar que el importe de venta sea mayor que el de compra */
/*	if(importeVenta > importeCompra){
	    console.log("El importe es aceptable. Se continúa.");
	} else {
	    return "ERROR: No se admite un importe de venta menor que el importe de compra";
	}
	
	/* Registrar la venta */
/*	let oVenta=new Venta(oCliente,oVehiculo,importeVenta,fechaVenta);
	this.tPedidos.push(oVenta);

	return "Venta registrada con éxito";
    }

    /** Listados1 */
/*    listadoALaVenta(){
	//Seleccionar datos: Vehículos registrados como comprados que no estén también registrados como vendidos
	//- Un array acumulador
	let catalogo_alaventa=[];
	//- Para cada compra registrada:
	let _this=this;
	this.arroCompras.forEach(function(oCompra_iterado){
	    //- Ver si existe alguna coincidencia en las ventas registradas, mirando por matrícula
	    let oVenta_comprobar = _this.tPedidos.find(function(oVenta_iterado){
		oCompra_iterado.oVehiculo.matricula == oVenta_iterado.oVehiculo.matricula
	    });
	    //- Si después de buscar no existe tal coincidencia, añadir al array acumulador
	    if (oVenta_comprobar == undefined){
		catalogo_alaventa.push(oCompra_iterado.oVehiculo);
	    }
	});

	//Construir y devolver una tabla HTML
	let arrColumnHeadings = ["Matrícula",
				 "Marca",
				 "Modelo",
				 "Combustible"];
	let arrArrRows=[];
	catalogo_alaventa.forEach(function(oVehiculo_iterado){
	    let arrRow=[oVehiculo_iterado.matricula,
		    oVehiculo_iterado.marca,
		    oVehiculo_iterado.modelo,
		    oVehiculo_iterado.combustible];
	    arrArrRows.push(arrRow);
	});
	
	return UpoBeer.makeHTMLTable(arrColumnHeadings,arrArrRows);
    }
    
    listadoVendidosPeriodo(fechaInicio,fechaFin){
	//Crear objetos Date para las fechas
	fechaInicio=new Date(fechaInicio);
	fechaFin=new Date(fechaFin);
	
	//Seleccionar datos: Vehículos registrados como vendidos en el período dado
	let tPedidos_periodo;
	tPedidos_periodo = this.tPedidos.filter(function(oVenta_iterado){
	    return  fechaInicio >= oVenta_iterado.fecha && oVenta_iterado.fecha <= fechaFin;
	});

	tPedidos_periodo.sort(Venta.compararVentasFechasAsc);

	//Construir y devolver una tabla HTML
	let arrColumnHeadings = ["Matrícula",
				 "Marca",
				 "Modelo",
				 "Combustible",
				 "Fecha de compra",
				 "Fecha de venta",
				 "Importe de compra",
				 "Importe de venta",
				 "Beneficio"];
	let arrArrRows=[];
	tPedidos_periodo.forEach(function(oVenta_iterado){
	    let oCompra_precedente=this.buscarCompra(oVenta_iterado.oVehiculo);
	    let arrRow = [oVenta_iterado.oVehiculo.matricula,
			  oVenta_iterado.oVehiculo.marca,
			  oVenta_iterado.oVehiculo.modelo,
			  oVenta_iterado.oVehiculo.combustible,
			  oCompra_precedente.fecha.toLocaleDateString("es-es"),
			  oVenta_iterado.fecha.toLocaleDateString("es-es"),
			  oCompra_precedente.importe,
			  oVenta_iterado.importe,
			  oVenta_iterado.importe - oCompra_precedente.importe];
	    
	    arrArrRows.push(arrRow);
	});
	
	return UpoBeer.makeHTMLTable(arrColumnHeadings,arrArrRows);
    }

    listadoComprasPeriodo(fechaInicio,fechaFin){
	//Crear objetos Date para las fechas
	fechaInicio=new Date(fechaInicio);
	fechaFin=new Date(fechaFin);
	
	//Seleccionar datos: Vehículos registrados como comprados en el período dado
	let arroCompras_periodo;
	arroCompras_periodo = this.arroCompras.filter(function(oCompra_iterado){
	    console.log(oCompra_iterado.fecha);
	    return  fechaInicio <= oCompra_iterado.fecha && oCompra_iterado.fecha <= fechaFin;
	});

	arroCompras_periodo.sort(Compra.compararComprasFechasAsc);
	
	//Construir y devolver una tabla HTML
	let arrColumnHeadings = ["Matrícula",
				 "Marca",
				 "Modelo",
				 "Combustible",
				 "Fecha de compra",
				 "Importe de compra",
				 "NIF del cliente",
				 "Nombre del cliente",
				 "Apellidos del cliente",
				 "Teléfono del cliente"];

	let arrArrRows=[];
	arroCompras_periodo.forEach(function(oCompra_iterado){
	    let arrRow=[oCompra_iterado.oVehiculo.matricula,
			oCompra_iterado.oVehiculo.marca,
			oCompra_iterado.oVehiculo.modelo,
			oCompra_iterado.oVehiculo.combustible,
			oCompra_iterado.fecha.toLocaleDateString("es-es"),
			oCompra_iterado.importe,
			oCompra_iterado.oCliente.nif,
		       	oCompra_iterado.oCliente.nombre,
		       	oCompra_iterado.oCliente.apellidos,
		       	oCompra_iterado.oCliente.telefono];
	    arrArrRows.push(arrRow);
	});
	
	return UpoBeer.makeHTMLTable(arrColumnHeadings,arrArrRows);
    }
    
    listadoVehiculos(){
	//Construir y devolver una tabla HTML
	let arrColumnHeadings = ["Matricula",
				 "Marca",
				 "Modelo",
				 "Combustible"];
	let arrArrRows=[];
	this.catalogo.forEach(function(oVehiculo_iterado){
	    let arrRow = [oVehiculo_iterado.matricula,
			  oVehiculo_iterado.marca,
			  oVehiculo_iterado.modelo,
			  oVehiculo_iterado.combustible];
	    arrArrRows.push(arrRow);
	});
	
	return UpoBeer.makeHTMLTable(arrColumnHeadings,arrArrRows);
    }
    
    listadoClientes(){
	this.tClientes.sort(Cliente.compararClientesApellidos);

	let arrColumnHeadings = ["NIF del cliente",
				 "Nombre del cliente",
				 "Apellidos del cliente",
				 "Teléfono del cliente"];
	let arrArrRows=[];
	this.tClientes.forEach(function(oCliente_iterado){
	    let arrRow=[oCliente_iterado.nif,
			oCliente_iterado.nombre,
			oCliente_iterado.apellidos,
			oCliente_iterado.telefono];
	    arrArrRows.push(arrRow);
	});

	return UpoBeer.makeHTMLTable(arrColumnHeadings,arrArrRows);
    }


*/
