<?php
session_start();
require("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $query = "select * from tanks where owner_account_id = $id;";
        $result = mysqli_query($con, $query);

        if(mysqli_num_rows($result)>$info['tank']){
            $index = 0;
            while($index!=$info['tank'])
            {
                mysqli_fetch_assoc($result);
                $index++;
            }
            echo mysqli_fetch_assoc($result)['contents'];
        }else{
            echo null;
        }
    }else{
        echo null;
    }
    mysqli_close($con);
?>