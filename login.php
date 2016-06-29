<?php session_start(); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>iMessage</title> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<link href="css/login.css" rel="stylesheet" type="text/css" />
</head>
<body>
<h1>登录与注册</h1>

<div class="login" style="margin-top:50px;">
    
    <div class="header">
        <div class="switch" id="switch">
            <a class="switch_btn_focus" id="switch_qlogin" href="javascript:void(0);" tabindex="7"> 登 录</a>
			<a class="switch_btn" id="switch_login" href="javascript:void(0);" tabindex="8"> 注 册</a>
            <div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
        </div>
    </div>    
  
    
    <div class="web_qr_login" id="web_qr_login" style="display: block; height: 235px;">    

        <!--登录-->
        <div class="web_login" id="web_login">  
            <div class="login-box">
                <div class="login_form">
			    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" name="loginform" accept-charset="utf-8" id="login_form" class="loginForm" method="post">
                    <input type="hidden" name="did" value="0"/>
                    <input type="hidden" name="to" value="log"/>
                    <div class="uinArea" id="uinArea">
                    <label class="input-tips" for="u">账号：</label>
                    <div class="inputOuter" id="uArea">                    
                    <input type="text" id="username" name="username" class="inputstyle"/>
                    </div>
                    </div>
                    <div class="pwdArea" id="pwdArea">
                        <label class="input-tips" for="p">密码：</label> 
                        <div class="inputOuter" id="pArea">                    
                        <input type="password" id="p" name="p" class="inputstyle"/>
                        </div>
                    </div>
           
                    <div style="padding-left:50px;margin-top:20px;">
                        <input type="submit" value="登录" style="width:150px;" class="button_blue"/>
                    </div>
                </form>
                </div>
       
            </div>
           
        </div>
        <!--登录end-->
    </div>

    <!--注册-->
    <div class="qlogin" id="qlogin" style="display: none; ">
   
        <div class="web_login">
        <form name="form2" id="regUser" accept-charset="utf-8"  action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post">
	        <input type="hidden" name="to" value="reg"/>
		    <input type="hidden" name="did" value="0"/>
            <ul class="reg_form" id="reg-ul">
        		<div id="userCue" class="cue">请注意格式</div>
                <li>
                    <label for="user"  class="input-tips2">用户名：</label>
                    <div class="inputOuter2">
                        <input type="text" id="user" name="user" maxlength="16" class="inputstyle2" onblur="checkExist()"/>
                    </div>    
                </li>
                                
                <li>
                <label for="email" class="input-tips2">邮箱：</label>
                    <div class="inputOuter2">
                        <input type="text" id="email" name="email" maxlength="20" class="inputstyle2" onblur="checkExist()"/>
                    </div>
                </li>
                
                <li>
                <label for="passwd" class="input-tips2">密码：</label>
                    <div class="inputOuter2">
                        <input type="password" id="passwd"  name="passwd" maxlength="16" class="inputstyle2"/>
                    </div>
                </li>

                <li>
                <label for="passwd2" class="input-tips2">确认密码：</label>
                    <div class="inputOuter2">
                        <input type="password" id="passwd2" name="" maxlength="16" class="inputstyle2" />
                    </div>
                </li>
                <li>
                    <div class="inputArea">
                        <input type="button" id="reg"  style="margin-top:10px;margin-left:85px;" class="button_blue" value="确认注册"/>
                    </div>
                </li>
                <div class="cl"></div>
            </ul>
        </form>
    
        </div>
    
    </div>
    <!--注册end-->
</div>
<div class="welcome">Welcome to iMessage</div>

<?php
$con = mysql_connect("localhost","root","kwr");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("ims", $con);
$url = "index.php";

if(empty($_POST['email'])) {
    $name = $_POST['username'];
    $password = $_POST['p'];
    $_SESSION['username']=$name;
    if($name == '') {
        exit;
    }
    else {
        $result = mysql_query("SELECT * FROM user WHERE name = '$name'");  
        $row = mysql_fetch_array($result);
        if($row['passwd'] == $password) {
            echo "<script>alert('登录成功');location.href='$url'</script>";
            exit;
        }
        else {
            echo "<script>alert('账号/密码错误');</script>";
        }
    }
}
else {
    $user = $_POST['user'];
    $passcode = $_POST['passwd'];
    $mail = $_POST['email'];
    $_SESSION['username']=$user;

    $sql = "INSERT INTO user (name, passwd, email)
    VALUES ('$user', '$passcode', '$mail')";
    if (!mysql_query($sql,$con)) {
        die('Error: ' . mysql_error());
    }
    echo "<script>alert('新用户注册成功');location.href='$url'</script>";
}
?>
</body>
</html>