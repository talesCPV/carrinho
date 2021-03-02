<?php

    include "database.php";
    
    if (IsSet($_POST ["source"])){
        $source = $_POST ["source"];
        
        switch ($source) {
            case "pesq_prod":
                $field = $_POST ["param_0"];
                $valor = $_POST ["param_1"];

                $query =  "SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, CONCAT('R$',FORMAT(p.preco_comp *(1 + (p.margem/100)),2)), p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON {$field} LIKE '%".$valor."%' AND p.id_emp = e.id ORDER BY cast(p.cod as unsigned integer);";
//                print $query;
                $found = true;                
                break;
            case "pesq_emp":
                $field = $_POST ["param_0"];
                $valor = $_POST ["param_1"];

                $query = "SELECT * from tb_empresa where {$field} LIKE '%{$valor}%' order by nome";

                $found = true;                
                break;
            case "unidade":
                $field = $_POST ["param_0"];
                $valor = $_POST ["param_1"];

                $query = "SELECT * from tb_und where {$field} LIKE '%{$valor}%' order by {$field}";

                $found = true;                
                break;
            case "next_cod":
                $table = $_POST ["param_0"];
                $field = $_POST ["param_1"];
                $where = $_POST ["param_2"];

                $query = "SELECT MAX({$field})+1 from {$table} {$where} ;";

                $found = true;                
                break;                
            case "new_prod":
                $idemp = $_POST ["param_0"];
                $desc = $_POST ["param_1"];
                $etq = $_POST ["param_2"];
                $etq_min = $_POST ["param_3"];
                $und = $_POST ["param_4"];
                $ncm = $_POST ["param_5"];
                $cod = $_POST ["param_6"];
                $cod_bar = $_POST ["param_7"];
                $compra = $_POST ["param_8"];
                $margem = $_POST ["param_9"];
                $tipo = $_POST ["param_10"];
                $cod_cli = $_POST ["param_11"];

                $query = "INSERT INTO tb_produto VALUES ('DEFAULT',{$idemp},'{$desc}',{$etq},{$etq_min},'{$und}','{$ncm}','{$cod}','{$cod_bar}',0,{$compra},{$margem},'{$tipo}','{$cod_cli}');";

                print $query;

                $found = true;                
                break;                
            default:
                $found = false;
        }


        if($found){
            $result = mysqli_query($conexao, $query);
//            $qtd_lin = $result->num_rows;
            $arr = [];
            while($fetch = mysqli_fetch_row($result)){
                $arr[] = $fetch;            
            }
            print json_encode($arr);
        }


    }
    $conexao->close();

?>