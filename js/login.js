$(function(){
	
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left:'0px',width:'70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
		});
	$('#switch_login').click(function(){
		
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left:'154px',width:'70px'});
		
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
		});
	if(getParam("a")=='0')
	{
		$('#switch_login').trigger('click');
	}

});
	
function logintab(){
	scrollTo(0);
	$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
	$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
	$('#switch_bottom').animate({left:'154px',width:'96px'});
	$('#qlogin').css('display','none');
	$('#web_qr_login').css('display','block');
}


//根据参数名获得该参数 pname等于想要的参数名 
function getParam(pname) { 
    var params = location.search.substr(1); // 获取参数 平且去掉？ 
    var ArrParam = params.split('&'); 
    if (ArrParam.length == 1) { 
        //只有一个参数的情况 
        return params.split('=')[1]; 
    } 
    else { 
         //多个参数参数的情况 
        for (var i = 0; i < ArrParam.length; i++) { 
            if (ArrParam[i].split('=')[0] == pname) { 
                return ArrParam[i].split('=')[1]; 
            } 
        } 
    } 
}

function checkExist() {
    $.ajax({
        type: "GET",
        url: "member/checkExist.php?q="+$("#user").val()+"&e="+$("#email").val(),
        data: "uid=" + $("#user").val() + '&temp=' + new Date(),
        dataType: 'html',
        success: function(result) {
            if (result == "0") {
                $('#user').focus().css({
                    border: "1px solid red",
                    boxShadow: "0 0 2px red"
                });
                $("#userCue").html("<font color='red'><b>该用户名已被占用</b></font>");
                return false;
            } else if (result == "1") {
                $('#user').css({
                    border: "1px solid #D7D7D7",
                    boxShadow: "none"
                });
                $("#userCue").html("该用户名可用");
            } else if (result == "2") {
                $('#email').focus().css({
                    border: "1px solid red",
                    boxShadow: "0 0 2px red"
                });
                $("#userCue").html("<font color='red'><b>该邮箱已注册过用户</b></font>");
                return false;
            } else if(result == "3") {
                $('#email').css({
                    border: "1px solid #D7D7D7",
                    boxShadow: "none"
                });
                $("#userCue").html("该邮箱可用");
            } 
        }
    });
}

var pwdmin = 6;

$(document).ready(function() {

	$('#reg').click(function() {
		if ($('#passwd').val().length < pwdmin) {
			$('#passwd').focus();
			$('#userCue').html("<font color='red'><b>密码不能小于" + pwdmin + "位</b></font>");
			return false;
		}
		if ($('#passwd2').val() != $('#passwd').val()) {
			$('#passwd2').focus();
			$('#userCue').html("<font color='red'><b>两次密码不一致</b></font>");
			return false;
		}

		var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!email.test($('#email').val())) {
			$('#email').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>Email格式不正确</b></font>");
			return false;
		} else {
			$('#email').css({
				border: "1px solid #D7D7D7",
				boxShadow: "none"
			});
		}
		$('#regUser').submit();
	});
	
});