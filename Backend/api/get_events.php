<?php
header("Content-Type:text/plain");
include_once("../core.php");
try {
    
    include '../connect.php' ; 
    if (!isset($_GET['languageId'])) {
        echo 'No language ID specified';
        exit;
    }

    $languageId = (int) $_GET['languageId'];

    $query = "SELECT event.title, event.path ,eve.id FROM events_lang event JOIN events eve ON event.event_id = eve.id WHERE event.lang_id= :languageId";
    $statement = $con->prepare($query);
    $statement->bindValue(':languageId', $languageId, PDO::PARAM_INT);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_OBJ);
    $json = json_encode($results);
    echo $json;

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>