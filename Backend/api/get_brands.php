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

    $query = "SELECT brand.path,brand.brand_path, br.id FROM brands_lang brand JOIN brands br ON brand.brand_id = br.id WHERE brand.lang_id= :languageId";
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