var flag = 0;
var _time = null;
var times = 0; //翻转次数
var time = new Date();
var ID = 0;
var password1 = 0;
var password2 = 0;
var flag1 = 1;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
$(document).ready(checkCookies()); //文档加载完毕后检查cookies
function checkCookies() {
	$.ajax({
		type: "get",
		url: "checkCookies",
		success: function(data) {
			if (!$.isEmptyObject(data)) {
				$("#login .username").val(data["id"].value);
				$("#login .password").val(data["password"].value);
				flag1 = 1;
				flag4 = 1;
			}
		}
	});
}
$('.title2').click(function() { //点击Register翻转到REGISTER页
	if (new Date() - time > 1200 && flag == 0) {
		time = new Date();
		times++;
		$('#container').css({
			'transform': 'perspective(800px) rotateY(' + times * 180 + 'deg)',
			'transition': '1.2s'
		})
		flag = 1;
		setTimeout("_play()", 300);
	}
})
$('.title1').click(function() { //点击LOGIN翻转到LOGIN页
	if (new Date() - time > 1200 && flag == 1) {
		time = new Date();
		times++;
		$("#container").css({
			'transform': 'perspective(800px) rotateY(' + times * 180 + 'deg)',
			'transition': '1.2s'
		})
		flag = 0;
		setTimeout("_play2()", 300);
	}
})

function _play() {
	$('#login').css({
		'display': 'none'
	});
	$(".title2").css({
		'color': '#fff'
	});
	$("#flag").addClass("flag2").removeClass("flag1");
	$(".title1").css({
		'color': 'rgba(255,255,255,0.4)'
	});
	$('#register').css({
		'display': 'block'
	})

}

function _play2() {
	$('#login').css({
		'display': 'block'
	})
	$('#register').css({
		'display': 'none'
	})
	$(".title1").css({
		'color': '#fff'
	});
	$(".title2").css({
		'color': 'rgba(255,255,255,0.4)'
	});
	$("#flag").addClass("flag1").removeClass("flag2");
}
$(".remember").click(function() {
	$('.choose').toggleClass("choosein");
})
$("input").focus(function() { //input获得光标时，iconfont的变化
	$(this).prev().animate({
		'opacity': '1'
	}, 200)
})
$("input").blur(function() { //input失去光标时，iconfont的变化
	$(this).prev().animate({
		'opacity': '0.5'
	}, 200)
})
$("#register .btn").click(function() {
	if (flag2 == 1 && flag3 == 1) {
		$("input").attr("disabled", true);
		flag4 = 2; //在做register动画
		$("#container").css({
			'transform': 'perspective(800px) translate3d(0,0,-300px) rotateY(' + times * 180 + 'deg) rotateX(-65deg) ',
			'transition': '0.6s',
			'transform-origin': 'buttom'
		})
		setTimeout("move()", 300);
	} else {
		return false;
	}
})
$("#login .btn").click(function() { //按下按钮的登录注册动画
	if (flag1 == 1) {
		$("input").attr("disabled", true);
		flag4 = 1; //在做login动画
		$("#container").css({
			'transform': 'perspective(800px) translate3d(0,0,-300px) rotateX(65deg) ',
			'transform-origin': 'buttom',
			'transition': '0.6s'
		})
		setTimeout("move()", 300);
	} else {
		return false;
	}
})

function move() {
	$("#container").animate({
		'left': '-150px'
	}, 100)
	$('.box').fadeIn(200).animate({
		'left': '730px'
	}, 200)
	if (flag4 == 2) { //register
		$.post("register", {
				id: $("#user").val(),
				password: $("#password1").val(),
				data_cookies: 'true'
			},
			function(d) {
				//		alert(d);
				if (d) {
					setTimeout("recover()", 2500);
				} else {
					alert("账号已被抢先注册，请重新注册");
					return false;
					//通讯出错
				}
			})
	} else { //login 
		//	alert(1);
		$.post("login", {
				id: $("#login .username").val(),
				password: $("#login .password").val(),
				data_cookies: 'true'
			},
			function(d) {
				if (d) {
					//	alert(d);
					setTimeout("recover()", 2000);
				} else {

					alert("密码错误，登录失败");
					return false;
				}
			})
	}
}

function recover() {
	$('.box').animate({
		'left': '550px'
	}, 200).fadeOut(200)
	$("#container").animate({
		'left': '0'
	}, 100)
	setTimeout("recover2()", 200);
	$("#login").fadeOut();
	$("#register").fadeOut();
	if (flag4 == 1) {
		$("#success").fadeIn();
	} else if (flag4 == 2) {
		$("#register_success").fadeIn();
	}
	setTimeout("window.location.href='/MVCDemo'", 1500);
}

