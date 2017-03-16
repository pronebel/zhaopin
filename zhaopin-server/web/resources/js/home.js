var oldName=$(".left p.name").html();
var jcrop_api;
var imgSrc;
var scaling;
var password;
var ctx=$("input.ctx").val();
function init(){
	$("div.right .information ul li input.portraitFile").val("");
	$("div.right div.release div.picture input.pictureFile").val("");
	$("div.right .information ul li .crop i.delete").hide();
	$("div.left ul li:nth-child(1)").click();//默认打开个人信息
	$("div.right .information ul li .crop img#newImg").removeAttr("src");
	$("div.right .onsale img.picture").removeAttr("src");
}

$(".left p.name").blur(function(){//改名
	if($(this).html()!=oldName){
		$.ajax({
			type:"post",
			url:ctx+"/rename",
			dataType:"json",
			data:{name:$(this).html()},
			success:function(data){
				$('div.right .information ul li input.name').val($(".left p.name").html());
				oldName=$(".left p.name").html();
			}
		})
	}
})

$(window).load(function(){
	//checkSession
	$.ajax({
		type:"get",
		cache:false,
		url:ctx+"/checkSession",
		success:function(data){
			if(!data){
				window.location.href=ctx;
			}else{
				getInformation();
				$("div.right").mCustomScrollbar({
					theme:"minimal"
				});
				$("li#app").mCustomScrollbar({
					theme:"minimal"
				});
				$('div.left img').addClass('bounceInDown');
				//获取收藏列表
				$.ajax({
					url:ctx+"/goods/getLikeGoodsList",
					type:'get',
					success:function(data){
						collectionapp.goodsList=data;
					}
				})
				
				//获取已买列表
				$.ajax({
					url:ctx+"/goods/getAllDealForBought",
					type:'get',
					success:function(data){
						boughtapp.goodsList=data;
					}
				})
				
				//获取已卖列表
				$.ajax({
					url:ctx+"/goods/getAllDealForSold",
					type:'get',
					success:function(data){
						soldapp.goodsList=data;
					}
				})
			}
		}
	})
})

function checkSession(){
	var status=false;
	$.ajax({
		type:"get",
		cache:false,
		url:ctx+"/checkSession",
		success:function(data){
			if(!data){
				window.location.href=ctx;
			}
		}
	})
	return true;
}

function getInformation(){
	$.ajax({
		type:"get",
		cache:false,
		url:ctx+"/getInformation",
		success:function(data){
			if(data!=null){
				$("div.left img").removeAttr("src");
				$("div.left img").attr("src",data[0].portrait);//后缀相同的时候不更新图片,原因可能是名字相同不访问服务器加载,直接用原来的
				$("div.left p.name").html(data[0].name);
				$('div.right .information ul li input.userId').val(data[0].id);
				$('div.right .information ul li input.name').val(data[0].name);
				$('div.right .information ul li input.realname').val(data[0].realname);
				$('div.right .information ul li input.datepicker-here').val(data[0].birthday);
				$('div.right .information ul li input.telephone').val(data[0].telephone);
				$('div.right .information ul li input.email').val(data[0].email);
				password=data[0].password;
				if(data[0].sex=="male"){
					$('div.right .information ul li span.male').stop().css({
						'background':'rgba(200,200,250,0.7)'
					},300).next("span.female").stop().css({
						'background':'rgba(200,200,250,0)'
					});
					$('div.right .information ul li span.resultSex').attr("data-sex",data[0].sex);
				}else if(data[0].sex=="female"){
					$('div.right .information ul li span.female').stop().css({
						'background':'rgba(200,200,250,0.7)'
					},300).prev("span.male").stop().css({
						'background':'rgba(200,200,250,0)'
					});
					$('div.right .information ul li span.resultSex').attr("data-sex",data[0].sex);
				}
			}
		}
	});
	
}
$("div.left ul li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(this).find("i.right").stop(true).fadeIn(300).animate({
		'right':'-10px'
	},300).end().siblings().find("i.right").hide().css({
		'right':'-20px'
	});
	var _index=$(this).index();//从0开始计算
	$("div.right").find("div.container").eq(_index).fadeIn(1000).siblings("div.container").hide();
})

$("div.right ul li div.header").click(function(){
	if($(this).parents('li')[0].id=="app"){
		$(this).parents("li").stop().animate({"height":"520px"},300).siblings().stop().animate({"height":"50px"},300);
	}else{
		$(this).parents("li").stop().animate({"height":"410px"},300).siblings().stop().animate({"height":"50px"},300);
	}
	$(this).find("i.left").html("&#xe620;").end().parents("li").siblings().find("i.left").html("&#xe621;");
})

function setportrait(){
	$("div.right ul li div.cropcon input.portraitFile").click();
}

