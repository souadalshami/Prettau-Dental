<?php
header("Content-Type: application/json");
include_once("../core.php");
try {
    include '../connect.php';

    if (!isset($_GET['languageId']) && !isset($_GET['categoryId']) && !isset($_GET['blogId'])) {
        echo 'No language ID and solutions specified';
        exit;
    }

    $languageId = (int) $_GET['languageId'];
    $categoryId = (int) $_GET['categoryId'];
    $blogId = (int) $_GET['blogId'];

    $query = "
        SELECT b.id, blog.title, blog.content, blog.image, blog.path, blog.image_after, blog.path2, blog.category_id,blog.blog_id
        FROM blogs b
        JOIN blogs_lang blog ON blog.blog_id = b.id
        WHERE blog.lang_id = :languageId
        AND blog.category_id = :categoryId
        AND b.id = :blogId
    ";

    $statement = $con->prepare($query);

    $statement->bindValue(':languageId', $languageId, PDO::PARAM_INT);
    $statement->bindValue(':categoryId', $categoryId, PDO::PARAM_INT);
    $statement->bindValue(':blogId', $blogId, PDO::PARAM_INT);

    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>