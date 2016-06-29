<?php
$con = mysql_connect("localhost","root","kwr");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("ims", $con);

$client = $_POST["client"];
$name = $_POST["name"];

$result = mysql_query("SELECT * FROM contacts WHERE fid = '$name' AND uid = '$client'");  
$row = mysql_fetch_array($result);
if(!empty($row)) {
	$sql = "DELETE FROM contacts WHERE fid = '$name' AND uid = '$client'";
	if (!mysql_query($sql,$con)) {
	    die('Error: ' . mysql_error());
	}
	echo "成功删除好友";
	exit;
}
else {
	echo "无该好友";
}
?>

