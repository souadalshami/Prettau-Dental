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

    $query = "SELECT video.title,video.path,video_path, ved.id FROM videos_lang video JOIN videos ved ON video.video_id = ved.id WHERE video.lang_id= :languageId";
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