<?php
session_start();
require("../connection.php");
    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $moneyquery = "select money from accounts where account_id = $id;";
        $moneyresult = mysqli_query($con, $moneyquery);
        $money = mysqli_fetch_assoc($moneyresult)['money'];

        $newmoney = (int)$money + (int)$info['change'];
        if($newmoney>=0){
            $query = "UPDATE accounts SET money = $newmoney WHERE account_id = $id;";
            mysqli_query($con, $query);
            echo '$newmoney';
        }else{
            echo '$newmoney';
        }
        
    }
    mysqli_close($con);
?>