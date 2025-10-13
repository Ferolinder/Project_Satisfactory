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
            //-- step
            //-- production
            //-- mine
            if(isset($_GET['action']) && $_GET['action']=='get_mine'){
                echo json_encode(dbGET_mine($db));
                break;
            }
            //-- recipe
            //-- machine_use
            //-- machine
            if(isset($_GET['action']) && $_GET['action']=='get_extractor_machine'){
                echo json_encode(dbGET_extractor_machine($db));
                break;
            }
            //-- item
            if(isset($_GET['action']) && $_GET['action']=='get_primary_item'){
                echo json_encode(dbGET_item_primary($db));
                break;
            }
            break;
        case "POST" :
            //-- step
            //-- production
            //-- mine
            if(isset($_POST['action']) && $_POST['action']=='add_mine'){
                dbPOST_mine($db, $_POST);
                echo json_encode(dbGET_mine($db));
            }
            //-- recipe
            //-- machine_use
            //-- machine
            //-- item 
            break;
        case "PUT" : // Update
            // Parse PUT data from input stream
            parse_str(file_get_contents("php://input"), $_PUT);
            //-- step
            //-- production
            //-- mine
            if(isset($_PUT['action']) && $_PUT['action']=='edit_mine'){
                dbPUT_mine($db, $_PUT);
                echo json_encode(dbGET_mine($db));
            }
            //-- recipe
            //-- machine_use
            //-- machine
            //-- item
            break;
        case "DELETE" :
            parse_str(file_get_contents("php://input"), $_DELETE);
            //-- step
            //-- production
            //-- mine
            if(isset($_DELETE['action']) && $_DELETE['action']=='delete_mine'){
                dbDELETE_mine($db, $_DELETE);
                echo json_encode(dbGET_mine($db));
            }
            //-- recipe
            //-- machine_use
            //-- machine
            //-- item
            break;
    }

?>