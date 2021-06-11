<?php

    include "../assets/connect.php";

    function loadmenu($mail, $pass, $conexao){


        $query = "SELECT class FROM tb_usuario WHERE email='$mail' AND pass='$pass' ;";

        $result = mysqli_query($conexao, $query);
      
        $class ;
        while($fetch = mysqli_fetch_row($result)) {
            $class = $fetch[0];
        }

        // LÊ O ARQUIVO MENU.JSON
        $arquivo = "../assets/menu.json";
        $fp = fopen($arquivo, "r");
        $menu_json = fread($fp, filesize($arquivo));
        fclose($fp);

        $json_str = json_decode($menu_json, true);

        $item = array();

		foreach ( $json_str['menu'] as $e ) {
            $main_name = $e['modulo'];
            $main_perm = $e['perm'];
            $main_link = $e['link'];
            $main_ico = $e['icone'];
            $subitem = array();

            if(in_array($class, $main_perm)){        
                foreach ($e['itens'] as $a ) {
                    if(in_array($class, $a['perm'])){
                        $subitem[] = [$a['nome'], $a['link'], $a['icone']];
                    }
                }

            }
              
            $item[] = [$main_name, $main_link, $main_ico, $subitem];

        }


        print json_encode($item);

    }

    if (IsSet($_POST["email"]) && IsSet($_POST["pass"]) ){
        loadmenu($_POST["email"],$_POST["pass"], $conexao);
    }
    $conexao->close();


?>