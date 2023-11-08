<?php
header("Content-Type:text/plain");
include_once("../core.php");
try {

    include '../connect.php' ; 
    if (!isset($_GET['languageId']) && !isset($_GET['categoryId']) ) {
        echo 'No language ID and solutions specified';
        exit;
    }

    $languageId = (int) $_GET['languageId'];
    $categoryId = (int) $_GET['categoryId']; 

    $query = "
        SELECT b.id, blog.title, blog.content, blog.image, blog.path ,blog.image_after , blog.path2,blog.category_id
        FROM blogs b
        JOIN blogs_lang blog ON blog.blog_id = b.id
        WHERE blog.lang_id = :languageId
        AND blog.category_id = :categoryId;
    ";

    $statement = $con->prepare($query);

    $statement->bindValue(':languageId', $languageId, PDO::PARAM_INT);
    $statement->bindValue(':categoryId', $categoryId, PDO::PARAM_INT);

    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_OBJ);
    $json = json_encode($results);
    echo $json;
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>