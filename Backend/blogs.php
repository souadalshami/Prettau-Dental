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
    $stmt = $con->prepare("SELECT * FROM categories_lang");
    $stmt->execute();
    $categories = $stmt->fetchAll();

    $stmt = $con->prepare("SELECT * FROM blogs_lang");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $blogs = $stmt->fetchAll();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
                if (isset($_POST['delete_blogs'])) {
                    $blogsId = $_POST['delete_blogs'];

                    // Delete the row from the blogs_lang table
                    $stmt = $con->prepare("DELETE FROM blogs_lang WHERE blog_id = ?");
                    $stmt->execute([$blogsId]);

                    $stmt = $con->prepare("DELETE FROM blogs WHERE id = ?");
                    $stmt->execute([$blogsId]);

                    $_SESSION['success_message'] = 'Blog deleted successfully.';
                    header('Location: ' . $_SERVER['PHP_SELF']);
                    exit();
                } else {
                    $stmt = $con->prepare("INSERT INTO blogs (id) VALUES (NULL)");
                    $stmt->execute();
                    $lastInsertId = $con->lastInsertId();
                    foreach ($languages as $language) {
                        $lang_id = $language['id'];
                        $title = $_POST['title_' . $lang_id];
                        $image = $_FILES['image_' . $lang_id];
                        $imageafter = $_FILES['imageafter_' . $lang_id];
                        $path = "uploads/blogs/before/" . $language['name'] . "/" . basename($image['name']);
                        $path2 = "uploads/blogs/after/" . $language['name'] . "/" . basename($imageafter['name']);
                        $content = $_POST['content_' . $lang_id];
                    
                        move_uploaded_file($image['tmp_name'], $path);
                        move_uploaded_file($imageafter['tmp_name'], $path2);
                    
                        // Get the selected category_id for the language
                        $category_id = $_POST['category_id_' . $lang_id];
                    
                        $stmt = $con->prepare("INSERT INTO blogs_lang (lang_id, category_id, blog_id, title, image, image_after, path, path2, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        $stmt->execute([$lang_id, $category_id, $lastInsertId, $title, $image['name'], $imageafter['name'], $path, $path2, $content]);
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
                    <h4 class="py-3 mb-4"><span class="text-muted fw-light"> Blogs</h4>
                    <div class="card mb-4">
                        <h5 class="card-header">Blogs
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
                                                    <h5 class="modal-title" id="modalCenterTitle">Add Blog
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
                                                                    <label for="name" class="form-label">Title</label>
                                                                    <input type="text" name="title_<?php echo $language['id']; ?>" required class="form-control">
                                                                </div>
                                                            </div>

                                                            <div class="row g-2 mb-3">
                                                                <div class="col mb-0">
                                                                    <label for="image" class="form-label">Image</label>
                                                                    <input  class="form-control" type="file" name="image_<?php echo $language['id']; ?>" required>
                                                                </div>
                                                            </div>
                                                            <div class="row g-2 mb-3">
                                                                <div class="col mb-0">
                                                                    <label for="image" class="form-label">Image After</label>
                                                                    <input type="file" class="form-control" name="imageafter_<?php echo $language['id']; ?>" required>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="row">
                                                                <div class="col mb-3">
                                                                    <label for="name" class="form-label">content</label>
                                                                    <textarea type="text" class="form-control" name="content_<?php echo $language['id']; ?>" required> </textarea>
                                                                </div>
                                                            </div>

                                                            <div class="row g-2">
                                                                <div class="col mb-0">
                                                                    <label for="categories" class="form-label">Categories</label>
                                                                    <select name="category_id_<?php echo $language['id']; ?>" required  class="form-control">
                                                                        <?php foreach ($categories as $category) { ?>
                                                                            <option value="<?php echo $category['category_id']; ?>"><?php echo $category['name']; ?></option>
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
                                        <th>Image after</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <?php
                                    if($blogs)
                                    {
                                        $counter = 1;
                                        foreach($blogs as $blog)
                                        {
                                            ?>
                                            <tr>
                                                <td><?= $counter; ?></td>
                                                <td><?= $blog->title; ?></td>
                                                <td><?= $blog->content; ?></td>
                                                <td><img src="<?= $blog->path?> "align="center"  style="width:100px"/></td>
                                                <td><img src="<?= $blog->path2?> "align="center"  style="width:100px"/></td>
                                                <form action="" method="POST">
                                                    <td>
                                                        <button  type="submit" name="delete_blogs" value="<?=$blog->blog_id?>" class="btn btn-danger">Delete</button>
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