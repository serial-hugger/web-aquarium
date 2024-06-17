<?php 
session_start();

	include("connection.php");
	include("functions.php");


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$email = $_POST['email'];
		$username = $_POST['username'];
		$password = $_POST['password'];
		$repeatpassword = $_POST['repeatpassword'];

		if(!empty($username) && !empty($password) && !empty($repeatpassword))
		{
			if($password==$repeatpassword){
				$othername = "select * from accounts where username = '$username' limit 1";
				$otheremail = "select * from accounts where email = '$email' limit 1";
				$pass_hash = password_hash($password,PASSWORD_DEFAULT);
				$nameresult = mysqli_query($con, $othername);
				$emailresult = mysqli_query($con, $otheremail);
				if($nameresult && mysqli_num_rows($nameresult) == 0)
				{
					if($emailresult && mysqli_num_rows($emailresult) == 0)
					{
						//save to database
						$query = "insert into accounts (email,username,pass_hash) values ('$email','$username','$pass_hash')";

						mysqli_query($con, $query);

						header("Location: login.php");
						die;
					}else{
						$error = "Email already in use.";
					}
				}else{
					$error = "Username already in use.";
				}
			}else{
				$error = "Passwords do not match.";
			}
		}else
		{
			$error = "Please enter all information.";
		}
	}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Signup</title>
</head>
<body>

	<style type="text/css">
	body {
		/*background: #005881;*/
		background-size: 20vw 20vw;
		background-image: url('paperbg.png');
		background-repeat: repeat;
		background-position: center;
		margin: 0;
		margin-bottom: 8px;
		padding: 0;
	}
	#text{

		height: 25px;
		border-radius: 5px;
		padding: 4px;
		border: solid thin #aaa;
		width: 100%;
	}

	#button{

		padding: 10px;
		width: 100px;
	}
	#box{

		background-image: url('paperlight.png');
		background-size: 20vw 20vw;
		margin: auto;
		width: 50vw;
		padding: 20px;
		border-style: solid;
		border-width: 0.4vw;
		border-color: black;
		border-radius: 1vw;
	}
	#title{
		margin: auto;
		width: 50vw;
		padding: 20px;
		display:block;
	}

	</style>
	<br><br><img id = "title" src="title-back.png"></img><br><br>
	<div id="box">
		<?php
		if( $error) echo "<div class=\"yellowclass\" style=\"color: red\">".$error."</div>";
		?>
		<form method="post">
		<h1><b>Sign up</b></h1>

			<p>Email:</p><input id="text" type="email" name="email"><br>
			<p>Username:</p><input id="text" type="text" name="username"><br>
			<p>Password:</p><input id="text" type="password" name="password"><br>
			<p>Confirm Password:</p><input id="text" type="password" name="repeatpassword"><br><br>

			<input id="button" type="submit" value="Sign up"><br><br>

			<a href="login.php">Already have an account? Click here to log in!</a><br><br>
		</form>
	</div>
</body>
</html>