<?php
include('database.php');
    // ini_set('display_errors',1);
    // error_reporting(E_ALL);
    $db = dbConnect(); 

    $req = $_SERVER['REQUEST_METHOD']; 

    $request = substr($_SERVER['PATH_INFO'], 1); 
    $request = explode('/', $request);
    $requestRessource = array_shift($request);

    switch($req){
        case "GET" : 
            break;
        case "POST" : 
            break;
        case "PUT" : // Update
            // Parse PUT data from input stream
            parse_str(file_get_contents("php://input"), $_PUT);
            break;
        case "DELETE" :
            parse_str(file_get_contents("php://input"), $_DELETE);
            break;
    }

?>