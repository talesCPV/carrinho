 
<?php

    // CLEAR SESSION
    session_start();
    session_destroy();
    unset($_SESSION);


    if(IsSet($_POST['edtUser']) && IsSet($_POST['edtPass'])){
        include "database.php";
        $user = crip($_POST ["edtUser"]);
        $pass = crip($_POST ["edtPass"]);
        $query = "SELECT * FROM tb_user WHERE user='{$user}' AND pass='{$pass}';";
        $result = mysqli_query($conexao, $query);
        $qtd_lin = $result->num_rows;
        if($qtd_lin >0){
            $fetch = mysqli_fetch_row($result);
            $id = $fetch[0];
            $user = decrip($fetch[1]);
            $class = decrip($fetch[3]);                    
            $class = intval(substr($class, strlen($user),strlen($class)));
            $arr = [200,$user,$class];    

            session_start();
	
            $_SESSION["log"]=true;
            $_SESSION["user"]=$user;
            $_SESSION["id"]=$id;
            $_SESSION["class"]=$class;

        }else{
            $arr = [500,"usuario ou senha incorreta!",$query];
        }
        print json_encode($arr);

    }else{
        echo "error !";
    }


?>