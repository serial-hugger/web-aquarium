<?php
        $itemlist = json_decode(file_get_contents("../items.txt"),true);
        for($i2 = 0; $i2<count($itemlist);$i2++){
            if($i2==$itemId){
                $itemlisting = $itemlist[$i2];
                $x = rand(-300,300);
                $y = rand(50,250);
                $z = rand(0,50);
                $gender;
                if(rand(0,100)>50){
                    $gender = false;
                }else{
                    $gender = true;
                }
                if($itemlisting['type']=="decor"){
                    $newitem = "{\"id\":".$itemId.",\"x\":".rand(-300,300).",\"y\":0,\"z\":".rand(0,50).",\"size\":".(rand(8,12)/10).",\"flip\":".rand(0,1)."}";
                }
                if($itemlisting['type']=="fish"){
                    $newitem = "{\"id\":".$itemId.",\"x\":".rand(-300,300).",\"y\":".rand(50,250).",\"z\":"+rand(0,50).",\"size\":0.5,\"rotation\":360,\"name\":\"\",\"gender\":".rand(0,1).",\"moveX\":".rand(-100,100).",\"moveY\":".rand(-50,50).",\"moveZ\":".rand(-10,10)."}";
                }
            }
        }
?>