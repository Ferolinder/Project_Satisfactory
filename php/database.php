<?php

// ini_set('display_errors',1);
include('constants.php');

function dbConnect(){ //connexion avec la base de données
    $dsn = 'pgsql:dbname='.db_name.';host='.db_serveur.';port='.db_port;
    try {
        $conn = new PDO($dsn, db_user, db_password);
        return $conn;
    } catch (PDOException $e) {
        echo 'Connexion échouée : ' . $e->getMessage();
    }
}

// GET function 
// item
function dbGET_item($db, $type){
    $sql = "SELECT id_i,name_i,descr,extraction_method,qtt_p from item WHERE type_i=:type;";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':type', $type, PDO::PARAM_INT);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $items;
}

//Machine
function dbGET_machine($db, $type){
    $sql = "SELECT id_ma,name_ma,descr,exit_type,natural_boost from machine WHERE type_ma=:type;";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':type', $type, PDO::PARAM_INT);
    $stmt->execute();
    $machines = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $machines;
}


// Mine
function dbGET_mine($db){
    $sql = "SELECT mine.id_mi, mine.name_mi, mine.id_I, item.name_i, item.qtt_p, mine.id_MA, machine.name_ma, machine.natural_boost, mine.boost, mine.slug, mine.quality
        FROM mine, item, machine
        WHERE mine.id_I = item.id_i AND mine.id_MA = machine.id_ma;";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $mines = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $mines;
}

// POST function
// Add a mine 
function dbPOST_mine($db, $data){
    $sql = "INSERT INTO mine (name_mi, quality, id_MA, id_I, boost, slug) VALUES (:name_mi, :quality, :id_MA, :id_I, :boost, :slug)";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':name_mi', $data['name_mi']);
    $stmt->bindParam(':id_I', $data['id_i']);
    $stmt->bindParam(':id_MA', $data['id_ma']);
    $stmt->bindParam(':quality', $data['quality']);
    $stmt->bindParam(':boost', $data['boost']);
    $stmt->bindParam(':slug', $data['slug']);
    return $stmt->execute();
}

// PUT function
// Update Mine
function dbPUT_mine($db, $data){
    $sql = "UPDATE mine SET name_mi = :name_mi, quality = :quality, id_MA = :id_MA, id_I = :id_I, boost = :boost, slug = :slug WHERE id_mi = :id_mi";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':name_mi', $data['name_mi']);
    $stmt->bindParam(':id_I', $data['id_i']);
    $stmt->bindParam(':id_MA', $data['id_ma']);
    $stmt->bindParam(':quality', $data['quality']);
    $stmt->bindParam(':boost', $data['boost']);
    $stmt->bindParam(':slug', $data['slug']);
    $stmt->bindParam(':id_mi', $data['id_mi']);
    return $stmt->execute();
}

// Update item
function dbPUT_item_qttP($db,$data){
    // Update the production quantity (qtt_p) of an item when a mine's production changes.
    // - data['id_i']: ID of the item
    // - data['old_qtt_p']      : previous production quantity from the mine
    // - data['new_qtt_p']      : new production quantity from the mine
    // - data['current_qtt_p']  : current qtt produced
    // The item's total production is decreased by the old value and increased by the new value.
    $updated_qtt_p = floatval($data['current_qtt_p']) - floatval($data['old_qtt_p']) + floatval($data['new_qtt_p']);

    $sql = "UPDATE item SET qtt_p = :qtt_p WHERE id_i = :id_i";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':qtt_p', $updated_qtt_p, PDO::PARAM_STR); // For PostgreSQL, use PARAM_STR for floats
    $stmt->bindValue(':id_i', $data['id_i'], PDO::PARAM_INT);
    return $stmt->execute();
}

// DELETE function 
// Delete mine
function dbDELETE_mine($db,$data){
    $sql = "DELETE FROM mine WHERE id_mi = :id_mi";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id_mi', $data['id_mi'], PDO::PARAM_INT);
    return $stmt->execute();
}
?>