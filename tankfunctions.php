<?php

function get_tanks($con,$tank)
{
	$id = $_SESSION['account_id'];
	$query = "select * from tanks where owner_account_id = '$id'";
	$result = mysqli_query($con, $query);

    $index = 0;
	while($index!=$tank)
    {
        mysqli_fetch_assoc($result);
    }
    return mysqli_fetch_assoc($result);
}
function create_tank($con,$contents){
    $id = $_SESSION['account_id'];
    $username = $_SESSION['username'];
    $query = "INSERT INTO tanks (owner_account_id,contents) values ('$id','$username','$contents')";
    mysqli_query($con, $query);
}
?>