function recover2() {
	if (flag4 == 1) {
		$("#container").css({
			'transform': 'perspective(800px) rotateX(0deg) translate3d(0,0,0)',
			'transform-origin': 'buttom',
			'transition': '0.6s'
		})
	} else if (flag4 == 2) {
		$("#container").css({
			'transform': 'perspective(800px) rotateX(0deg) rotateY(' + times * 180 + 'deg) translate3d(0,0,0)',
			'transform-origin': 'buttom',
			'transition': '0.6s'
		})
	}
	$("input").attr("disabled", false);
	flag4 = 0;
}
$("#register #user").blur(function() { //焦点从id框移除时，发送ajax请求判断id是否可用
	if ($(this).val().length < 6) {
		flag2 = 0;
		$("#register .user #judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$("#register .user #judge_true").fadeOut();
	} else {
		$.post("registerJudge", {
			id: $("#user").val()
		}, function(d) {
			if (d) {
				flag2 = 1;
				$("#register .user #judge_true").fadeIn(500).animate({
					'right': '55px'
				}, 200)
				$("#register .user #judge_false").fadeOut();
				//	alert(d);
			} else {
				flag2 = 0;
				$("#register .user #judge_false").fadeIn(500).animate({
					'right': '55px'
				}, 200)
				$("#register .user #judge_true").fadeOut();
			}
		})
	}
})
$("#register #password1").blur(function() { //判断密码是否符合要求
	password1 = $(this).val();
	password2 = $("#register #password2").val();
	if (password1.length < 6) {
		flag3 = 0;
		$("#register #password1").next().fadeOut();
		$("#register #password1").nextAll("#judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
	} else if (password2.length < 6 && password1.length >= 6) {
		flag3 = 1;
		$("#register #password1").next().fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$("#register #password1").nextAll("#judge_false").fadeOut();
	} else if (password2.length >= 6 && password1 == password2) {
		flag3 = 1;
		$("#register #password1").next().fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$("#register #password1").nextAll("#judge_false").fadeOut();
		$("#register #password2").next().fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$("#register #password2").nextAll("#judge_false").fadeOut();
	} else if (password2.length >= 6 && password1 != password2) {
		flag3 = 0;
		$("#register #password2").next().fadeOut();
		$("#register #password2").nextAll("#judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
	}
})
$("#register #password2").blur(function() { //判断密码2是否符合要求
	password2 = $(this).val();
	if (password1 != password2 || password2.length < 6) {
		flag3 = 0;
		$("#register #password2").next().fadeOut();
		$("#register #password2").nextAll("#judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
	} else {
		flag3 = 1;
		$("#register #password2").next().fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$("#register #password2").nextAll("#judge_false").fadeOut();
	}
})
$("#login .username").blur(function() { //login的id框验证
	if ($(this).val().length < 6) {
		$(this).nextAll("#judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$(this).next().fadeOut();
	} else if ($("#login .password").val().length < 6) {
		ID = $(this).val();
		$.post("loginJudge", {
			id: ID
		}, function(d) {
			//alert(d);
			if (d) { //账号正确
				$("#login .username").next().fadeIn(500).animate({
					'right': '55px'
				}, 200)
				$("#login .username").nextAll("#judge_false").fadeOut();
			} else {
				$("#login .username").nextAll("#judge_false").fadeIn(500).animate({
					'right': '55px'
				}, 200)
				$("#login .username").next().fadeOut();
			}
		})
	} else {
		ID = $(this).val();
		$.post("loginJudge", {
			id: ID,
			password: $("#login .password").val()
		}, function(d) {
			if (d) { //账号密码对应正确
				flag1 = 1;
				_true();
			} else {
				flag1 = 0;
				_false();
			}
		})
	}
})
$("#login .password").blur(function() {
	if ($(this).val().length < 6) {
		flag1 = 0;
		$(this).nextAll("#judge_false").fadeIn(500).animate({
			'right': '55px'
		}, 200)
		$(this).next().fadeOut();
	} else if ($("#login .username").val().length >= 6) {
		ID = $("#login .username").val();
		$.post("loginJudge", {
			id: ID,
			password: $(this).val()
		}, function(d) {
			if (d) { //账号密码对应正确
				flag1 = 1;
				_true();
			} else {
				flag1 = 0;
				_false();
			}
		})
	} else {
		return false;
	}
})


function _true() { //login页面的iconfont对飞出，错隐藏
	$("#login .password").next().fadeIn(500).animate({
		'right': '55px'
	}, 200)
	$("#login .password").nextAll("#judge_false").fadeOut();
	$("#login .username").next().fadeIn(500).animate({
		'right': '55px'
	}, 200)
	$("#login .username").nextAll("#judge_false").fadeOut();

}

function _false() { //login页面的iconfont错飞出，对隐藏
	$("#login .password").nextAll("#judge_false").fadeIn(500).animate({
		'right': '55px'
	}, 200)
	$("#login .password").next().fadeOut();
	$("#login .username").nextAll("#judge_false").fadeIn(500).animate({
		'right': '55px'
	}, 200)
	$("#login .username").next().fadeOut();
}