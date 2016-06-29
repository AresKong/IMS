<?php 
	session_start();
	$name = $_SESSION['username'];
	$con = mysql_connect("localhost","root","kwr");
	if (!$con) {
	    die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("ims", $con);
	$stmt = mysql_query("SELECT * FROM contacts WHERE uid = '$name' ORDER BY groups");  

	$result = array();
	while($query = mysql_fetch_array($stmt)){
    	$result[] = $query;
	}
	$res_json = json_encode($result);
	echo $res_json;
?>