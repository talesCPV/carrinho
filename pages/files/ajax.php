<?php

    include "database.php";
    
    if (IsSet($_POST ["source"])){
        $source = $_POST ["source"];
        
        switch ($source) {
            case "pesq_prod":
                $tipo = $_POST ["param_0"];
                $valor = $_POST ["param_1"];

                $query =  "SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, CONCAT('R$',FORMAT(p.preco_comp *(1 + (p.margem/100)),2)), p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.descricao LIKE '%".$valor."%' AND p.id_emp = e.id ORDER BY cast(p.cod as unsigned integer);";

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