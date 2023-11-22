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
        SELECT b.id, blog.title, blog.content, blog.image, blog.path, blog.image_after, blog.path2, blog.category_id, blog.blog_id, cl.name
        FROM (
            SELECT blog_id, MAX(id) AS latest_id
            FROM blogs_lang
            WHERE lang_id = :languageId
            GROUP BY blog_id
        ) latest_blogs
        JOIN blogs_lang blog ON blog.id = latest_blogs.latest_id
        JOIN (
            SELECT category_id, name
            FROM categories_lang
            WHERE lang_id = :languageId
        ) cl ON cl.category_id = blog.category_id
        JOIN blogs b ON b.id = blog.blog_id
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