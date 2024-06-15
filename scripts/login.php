<?php
    $connection = pg_connect("host=localhost dbname=postgres user=postgres password=194056824!Wq");
    if(!$connection){
        echo "An error occured.<br>";
        exit;
    }
    $result = pg_query($connection, "SELECT * FROM accounts");
    if(!$result){
        echo "An error occured.<br>";
        exit;
    }
    while($row = pg_fetch_assoc($result)){
        echo "<p>$row[account_id]</p>";
    }
?>