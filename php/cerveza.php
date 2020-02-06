<?php
$operations=["insert","delete"];

$operationSelected;
foreach($operations as $operationIter){
    if(isset($_POST["operation"])
       &&$_POST["operation"]==$operationIter){
        $operationSelected=$_POST["operation"];
    }
}


$inputFieldsAssoc=array(
    "idcerveza"=> isset($_POST["idcerveza"]) ? (int)$_POST["idcerveza"] : false,
    "nombre"=> isset($_POST["nombre"]) ? (string)$_POST["nombre"] : false,
    "porcentaje"=> isset($_POST["porcentaje"]) ? (float)$_POST["porcentaje"] : false,
    "precio"=> isset($_POST["precio"]) ? (float)$_POST["precio"] : false,
    "stock"=> isset($_POST["stock"]) ? (int)$_POST["stock"] : false,
    "foto"=> isset($_POST["foto"]) ? (string)$_POST["foto"] : false
);

/////////////////////////////////
$status="noop";
$message="";

$conn=new PDO();
$sql;
$insertId;

switch($operationSelected){
case "insert":
    if(!$inputFieldsAssoc["nombre"]
       && !$inputFieldsAssoc["porcentaje"]
       && !$inputFieldsAssoc["precio"]
       && !$inputFieldsAssoc["stock"]
       && !$inputFieldsAssoc["foto"]){
           throw new Exception("Faltan campos");
    }else{
         $sql=<<<SQLSTRING
insert into cerveza (nombre,porcentaje,precio,stock,foto)
values(:nombre,:porcentaje,:precio,:stock,:foto)
SQLSTRING;
         try {
             $conn->prepare($sql);
             $stmt->execute(array(
                 "nombre"=>$parameters["nombre"],
                 "porcentaje"=>$parameters["porcentaje"],
                 "precio"=>$parameters["precio"],
                 "stock"=>$parameters["stock"],
                 "foto"=>$parameters["foto"],
             ));
             $insertId=$conn->lastInsertId();
             $status="success";
         } catch(PDOException $e){
             $status="error";
             $message=$e;
         }
    }
    break;
    
case "delete":
    $neededKey="idcerveza";
    if(!$inputFieldsAssoc[$neededKey]){
        throw new Exception("Falta {$neededKey}"
    }else{
        $sql="
delete from cerveza 
 where {$neededKey}=:{$neededKey}
";
        $executeAssoc=array();
        $executeAssoc[$neededKey]=$inputFieldsAssoc[$neededKey];
        
        try{
            $stmt=$conn->prepare($sql);
            $stmt->execute($executeAssoc);
            $status="success";
            
        } catch(PDOException $e){
            $status="error";
            $message=$e;
            
        }
    }
    break;
}

$output=array(
    "status"=>$status,
    "message"=>$message,
);
if($operationSelected=="insert"){
    $output["insertId"]=$insertId;
}