function checkFile(file){
	var fileType = file.value.substring(file.value.lastIndexOf(".")+1);
	//html5 FileReader 图片进行预览裁剪
		var select="div.right .information ul li div.crop img.portrait";
		var reader = new FileReader();
		var img = document.getElementById("newImg");
		reader.readAsDataURL(file.files[0]);
		reader.onload = function(evt){img.src = this.result;}
		//初始化Jcrop
		$(select).load(function(){
			var realWidth=this.width;//图片真实宽度
			var realHeight=this.height;//图片真实高度
			scaling=realWidth/$(select).width();//图片缩放比例
			if(realWidth<200||realHeight<200||realWidth>1000||realHeight>530){							
				$(select).parents("div.cropcon").find("input.portraitFile").val("");
				$(select).remove();//不整个移除会有bug 会循环执行onload();
				$("div.right .information div.crop i.delete").before("<img class=portrait id=newImg />");
				$('p.message').html("图片尺寸太小(<200*200)或太大(>1000*530),请重新选择").stop().fadeIn(1000,function(){
					setTimeout("$('p.message').fadeOut(1000)",3000);
				});
				$('div.cropcon').addClass('shake');
				setTimeout("$('div.cropcon').removeClass('shake')",2000);
				return false;
			}else{
				if(realWidth<500 && realHeight<320){
					$(this).css({
						'max-width':'100%',
						'max-height':'100%'
					}).Jcrop({
						onChange: showCoords, //当选择区域变化的时候，执行对应的回调函数
						onSelect: showCoords,
						aspectRatio: 1, //选中区域宽高比为1，即选中区域为正方形
						allowSelect:false,
						bgColor:'#fff', //裁剪时背景颜色设为灰色
						bgOpacity: 0.2, //透明度设为0.1						
						boxWidth:1000,
						boxHeight:320,
						minSize: [150,150],//最小选框
				  		maxSize:[150,150],//最大选框
						allowResize: false, //不允许改变选中区域的大小
						setSelect: [(realWidth-150*scaling)/2,(realHeight-150*scaling)/2,realWidth+150*scaling,realHeight+150*scaling]//初始化选框的位置和大小				
					},function(){
						jcrop_api=this;
					});
					var margin_top=($(select).parent('div.crop').height()-$(select).prev('div.jcrop-active').height())/2;
					$('div.jcrop-active').css({//使得图片水平垂直居中
						'margin':'0 auto',
						'margin-top':margin_top
					})
					$("div.right .information div.cropcon").find("p.description").hide().end().find("i.photo").hide();
					$(select).parent("div.crop").show().addClass('flipInX');
					setTimeout("$(select).parent('div.crop').removeClass('flipInX')",1000);
					$(select).parent("div.crop").find("i.delete").show();
					$('div.right .information ul li .preview').show().addClass('flipInX');
					setTimeout("$('div.right .information ul li .preview').removeClass('flipInX')",1000);
					$('p.message').html("您可以拖动图中的选择框对图片进行裁剪").stop().fadeIn(1000,function(){
						setTimeout("$('p.message').fadeOut(1000)",3000);
					});
				}else{
					var _src=$(select).attr("src");
					$('div.cropbox').html('<img id=target />');
					$('img#target').attr("src",_src);
					$(select).css({
						'max-width':'100%',
						'max-height':'100%'
					})
					$('img#target').load(function(){						
						var Width=Math.min(this.width+260,1200);
						var Height=Math.max(Math.min(this.height+60,600),440);
						var margin_left=($('#cropapp .modal-mask').width()-Width)/2;
						$('#cropapp .modal-container').css({
							'width':Width+'px',
							'height':Height+'px',
						});						
						$(this).Jcrop({
							onChange: showView, //当选择区域变化的时候，执行对应的回调函数
							onSelect: showView,
							aspectRatio: 1, //选中区域宽高比为1，即选中区域为正方形
							allowSelect:false,
							bgColor:'#fff', //裁剪时背景颜色设为灰色
							bgOpacity: 0.2, //透明度设为0.1
							minSize: [200,200],//最小选框
					  		maxSize:[200,200],//最大选框
							allowResize: false, //不允许改变选中区域的大小
							setSelect: [100,100,300,300]//初始化选框的位置和大小				
						},function(){
							jcrop_api=this;
						});
						$("div.right .information div.cropcon").find("p.description").hide().end().find("i.photo").hide();						
						cropapp.$data.showModal=true;//使用大框jcrop
					})//load
				}//else
			}//else
		})//load
}

function showView(c){
	$("#txtX1").val(c.x); //得到选中区域左上角横坐标
	$("#txtY1").val(c.y); //得到选中区域左上角纵坐标
	$("#txtX2").val(c.x2); //得到选中区域右下角横坐标
	$("#txtY2").val(c.y2); //得到选中区域右下角纵坐标
	$("#txtWidth").val(c.w); //得到选中区域的宽度
	$("#txtHeight").val(c.h); //得到选中区域的高度
    var s=$('img#target').attr("src");
	var x=$("#txtX1").val()*(-1)+'px';//水平偏移量
	var y=$("#txtY1").val()*(-1)+'px';//垂直偏移量
	$("div#cropapp .preview-1").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div#cropapp .preview-2").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div#cropapp .preview-3").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'		
	})
	
}
function showPreview(){
	$("div.right .information div.cropcon").find("div.crop").show().addClass('flipInX').find("i.delete").show();
	setTimeout('$("div.right .information div.cropcon").find("div.crop").removeClass("flipInX")',1000);
	$('div.right .information ul li .preview').show().addClass('flipInX');
	setTimeout('$("div.right .information ul li .preview").removeClass("flipInX")',1000);
	var s=$("img#target").attr("src");
	var x=$("#txtX1").val()*(-1)+'px';//水平偏移量
	var y=$("#txtY1").val()*(-1)+'px';//垂直偏移量
	$("div.right .information div.preview .pre:nth-child(1)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div.right .information div.preview .pre:nth-child(2)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div.right .information div.preview .pre:nth-child(3)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'		
	})
}

function deleteCrop(){
	$("div.right .information ul li .crop .delete").click();
}
function showCoords(c) {
	$("#txtX1").val(c.x); //得到选中区域左上角横坐标
	$("#txtY1").val(c.y); //得到选中区域左上角纵坐标
	$("#txtX2").val(c.x2); //得到选中区域右下角横坐标
	$("#txtY2").val(c.y2); //得到选中区域右下角纵坐标
	$("#txtWidth").val(c.w); //得到选中区域的宽度
	$("#txtHeight").val(c.h); //得到选中区域的高度
    var s=$("div.right .information ul li div.crop img.portrait").attr("src");
	var x=$("#txtX1").val()*(-1)+'px';//水平偏移量
	var y=$("#txtY1").val()*(-1)+'px';//垂直偏移量
	$("div.right .information div.preview .pre:nth-child(1)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div.right .information div.preview .pre:nth-child(2)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'
	})
	$("div.right .information div.preview .pre:nth-child(3)").css({
		'background-position':x+' '+y,
		'background-image':'url('+s+')'		
	})
}

