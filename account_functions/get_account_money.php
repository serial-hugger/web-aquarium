<?php
session_start();
require("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $id = $_SESSION['account_id'];
        $query = "select money from accounts where account_id = $id;";
        $result = mysqli_query($con, $query);

        echo mysqli_fetch_assoc($result)['money'];

    }else{
        echo null;
    }
    mysqli_close($con);
?>