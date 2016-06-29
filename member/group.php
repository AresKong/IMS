<?php
$con = mysql_connect("localhost","root","kwr");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("ims", $con);
$id = $_GET["id"];
$name = $_GET["p"];
$groups = $_GET["q"];
if (strlen($name) > 0) {
	$result = mysql_query("SELECT * FROM contacts WHERE uid = '$id' AND fid='$name' ");  
    $row = mysql_fetch_array($result);
    if(empty($row)) {
    	echo "0";
    }
    else {
		$sql = "UPDATE contacts SET groups='$groups' WHERE uid = '$id' AND fid='$name'";
        if (!mysql_query($sql,$con)) {
            die('Error: ' . mysql_error());
        }
    	echo "1";
    }
}
?>