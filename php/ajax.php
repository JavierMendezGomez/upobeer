<?php
/**
 * @author Javier Méndez Gómez
 * @license AGPLV3
 */
class Upobeer_ajax{
    private $operations=["insertone","updateonepk","deleteonepk","selectonepk","selectall"];
    private $objects=array(
        "Cerveza"=>array(
            "inputfieldnames"=>["idCerveza","nombre","porcentaje","precio","stock","foto"],
            "insertfieldnames"=>["nombre","porcentaje","precio","stock","foto"],
            "pkfieldnames"=>["idCerveza"],
        ),
        "Operario"=>array(
            "inputfieldnames"=>["usuario","dni","nombre","apellidos","fechaNacimiento","direccion","telefono","supervisor"],
            "insertfieldnames"=>["usuario","dni","nombre","apellidos","fechaNacimiento","direccion","telefono","supervisor"],
            "pkfieldnames"=>["dni"],
        ),
        "Cliente"=>array(
            "inputfieldnames"=>["usuario","dni","nombre","apellidos","fechaNacimiento","direccion","telefono"],
            "insertfieldnames"=>["usuario","dni","nombre","apellidos","fechaNacimiento","direccion","telefono"],
            "pkfieldnames"=>["dni"],
        ),
        "Pedido"=>array(
            "inputfieldnames"=>["idPedido","dniCliente","estado","fechaInicio","fechaFin"],
            "insertfieldnames"=>["dniCliente","estado","fechaInicio","fechaFin"],
            "pkfieldnames"=>["idPedido"],
            "nullablefieldnames"=>["fechaFin"]
        ),
        "LineaPedido"=>array(
            "inputfieldnames"=>["idPedido","idProducto","cantidad"],
            "insertfieldnames"=>["idPedido","idProducto","cantidad"],
            "pkfieldnames"=>["idPedido","idProducto"],
        ),
    );

    protected $status="noop";
    protected $messages=[];
    private $operationSelected=null;
    private $objectSelected;
    private $inputFieldsAssoc;
    private $parametersOK=false;
    private $transactionOK=false;
    private $firstPassOK=false;
    private $insertId;
    private $resultData=[];
    private $rowsAffected;
    private function report_success($successMessage=null){
        $this->status="success";
        $this->messages[]=$successMessage;
    }
    private function report_error($errorMessage){
        $this->status="error";
        $this->messages[]=$errorMessage;
    }
    
    private function insert_helper(){
        $neededFieldNames=$this->objects[$this->objectSelected]["insertfieldnames"];
        $nullableFieldNames=$this->objects[$this->objectSelected]["nullablefieldnames"];

        $neededFieldNamesString=implode(",",$neededFieldNames);
    
        $neededParametersArray=[];
        $executeAssoc=array();
        //
        $missingFields=false;
        $missingFieldsArray=[];
        foreach($neededFieldNames as $field){
            if(!in_array($field,$nullableFieldNames)){
                if(!isset($this->inputFieldsAssoc[$field])){
                    $missingFieldsArray[]=$field;
                    $missingFields=true;
                }
            }
            if(!$missingFields) {
                $neededParametersArray[]=":".$field;
                $executeAssoc[$field]=(isset($this->inputFieldsAssoc[$field]))?$this->inputFieldsAssoc[$field]:null;
            }
        }
        if($missingFields){
            $errorMessage="Faltan campos:".implode(", ", $missingFieldsArray);
            $this->report_error($errorMessage);
            return null;
        } else {
            $neededParametersString=implode(",",$neededParametersArray);
            return array(
                //insert into(.........)
                "neededFieldNamesString"=>$neededFieldNamesString,
                //values(:..:..:..)
                "neededParametersString"=>$neededParametersString,
                //$stmt->execute(....)
                "executeAssoc"=>$executeAssoc,
            );
        }
    }
    private function where_pk_helper(){
        $pkFieldNames=$this->objects[$this->objectSelected]["pkfieldnames"];
        //
        $missingFields=false;
        $missingFieldsArray=[];
        $whereString=" WHERE 1=1 ";
        $executeAssoc=array();
        foreach($pkFieldNames as $field){
            if(!isset($this->inputFieldsAssoc[$field])){
                $missingFieldsArray[]=$field;
                $missingFields=true;
            }
            if(!$missingFields) {
                $neededParametersArray[]=":".$field;
                $executeAssoc[$field]=isset($this->inputFieldsAssoc[$field]);
            }
        }
        if($missingFields){
            $errorMessage="Faltan campos:".implode(", ", $missingFieldsArray);
            $this->report_error($errorMessage);
            return null;
        } else {
            return array(
                "whereString"=>$whereString,
                //$stmt->execute(....)
                "wherePkExecuteAssoc"=>$executeAssoc,
            );
        }
    }

