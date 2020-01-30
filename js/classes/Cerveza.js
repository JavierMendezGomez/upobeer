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
