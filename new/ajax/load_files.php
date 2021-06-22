<?php


    if (IsSet($_POST["path"] )) {
        $path = $_POST["path"];



        $fp = fopen($path, "r");
        $text = fread($fp, filesize($path));
        fclose($fp);

        print $text;

    }



?>