    private function update_set_helper(){
        $setFieldNames=$this->objects[$this->objectSelected]["insertfieldnames"];
        $pkFieldNames=$this->objects[$this->objectSelected]["pkfieldnames"];
        foreach($pkFieldNames as $field){
            if (($index = array_search($field, $setFieldNames)) !== false) {
                unset($setFieldNames[$index]);
            }
        }
    
        $setString=" SET ";
    
        $executeAssoc=array();
        if(sizeof($setFieldNames)>0){
            //
            $missingFields=false;
            $missingFieldsArray=[];
            $count=0; foreach($setFieldNames as $index=>$field){
                if(!isset($this->inputFieldsAssoc[$field])){
                    $missingFieldsArray[]=$field;
                    $missingFields=true;
                }
                if(!$missingFields) {
                    $setString.=" {$field} = :{$field} " ;
                    $setString.= ($count<(sizeof($setFieldNames)-1)) ? "," : "" ; //poner coma al final siempre excepto en el último elemento
                    $executeAssoc[$field]=$this->inputFieldsAssoc[$field];
                }
                $count++;
            }
            if($missingFields){
                $errorMessage="Faltan campos: ".implode(", ", $missingFieldsArray);
                $this->report_error($errorMessage);
                return null;
            } else {
                return array(
                    "setString"=>$setString,
                    //$stmt->execute(....)
                    "updateSetExecuteAssoc"=>$executeAssoc,
                );
            }
        } else {
            return null;
        }
    }
    
    private function checkObjectSelected(){
        if(isset($_REQUEST["object"]))
            foreach($this->objects as $objectName=>$objectValue)
                if($_REQUEST["object"]==$objectName)
                    $this->objectSelected=$_REQUEST["object"];
    }
    private function checkInputFields(){
        $this->inputFieldsAssoc=array();
        if($this->objectSelected!=null){
            $inputFieldNames=$this->objects[$this->objectSelected]["inputfieldnames"];
            foreach($inputFieldNames as $field)
                if (isset($_REQUEST[$field]))
                    $this->inputFieldsAssoc[$field]=$_REQUEST[$field];
        }
    }
    private function checkOperation (){
    if(isset($_REQUEST["operation"]))
            foreach($this->operations as $operationIter)
                if($_REQUEST["operation"]==$operationIter)
                    $this->operationSelected=$_REQUEST["operation"];
    }
    private function checkPoint_firstPass(){
        
        if($this->objectSelected!=null){
            if($this->operationSelected!=null){
                $this->firstPassOK=true;
            } else {
                $this->report_error("No se ha seleccionado ninguna operación");
            }
        } else {
            $this->report_error("No se ha seleccionado ningún objeto sobre el que actuar");
        }
    }

    public function __construct(){
        $this->checkObjectSelected();
        $this->checkInputFields();
        $this->checkOperation();
        $this->checkPoint_firstPass();
    }
    public function execute(){
        $this->tryDB();
        $this->bringOutput();
    }
    
