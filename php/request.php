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
            if(isset($_GET['action']) && $_GET['action'] == 'getItemsMine'){                // Get all items that can be mined
                echo json_encode(dbGET_item($db, 1));
                break;
            }
            if(isset($_GET['action']) && $_GET['action'] == 'getMachineMines'){             // Get all machine that can mines
                echo json_encode(dbGET_machine($db, 1));
                break;
            }
            if(isset($_GET['action']) && $_GET['action'] == 'getMine'){                     // Get all mine
                echo json_encode(dbGET_mine($db));
                break;
            }
            echo json_encode("Error: unknown GET request");
            break;
        case "POST" : 
            if(isset($_POST['action']) && $_POST['action'] == 'addMine'){                   // Add a mine
                // Send the data to the server 
                dbPOST_mine($db, $_POST);
                dbPUT_item_qttP($db, $_POST);
                //Return all the mine (to add the new one)
                echo json_encode(dbGET_mine($db));
            }
            break;
        case "PUT" : // Update
            // Parse PUT data from input stream
            parse_str(file_get_contents("php://input"), $_PUT);
            if(isset($_PUT['action']) && $_PUT['action'] == 'updateMine'){      // Update a mine
                // Updating the data 
                dbPUT_mine($db, $_PUT);
                dbPUT_item_qttP($db,$_PUT);
                // Return all the mine
                echo json_encode(dbGET_mine($db));
            }
            break;
        case "DELETE" :
            parse_str(file_get_contents("php://input"), $params);
            if(isset($params['action']) && $params['action'] == 'deleteMine'){      // Delete a mine
                // Deleting the data 
                dbDELETE_mine($db,$params);
                // Return all the mine 
                echo json_encode(dbGET_mine($db));
            }
            break;
    }

?>