$("div.right .information ul li .crop .delete").click(function(){//删除头像设置
	$('div.right .information div.preview').addClass('flipOutX');
	jcrop_api.destroy();
	$(this).parent('div.crop').addClass('flipOutX');
	$("div.right .information div.cropcon").find("p.description").show().addClass('bounceInDown').end().find("i.photo").show().addClass('bounceInDown').end().find('input.portraitFile').val("");
	$(this).prev("img.portrait").remove();//不整个移除会有bug 会循环执行onload();
	$(this).before("<img class=portrait id=newImg />");
	$('div.right .information div.preview pre').each(function(){
		$(this).removeAttr("style");
	})
	setTimeout(function(){
		$('div.right .information div.preview').removeClass('flipOutX').hide();
		$('div.right .information ul li .crop .delete').hide().parent('div.crop').removeClass('flipOutX').hide();
		$("div.right .information div.cropcon").find("p.description").removeClass('bounceInDown').end().find("i.photo").removeClass('bounceInDown');
	},1000)
	//cropapp
	$('img#target').remove();
	$('div.cropbox').html('<img id=target />');
	$('div#cropapp .preview').each(function(){
		$(this).removeAttr("style");
	})
})


function openDatepicker(selector){
	$(selector).datepicker({
		maxDate: new Date()
	});
}

$("span.male").click(function(){
	$(this).stop().css({
		'background':'rgba(200,200,250,0.7)'
	},300).next("span.female").stop().css({
		'background':'rgba(200,200,250,0)'
	});
	$("span.resultSex").attr("data-sex",'male');
})

$("span.female").click(function(){
	$(this).stop().css({
		'background':'rgba(200,200,250,0.7)'
	},300).prev("span.male").stop().css({
		'background':'rgba(200,200,250,0)'
	});
	$("span.resultSex").attr("data-sex",'female');
})


function send(){
	//检查各内容是否符合要求
	if(!checkPassword("div.right .information input.password2")){
		$('p.message').html("密码设置错误,请检查").stop().fadeIn(1000,function(){
			setTimeout("$('p.message').fadeOut(1000)",3000);
		});		
		return false;
	}
	if(!checkMobile("div.right .information input.telephone")){
		$('p.message').html("手机号码输入错误,请检查").stop().fadeIn(1000,function(){
			setTimeout("$('p.message').fadeOut(1000)",3000);
		});		
		return false;
	}
	if(!checkEmail("div.right .information input.email")){
		$('p.message').html("电子邮箱输入错误,请检查").stop().fadeIn(1000,function(){
			setTimeout("$('p.message').fadeOut(1000)",3000);
		});		
		return false;
	}
	var Data=new FormData();//创建FormData对象接收数据
	$('p.message').html("数据正在发送中,请等待...").stop().fadeIn(1000).next('img.message').fadeIn(1000);
	if($("div.right .information ul li input.portraitFile").val()!=""){//查看是否有设置头像
		Data.append('x1',$("#txtX1").val());
		Data.append('x2',$("#txtX2").val());
		Data.append('y1',$("#txtY1").val());
		Data.append('y2',$("#txtY2").val());
		Data.append('width',$("#txtWidth").val());
		Data.append('height',$("#txtWidth").val());
		Data.append('upload_file', $("div.right .information ul li input.portraitFile")[0].files[0]);//最后放入图片文件
		$.ajax({//先上传图片再发送其他文本数据
			url:ctx+'/crop',
		    type:'POST',
			data:Data,
			cache: false,
	        contentType: false,        //不可缺参数
	        processData: false,       //不可缺参数
	        success:function(data){
	        	if(data){
	        		sendInformation();
	        		$("div.right .information ul li .crop .delete").click();
	        	}else{
	        		$('p.message').html("头像保存失败").stop().fadeIn(1000,function(){
						setTimeout("$('p.message').fadeOut(1000)",3000);
					}).next('img.message').fadeOut(1000);
	        		messageapp.$data.message='对不起,头像保存失败,请检查后台服务';
	        		messageapp.$data.showModal=true;
	        	}
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){
	        	$('p.message').html("ajax失败").stop().fadeIn(1000,function(){
					setTimeout("$('p.message').fadeOut(1000)",3000);
				}).next('img.message').fadeOut(1000);
	        	messageapp.$data.message='对不起,头像保存失败,请检查后台服务是否已经启动';
        		messageapp.$data.showModal=true;
	        }
		})
	}else{
		sendInformation();
	}
}

function sendInformation(){
	if($("div.right .information input.password").val()!=""){
		password=$("div.right .information input.password").val();
	}
	$.ajax({
		url:ctx+'/updateInformation',
		type:'POST',
		dataType:'json',
		data:{
			password:password,	
			name:$('div.right .information input.name').val(),
			realname:$('div.right .information input.realname').val(),
			sex:$('div.right .information span.resultSex').attr("data-sex"),
			birthday:$('div.right .information input.datepicker-here').val(),
			telephone:$('div.right .information input.telephone').val(),
			email:$('div.right .information input.email').val()
		},
		success:function(data){
			if(data){
				getInformation();
				$('p.message').html("数据保存成功").stop().fadeIn(1000,function(){
					setTimeout("$('p.message').fadeOut(1000)",3000);
				}).next('img.message').fadeOut(1000);
				$("div.right .information i.check").each(function(){
					$(this).hide().css({
						'margin-left':'2em'
					})
				})
			//	messageapp.$data.message='数据保存成功';
			//	messageapp.$data.showModal=true;
			}else{
				$('p.message').html("数据保存失败").stop().fadeIn(1000,function(){
					setTimeout("$('p.message').fadeOut(1000)",3000);
				}).next('img.message').fadeOut(1000);
				messageapp.$data.message='对不起,文本数据保存失败,请检查后台服务';
        		messageapp.$data.showModal=true;
			}			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$('p.message').html("ajax失败").stop().fadeIn(1000,function(){
				setTimeout("$('p.message').fadeOut(1000)",3000);
			}).next('img.message').fadeOut(1000);
			messageapp.$data.message='对不起,文本数据保存失败,请检查后台服务是否已经启动';
    		messageapp.$data.showModal=true;
        }
	});
}

