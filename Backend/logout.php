<?php


session_start();// Start The Session 
unset($_SESSION['username']);
session_unset(); // Unset The Data
session_destroy(); // Destroy The Session 

header('Location:login.php');
 exit(); 
?>