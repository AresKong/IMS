var Realtime = AV.Realtime;
var realtime = new Realtime({
  appId: 'DJKcQJUGePzrSCGwtLqJ7V7e',
  region: 'cn', // 美国节点为 "us"
});

var sendBtn = document.getElementById('send-btn');
var clientId = null;
var inputSend = document.getElementById('message');
var printWall = document.getElementById('print-wall');
var contactsList = document.getElementById('contactslist');
var toWhom = "test";
var talkingTo = document.getElementById('talkingTo');
var logout = document.getElementById('logout');
var find = document.getElementById('addFriend');
var grouping = document.getElementById('grouping');
var getList = false;

// 用来存储创建好的 roomObject
var room;
var messageIterator;
var client;
var roomId = clientId+'&'+toWhom;

// 用来标记历史消息获取状态
var logFlag = false;

// 拉取历史相关
// 最早一条消息的时间戳
var msgTime;

bindEvent(sendBtn, 'click', sendMsg);
bindEvent(contactsList, 'click', main);
bindEvent(logout, 'click', logOut);
bindEvent(grouping, 'click', group);


bindEvent(find, 'keydown', function(e) {
  if (e.keyCode === 13) {
    var findName = find.value;
    $.post("member/addFriend.php", {client:clientId, name:findName},
    function(data){
      alert(data);
    },
    "text");//这里返回的类型有：json,html,xml,text
  }
});

$.ajax({
        type: "GET",
        url: "member/welcome.php",
        success: function(result) {
          clientId = result;
          $("#userName")[0].innerHTML = "Hello, "+result;
        } 
});

function logOut() {
  $.ajax({
        type: "GET",
        url: "member/logout.php",
        success: function(result) {
          window.location.href="login.php"; 
        } 
});
}

bindEvent(deletefriend, 'keydown', function(e) {
  if (e.keyCode === 13) {
    var name = deletefriend.value;
    $.post("member/delete.php", {client:clientId, name:name},
    function(data){
      alert(data);
    },
    "text");//这里返回的类型有：json,html,xml,text
  }
});

function group() {
	var name=prompt("输入想分组的好友id","");
    var groups=prompt("输入将其加入组的名称","");
	$.ajax({
        type: "GET",
        url: "member/group.php?id="+clientId+"&p="+name+"&q="+groups,
        success: function(result) {
            if (result != "1") {
            	alert("无该好友");
            } else {
            	alert("分组成功");
            }
        }
    });
}

function TestBlack(TagName) {
	var obj = document.getElementById(TagName);
 	if(obj.style.display=="none") {
  		obj.style.display = "";
 	} else {
		obj.style.display = "none";
 	}
}

function main() {
	if (!getList) {
	  $.ajax({
	    type: "GET",
	    url: "member/getContacts.php",
	    success: function(result) {
	        var obj = eval(result);
	        var n = 0;
	        var newGroup = new Array();
	        var newList = new Array();
	        for (var i = 0; i < obj.length;) {
	        	var thisGroup = obj[i][2];
	            for (var j = i+1; j < obj.length; j++) {
	              if(obj[j][2] == thisGroup) {

	              }
	              else {
	            	  break;
	              }
	            }
	            newGroup[n] = $("<a></a>").text(thisGroup).addClass("gn-list gn-icon-friend");
	            $("#contacts").append(newGroup[n]);
	            newList[n] = $("<li></li>").attr("id",thisGroup).css("display","none");
	            newGroup[n].append(newList[n]);
	            newGroup[n].click(function() {
					if($(this).children().css("display")=="none") {
				 		$(this).children().css("display", "");
				 	}
				 	else {
				 		$(this).children().css("display", "none"); 		
				 	}
	            });
	            var newContact = new Array();
	      		for (var k = 0; k < j-i; k++) {
	      			var contactName = obj[k+i][1];
	      			newContact[k] = $("<a></a>").text(contactName).attr("id",contactName).addClass("gn-list gn-icon-friend");
	      			newContact[k].click(function() {
	      				getConversation($(this).attr("id"));
	      			});
	      			newList[n].append(newContact[k]);
	      		}
	        	i = j;
	        	n++;
	        }
	    } 
	  });
	getList = true;
	}
}

