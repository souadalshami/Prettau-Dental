<?php
ob_start();
session_start();
include 'init.php';

if (isset($_SESSION['Username'])) {
    $stmt = $con->prepare("SELECT * FROM languages");
    $stmt->execute();
    $languages = $stmt->fetchAll();

    $stmt = $con->prepare("SELECT * FROM certifications_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $certifications = $stmt->fetchAll();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
                if (isset($_POST['delete_Certification'])) {
                    $certificationId = $_POST['delete_Certification'];

                    // Delete the row from the certifications_lang table
                    $stmt = $con->prepare("DELETE FROM certifications_lang WHERE certification_id = ?");
                    $stmt->execute([$certificationId]);

                    $stmt = $con->prepare("DELETE FROM certifications WHERE id = ?");
                    $stmt->execute([$certificationId]);

                    $_SESSION['success_message'] = 'Certification deleted successfully.';
                    header('Location: ' . $_SERVER['PHP_SELF']);
                    exit();
                } else {
                    $stmt = $con->prepare("INSERT INTO certifications (id) VALUES (NULL)");
                    $stmt->execute();
                    $lastInsertId = $con->lastInsertId();
                    foreach ($languages as $language) {
                        $lang_id = $language['id'];
                        $image = $_FILES['image_' . $lang_id];
                        $path = "uploads/certifications/" . $language['name'] . "/" . basename($image['name']);
                        $title = $_POST['title_' . $lang_id];

                        move_uploaded_file($image['tmp_name'], $path);

                        $stmt = $con->prepare("INSERT INTO certifications_lang (lang_id,certification_id,image, path ,title) VALUES (?, ?, ?, ?, ?)");
                        $stmt->execute([$lang_id, $lastInsertId, $image['name'], $path, $title]);
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
                    <h4 class="py-3 mb-4"><span class="text-muted fw-light"> Certifications</h4>
                    <div class="card mb-4">
                        <h5 class="card-header">Certifications
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
                  
                            <div class="col-lg-12 col-md-12">
                                <div class="mt-3">
                                    <!-- Modal -->
                                    <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="modalCenterTitle">Add Certification
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
                                                                    <input type="text" name="title_<?php echo $language['id']; ?>" class="form-control" placeholder="Enter Name" />
                                                                </div>
                                                            </div>
                                                            <div class="row g-2">
                                                                <div class="col mb-0">
                                                                    <label for="image" class="form-label">Image</label>
                                                                    <input type="file" name="image_<?php echo $language['id']; ?>" class="form-control"/>
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
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <?php
                                    if($certifications)
                                    {
                                        $counter = 1;
                                        foreach($certifications as $cer)
                                        {
                                            ?>
                                            <tr>
                                                <td><?= $counter; ?></td>
                                                <td><?= $cer->title; ?></td>
                                                <td><img src="<?= $cer->path?> "align="center"  style="width:100px"/></td>
                                                <form action="" method="POST">
                                                    <td>
                                                        <button  type="submit" name="delete_Certification" value="<?=$cer->certification_id?>" class="btn btn-danger">Delete</button>
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