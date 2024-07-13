<?php
session_start();
require("../connection.php");
    if(isset($_POST)){
        echo "start";
        $data = file_get_contents("php://input");
        $info = json_decode($data,true);
        $id = $_SESSION['account_id'];
        $tanknumber = $info['tank'];
        $query = "select * from tanks where owner_account_id = $id;";
        $result = mysqli_query($con, $query);

        if(mysqli_num_rows($result)>$tanknumber){
            $index = 0;
            while($index!=$tanknumber)
            {
                mysqli_fetch_assoc($result);
                $index++;
            }
        }
        $tank =  mysqli_fetch_assoc($result);

        $query = "select storage from accounts where account_id = $id;";
        $result = mysqli_query($con, $query);

        $account = mysqli_fetch_assoc($result);

        $storage = json_decode($account['storage'],true);
        $item = $info['item'];
        $tankcontents = json_decode($tank['contents'],true);
        echo $item;
        for($i =0; $i < count($tankcontents);$i++){
            echo "forloop";
            if($tankcontents[$i]==json_decode($item,true)){
                $itemId = json_decode($item,true)['id'];
                if(isset(json_decode($item,true)['qty'])){
                    if(isset($tankcontents[$i]['qty'])){
                        $qty = $tankcontents[$i]['qty'];
                        echo $qty;
                        if($qty > 1){
                            $qty -= 1;
                            $tankcontents[$i]['qty'] = $qty;
                            echo "QTY DECREASE";
                        }else{
                            array_splice($tankcontents,$i,1);
                            echo "UNSET";    
                        }
                    }else{
                        array_splice($tankcontents,$i,1);
                        echo "UNSET";
                    }
                }else{
                    $newitem = $item;
                    array_splice($tankcontents,$i,1);
                    echo "UNSET";
                }
                //remove item from tank
                $tankId = $tank['tank_id'];
                $encodedcontents = json_encode($tankcontents);
                $query = "UPDATE tanks SET contents = '$encodedcontents' WHERE tank_id = $tankId;";
                mysqli_query($con, $query);
                //add money to account
                $money = 0;
                $itemlist = json_decode(file_get_contents("../items.txt"),true);
                for($i2 = 0; $i2<count($itemlist);$i2++){
                    if($i2==$itemId){
                        $itemlisting = $itemlist[$i2];
                        $money = round($itemlisting['price']/2);
                    }
                }
                $query = "UPDATE accounts SET money = money + $money WHERE account_id = $id;";
                $result = mysqli_query($con, $query);
                break;
            }
        }
        echo "complete";
        die;

    }else{
        echo "nothing sent";
        die;
    }
    mysqli_close($con);
?>