function getConversation(to) {
	toWhom = to;
	talkingTo.innerHTML = 'Talking to '+toWhom;
	// 用client的用户名作为 clientId，获取 IMClient 对象实例
	realtime.createIMClient(clientId).then(function(c) {
	    client = c;
	    // 获取对话
	    return c.getConversation(roomId);
	    })
	    .then(function(conversation) {
	      if (conversation) {
	        return conversation;
	      } else {

	      // 创建与好友之间的对话
	      return client.createConversation({
	        members: [toWhom],
	        name: clientId +'&'+ toWhom,
	        transient: false,
	        unique: true,
	      }).then(function(conversation) {
	        roomId = conversation.id;
	        return conversation;
	      });
	    }
	})
	.then(function(conversation) {
		return conversation.join();
	})
	.then(function(conversation) {
	    // 获取聊天历史
	    room = conversation;
	    messageIterator = conversation.createMessagesIterator();
	    getLog(function() {
	      printWall.scrollTop = printWall.scrollHeight;
	      showLog('正在和'+toWhom+'聊天');
	    });
	    // 房间接受消息
	    conversation.on('message', function(message) {
	      if (!msgTime) {
	        // 存储下最早的一个消息时间戳
	        msgTime = message.timestamp;
	      }
	      showMsg(message);
	    });
	})
	.catch(function(err) {
	    console.error(err);
	})
}

function sendMsg() {
  var val = inputSend.value;

  
// 向这个房间发送消息，这段代码是兼容多终端格式的，包括 iOS、Android、Window Phone
  room.send(new AV.TextMessage(val)).then(function(message) {
    // 发送成功之后的回调
    inputSend.value = '';
    showLog('（' + formatTime(message.timestamp) + '）'+ clientId +': <br>', encodeHTML(message.text));
    printWall.scrollTop = printWall.scrollHeight;
    console.log(clientId +'&'+ toWhom, '发送成功！');
  }).catch(console.error);
}

// 显示接收到的信息
function showMsg(message, isBefore) {
  var text = message.text;
  var from = message.from;
  if (message.from === clientId) {
    from = clientId;
  }
  if (String(text).replace(/^\s+/, '').replace(/\s+$/, '')) {
    showLog('（' + formatTime(message.timestamp) + '）  ' + encodeHTML(from) + ': <br>', encodeHTML(message.text), isBefore);
  }
}

// 拉取历史
bindEvent(printWall, 'scroll', function(e) {
  if (printWall.scrollTop < 20) {
    getLog();
  }
});

// 获取消息历史
function getLog(callback) {
  var height = printWall.scrollHeight;
  if (logFlag) {
    return;
  } else {
    // 标记正在拉取
    logFlag = true;
  }
  messageIterator.next().then(function(result) {
    var data = result.value;
    logFlag = false;
    // 存储下最早一条的消息时间戳
    var l = data.length;
    if (l) {
      msgTime = data[0].timestamp;
    }
    for (var i = l - 1; i >= 0; i--) {
      showMsg(data[i], true);
    }
    if (l) {
      printWall.scrollTop = printWall.scrollHeight - height;
    }
    if (callback) {
      callback();
    }
  }).catch(function(err) {
    console.error(err);
  });
}

// demo 中输出代码
function showLog(msg, data, isBefore) {
  if (data) {
    // console.log(msg, data);
    msg = msg + '<span class="strong">' + data + '</span>';
  }
  var p = document.createElement('p');
  p.innerHTML = msg;
  if (isBefore) {
    printWall.insertBefore(p, printWall.childNodes[0]);
  } else {
    printWall.appendChild(p);
  }
}

function encodeHTML(source) {
  return String(source)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\/g,'&#92;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function formatTime(time) {
  var date = new Date(time);
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hh + ':' + mm + ':' + ss;
}

function createLink(url) {
  return '<a target="_blank" href="' + encodeHTML(url) + '">' + encodeHTML(url) + '</a>';
}

function bindEvent(dom, eventName, fun) {
  if (window.addEventListener) {
    dom.addEventListener(eventName, fun);
  } else {
    dom.attachEvent('on' + eventName, fun);
  }
}