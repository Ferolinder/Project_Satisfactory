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

// GET functions 
//-- step

//-- production

//-- mine
function dbGET_mine($db){
    $sql = "SELECT mine.*, item.name_i, item.qtt_p, machine.id_ma, machine.name_ma, machine.conso, machine.natural_boost, machine_use.boost, machine_use.slug            FROM mine
            LEFT JOIN item ON mine.id_i_mi = item.id_i
            LEFT JOIN machine_use ON mine.id_u_mi = machine_use.id_mu
            LEFT JOIN machine ON machine_use.id_ma_mu = machine.id_ma";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $mines = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $mines;
};

//-- recipe

//-- machine_use

//-- machine
function dbGET_extractor_machine($db){
    $sql = "SELECT id_ma, name_ma, conso, output_type, natural_boost FROM machine WHERE type_ma=1";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $items;
};

//-- item
function dbGET_item_primary($db){
    $sql = "SELECT id_i, name_i, type_i, primary_i, qtt_p FROM item WHERE primary_i=TRUE AND type_i!=0";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $items;
};

// POST functions 
//-- step
//-- production
//-- mine
function dbPOST_mine($db, $data){
    // Insert into machine_use
    $sql_machine_use = "INSERT INTO machine_use (id_ma_mu, slug, boost) VALUES (:machine, :slug, :boost) RETURNING id_mu";
    $stmt_machine_use = $db->prepare($sql_machine_use);
    $stmt_machine_use->execute([
        ':machine' => $data['machine'],
        ':slug'    => $data['slug'],
        ':boost'   => $data['boost']
    ]);
    $id_mu = $stmt_machine_use->fetchColumn();

    // Insert into mine
    $sql_mine = "INSERT INTO mine (name_mi, quality, id_u_mi, id_i_mi) VALUES (:name, :quality, :id_u_mi, :item)";
    $stmt_mine = $db->prepare($sql_mine);
    $stmt_mine->execute([
        ':name'    => $data['name'],
        ':quality' => $data['quality'],
        ':id_u_mi' => $id_mu,
        ':item'    => $data['item']
    ]);
    // Update item.qtt_p by adding the result value
    $sql_update_item = "UPDATE item SET qtt_p = qtt_p + :result WHERE id_i = :item_id";
    $stmt_update_item = $db->prepare($sql_update_item);
    $stmt_update_item->execute([
        ':result'  => $_POST['result'],
        ':item_id' => $data['item']
    ]);
    return $db->lastInsertId('mine_id_mi_seq');
}
//-- recipe
//-- machine_use
//-- machine
//-- item

// PUT functions 
//-- step
//-- production
//-- mine
function dbPUT_mine($db, $data){
    // Update machine_use
    $sql_get_mine = "SELECT id_u_mi, id_i_mi FROM mine WHERE id_mi = :id_mi";
    $stmt_get_mine = $db->prepare($sql_get_mine);
    $stmt_get_mine->execute([':id_mi' => $data['id_mi']]);
    $mine = $stmt_get_mine->fetch(PDO::FETCH_ASSOC);

    if (!$mine) {
        return false;
    }

    $id_u_mi = $mine['id_u_mi'];
    $old_item_id = $mine['id_i_mi'];
    $new_item_id = $data['item'];

    // Update machine_use
    $sql_update_machine_use = "UPDATE machine_use SET id_ma_mu = :machine, slug = :slug, boost = :boost WHERE id_mu = :id_mu";
    $stmt_update_machine_use = $db->prepare($sql_update_machine_use);
    $stmt_update_machine_use->execute([
        ':machine' => $data['machine'],
        ':slug'    => $data['slug'],
        ':boost'   => $data['boost'],
        ':id_mu'   => $id_u_mi
    ]);

    // Update mine
    $sql_update_mine = "UPDATE mine SET name_mi = :name, quality = :quality, id_i_mi = :item WHERE id_mi = :id_mi";
    $stmt_update_mine = $db->prepare($sql_update_mine);
    $stmt_update_mine->execute([
        ':name'    => $data['name'],
        ':quality' => $data['quality'],
        ':item'    => $data['item'],
        ':id_mi'   => $data['id_mi']
    ]);

    // Update item.qtt_p for old item (subtract previous_result)
    $sql_update_old_item = "UPDATE item SET qtt_p = qtt_p - :previous_result WHERE id_i = :old_item_id";
    $stmt_update_old_item = $db->prepare($sql_update_old_item);
    $stmt_update_old_item->execute([
        ':previous_result' => $data['previous_result'],
        ':old_item_id'     => $old_item_id
    ]);

    // Update item.qtt_p for new item (add new_result)
    $sql_update_new_item = "UPDATE item SET qtt_p = qtt_p + :new_result WHERE id_i = :new_item_id";
    $stmt_update_new_item = $db->prepare($sql_update_new_item);
    $stmt_update_new_item->execute([
        ':new_result'   => $data['new_result'],
        ':new_item_id'  => $new_item_id
    ]);
}
//-- recipe
//-- machine_use
//-- machine
//-- item

// DELETE functions 
//-- step
//-- production
//-- mine
function dbDELETE_mine($db, $data){
    // Get the mine to retrieve id_u_mi (machine_use id)
    $sql_get_mine = "SELECT id_u_mi FROM mine WHERE id_mi = :id_mi";
    $stmt_get_mine = $db->prepare($sql_get_mine);
    $stmt_get_mine->execute([':id_mi' => $data['id_mi']]);
    $id_u_mi = $stmt_get_mine->fetchColumn();

    // Delete the mine
    $sql_delete_mine = "DELETE FROM mine WHERE id_mi = :id_mi";
    $stmt_delete_mine = $db->prepare($sql_delete_mine);
    $stmt_delete_mine->execute([':id_mi' => $data['id_mi']]);

    // Delete the linked machine_use
    if ($id_u_mi) {
        $sql_delete_machine_use = "DELETE FROM machine_use WHERE id_mu = :id_mu";
        $stmt_delete_machine_use = $db->prepare($sql_delete_machine_use);
        $stmt_delete_machine_use->execute([':id_mu' => $id_u_mi]);
    }

    // Subtract mine_prod from item.qtt_p
    $sql_update_item = "UPDATE item SET qtt_p = qtt_p - :mine_prod WHERE id_i = :id_i";
    $stmt_update_item = $db->prepare($sql_update_item);
    $stmt_update_item->execute([
        ':mine_prod' => $data['mine_prod'],
        ':id_i'      => $data['id_i']
    ]);
}
//-- recipe
//-- machine_use
//-- machine
//-- item