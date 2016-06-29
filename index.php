<?php session_start();
if(!isset($_SESSION['username'])) {
	echo "<html><head><title>Login invalid</title></head><body><a href="."login.php".">Please login</a><br/></body></html>";
	exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iMessage Home Page</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!-- Fonts -->
	<link href="css/nivo-lightbox.css" rel="stylesheet" />
    <!-- Squad theme CSS -->
    <link href="css/style.css" rel="stylesheet">
	<link href="color/default.css" rel="stylesheet">


</head>

<body data-spy="scroll">

<div class="container">
			<ul id="gn-menu" class="gn-menu-main">
				<li class="gn-trigger">
					<a class="gn-icon gn-icon-menu"><span>Menu</span></a>
					<li><a id="userName">null</a><li>
					<nav class="gn-menu-wrapper">
						<div class="gn-scroller">
							<ul class="gn-menu">
								<li class="gn-search-item">
									<input id="addFriend" placeholder="+好友" type="search" class="gn-search">
									<a class="gn-icon gn-icon-search"><span>+好友</span></a>
								</li>
								<li><a class="gn-icon gn-icon-archive" id="contactslist" onclick="TestBlack('contacts');">联系人</a></li>
								<div id = "contacts" style="display:none">

								</div>
								<li><a id="edit" class="gn-icon gn-icon-cog" onclick="TestBlack('editContacts');">编辑</a></li>
								<div id = "editContacts" style="display:none">
									<a id="grouping" class="gn-list gn-icon-friend">好友分组</a>
									<input id="deletefriend" placeholder="删除好友" type="search" class="gn-search">
								</div>

								
							</ul>
						</div><!-- /gn-scroller -->
					</nav>
				</li>
				<button class="btn btn-skin pull-right" id="logout">Log out</button>
			</ul>
	</div>

	<!-- Section: contact -->
    <section id="contact" class="home-section text-center">
		<div class="heading-contact marginbot-50">
			<div class="container">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2">
					<div class="section-heading">
						<h2>Get in touch</h2>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="container">

    <div class="row">
        <div class="col-lg-8 col-md-offset-2">
            <div class="boxed-grey">
                <div id="contact-form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name" id="talkingTo">
                                Talking</label>
                            <div id="print-wall" class="print-wall"></div>
                        </div>                      
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">
                                Message to send</label>
                            <textarea name="message" id="message" class="form-control" rows="10" cols="25" required="required"
                                placeholder="Say something..."></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-skin pull-right" id="send-btn">
                            Send</button>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </div>	

		</div>
	</section>
	<!-- /Section: contact -->

	<footer>
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12">
					<p>Welcome to iMessage</p>
				</div>
			</div>	
		</div>
	</footer>
	<!-- Core JavaScript Files -->
    <script src="js/jquery.min.js"></script>
	<script src="js/classie.js"></script>
	<script src="js/gnmenu.js"></script>
    <!-- Custom Theme JavaScript -->
    <script src="js/custom.js"></script>
	
	<script src="node_modules/leancloud-realtime/dist/realtime.browser.js"></script>
	<script src="js/main.js"></script>

</body>

</html>
