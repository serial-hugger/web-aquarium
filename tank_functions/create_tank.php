<?php
    session_start();
    include("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $contents = $info['contents'];
        $query = "insert into tanks (owner_account_id,contents) values ($id,'$contents');";
        $result = mysqli_query($con, $query);
        echo $info['contents'];
    }
?>