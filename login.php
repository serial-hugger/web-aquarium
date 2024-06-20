<?php 
	session_start();

	include("connection.php");
	include("functions.php");


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$username = $_POST['username'];
		$password = $_POST['password'];

		if(!empty($username) && !empty($password) && !is_numeric($username))
		{

			//read from database
			$query = "select * from accounts where username = '$username' limit 1";
			$result = mysqli_query($con, $query);

			if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if(password_verify($password,$user_data['pass_hash']))
					{

						$_SESSION['account_id'] = $user_data['account_id'];
						header("Location: index.php");
						die;
					}
				}
			}
			$error = "Wrong username or password.";
		}else
		{
			$error = "Wrong username or password.";
		}
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Login | Webquarium</title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
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

			<h1><b>Log in</b></h1>

			<p>Username:</p><input id="text" type="text" name="username"><br>
			<p>Password:</p><input id="text" type="password" name="password"><br><br>

			<input id="button" type="submit" value="Log in"><br><br>

			<a href="signup.php">Don't have an account? Click here to sign up!</a><br><br>
		</form>
	</div>
</body>
</html>