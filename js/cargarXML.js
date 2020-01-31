let oXML = loadXMLDoc("UpoBeer.xml");

//Petición síncrona para cargar el XML
function loadXMLDoc(filename) {
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", filename, false);
    
    xhttp.send();

    return xhttp.responseXML;
}

//sacar clientes
let nodeListCervezas=oXML.querySelector("cervezas cerveza");
let nodeArrayCervezas=Array.prototype.slice.call(nodeListCervezas);

nodeArrayCervezas.forEach(function(nodeCerveza){
    let nombre=nodeCerveza.getAttribute("nombre");
    let porcentaje=nodeCerveza.getAttribute("porcentaje");
    let precio=nodeCerveza.getAttribute("precio");
    let stock=nodeCerveza.getAttribute("stock");
    let foto=nodeCerveza.getAttribute("foto");
    modelo.altaCerveza(nombre,porcentaje,precio,stock);
});

nodeArrayClientes.forEach(function(nodeCliente){
    let usuario=nodeCliente.getAttribute("usuario");
    let dni=nodeCliente.getAttribute("");
    let nombre=nodeCliente.getAttribute("nombre");
    let apellidos=nodeCliente.getAttribute("apellidos");
    let fechaNacimiento=new Date(nodeCliente.getAttribute("fechaNacimiento"));
    let direccion=nodeCliente.getAttribute("direccion");
    let telefono=nodeCliente.getAttribute("telefono");
    modelo.altaCliente(usuario,dni,nombre,apellidos,fechaNacimiento,direccion,telefono);
});

nodeArrayOperarios.forEach(function(nodeOperario){
    let usuario=nodeOperario.getAttribute("usuario");
    let supervisor=nodeOperario.getAttribute("supervisor");
    let dni=nodeOperario.getAttribute("");
    let nombre=nodeOperario.getAttribute("nombre");
    let apellidos=nodeOperario.getAttribute("apellidos");
    let fechaNacimiento=new Date(nodeOperario.getAttribute("fechaNacimiento"));
    let direccion=nodeOperario.getAttribute("direccion");
    let telefono=nodeOperario.getAttribute("telefono");
    modelo.altaOperario(usuario,dni,nombre,apellidos,fechaNacimiento,direccion,telefono,supervisor);
});