    private function tryDB(){
        if($this->firstPassOK){
            /////////////////////////////////
            $conn=new PDO('mysql:host=localhost;dbname=upobeer','root','');
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql;

            switch($this->operationSelected){
            case "insertone":
                $insertHelperAssoc=$this->insert_helper();
                if($insertHelperAssoc!=null){
                    $this->parametersOK=true;
                    extract($insertHelperAssoc);

                    //se han dejado en variables el nombre de la tabla, los nombres de las columnas separados por comas y los nombres de los valores (parámetros :loquesea) separados con comas
                    $sql="
                    insert into {$this->objectSelected} ({$neededFieldNamesString})
                    values($neededParametersString)
                    ";
                    
                    try {
                        $conn->beginTransaction();
                        $stmt=$conn->prepare($sql);
                        $stmt->execute($executeAssoc);
                        $this->rowsAffected=$stmt->rowCount();
                        $this->insertId=$conn->lastInsertId();
                        
                        $this->report_success("Insertado");
                        $this->transactionOK=true;
                        $conn->commit();
                    } catch(PDOException $e){
                        $this->report_error($e);
                        $conn->rollBack();
                    }
                }
                break;
    
            case "updateonepk":
                $updateSetHelperAssoc=$this->update_set_helper();
                $wherePkHelperAssoc=$this->where_pk_helper();
                if($updateSetHelperAssoc!=null && $wherePkHelperAssoc!=null ){
                    $this->parametersOK=true;
                    extract($updateSetHelperAssoc);
                    extract($wherePkHelperAssoc);

                    $executeAssoc=array_merge($updateSetExecuteAssoc,$wherePkExecuteAssoc);
            
                    $sql="
            update {$this->objectSelected}
            ".$setString.$whereString;
                    try{
                        $conn->beginTransaction();
                        $stmt=$conn->prepare($sql);
                        $stmt->execute($executeAssoc);
                        $this->rowsAffected=$stmt->rowCount();
                        if($this->rowsAffected==1){
                            $conn->commit();
                            $this->report_success("Modificado");
                            $this->transactionOK=true;
                        } else {
                            $conn->rollBack();
                            $this->report_error("No se modificó");
                        }
                    } catch(PDOException $e){
                        $conn->rollBack();
                        $this->report_error($e);
                    }
                }
                break;

            case "deleteonepk":
                $wherePkHelperAssoc=$this->where_pk_helper();
                if($wherePkHelperAssoc!=null){
                    $this->parametersOK=true;
                    extract($wherePkHelperAssoc);
                    $executeAssoc=$wherePkExecuteAssoc;

                    $sql="
                    delete from {$this->objectSelected}
                    ".$whereString;
            
                    try{
                        $conn->beginTransaction();
                        $stmt=$conn->prepare($sql);
                        $stmt->execute($executeAssoc);
                        $this->rowsAffected=$stmt->rowCount();
                        if($this->rowsAffected==1){
                            $conn->commit();
                            $this->report_success("Eliminado");
                            $this->transactionOK=true;
                        } else {
                            $conn->rollBack();
                            $this->report_error("No se eliminó");
                        }
                    } catch(PDOException $e){
                        $conn->rollBack();
                        $this->report_error($e);
                    }
                }
                break;
        
            case "selectonepk":
                $wherePkHelperAssoc=$this->where_pk_helper();
                if($wherePkHelperAssoc!=null){
                    $this->parametersOK=true;
                    extract($wherePkHelperAssoc);
                    $executeAssoc=$wherePkExecuteAssoc;
            
                    $sql="
                    select * from {$this->objectSelected}
                    ".$whereString;
           
                    try{
                        $stmt=$conn->prepare($sql);
                        $stmt->execute($executeAssoc);
                        $this->rowsAffected=$stmt->rowCount();

                        $this->resultData[]=$resultRow=$stmt->fetch(PDO::FETCH_ASSOC);
                
                        $this->report_success("{$this->rowsAffected} resultados");
                        $this->transactionOK=true;
                    } catch(PDOException $e){
                        $this->report_error($e);
                    }
                }
                break;

            case "selectall":
                $this->parametersOK=true;

                $inputFieldsString=implode(",",$this->objects[$this->objectSelected]["inputfieldnames"]);
                $sql="
                select
                   {$inputFieldsString}
                from {$this->objectSelected}
                ";
           
                try{
                    $stmt=$conn->prepare($sql);
                    $stmt->execute();
                    $this->rowsAffected=$stmt->rowCount();

                    while($resultRow = $stmt->fetch(PDO::FETCH_ASSOC)){
                        $this->resultData[]=$resultRow;
                    }
                
                    $this->report_success("{$this->rowsAffected} resultados");
                    $this->transactionOK=true;
                } catch(PDOException $e){
                    $this->report_error($e);
                }
                break;
            }
        }
    }
    private function bringOutput(){
        if($this->status=="error")
            http_response_code(400);
        
        $output=array(
            "status"=>$this->status,
            "messages"=>$this->messages,
            "objectselected"=>$this->objectSelected,
            "operationselected"=>$this->operationSelected,
            "firstpassok"=>$this->firstPassOK,
            "parametersok"=>$this->parametersOK,
            "transactionok"=>$this->transactionOK
        );
        switch ($this->operationSelected){
        case "insertone":
            $output["insertid"]=$this->insertId;
            $output["rowsaffected"]=$this->rowsAffected;
            break;
        case "updateonepk":
            $output["rowsaffected"]=$this->rowsAffected;
            break;
        case "deleteonepk":
            $output["rowsaffected"]=$this->rowsAffected;
            break;
        case "selectonepk":
        case "selectall":
            $output["resultdata"]=$this->resultData;
            break;
        }

        header("Content-Type: application/json");
        echo json_encode($output,JSON_PRETTY_PRINT);
    }
}

$upobeer_ajax=new Upobeer_ajax();
$upobeer_ajax->execute();
