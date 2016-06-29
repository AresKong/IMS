<?php
$con = mysql_connect("localhost","root","kwr");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("ims", $con);
$name = $_GET["q"];
$email = $_GET["e"];
if (strlen($name) > 0) {
	$result = mysql_query("SELECT * FROM user WHERE name = '$name'");  
    $row = mysql_fetch_array($result);
    if(!empty($row)) {
    	echo "0";
    }
    else {
    	echo "1";
    }
}
if (strlen($email) > 0) {
	$result = mysql_query("SELECT * FROM user WHERE email = '$email'");  
    $row = mysql_fetch_array($result);
    if(!empty($row)) {
    	echo "2";
    }
    else {
    	echo "3";
    }
}
?>