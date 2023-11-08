<?php
header("Content-Type:text/plain");
include_once("../core.php");
try {

    include '../connect.php' ; 
    if (!isset($_GET['languageId']) && !isset($_GET['solutionId']) ) {
        echo 'No language ID and solutions specified';
        exit;
    }

    $languageId = (int) $_GET['languageId']; // Cast to integer
    $solutionId = (int) $_GET['solutionId']; // Cast to integer

    $query = "
        SELECT c.id, cl.name, cl.description, cl.image, cl.path
        FROM categories c
        JOIN categories_lang cl ON cl.category_id = c.id
        WHERE cl.lang_id = :languageId
        AND cl.solution_id = :solutionId;
    ";

    $statement = $con->prepare($query);

    // Bind the language ID parameter
    $statement->bindValue(':languageId', $languageId, PDO::PARAM_INT);
    $statement->bindValue(':solutionId', $solutionId, PDO::PARAM_INT);

    // Execute the query
    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_OBJ);
    $json = json_encode($results);
    echo $json;

    // // Fetch the results
    // $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    // if (empty($results)) {
    //     // No results found for the given language ID
    //     echo 'No results found';
    // } else {
    //     // Process the results as needed
    //     foreach ($results as $row) {
    //         $solutionName = $row['name'];
    //         // Do something with the solution name
    //     }
    // }
} catch (PDOException $e) {
    // Handle any database errors
    echo 'Error: ' . $e->getMessage();
}
?>