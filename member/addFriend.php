<?php
$con = mysql_connect("localhost","root","kwr");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("ims", $con);

$name = $_POST["name"];
$client = $_POST["client"];

$result = mysql_query("SELECT * FROM user WHERE name = '$name'");  
$row = mysql_fetch_array($result);
if(!empty($row)) {
	$sql = "INSERT INTO contacts (uid, fid, groups) VALUES ('$client', '$name', 'firend')";
	if (!mysql_query($sql,$con)) {
	    die('Error: ' . mysql_error());
	}
	echo "成功加入好友列表";
	exit;
}
else {
	echo "该用户不存在";
}
?>

