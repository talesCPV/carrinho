<!DOCTYPE html>
<!-- Created By CodingNepal -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- Somehow I got an error, so I comment the title, just uncomment to show -->
    <!-- <title>Login & Signup Form | CodingNepal</title> -->
    <link rel="stylesheet" href="css/login.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
	<?php
		// CLEAR SESSION
		session_start();
		session_destroy();
		unset($_SESSION);
	?>  
    <div class="wrapper">
    	<div class="title-text">
        <div class="title login">
  				Login
  			</div>
  			<div class="title signup">
  				Welcome
  			</div>
  	  </div>
 	    <div class="form-container">
      	<div class="slide-controls">
        		<input type="radio" name="slide" id="login" checked>
	          <input type="radio" name="slide" id="signup">
	          <label for="login" class="slide login">Sign in</label>
	          <label for="signup" class="slide signup">Sign up</label>
	          <div class="slider-tab"></div>
        </div>
  			<div class="form-inner">
      		<form action="#" class="login">
          	<div class="field">
               <input type="text" id="edtUser" placeholder="User" required>
          	</div>
  		      <div class="field">
               <input type="password" id="edtPass" placeholder="Password" required>
          	</div>
  					<div class="pass-link">
  						<a href="#">Forgot password?</a>
  					</div>
  					<div class="field btn" id="btnLogin">
  		        <div class="btn-layer"></div>
  						<input type="submit" value="Login" >
          	</div>
  					<div class="signup-link">
  						Not a member? <a href="">Signup now</a>
  					</div>
  	      </form>
  	      <form action="#" class="signup">
        		<div class="field">
          			<input type="text" id="edtNewMail" placeholder="Email Address" required>
        		</div>
  		      <div class="field">
          			<input type="password" id="edtNewPass" placeholder="Password" required>
        		</div>
  		      <div class="field">
          			<input type="password" id="edtNewRepass" placeholder="Confirm password" required>
        		</div>
  		      <div class="field btn" id="btnSignup">
          		  <div class="btn-layer"></div>
  			        <input type="submit" value="Signup">
        		</div>
  	      </form>
  			</div>
  		</div>
	  </div>
    <script type="text/javascript" src="js/login.js"></script>
  </body>

</html>
