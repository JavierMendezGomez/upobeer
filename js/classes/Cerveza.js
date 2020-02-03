// [x]
class Cerveza {

    constructor(sNombre,fPorcentaje,fPrecio,iStock)
    {
        this.idCerveza=modelo.contadorCervezas+1;
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
    oFila.id = "filaCatalogo";
    oFila.classList = "contenidoTabla";
	oFila.insertCell(-1).textContent=this.nombre;
	oFila.insertCell(-1).textContent=this.porcentaje;
	oFila.insertCell(-1).textContent=this.precio;
	oFila.insertCell(-1).textContent=this.stock;
    let foto = document.createElement("img");
    foto.id= "fotoCatalogo";
    foto.src = this.foto;
    oFila.insertCell(-1).appendChild(foto);
	return oFila;
    }
}
