<?php
ini_set('display_errors' , 'On');
error_reporting(E_ALL);

include 'connect.php';

$sessionUser = '' ;

if(isset($_SESSION['user']))
{
    $sessionUser=$_SESSION['user'];
}


//Routes
$tpl='includes/templates/'; // Template Directory
$css='./assets/vendor/css'; 
$js='./assets/vendor'; // Js Directory

include $tpl.'header.php' ;

//Include Navbar On All Pages Expect The One With $nonavbar Variable
// if(!isset($noNavbar)){
// include $tpl.'navbar.php' ;
// }
?>  