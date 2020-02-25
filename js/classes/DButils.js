class DBUtils{
    static peticionBBDD(parametros,objeto,alertar){
	let oAjax = new XMLHttpRequest();

	//En parámetros se copian todas las propiedades del objeto que sea
	Object.assign(parametros,objeto);
	
	oAjax.open("POST", "/php/ajax.php",false);
	oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
        //Asociar manejador de evento de la respuesta
	let bHecho=false;
	oAjax.addEventListener("readystatechange", function(){
	    let oAjax = this;
            if (oAjax.readyState == 4){
		if(oAjax.status == 200) {
		    bHecho=true;
		}
	    }
	},false);

	// Hacer la petición ajax
	oAjax.send();
	let salida=false;
	if(bHecho){
	    salida=JSON.parse(oAjax.responseText);
	}
	return salida;
    }

    static prepararParametros(parametros){
	//Para no liarla con lo de los parámetros y URLencode
	let oURLSearchParams=new URLSearchParams(parametros);

	//Para que PHP entienda los true y false
	oURLSearchParams.forEach(function(value,key){
	    if(value=="true")
		oURLSearchParams.set(key,1);
	    else if (value=="false")
		oURLSearchParams.set(key,0);
	});
	
	return oURLSearchParams.toString();	
    }

    cargarCervezas(){
	    let parametros={
		object: "Cerveza",
		operation: "selectall"
	    };
	    let objeto={idCerveza:idCerveza};
	    
	    let JSONRecibido=this.peticionBBDD(parametros,objeto,false);
	    if(JSONRecibido){
		let JSONCerveza=JSONRecibido.resultdata[0];
		let oCerveza=new Cerveza();
		Object.assign(oCerveza,JSONCerveza);
		return oCerveza;
	    } else {
		return false;
	    }
    }
    pedirTodosClientes(){

    }
    pedirTodosOperarios(){

    }
    pedirTodosPedidos(){

    }
}
