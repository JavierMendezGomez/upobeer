let oXML = loadXMLDoc("UpoBeer.xml");

//Petición síncrona para cargar el XML
function loadXMLDoc(filename) {
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", filename, false);
    
    xhttp.send();

    return xhttp.responseXML;
}

