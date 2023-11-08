<?php
  ob_start();
  session_start();
  // $PageTitle='Login' ;
  // if(isset($_SESSION['user']))
  // {
  //    header('Location: dashboard.php'); // Redirect To Home Page
  // }
  include 'init.php' ; 
  // Check If User Coming From HttP Post Request

if ($_SERVER['REQUEST_METHOD'] =='POST'){

    $username=$_POST['user'];
    $password=$_POST['pass'];
    $hashedpass= sha1($password);

    $stmt= $con->prepare("SELECT UserID, Username , Password From users  Where  Username = ? And Password=?" );
    $stmt->execute(array($username,$hashedpass));
    // $row=$stmt->fetch();
    $count=$stmt->rowCount();

    if ($count > 0){
        $_SESSION['Username']=$username; // Register Session Name 
        $_SESSION['ID']=$row['UserID']; // Register Session ID
        header('Location: certifications.php'); 
        exit();
        // $failureMsg='the username or password was not correct';
     }else{
      $failureMsg='the username or password was not correct';
     }


}

?>

<link rel="stylesheet" href="./assets/vendor/css/pages/page-auth.css" />
<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <a href="login.php" class="app-brand-link gap-2">
              <img src="./assets/img/logo/black-logo.png" alt="">
            </a>
          </div>
          <?php  if (isset($failureMsg)) 
            { 
              echo '<div class="alert alert-danger">' . $failureMsg . '</div>'; 
            } 
          ?>
          <!-- /Logo -->
          <h4 class="mb-2">Welcome to Prettau!</h4>
          <p class="mb-4">Please sign-in to your account</p>
          <form id="formAuthentication" class="mb-3" action="<?php echo $_SERVER['PHP_SELF']?>" method="POST"    >
            <div class="mb-3">
              <label for="email" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="user"
                placeholder="Enter your username"
                autofocus />
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="d-flex justify-content-between">
                <label class="form-label" for="password">Password</label>
              </div>
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="pass"
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</div>
<?php include $tpl. "footer.php" ?>