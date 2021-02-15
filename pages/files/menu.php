<?php

    // LÊ O ARQUIVO MENU.JSON
    $arquivo = "data/menu.json";
    $fp = fopen($arquivo, "r");
    $menu_json = fread($fp, filesize($arquivo));
    fclose($fp);

    $json_str = json_decode($menu_json, true);
    
    session_start();

    if(!IsSet($_SESSION["log"])){
        header('Location: intro.php');
    }else{

//    $log = $_SESSION["log"];
    $user = $_SESSION["user"];
    $id = $_SESSION["id"];
    $class = $_SESSION["class"];

    echo "
        <div id='mySidenav' class='sidenav'>
            <a  class='closebtn' onclick='closeNav()'>&times;</a>    
        <hr>        
        <div class='dropdown'>
            <a href='intro.php' >".strtoupper($user)." - logout</a> <hr>
        </div>        
        ";  

        foreach ( $json_str['menu'] as $e ) {
            $main_name = $e['modulo'];
            $main_perm = $e['perm'];
            $main_link = $e['link'];
            $main_ico = $e['icone'];
            $main_perm = $e['perm'];

            if(in_array($class, $main_perm)){

                echo'<div class="dropdown">';

                echo "<a>{$main_name}</a>
                        <div id='myDropdown' class='dropdown-content'>";

                foreach ($e['itens'] as $a ) {
                    $item_menu = $a['menu'];
                    $item_label = $a['label'];
                    $item_template = $a['template'];
                    $item_script = $a['script'];            
                    $item_perm = $a['perm'];
                    $item_window = $a['window'];
                    $item_icone = $a['icone'];

                    if(in_array($class, $item_perm)){
                      echo "<a onclick='openHTML(\"{$item_template}\",\"{$item_script}\",\"{$item_label}\")'>{$item_menu}</a>";
                    }
                }

                echo"   </div>
                    </div>  ";

                    echo "<hr>";

            }             

        }
    }
    echo '
        </div>
        <div id="menulink">
            <span onclick="openNav()">&#9776; </span>
        </div>    
    ';


 
?>