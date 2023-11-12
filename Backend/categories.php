<?php
ob_start();
session_start();
include 'init.php';

if (isset($_SESSION['Username'])) {
    // Retrieve language options
    $stmt = $con->prepare("SELECT * FROM languages");
    $stmt->execute();
    $languages = $stmt->fetchAll();

    // Retrieve solutions
    $stmt = $con->prepare("SELECT * FROM solutions_lang");
    $stmt->execute();
    $solutions = $stmt->fetchAll();

    $stmt = $con->prepare("SELECT * FROM categories_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $categories = $stmt->fetchAll();


    $stmt = $con->prepare("SELECT * FROM categories_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $categories = $stmt->fetchAll();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
                if (isset($_POST['delete_categories'])) {
                    $categoriesId = $_POST['delete_categories'];

                    // Check if the category is connected to a blog
                    $stmt = $con->prepare("SELECT * FROM blogs_lang WHERE category_id = ?");
                    $stmt->execute([$categoriesId]);
                    $category = $stmt->fetch();

                    if ($category) {
                        $_SESSION['error_message'] = 'The Category is connected to a blog and cannot be deleted.';
                        header('Location: ' . $_SERVER['PHP_SELF']);
                        exit();
                    }

                    // Delete the row from the categories_lang table
                    $stmt = $con->prepare("DELETE FROM categories_lang WHERE category_id = ?");
                    $stmt->execute([$categoriesId]);

                    $stmt = $con->prepare("DELETE FROM categories WHERE id = ?");
                    $stmt->execute([$categoriesId]);

                    $_SESSION['success_message'] = 'Category deleted successfully.';
                    header('Location: ' . $_SERVER['PHP_SELF']);
                    exit();
                } else {
                    $stmt = $con->prepare("INSERT INTO categories (id) VALUES (NULL)");
                    $stmt->execute();
                    $lastInsertId = $con->lastInsertId();
                    foreach ($languages as $language) {
                        $lang_id = $language['id'];
                        $name = $_POST['name_' . $lang_id];
                        $description = $_POST['description_' . $lang_id];
                        $image = $_FILES['image_' . $lang_id];
                        $path = "uploads/categories/" . $language['name'] . "/" . basename($image['name']);

                        $allowed = array("image/jpeg", "image/gif", "image/png", "image/webp", "image/svg+xml");
                        
                        if (!in_array($image['type'], $allowed)) {
                            $_SESSION['error_message'] = 'Only JPEG, GIF, PNG, WebP, and SVG files are allowed.';
                            header('Location: ' . $_SERVER['PHP_SELF']);
                            exit();
                        }

                        // Check if name and description fields are empty
                        if (empty($name) || empty($description)  || empty($image)  ) {
                            $_SESSION['error_message'] = 'All fields are required.';
                            header('Location: ' . $_SERVER['PHP_SELF']);
                            exit();
                        }
            
                        move_uploaded_file($image['tmp_name'], $path);
            
                        // Get the selected solution_id for the language
                        $solution_id = $_POST['solution_id_' . $lang_id];
            
                        $stmt = $con->prepare("INSERT INTO categories_lang (lang_id,solution_id ,category_id, name, description, image, path) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        $stmt->execute([$lang_id,$solution_id, $lastInsertId, $name, $description, $image['name'], $path]);
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
                    <h4 class="py-3 mb-4"><span class="text-muted fw-light"> Categories</h4>
                    <div class="card mb-4">
                        <h5 class="card-header">Categories
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
                                                    <h5 class="modal-title" id="modalCenterTitle">Add Category
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
                                                                    <input type="text" class="form-control" name="name_<?php echo $language['id']; ?>" required>                                                                
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col mb-3">
                                                                    <label for="name" class="form-label">Description</label>
                                                                    <textarea name="description_<?php echo $language['id']; ?>" required class="form-control"></textarea>
                                                                </div>
                                                            </div>

                                                            <div class="row g-2 mb-3">
                                                                <div class="col mb-0">
                                                                    <label for="image" class="form-label">Image</label>
                                                                    <input type="file" name="image_<?php echo $language['id']; ?>" required class="form-control">
                                                                </div>
                                                            </div>

                                                            <div class="row g-2">
                                                                <div class="col mb-0">
                                                                    <label for="solutions" class="form-label">Solutions</label>
                                                                    <select class="form-control" name="solution_id_<?php echo $language['id']; ?>" required>
                                                                        <?php foreach ($solutions as $solution) { ?>
                                                                            <option value="<?php echo $solution['solution_id']; ?>"><?php echo $solution['name']; ?></option>
                                                                        <?php } ?>
                                                                    </select>                                                                
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
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <?php
                                    if($categories)
                                    {
                                        $counter = 1;
                                        foreach($categories as $category)
                                        {
                                            ?>
                                            <tr>
                                                <td><?= $counter; ?></td>
                                                <td><?= $category->name; ?></td>
                                                <td><?= $category->description; ?></td>
                                                <td><img src="<?= $category->path?> "align="center"  style="width:100px"/></td>
                                                <form action="" method="POST">
                                                    <td>
                                                        <button  type="submit" name="delete_categories" value="<?=$category->category_id?>" class="btn btn-danger">Delete</button>
                                                    </td>
                                                </form>
                                            </tr>
                                        <?php
                                        $counter++; }
                                     

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