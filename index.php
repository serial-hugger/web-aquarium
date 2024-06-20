<?php
session_start();
	include("connection.php");
	include("functions.php");
	$user_data = check_login($con);
	$_SESSION;
	header("Location: main.html");
?>