function cleanDate(selector){
	$(selector).val("");
}

function checkMobile(selector){	
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if($(selector).val()==""){
		return true;
	}else{
		if(!reg.test($(selector).val())) 
		{
		    $(selector).next("i.check").html("&#xe61c;").stop().fadeIn(300).css({
		    	'margin-left':'0em'
		    })
		    return false;
		}else{
			$(selector).next("i.check").html("&#xe619;").stop().fadeIn(300).css({
		    	'margin-left':'0em'
		    })
		    return true;
		}
	}
} 
function checkPassword(selector){
	var password1=$("div.right .information ul li .password1").val();
	var password2=$(selector).val();
	if(password1==""&&password2==""){//没有修改密码
		return true;
	}else{
		if(password1.length<6||password2.length<6){
			$(selector).next("i.check").html("&#xe61c;").stop().fadeIn(300).css({
		    	'margin-left':'0em'
		    });
		    $("div.right .information ul li .password1").next("i.check").html("&#xe61c;").stop().fadeIn(300).css({
		    	'margin-left':'0em'
		    });
			return false;
		}else{
			if(password1!=password2){
				$(selector).next("i.check").html("&#xe61c;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			    });
			    $("div.right .information ul li .password1").next("i.check").html("&#xe61c;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			    });
				return false;
			}else{
				$(selector).next("i.check").html("&#xe619;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			    });
			    $("div.right .information ul li .password1").next("i.check").html("&#xe619;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			    });
				return true;
			}
		}
	}
}
function checkDate(selector){
	if($(selector).val()==""){
		return true;
	}else{
		$(selector).next('i.check').html("&#xe619;").stop().fadeIn(300).css({
	    	'margin-left':'0em'
	    });
		return true;
	}
}
function checkEmail(selector){
	if($(selector).val()==""){
		return true;
	}else{
		 var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		 if(!reg.test($(selector).val())){
			 $(selector).next('i.check').html("&#xe61c;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			 });
			 return false;
		 }else{
			 $(selector).next('i.check').html("&#xe619;").stop().fadeIn(300).css({
			    	'margin-left':'0em'
			 });
			 return true;
		 }			 
	}
}

$("div.right .information span.save").hover(function(){
	$(this).css({
		'background':'rgba(200,50,50,0.8)',
		'color':'rgba(255,255,255,0.8)',
		'transition':'all 0.5s ease'
	})
	$(this).prev('i.save').css({
		'color':'rgba(255,255,255,0.8)',
		'transition':'all 0.5s ease'
	})		
},function(){
	$(this).css({
		'background':'rgba(255,255,255,0.8)',
		'color':'rgba(200,0,0,0.8)'
	})
	$(this).prev('i.save').css({
		'color':'rgba(200,0,0,0.8)'
	})
})

$("div.right .information i.save").hover(function(){
	$(this).next("span.save").css({
		'background':'rgba(200,50,50,0.8)',
		'color':'rgba(255,255,255,0.8)',
		'transition':'all 0.5s ease'
	})
	$(this).css({
		'color':'rgba(255,255,255,0.8)',
		'transition':'all 0.5s ease'
	})		
},function(){
	$(this).next("span.save").css({
		'background':'rgba(255,255,255,0.8)',
		'color':'rgba(200,0,0,0.8)'
	})
	$(this).css({
		'color':'rgba(200,0,0,0.8)'
	})
})

$("div.right div.release div.goods").hover(function(){
	$(this).find("i.top").stop().fadeIn(300).css({
		'top':'31px',
		'transition':'top 0.3s ease-in-out'
	},300).end().find("ul").stop().fadeIn(300).css({
		'top':"50px",
		'transition':'all 0.3s ease-in-out'
	},300);
},function(){
	$(this).find("i.top").stop().css({
		'top':'68px',
		'transition':'top 0.3s ease-in-out'
	},300).fadeOut(300).end().find("ul").stop().css({
		'top':'90px',
		'transition':'all 0.3s ease-in-out'
	},300).fadeOut(300);
})

$("div.right div.release div.goods ul li").click(function(){
	var data_type1=$(this).parents("div.goods").attr('data-type1');//大种类
	var data_type2=$(this).html();//小种类
	$(this).parents("div.release").find("span.type").attr('data-type1',data_type1).attr('data-type2',data_type2);//为种类赋值
	$(this).parents("div.goods").css({
		'background':'rgba(200,200,250,0.7)'
	}).siblings().css({
		'background':'rgba(200,200,250,0)'
	});
	$(this).parent('ul').hide().css({
		'top':'90px'
	}).prev("i.top").hide().css({
		'top':'68px'
	});
	$(this).parents("div.goods").nextAll("i.typeCheck").fadeIn(300).animate({
		'margin-left':'0px'
	},300)
})

function setPicture(selector){
	$(selector).next("input.pictureFile").click();	
}

function checkPicture(file,event){
	var fileType = file.value.substring(file.value.lastIndexOf(".")+1);
	if(fileType!="jpg"&&fileType!="png"&&fileType!="bmp"&&fileType!="jpeg"){//判断类型
		$(file).val("");
		$(file).nextAll('p.errorMessage').html("请正确选择图片文件").fadeIn(1000,function(){
			setTimeout("$('p.errorMessage').fadeOut(1000)",3000);
		})
		return false;
	}else{
		var reader = new FileReader();
		reader.readAsDataURL(file.files[0]);
		reader.onload = function(evt){$(file).next().attr('src',this.result);}
		$(file).next().load(function(){//图片加载完成后判定图片大小是否符合要求
			var realWidth=this.width;//图片的真实宽度
			var realHeight=this.height;//图片的真实高度
			var imgWidth;//缩放后的宽度
			var imgHeight;//缩放后的高度
			if(realWidth<360||realHeight<300||realWidth>720||realHeight>600||realWidth/realHeight>1.6||realHeight/realWidth>1.2){//图片真实尺寸太小
				$(this).remove();//图片移除,不整个移除有bug
				$(file).after("<img class=pictureView />");//重新加入空白图片标签
				$(file).val("");//清空input file框
				$(file).nextAll('p.errorMessage').html("图片尺寸太小(<360*300)或太大(>720*600)或比例不协调,请重新选择").fadeIn(1000,function(){
					setTimeout("$('p.errorMessage').fadeOut(1000)",3000);
				})			
				var selector=event.target;
				$(selector).parent('div.picture').addClass('shake');
				setTimeout("$('div.release div.picture').each(function(){$(this).removeClass('shake')})",1000);				
				return false;
			}else{
				$(this).css({
					'max-width':'100%',
					'max-height':'100%'
				})
				imgWidth=this.width;//缩放后的宽度
				imgHeight=this.height;//缩放后的高度
				if(imgWidth/imgHeight>2||imgHeight/imgWidth>2){//不允许比例过大
					$(this).remove();//图片移除,不整个移除有bug
					$(file).after("<img class=pictureView />");//重新加入空白图片标签
					$(file).val("");//清空input file框
					$(file).nextAll('p.errorMessage').html("图片宽高比例过大,请重新选择").fadeIn(1000,function(){
						setTimeout("$('p.errorMessage').fadeOut(1000)",3000);
					})
				}else{//符合要求
					$(file).prevAll().hide();
					var margin_top=($(this).parent("div.picture").height()-imgHeight)/2;//外框的高度
					$(this).css({//目的是让图片水平和垂直居中
						'margin':'0 auto',//先让图片水平居中
						'margin-top':margin_top//现在让图片垂直居中
					}).next().fadeIn(300);
				}
			}
		})
	}
}

function deletePicture(selector){
	$(selector).fadeOut(300).prev().remove();
	$(selector).prev().val("").prev().fadeIn(300).prev().fadeIn(300);
	$(selector).before("<img class=pictureView />");
}

function checkGoodsName(selector){
	if($(selector).val()==""){
		$(selector).next().fadeOut(300).animate({
			'margin-left':'60px'
		},300)
		return false;
	}else{
		$(selector).next().fadeIn(300).animate({
			'margin-left':'0'
		},300)
		return true;
	}
}

function checkProduction_date(selector){
	var str=$(selector).val();
	if(str.lastIndexOf("-")!=-1){
		$(selector).next().fadeIn(300).animate({
			'margin-left':'0'
		},300)
		return true;
	}else{
		$(selector).next().fadeOut(300).animate({
			'margin-left':'60px'
		},300)
		return false;
	}
}

function checkExpiration_date(selector){
	if($(selector).val()==""){
		$(selector).next().fadeOut(300).animate({
			'margin-left':'60px'
		},300)
		return false;
	}else{
		var str=$(selector).val();
		str=parseInt(str,10)//去掉前面的0
		$(selector).val(str);
		$(selector).next().fadeIn(300).animate({
			'margin-left':'0'
		},300)
		return true;
	}
}

function checkPrice(selector){
	var str=$(selector).val();
	if(str==""){
		$(selector).next().fadeOut(300).animate({
			'margin-left':'60px'
		},300)
		return false;
	}else{
		str=parseFloat(str);//转成float型
		str=Math.floor(str*100)/100 //取小数点后2位
		$(selector).val(str);
		$(selector).next().fadeIn(300).animate({
			'margin-left':'0'
		},300);
		return true;
	}
}

function checkInventory(selector){
	if($(selector).val()==""){
		$(selector).next().fadeOut(300).animate({
			'margin-left':'60px'
		},300)
		return false;
	}else{
		var str=$(selector).val();
		str=parseInt(str,10)//去掉前面的0 
		$(selector).val(str);
		$(selector).next().fadeIn(300).animate({
			'margin-left':'0'
		},300)
		return true;
	}
}

function checkLength(selector){
	var str=$(selector).val();
	str = str.replace(/<\/?[^>]*>/g,'');//去除HTML标签
	str = str.replace(/[ | ]*\n/g,'\n');//去掉空白
	var residue=60-str.length;//剩余可输入的长度
	$(selector).nextAll("span.residue_length").html("还可以输入"+residue+"个字符");
}

function checkDescription(selector){
	if($(selector).val().length<20){//不允许描述少于20字符
		$(selector).next().fadeOut(300).animate({
			'margin-left':'393px'
		},300);
		$(selector).addClass('shake');
		setTimeout("$('textarea.description').removeClass('shake')",1000);
		return false;
	}else{
		$(selector).next().fadeIn(300).animate({
			'margin-left':'333px'
		},300);
		return true;
	}
}

function sendGoods(){
	if($("div.release span.type").attr("data-type1")!=""&&$("div.release span.type").attr("data-type2")!=""&&checkGoodsName("div.release input.goodsName")&&checkProduction_date("div.release input.production_date")&&checkExpiration_date("div.release input.expiration_date")&&checkPrice("div.release input.price")&&checkInventory("div.release input.inventory")&&checkDescription("div.release textarea.description")&&$("div.release input.pictureFile0").val()!=""&&$("div.release input.pictureFile1").val()!=""&&$("div.release input.pictureFile2").val()!=""&&$("div.release input.pictureFile3").val()!="" ){//所有信息输入正确                 		
		var Data=new FormData();//创建FormData对象接收数据
		Data.append('data_type1',$("div.release span.type").attr("data-type1"));//大种类
		Data.append('data_type2',$("div.release span.type").attr("data-type2"));//小种类
		Data.append('goods_name',$("div.release input.goodsName").val());//商品名称
		Data.append('production_date',$("div.release input.production_date").val());//生产日期
		Data.append('expiration_date',$("div.release input.expiration_date").val());//保质期
		Data.append('price',$("div.release input.price").val());//价格
		Data.append('inventory',$("div.release input.inventory").val());//库存
		Data.append('description',$("div.release textarea.description").val());//商品描述
		for(var j=0;j<4;j++){
	       	var theFile='.pictureFile'+j;
	       	if(typeof($(theFile)[0])!="undefined"){
			    $.each($(theFile)[0].files, function(i,file) {
          			Data.append('upload_file'+j, file);
  				});
	       	}
	    }
		$('p.callbackMessage').html("数据正在发送中...").fadeIn(1000).next('img.callbackMessage').fadeIn(1000);
		$.ajax({
			url:ctx+'/goods/releaseGoods',
			type:'POST',
			data:Data,
			cache: false,
	        contentType: false,        //不可缺参数
	        processData: false,       //不可缺参数
	        success:function(data){
	        	if(data){
	        		//成功发送之后，将所有数据清除	        		
	/*        		$("div.right .release .picture i.delete").click();
	        		$("div.release span.type").attr("data-type1","");
	        		$("div.release span.type").attr("data-type2","");
	        		$("div.release input.goodsName").val("").blur();
	        		$("div.release input.production_date").val("").blur();
	        		$("div.release input.expiration_date").val("").blur();
	        		$("div.release input.price").val("").blur();
	        		$("div.release input.inventory").val("").blur();
	        		$("div.release textarea.description").val(""); 
	        		$("div.right .release").find("div.goods").css({
	        			'background':"rgba(0,0,0,0)"
	        		}).end().find("i.typeCheck").hide().css({
	        			'margin-left':'60px'	       			
	        		});*/
	        		$('p.callbackMessage').html("数据发送成功,商品上架成功!").fadeIn(1000,function(){
	        			setTimeout("$('p.callbackMessage').fadeOut(1000)",3000);
	        		}).next('img.callbackMessage').fadeOut(1000);
	        	//	messageapp.$data.message='商品发布成功~~~';
	        	//	messageapp.$data.showModal=true;
	        	}else{
	        		$('p.callbackMessage').html("ajax失败,请重试").fadeIn(1000,function(){
	        			setTimeout("$('p.callbackMessage').fadeOut(1000)",3000);
	        		}).next('img.callbackMessage').fadeOut(1000);
	        		messageapp.$data.message='对不起,商品发布失败,请检查服务是否已启动';
	        		messageapp.$data.showModal=true;
	        	}
	        },
	        error:function(){
	        	$('p.callbackMessage').html("通讯故障,ajax失败").fadeIn(1000,function(){
        			setTimeout("$('p.callbackMessage').fadeOut(1000)",3000);
        		}).next('img.callbackMessage').fadeOut(1000);
	        	messageapp.$data.message='对不起,商品发布失败,请检查服务是否已启动';
        		messageapp.$data.showModal=true;
	        }
		})
	}else{
		$('p.callbackMessage').html("请正确设置所有信息").fadeIn(1000,function(){
			setTimeout("$('p.callbackMessage').fadeOut(1000)",3000);
		})
		messageapp.$data.message='对不起,请正确填写所有信息再重试';
	    messageapp.$data.showModal=true;
		return false;
		
	}
};

//register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    limitKeys : Array,
    filterKey: String,
    itemsPerPage:Number,
	beginPerPage:Number
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
    }
  },
  methods: {
	  sortBy: function (key) {
		  this.sortKey = key;
		  this.sortOrders[key] = this.sortOrders[key] * -1;
	  },
	  domn:function(list) {
		  $.ajax({
			  type:"get",
			  cache:false,
			  url:ctx+"/checkSession",
			  success:function(data){
				  if(data){
					  $.ajax({
						  url:ctx+"/goods/updateStatus",
						  type:'post',
						  data:{id:list.id,status:false},
						  success:function(data){
							  list.status=false;
						  } 
					  })
				  }else{
					  window.location.href=ctx;
				  }
			  }
		  })
	  },
	  up:function(list) {
		  if(list.inventory<=0){
			  messageapp.$data.message='您的库存已为零,不能上架,请添加库存';
			  messageapp.$data.showModal=true;
			  return;
		  }else{
			  $.ajax({
				  type:"get",
				  cache:false,
				  url:ctx+"/checkSession",
				  success:function(data){
					  if(data){
						  $.ajax({
							  url:ctx+"/goods/updateStatus",
							  type:'post',
							  data:{id:list.id,status:true},
							  success:function(data){
								  list.status=true;
							  }
						  })
					  }else{
						  window.location.href=ctx;
					  }
				  }
			  })
		  }
	  },
	  onEnterPrice: function(list,event){
		  console.log(list.price+"   "+event.target.value+"  ");
		  if(event.target.value==""){
			  event.target.value=list.price;
			  return;
		  }
		  var val=parseFloat(event.target.value);//转成float型
		  val=Math.floor(val*100)/100; //取小数点后2位	
		  $.ajax({
			  type:"get",
			  cache:false,
			  url:ctx+"/checkSession",
			  success:function(data){
				  if(data&&list.price!=val){
					  $.ajax({
						  url:ctx+'/goods/updatePrice',
						  type:'post',
						  data:{id:list.id,price:val},
						  success:function(data){
							  if(data){
								  list.price=val;
					//			  messageapp.$data.message='价格已修改成功!';
					//			  messageapp.$data.showModal=true;
							  }else{
								  //ajax错误
								  messageapp.$data.message='价格修改失败,请查看后台服务';
								  messageapp.$data.showModal=true;
							  }
						  },
						  error:function(){
							  messageapp.$data.message='价格修改失败,请查看后台服务是否已经正确启动';
							  messageapp.$data.showModal=true;
						  }
					  })
				  }else if(!data){
					  window.location.href=ctx;
				  }
			  }
		  })
	  },
	  onEnterInventory: function(list,event){
		  console.log(list.inventory+"   "+event.target.value);
		  if(event.target.value==""){
			  event.target.value=list.inventory;
			  return;
		  }
		  var val=parseInt(event.target.value);//转成int型
		  $.ajax({
			  type:"get",
			  cache:false,
			  url:ctx+"/checkSession",
			  success:function(data){
				  if(data&&list.inventory!=val){
					  $.ajax({
						  url:ctx+'/goods/updateInventory',
						  type:'post',
						  data:{id:list.id,inventory:val},
						  success:function(data){
							  if(data){
								  list.inventory=val;
				//				  messageapp.$data.message='库存修改成功!';
				//				  messageapp.$data.showModal=true;
							  }else{
								  //ajax错误
								  messageapp.$data.message='库存修改失败,请查看后台服务';
								  messageapp.$data.showModal=true;
							  }
						  },
						  error:function(){
							  //ajax错误
							  messageapp.$data.message='库存修改失败,请查看后台服务是否正确启动';
							  messageapp.$data.showModal=true;
						  }
					  })
				  }else if(!data){
					  window.location.href=ctx;
				  }
			  }
		  })
	  }
  },
  filters:{
	  count: function(list){
		  this.$parent.$data.totalCount=Math.max(list.length,1);//最少要有1页,就算没有数据
		  this.$parent.$data.currentPage=Math.max(Math.min(Math.ceil(list.length/ this.$parent.$data.itemsPerPage),this.$parent.$data.currentPage),1);
		  jsPage('#pagination', list.length ,this.$parent.$data.itemsPerPage , this.$parent.$data.currentPage , 'goPage');
		  return list;
		  }
	  }
})

// bootstrap the demo
var demo = new Vue({
  el: '#vueapp',
  data: {
	  searchQuery: '',
      gridColumns: ['name','price','release_date','inventory','sold'],
      limitKeys: ['name','price','release_date','inventory','sold','type1','type2','description'],
      gridData:[{}],
      currentPage:1,//当前页数 从1开始计算
      itemsPerPage:6,//每页显示的个数
	  totalCount:0,
	  totalPages:0,
	  pageKey:''
  },
  watch:{
	  'beginPerPage':function(val){
		  this.$root.$data.beginPerPage=val;
	  },
  },
  created:function(){
	  var grid=this;
	  $.ajax({
			type:"get",
			cache:false,
			url:ctx+"/checkSession",
			success:function(data){
				if(!data){
					window.location.href=ctx;
				}else{
					$.ajax({
						  url:ctx+"/goods/getOnsaleGoods",
						  cache:false,
						  success:function(data){
							  grid.gridData=data;
						  }
					  })
				}
			}
		})
  },
  computed:{
	  beginPerPage:function(){//每页的第一条数据的index 从0开始计算
	 	  if(this.currentPage==1){
			  return 0;
		  }else{
			  return this.itemsPerPage*(this.currentPage-1);
		  }
	  },
	  totalPages:function(){
		  return Math.ceil(this.totalCount/this.itemsPerPage);
	  }
  },
  methods:{
	  go:function(){
		  var vm=this;
		  if(vm.pageKey==""){
			  return;
		  }else{
			  vm.currentPage=vm.pageKey;
			  vm.pageKey='';
		  }
	  },
	  refresh:function(){
		  $.ajax({
				type:"get",
				cache:false,
				url:ctx+"/checkSession",
				success:function(data){
					if(!data){
						window.location.href=ctx;
					}else{
						$.ajax({
							  url:ctx+"/goods/getOnsaleGoods",	
							  cache:false,
							  success:function(data){
								  demo.$data.gridData=data;
							  }
						  })
					}
				}
		  })
	  }
  }
})

function goPage(pageIndex) {
	if($('div.collection')[0].style.display=="block"){
		collectionapp.$data.currentPage=pageIndex;
	}else if($('div.bought')[0].style.display=="block"){
		boughtapp.currentPage=pageIndex;
	}else if($('div.sold')[0].style.display=="block"){
		soldapp.currentPage=pageIndex;
	}else{
		demo.currentPage=pageIndex;
	}
}

$('div#vueapp span.animated').click(function(){
	$(this).addClass('rotateIn');
	setTimeout(function(){
		$('div#vueapp span.animated').each(function(){
			$(this).removeClass('rotateIn')
		})
	},1000);
})

$('div#collectionapp span.animated').click(function(){
	$(this).addClass('rotateIn');
	setTimeout(function(){
		$('div#collectionapp span.animated').each(function(){
			$(this).removeClass('rotateIn')
		})
	},1000);
})

$('div#boughtapp span.animated').click(function(){
	$(this).addClass('rotateIn');
	setTimeout(function(){
		$('div#boughtapp span.animated').each(function(){
			$(this).removeClass('rotateIn')
		})
	},1000);
})
$('div#soldapp span.animated').click(function(){
	$(this).addClass('rotateIn');
	setTimeout(function(){
		$('div#soldapp span.animated').each(function(){
			$(this).removeClass('rotateIn')
		})
	},1000);
})
Vue.component('modal', {
	  template: '#modal-template',
	  props: {
	    show: {
	      type: Boolean,
	      required: true,
	      twoWay: true    
	    }
	  }
	})

	// start app
var cropapp=new Vue({
	  el: '#cropapp',
	  data: {
	    showModal: false
	  }
	})

var messageapp=new Vue({
	el:'#messageapp',
	data:{
		showModal:false,
		message:''
	}
})

Vue.transition('flip', {
	type: 'animation',
	enterClass: 'flipInX',
	leaveClass: 'flipOutX'
})

Vue.transition('lightSpeed', {
	type: 'animation',
	enterClass: 'lightSpeedIn',
	leaveClass: 'lightSpeedOut'
})

Vue.transition('bounce', {
  type: 'animation',
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight' 
})

var collectionapp=new Vue({
	el:'#collectionapp',
	data:{
		columns:['name','price','release_date','inventory'],
		goodsList:[],
		currentPage:1,//当前页数 从1开始计算
		itemsPerPage:6,
		limitKeys: ['name','price','release_date','inventory'],
		filterKey:'',
		totalCount:0,
		pageKey:'',
		href:'details?'
	},
	computed:{
		beginPerPage:function(){//每页的第一条数据的index 从0开始计算
		 	if(this.currentPage==1){
		 		return 0;
			}else{
				return this.itemsPerPage*(this.currentPage-1);
			}
		},
		totalPages:function(){
			return Math.ceil(this.totalCount/this.itemsPerPage);
		}
	},
	methods:{
		refresh:function(){
			 $.ajax({
					type:"get",
					cache:false,
					url:ctx+"/checkSession",
					success:function(data){
						if(!data){
							window.location.href=ctx;
						}else{
							$.ajax({
								  url:ctx+"/goods/getLikeGoodsList",	
								  cache:false,
								  type:'get',
								  success:function(data){
									  collectionapp.goodsList=data;
								  }
							  })
						}
					}
			  })
		},
		go:function(){
			var vm=this;
			if(vm.pageKey==""){
				return;
			}else{
				vm.currentPage=vm.pageKey;
				vm.pageKey='';
			}
		}
	},
	filters:{
		count: function(list){
			this.totalCount=Math.max(list.length,1);//最少要有1页,就算没有数据
			this.currentPage=Math.max(Math.min(Math.ceil(list.length/ this.itemsPerPage),this.currentPage),1);
			jsPage('#collpagination', list.length ,this.itemsPerPage , this.currentPage , 'goPage');			
			console.log(list.length+" "+this.itemsPerPage+" "+this.currentPage);
			return list;
		}
	}
})

var boughtapp=new Vue({
	el:'#boughtapp',
	data:{
		columns:['name','price','amount','dealDate'],
		goodsList:[],
		currentPage:1,//当前页数 从1开始计算
		itemsPerPage:6,
		limitKeys: ['name','price','release_date','inventory'],
		filterKey:'',
		totalCount:0,
		pageKey:'',
		href:'details?'
	},
	computed:{
		beginPerPage:function(){//每页的第一条数据的index 从0开始计算
		 	if(this.currentPage==1){
		 		return 0;
			}else{
				return this.itemsPerPage*(this.currentPage-1);
			}
		},
		totalPages:function(){
			return Math.ceil(this.totalCount/this.itemsPerPage);
		}
	},
	methods:{
		refresh:function(){
			var vm=this;
			 $.ajax({
					type:"get",
					cache:false,
					url:ctx+"/checkSession",
					success:function(data){
						if(!data){
							window.location.href=ctx;
						}else{
							$.ajax({
								  url:ctx+"/goods/getAllDealForBought",	
								  cache:false,
								  type:'get',
								  success:function(data){
									  vm.goodsList=data;
								  }
							  })
						}
					}
			  })
		},
		go:function(){
			var vm=this;
			if(vm.pageKey==""){
				return;
			}else{
				vm.currentPage=vm.pageKey;
				vm.pageKey='';
			}
		}
	},
	filters:{
		count: function(list){
			this.totalCount=Math.max(list.length,1);//最少要有1页,就算没有数据
			this.currentPage=Math.max(Math.min(Math.ceil(list.length/ this.itemsPerPage),this.currentPage),1);
			jsPage('#boughtpagination', list.length ,this.itemsPerPage , this.currentPage , 'goPage');			
			console.log(list.length+" "+this.itemsPerPage+" "+this.currentPage);
			return list;
		}
	}
})

var soldapp=new Vue({
	el:'#soldapp',
	data:{
		columns:['name','price','amount','dealDate'],
		goodsList:[],
		currentPage:1,//当前页数 从1开始计算
		itemsPerPage:6,
		limitKeys: ['name','price','release_date','inventory'],
		filterKey:'',
		totalCount:0,
		pageKey:'',
		href:'details?'
	},
	computed:{
		beginPerPage:function(){//每页的第一条数据的index 从0开始计算
		 	if(this.currentPage==1){
		 		return 0;
			}else{
				return this.itemsPerPage*(this.currentPage-1);
			}
		},
		totalPages:function(){
			return Math.ceil(this.totalCount/this.itemsPerPage);
		}
	},
	methods:{
		refresh:function(){
			var vm=this;
			 $.ajax({
					type:"get",
					cache:false,
					url:ctx+"/checkSession",
					success:function(data){
						if(!data){
							window.location.href=ctx;
						}else{
							$.ajax({
								  url:ctx+"/goods/getAllDealForSold",	
								  cache:false,
								  type:'get',
								  success:function(data){
									  vm.goodsList=data;
								  }
							  })
						}
					}
			  })
		},
		go:function(){
			var vm=this;
			if(vm.pageKey==""){
				return;
			}else{
				vm.currentPage=vm.pageKey;
				vm.pageKey='';
			}
		}
	},
	filters:{
		count: function(list){
			this.totalCount=Math.max(list.length,1);//最少要有1页,就算没有数据
			this.currentPage=Math.max(Math.min(Math.ceil(list.length/ this.itemsPerPage),this.currentPage),1);
			jsPage('#soldpagination', list.length ,this.itemsPerPage , this.currentPage , 'goPage');			
			console.log(list.length+" "+this.itemsPerPage+" "+this.currentPage);
			return list;
		}
	}
})