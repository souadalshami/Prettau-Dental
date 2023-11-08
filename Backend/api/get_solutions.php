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

    $query = "
        SELECT sl.name,sl.description, s.id FROM solutions_lang sl JOIN solutions s ON sl.solution_id = s.id WHERE sl.lang_id= :languageId
    ";
    $statement = $con->prepare($query);
    $statement->bindValue(':languageId', $languageId, PDO::PARAM_INT);

    // Execute the query
    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_OBJ);
    $json = json_encode($results);
    echo $json;

} catch (PDOException $e) {
    // Handle any database errors
    echo 'Error: ' . $e->getMessage();
}
?>