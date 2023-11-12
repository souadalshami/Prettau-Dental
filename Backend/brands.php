<?php
ob_start();
session_start();
include 'init.php';

if (isset($_SESSION['Username'])) {
    $stmt = $con->prepare("SELECT * FROM languages");
    $stmt->execute();
    $languages = $stmt->fetchAll();

    $stmt = $con->prepare("SELECT * FROM brands_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $brands = $stmt->fetchAll();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
                if (isset($_POST['delete_brand'])) {
                    $brandId = $_POST['delete_brand'];

                    // Delete the row from the brands_lang table
                    $stmt = $con->prepare("DELETE FROM brands_lang WHERE brand_id = ?");
                    $stmt->execute([$brandId]);

                    $stmt = $con->prepare("DELETE FROM brands WHERE id = ?");
                    $stmt->execute([$brandId]);

                    $_SESSION['success_message'] = 'Brands deleted successfully.';
                    header('Location: ' . $_SERVER['PHP_SELF']);
                    exit();
                } else {
                    $stmt = $con->prepare("INSERT INTO brands (id) VALUES (NULL)");
                    $stmt->execute();
                    $lastInsertId = $con->lastInsertId();
                    foreach ($languages as $language) {
                        $lang_id = $language['id'];
                        $image = $_FILES['image_' . $lang_id];
                        $path = "uploads/brands/" . $language['name'] . "/" . basename($image['name']);
                        $brand_path = $_POST['brand_path_' . $lang_id];

                        $allowed = array("image/jpeg", "image/gif", "image/png", "image/webp", "image/svg+xml");
                        
                        if (!in_array($image['type'], $allowed)) {
                            $_SESSION['error_message'] = 'Only JPEG, GIF, PNG, WebP, and SVG files are allowed.';
                            header('Location: ' . $_SERVER['PHP_SELF']);
                            exit();
                        }

                        // Check if path and image fields are empty
                        if (empty($image) || empty($brand_path) ) {
                            $_SESSION['error_message'] = 'All fields are required.';
                            header('Location: ' . $_SERVER['PHP_SELF']);
                            exit();
                        }

                        move_uploaded_file($image['tmp_name'], $path);

                        $stmt = $con->prepare("INSERT INTO brands_lang (lang_id,brand_id,image, path ,brand_path) VALUES (?, ?, ?, ?, ?)");
                        $stmt->execute([$lang_id, $lastInsertId, $image['name'], $path,$brand_path]);
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

?>

<div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
        <?php include $tpl. 'aside.php' ?>
        <div class="layout-page">
            <?php include $tpl. 'navbar.php' ?>
            <div class="content-wrapper">
                <div class="container-xxl flex-grow-1 container-p-y">
                    <h4 class="py-3 mb-4"><span class="text-muted fw-light"> Brands</h4>
                    <div class="card mb-4">
                        <h5 class="card-header">Brands
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
                                                    <h5 class="modal-title" id="modalCenterTitle">Add Brand
                                                    </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>

                                                <form method="post" enctype="multipart/form-data">
                                                    <?php foreach ($languages as $language) { ?>
                                                        <div class="modal-body">
                                                            <label for="name" class="form-label"><?php echo $language['name']; ?></label>
                                                            <div class="row g-2 mb-3">
                                                                <div class="col mb-0">
                                                                    <label for="image" class="form-label">Image</label>
                                                                    <input type="file" name="image_<?php echo $language['id']; ?>" class="form-control" required/>
                                                                </div>
                                                            </div>
                                                            <div class="row g-2">
                                                                <div class="col mb-0">
                                                                    <label for="brand_path" class="form-label">Brand Path</label>
                                                                    <input type="text" name="brand_path_<?php echo $language['id']; ?>" class="form-control" placeholder="Enter Path" required/>
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
                                        <th>Image</th>
                                        <th>View</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <?php
                                    if($brands)
                                    {   $counter = 1;
                                        foreach($brands as $brand)
                                        {
                                            ?>
                                            <tr>
                                                <td><?= $counter; ?></td>
                                                <td><img src="<?= $brand->path?> "align="center"  style="width:100px"/></td>
                                                <td> <a class="btn btn-secondary" href="<?= $brand->brand_path; ?>" target="_blank"> View</a></td>
                                                <form action="" method="POST">
                                                    <td>
                                                        <button  type="submit" name="delete_brand" value="<?=$brand->brand_id?>" class="btn btn-danger">Delete</button>
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