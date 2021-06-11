<?php

	include "../assets/connect.php";

	if (IsSet($_POST["query"])){
	      $query = $_POST["query"];

		$result = mysqli_query($conexao, $query);

		$qtd_lin = $result->num_rows;

		if($qtd_lin > 0){

			$rows = array();
			while($r = mysqli_fetch_assoc($result)) {
			    $rows[] = $r;
			}
			print json_encode($rows);

		}

	}

	$conexao->close();

?>