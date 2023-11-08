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
        SELECT b.id, blog.title, blog.content, blog.image, blog.path, blog.image_after, blog.path2, blog.category_id
        FROM blogs b
        JOIN blogs_lang blog ON blog.blog_id = b.id
        WHERE blog.lang_id = :languageId
        ORDER BY b.id DESC
        LIMIT 3;
    ";

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