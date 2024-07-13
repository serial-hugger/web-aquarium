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
        $tankcontents = json_decode($tank['contents']);
        echo $item;
        for($i =0; $i < count($storage);$i++){
            echo "forloop";
            if($storage[$i]==json_decode($item,true)){
                $newitem = "";
                if(isset(json_decode($item,true)['qty'])){
                    //new item
                    $itemId = json_decode($item,true)['id'];
                    require("../item_functions/new_item.php");
                    if(isset($storage[$i]['qty'])){
                        $qty = $storage[$i]['qty'];
                        echo $qty;
                        if($qty > 1){
                            $qty -= 1;
                            $storage[$i]['qty'] = $qty;
                            echo "QTY DECREASE";
                        }else{
                            array_splice($storage,$i,1);
                            echo "UNSET";    
                        }
                    }else{
                        array_splice($storage,$i,1);
                        echo "UNSET";
                    }
                }else{
                    $newitem = $item;
                    array_splice($storage,$i,1);
                    echo "UNSET";
                }
                //remove item from storage
                $encodedstorage = json_encode($storage);
                $query = "UPDATE accounts SET storage = '$encodedstorage' WHERE account_id = $id;";
                mysqli_query($con, $query);
                //add item to tanks contents
                $tankcontents[] = json_decode($newitem);
                $tankId = $tank['tank_id'];
                $jsonencoded = json_encode($tankcontents);
                $query = "UPDATE tanks SET contents = '$jsonencoded' WHERE tank_id = $tankId;";
                $result = mysqli_query($con, $query);
                echo $encodedstorage;
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