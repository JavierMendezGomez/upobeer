<?php
$operations=["insert","delete"];

$operationSelected;
foreach($operations as $operationIter){
    if(isset($_POST["operation"])
       &&$_POST["operation"]==$operationIter){
        $operationSelected=$_POST["operation"];
    }
}

$inputFields=["usuario","dni","nombre","apellidos","fechanacimiento","direccion","telefono","supervisor"];
$inputFieldsAssoc=array();
foreach($inputFields as $field){
    $inputFieldsAssoc[$field]=isset($_POST[$field]) ? $_POST[$field] : false;
}

/////////////////////////////////
$status="noop";
$message="";

$conn=new PDO();
$sql;
$insertId;

switch($operationSelected){
case "insert":
    $neededFields=["usuario","dni","nombre","apellidos","fechanacimiento","direccion","telefono","supervisor"];
    $neededFieldsString=implode(",",$neededFields);
    $neededParametersArray=[];
    $executeAssoc=array();
    //
    foreach($neededFields as $field){
        if(!isset($inputFieldsAssoc[$field])){
            throw new Exception("Faltan campos");
        }
        $neededParametersArray[]=":".$field;
        $executeAssoc[$field]=$inputFieldsAssoc[$field];
    }
    $neededParametersString=implode(",",$neededParametersArray);

    //
    $sql="
insert into operario ({$neededFieldsString})
values($neededParametersString)
";
                    
    try {
        $conn->prepare($sql);
        $stmt->execute($executeAssoc);
        $insertId=$conn->lastInsertId();
        $status="success";
    } catch(PDOException $e){
        $status="error";
        $message=$e;
    }
break;
    
case "delete":
    $neededKey="dni";
    if(!$inputFieldsAssoc[$neededKey]){
        throw new Exception("Falta {$neededKey}"
    }else{
        $sql="
delete from operario 
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

header("ContentType: application/json");
echo $output;
