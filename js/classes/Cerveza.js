// [x]
class Cerveza {

    constructor(sNombre,fPorcentaje,fPrecio,iStock)
    {
        this.idCerveza=modelo.contadorCervezas+1;
	modelo.contadorCervezas++;
        this.nombre=sNombre;
        this.porcentaje=fPorcentaje;
        this.precio=fPrecio;
        this.stock=iStock;
        this.foto="Img/beer/" + this.idCerveza + ".jpg";
    }

    anadirStock(cantidad)
    {
    	if(cantidad > 0)
    	{
	    this.stock += cantidad;
	    return true;
    	}
    	return false;
    }

    quitarStock(cantidad)
    {
    	if(cantidad > 0 && (this.stock-cantidad>=0))
    	{
	    this.stock -= cantidad;
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

    toHTMLTableRow(){
	let oFila=document.createElement("TR");
	oFila.insertCell(-1).textContent=idCerveza;
	oFila.insertCell(-1).textContent=nombre;
	oFila.insertCell(-1).textContent=porcentaje;
	oFila.insertCell(-1).textContent=precio;
	oFila.insertCell(-1).textContent=stock;
	oFila.insertCell(-1).textContent=foto;
    }
}
