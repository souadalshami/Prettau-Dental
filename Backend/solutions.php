<?php
    ob_start();
    session_start();
    include 'init.php';
if (isset($_SESSION['Username'])) {

    $stmt = $con->prepare("SELECT * FROM languages");
    $stmt->execute();
    $languages = $stmt->fetchAll();

    $stmt = $con->prepare("SELECT * FROM solutions_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $solutions = $stmt->fetchAll();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            if (isset($_POST['delete_solution'])) {
                $solutionId = $_POST['delete_solution'];

                // Check if the solution is connected to a category
                $stmt = $con->prepare("SELECT * FROM categories_lang WHERE solution_id = ?");
                $stmt->execute([$solutionId]);
                $solution = $stmt->fetch();

                if ($solution) {
                    $_SESSION['error_message'] = 'The solution is connected to a category and cannot be deleted.';
                    header('Location: ' . $_SERVER['PHP_SELF']);
                    exit();
                }

                // Delete the row from the solutions_lang table
                $stmt = $con->prepare("DELETE FROM solutions_lang WHERE solution_id = ?");
                $stmt->execute([$solutionId]);

                $stmt = $con->prepare("DELETE FROM solutions WHERE id = ?");
                $stmt->execute([$solutionId]);
                
                $_SESSION['success_message'] = 'Solution deleted successfully.';
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit();
            } else {
                $stmt = $con->prepare("INSERT INTO solutions (id) VALUES (NULL)");
                $stmt->execute();
                $lastInsertId = $con->lastInsertId();
                foreach ($languages as $language) {
                    $lang_id = $language['id'];
                    $name = $_POST['name_' . $lang_id];
                    $description = $_POST['description_' . $lang_id];

                    // Check if name and description fields are empty
                    if (empty($name) || empty($description)) {
                        $_SESSION['error_message'] = 'All fields are required.';
                        header('Location: ' . $_SERVER['PHP_SELF']);
                        exit();
                    }

                    $stmt = $con->prepare("INSERT INTO solutions_lang (lang_id,solution_id,name,description) VALUES (?, ?, ?, ?)");
                    $stmt->execute([$lang_id, $lastInsertId, $name,$description]);
                }           
                $_SESSION['success_message'] = 'Uploaded Successfully';
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit();
            }
        } catch (PDOException $e) {
            echo "Error inserting data: " . $e->getMessage();
        }
    }


?>

<div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
        <?php include $tpl. 'aside.php' ?>
        <div class="layout-page">
            <?php include $tpl. 'navbar.php' ?>
            <div class="content-wrapper">
                <div class="container-xxl flex-grow-1 container-p-y">
                    <h4 class="py-3 mb-4"><span class="text-muted fw-light"> Solutions</h4>
                    <div class="card mb-4">
                        <h5 class="card-header">Solutions
                            <button type="button" class="btn btn-primary float-end"  data-bs-toggle="modal"
                                data-bs-target="#modalCenter">
                                Add
                            </button>
                        </h5>
                        
                        <div class="card-body">
                            <?php if (isset($_SESSION['success_message'])) { 
                                echo '<div class="alert alert-success">' . $_SESSION['success_message'] . '</div>'; 
                                unset($_SESSION['success_message']);
                            } ?>

                            <?php if (isset($_SESSION['error_message'])) { 
                                echo '<div class="alert alert-danger">' . $_SESSION['error_message'] . '</div>'; 
                                unset($_SESSION['error_message']);
                            } ?>
                  
                            <div class="col-lg-12 col-md-12">
                                <div class="mt-3">
                                    <!-- Modal -->
                                    <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="modalCenterTitle">Add Solution
                                                    </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>

                                                <form method="post" enctype="multipart/form-data">
                                                    <?php foreach ($languages as $language) { ?>
                                                        <div class="modal-body">
                                                            <label for="name" class="form-label"><?php echo $language['name']; ?></label>
                                                            
                                                            <div class="row">
                                                                <div class="col mb-3">
                                                                    <label for="name" class="form-label">Name</label>
                                                                    <input type="text" name="name_<?php echo $language['id']; ?>" class="form-control" placeholder="Enter Name" required />
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col mb-3">
                                                                    <label for="name" class="form-label">Description</label>
                                                                    <input type="text" name="description_<?php echo $language['id']; ?>" class="form-control" placeholder="Enter Description" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    <?php } ?>
                                                
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-outline-secondary"
                                                            data-bs-dismiss="modal">
                                                            Close
                                                        </button>
                                                        <button type="submit" name="submit" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Descrition</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <?php
                                    if($solutions)
                                    {$counter = 1;
                                        foreach($solutions as $solution)
                                        {
                                            ?>
                                            <tr>
                                                <td><?= $counter; ?></td>
                                                <td><?= $solution->name; ?></td>
                                                <td><?= $solution->description; ?></td>
                                                <form action="" method="POST">
                                                    <td>
                                                        <button  type="submit" name="delete_solution" value="<?=$solution->solution_id?>" class="btn btn-danger">Delete</button>
                                                    </td>
                                                </form>
                                            </tr>
                                    <?php
                                     $counter++;
                                    }
                                    }
                                    else
                                    { ?>
                                        <tr>
                                            <td colspan="5">No Record Found</td>
                                        </tr>
                                    <?php }?>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="content-backdrop fade"></div>
            </div>
        </div>
    </div>
</div>

<?php 
    include $tpl. "footer.php";
    ob_end_flush();
 
}
else{
     header("Location: login.php");
     exit();
}
 ?>