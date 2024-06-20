<?php
session_start();
include("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $query = "select * from tanks where owner_account_id = $id;";
        $result = mysqli_query($con, $query);

        $index = 0;
        while($index!=$info['tank'])
        {
            mysqli_fetch_assoc($result);
            $index++;
        }
        echo mysqli_fetch_assoc($result)['contents'];
    }else{
        echo "";
    }
?>