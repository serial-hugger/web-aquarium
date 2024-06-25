<?php
session_start();
require("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $storage = $info['storage'];

        $query = "UPDATE accounts SET storage = '$storage' WHERE account_id = $id;";
        mysqli_query($con, $query);   
    }
    mysqli_close($con);
?>