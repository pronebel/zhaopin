/**
 * @author Administrator
 *
 * 2016年6月1日
 */

var ctx=$("input.ctx").val();

var getInformation=function(){
	//获取登录的基本信息
	$.ajax({
		type: "get",
		cache:false,
		url: "getInformation",
		async:false,
		success: function(data) {
			if (data != null) {
				$("header div.user img").attr("src", data[0].portrait);
				shoppingcartlistapp.userid=data[0].id;
				chatapp.userData=data[0];
				if(old_user!='' && old_user!=data[0].id){
					chatapp.chatData=[];//再次登录人不是同一个时  清空chatData
					chatapp.showModal=false;
					chatapp.receiverid='';
					chatapp.receiver={name:'',portrait:''};
					chatapp.receiverConn=false;
					chatapp.totalUnread=0;
					chatapp.receiverColumn=[];
				}
			}
		}
	})
	
	//获取cartlist	
	$.ajax({
		url:'goods/getCartList',
		type:'get',
		cache:false,
		success:function(data){
			if(data!=null){
				shoppingcartlistapp.$data.cartlist=data;
				getCart=false;
			}
		},
		error:function(data){
			console.log(data);
		}
	})
	
	//用户登录后获取是否已经收藏该商品 
	$.ajax({
		url:'goods/likeOrNot',
		data:{id:id},
		type:'post',
		success:function(data){
			if(data){//已经收藏
				goodDetailsapp.likeOrNot='1';
			}
		}
	})
	
	//获取是否可以进行评论
	$.ajax({
		url:'goods/getAllcommentIsFalseFromDeal',
		type:'post',
		data:{id:id},
		success:function(data){
			commentsapp.needComments=data;
		}
	})
	
	//获取已经赞的评论
	$.ajax({
		url:'goods/getAllSupportsForGoods',
		data:{id:id,userid:shoppingcartlistapp.userid},
		type:'post',
		success:function(data){
			theCommentsapp.supportCommentForGoods=data;
		}
	})
	
	//如果不支持eventsource  采用ajax轮询
	if(typeof(EventSource)=="undefined"){
		getHints();
		interval=setInterval("getHints()",4000);
	}else{
		if(source){
			source.close();
		}
		//打开 eventsource
		source=new EventSource("goods/hintsSend");
		source.onmessage=function(event){
			var data=event.data;
//			console.log("from onmessage: "+data+"  "+"readState: "+source.readyState);
			if(data=="false"){
				source.close();
			}else{
				var obj=eval(data);//String 转  array Object
//				console.log('obj: '+obj+obj.length);
				if(obj.length!=hintapp.hints.length){
					hintapp.hints=obj;
				}
			}
		};
	}
}

$("header ul.user li:nth-child(4)").click(function() { //安全注销
	$.ajax({
		type: "get",
		cache:false,
		url: "logout",
		success: function(data) {
			if (data) {
				$('#searchapp div.user').hide();
				$('#searchapp div.user img').removeAttr('src');
				$('#searchapp div.user i').css({
					'transform':'rotate(0deg)'
				})
				$('#searchapp ul.user').hide();
				$('#searchapp i.login').css({'display':'inline'});
				old_user=shoppingcartlistapp.userid;
				shoppingcartlistapp.userid='';
				shoppingcartlistapp.cartlist=[];
				hintapp.hints=[];
				clearInterval(interval);
				source.close();//关闭 server-send event
				goodDetailsapp.likeOrNot='0';
				commentsapp.needComments=[];
				theCommentsapp.supportCommentForGoods=[];
			} else {
				alert("注销失败");
			}
		},
		error: function(data) {
			alert(data);
		}
	})
})


var id=decodeURI(window.location.search).substring(1);//获取商品id

$(window).load(function(){
	if(id!=""){	
		//获取商品details
		$.ajax({
			url:'goods/getGoodDetails',
			type:'post',
			data:{id:id},
			success:function(data){
				goodDetailsapp.details=data;
				goodDetailsapp.pictures.unshift({id:id,picture:data[0].picture});
				goodDetailsapp.selectedImg=data[0].picture;
			}
		})
		//获取商品pictures
		$.ajax({
			url:'goods/getGoodPictures',
			type:'post',
			data:{id:id},
			success:function(data){
				goodDetailsapp.pictures=goodDetailsapp.pictures.concat(data);
			}
		})
		
		//获取最受欢迎的评论
		$.ajax({
			url:'goods/popular',
			type:'post',
			data:{id:id},
			success:function(data){
				commentsapp.popular=data;
			}
		})
		
		//获取stars列表 用于计算满意度
		$.ajax({
			url:'goods/getAllStars',
			type:'post',
			data:{id:id},
			success:function(data){
				commentsapp.stars=data;
			}
		})
		
	}
})

var goodDetailsapp=new Vue({
	el:'#goodDetailsapp',
	data:{
		details:[],
		pictures:[],
		selectedImg:'',
		likeOrNot:'0',
		count:''
	},
	computed:{
		isLike:function(){
			if(this.likeOrNot=="1"){
				return 'isLike';
			}else{
				return '';
			}
		},
		userid:function(){
			return shoppingcartlistapp.userid;
		}
	},
	methods:{
		showChat:function(){
			if(shoppingcartlistapp.userid==''){
				$("header div.login-register").addClass('showLogin flipInY');
				checkCookies(); //检查是否有cookies
				return;
			}
			chatapp.$data.receiverid=this.details[0].publisherId;
			chatapp.$data.showModal=true;
			socket.emit('receiverConnState',{senderid:'uid'+shoppingcartlistapp.userid,receiverid:'uid'+chatapp.receiverid});

		},
		setImg:function(item,$event){
			if(this.selectedImg!=item.picture){
				this.selectedImg=item.picture;
			}
		},
		getInCart:function(item,event){//加入购物车
			var selector=event.target;//保存点击目标
			var vm=this;//保存vue model
			if(vm.count==''){
				vm.count=1;
			}
			//判断是否已经登录
			$.ajax({
				type:"get",
				cache:false,
				url:"checkSession",
				success:function(data){
					if(data){//已经登录 判断是否有购买权限
						if(shoppingcartlistapp.userid==item.publisherId){
							alert("您无法购买自己所发布的商品");
							return;
						}else{
							$.ajax({
								url:'goods/pushInCart',
								type:'post',
								data:{goodsid:item.id,amount:vm.count},
								success:function(data){
									if(data!=null){
								/*		$('body').append(
												$(selector).parents('li#theli').find('img').clone().removeClass('mainPicture').addClass('active animated zoomInCart')
											);
										setTimeout("$('body').find('img.active').remove()",1000);
										setTimeout("$('header i.cart').addClass('bounce')",700);
										setTimeout("$('header i.cart').removeClass('bounce')",1700);*/
										$('header i.cart').addClass('bounce');
										setTimeout("$('header i.cart').removeClass('bounce')",1000)
										shoppingcartlistapp.cartlist=data;
									}
								}
							})
						}
					}else{
						alert("请先登录");
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}					
				},
				error:function(data){
					console.log(data);
				}
			})		
		},
		likecountInOrDown:function(item,event){
			var vm=this;
			if(shoppingcartlistapp.userid==""){
				return;
			}else{
				$.ajax({
					type:"get",
					cache:false,
					url:"checkSession",
					success:function(data){
						if(data){
							if(vm.likeOrNot=='1'){
								vm.likeOrNot='-1';
							}else{
								vm.likeOrNot='1';
							}
							$.ajax({					
								url:'goods/likecountInorDown',
								type:'post',
								data:{goods_id:item.id,amount:parseInt(vm.likeOrNot)},
								success:function(data){
									item.likecount+=parseInt(vm.likeOrNot);
								},
								error:function(data){
									console.log(data);
								}
							})
						}else{
							alert('您已离线，请登录');
							$("header div.login-register").addClass('showLogin flipInY');
							checkCookies(); //检查是否有cookies
						}
					}
				})
			}
		},
		setCount:function(item,event){
			if(count=''){
				this.count=0;
			}
			if(event.target.id=='up'){//count++;
				this.count++;
			}else{
				this.count--;
			}
		}
	},
	watch:{
		count:function(newval){
			if(newval!=''){
				this.count=Math.min(parseInt(newval),this.details[0].inventory);
			}
		}
	}	
})

var scrollBar=false;
var ulscrollBar=false;
var index=0;
var formData=new FormData();

var commentsapp=new Vue({
	el:'#commentsapp',
	data:{
		comments:[],
		commentsByDate:[],
		stars:[],//用于计算满意度
		popular:[],//最受欢迎的一条评论,要求star为5
		commentPicture:[],
		starLevel:5,
		needComments:[],
		showExpressions:false,
		expressions:[
		      {info:'呵呵',src:'resources/img/expressions/i_f01.png'},{info:'哈哈',src:'resources/img/expressions/i_f02.png'},
		      {info:'吐舌',src:'resources/img/expressions/i_f03.png'},{info:'啊',src:'resources/img/expressions/i_f04.png'},
		      {info:'酷',src:'resources/img/expressions/i_f05.png'},{info:'怒',src:'resources/img/expressions/i_f06.png'},
		      {info:'开心',src:'resources/img/expressions/i_f07.png'},{info:'汗',src:'resources/img/expressions/i_f08.png'},
		      {info:'累',src:'resources/img/expressions/i_f09.png'},{info:'黑线',src:'resources/img/expressions/i_f10.png'},
		      {info:'鄙视',src:'resources/img/expressions/i_f11.png'},{info:'不高兴',src:'resources/img/expressions/i_f12.png'},
		      {info:'真棒',src:'resources/img/expressions/i_f13.png'},{info:'阴险',src:'resources/img/expressions/i_f14.png'},
		      {info:'钱',src:'resources/img/expressions/i_f15.png'},{info:'疑问',src:'resources/img/expressions/i_f16.png'},
		      {info:'吐',src:'resources/img/expressions/i_f17.png'},{info:'咦',src:'resources/img/expressions/i_f18.png'},
		      {info:'委屈',src:'resources/img/expressions/i_f19.png'},{info:'花心',src:'resources/img/expressions/i_f20.png'},
		      {info:'呼~',src:'resources/img/expressions/i_f21.png'},{info:'笑眼',src:'resources/img/expressions/i_f22.png'},
		      {info:'冷',src:'resources/img/expressions/i_f23.png'},{info:'太开心',src:'resources/img/expressions/i_f24.png'},
		      {info:'滑稽',src:'resources/img/expressions/i_f25.png'},{info:'勉强',src:'resources/img/expressions/i_f26.png'},
		      {info:'狂汗',src:'resources/img/expressions/i_f27.png'},{info:'乖',src:'resources/img/expressions/i_f28.png'},
		      {info:'睡觉',src:'resources/img/expressions/i_f29.png'},{info:'惊哭',src:'resources/img/expressions/i_f30.png'},
		      {info:'生气',src:'resources/img/expressions/i_f31.png'},{info:'惊讶',src:'resources/img/expressions/i_f32.png'},
		      {info:'喷',src:'resources/img/expressions/i_f33.png'},{info:'爱心',src:'resources/img/expressions/i_f34.png'},
		      {info:'心碎',src:'resources/img/expressions/i_f35.png'},{info:'玫瑰',src:'resources/img/expressions/i_f36.png'},
		      {info:'礼物',src:'resources/img/expressions/i_f37.png'},{info:'彩虹',src:'resources/img/expressions/i_f38.png'},
		      {info:'星星月亮',src:'resources/img/expressions/i_f39.png'},{info:'太阳',src:'resources/img/expressions/i_f40.png'},
		      {info:'钱币',src:'resources/img/expressions/i_f41.png'},{info:'灯泡',src:'resources/img/expressions/i_f42.png'},
		      {info:'茶',src:'resources/img/expressions/i_f43.png'},{info:'蛋糕',src:'resources/img/expressions/i_f44.png'},
		      {info:'音乐',src:'resources/img/expressions/i_f45.png'},{info:'haha',src:'resources/img/expressions/i_f46.png'},
		      {info:'yesh',src:'resources/img/expressions/i_f47.png'},{info:'赞',src:'resources/img/expressions/i_f48.png'},
		      {info:'踩',src:'resources/img/expressions/i_f49.png'},{info:'ok',src:'resources/img/expressions/i_f50.png'}
		],
		facialExpressions:[
		      {info:'^_^'},{info:'(-__-)b'},{info:'⊙﹏⊙‖'},{info:'⊙▽⊙'},{info:'≧ε ≦'},{info:'┳＿┳'},{info:'(╬▼皿▼）'},{info:'\("▔□▔)/'},{info:'↖(￣▽￣")'},
		      {info:'(づ￣3￣)づ'},{info:'(*￣▽￣)y'},{info:'o(≧口≦)o'},{info:'(￣ε￣*)'},
		      {info:'<(￣︶￣)>'},{info:'o(≧v≦)o'},{info:'╮(╯3╰)╭'},{info:'｡◕‿◕｡'},{info:'罒ω罒'},{info:'(◕ω＜)☆'},
		      {info:'(✿✪‿✪｡)ﾉ'},{info:'（◕(ｪ)◕）'},{info:"(●'◡'●)ﾉ♥"},{info:'Σ(っ °Д °;)っ'},{info:'ㄟ( ▔, ▔ )ㄏ'},{info:'凸(艹皿艹 )'},{info:'m(_ _)m'},{info:'(⊙x⊙;)'},
		      {info:'( =∩ω∩= )'},{info:'╮(╯▽╰)╭'},{info:'(≧3≦)/'},{info:'(＠_＠;)?'},{info:'o(*￣▽￣*)ブ'},{info:'(o゜▽゜)o☆'},{info:'"o((>ω< ))o"'},{info:'(╯°口°)╯(┴—┴'}
		],
		showFacialExpressions:false,
		offsetForSupport:0,
		limitForSupport:5,
		offsetForDate:0,
		limitForDate:5,
		showLoadForSupport:true,
		showLoadForDate:true
	},
	created:function(){
		var vm=this;
		$.ajax({
			url:'goods/getCommentLimitOrderBySupport',
			type:'post',
			data:{id:id,offset:vm.offsetForSupport,limit:vm.limitForSupport},
			success:function(data){
				commentsapp.comments=commentsapp.comments.concat(data);
				if(data.length<5){
					vm.showLoadForSupport=false;
				}
			}
		})
		$.ajax({
			url:'goods/getCommentLimitOrderByDate',
			type:'post',
			data:{id:id,offset:vm.offsetForDate,limit:vm.limitForDate},
			success:function(data){
				commentsapp.commentsByDate=commentsapp.commentsByDate.concat(data);
				if(data.length<5){
					vm.showLoadForDate=false;
				}
			}
		})
	},
	watch:{
		offsetForSupport:function(){
			var vm=this;
			$.ajax({
				url:'goods/getCommentLimitOrderBySupport',
				type:'post',
				data:{id:id,offset:vm.offsetForSupport,limit:vm.limitForSupport},
				success:function(data){
					commentsapp.comments=commentsapp.comments.concat(data);
					if(data.length<5){
						vm.showLoadForSupport=false;
					}
				}
			})
		},
		offsetForDate:function(){
			var vm=this;
			$.ajax({
				url:'goods/getCommentLimitOrderByDate',
				type:'post',
				data:{id:id,offset:vm.offsetForDate,limit:vm.limitForDate},
				success:function(data){
					commentsapp.commentsByDate=commentsapp.commentsByDate.concat(data);
					if(data.length<5){
						vm.showLoadForDate=false;
					}
				}
			})
		}
	},
	computed:{
		percentage:function(){
			var	total=0;
			for(var i=0;i<this.stars.length;i++){
				total+=this.stars[i].star;
			}
			var num=total/(this.stars.length*5)*100;
			return num.toFixed(2);
		},
		information:function(){
			if(this.needComments.length!=0){
				var vm=this.needComments[0]
				var str='<span class="needCom">您于'+vm.dealDate+'购买的'+vm.goods.name+'尚未评论</span>';
				return str;
			}else{
				return '';
			}
		},
		contrast:function(){
			return 5-this.starLevel;
		}
	},
	methods:{
		selectPicture:function(){
			$('input.commentPicture').click();
		},
		showPicture:function(event){
			var theIndex=0;
			this.commentPicture=event.target.files.length;
			var thefiles=event.target.files;
			for(var j=0;j<this.commentPicture;j++){
				$('button').before('<img class=commentImg />');
			}
			for(var i=0;i<this.commentPicture;i++){
				var reader = new FileReader();
				reader.readAsDataURL(thefiles[i]);
				reader.onload = function(evt){
					var img=$('span.commentPicture').nextAll('img.commentImg')[theIndex];
					formData.append('upload_file'+index,thefiles[theIndex]);
					index++;
					theIndex++;
					img.src=this.result;
				}
			}
		},
		sendComment:function(item){
			if($('div.info').html()==''||$('div.info').html()==this.information){
				$('div.commentBox').addClass('shake');
				setTimeout("$('div.commentBox').removeClass('shake')",1000);
				return;
			}
			formData.append('information',$('div.info').html());
			formData.append('goodsid',item.goodsid);
			formData.append('star',this.starLevel);
			formData.append('id',item.id);
			$.ajax({
				type:"get",
				cache:false,
				url:"checkSession",
				success:function(data){
					if(data){
						$.ajax({
							url:'goods/toComment',
							data:formData,
							type:'post',
							cache: false,
					        contentType: false,        //不可缺参数
					        processData: false,       //不可缺参数
					        success:function(data){
					        	if(data){
					        		commentsapp.needComments.shift();
					        		commentsapp.commentPicture=0;
					        	}
					        }
						})
					}else{
						alert('您已离线,请重新登录');
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}
				}
			})
		},
		showExpression:function(){
			if(!ulscrollBar){
				$('ul.expressions').mCustomScrollbar({
					theme:"minimal-dark"
				})
				ulscrollBar=true;
			}
			this.showExpressions=!this.showExpressions;
			this.showFacialExpressions=false;
		},
		showfacialExpression:function(){
			if(!ulscrollBar){
				$('ul.expressions').mCustomScrollbar({
					theme:"minimal-dark"
				})
				ulscrollBar=true;
			}
			this.showFacialExpressions=!this.showFacialExpressions;
			this.showExpressions=false;
		},
		activeInInfo:function(){
			if($('div.info').html()==this.information){
				$('div.info').html("");
			}
			showExpressions=false;
		},
		setExpression:function(item){
			var old=$('div.info').html();
			$('div.info').html(old+'<img style="width:25px;" src='+item.src+' />');
			this.showExpressions=false;
		},
		setFacialExpression:function(item){
			var old=$('div.info').html();
			$('div.info').html(old+item.info);
			this.showFacialExpressions=false;
		},
		sendReply:function(item,event){
			if(shoppingcartlistapp.userid==""){
				alert('请先登录');
				$("header div.login-register").addClass('showLogin flipInY');
				checkCookies(); //检查是否有cookies
				return;
			}
			var info=$(event.target).prev().val();
			if(info==""){
				return;
			}else{
				$.ajax({
					url:'goods/reply',
					type:'post',
					data:{commentid:item.comment_id,senderid:shoppingcartlistapp.userid,receiverid:item.user.id,info:info,},
					success:function(data){
						
					}
				})
			}
		}
	}
})

var theCommentsapp=new Vue({
	el:'#theCommentsapp',
	data:{
		offsetForSupport:0,
		offsetForDate:0,
		commentsBySupport:[],
		commentsByDate:[],
		limitForSupport:5,
		limitForDate:5,
		showLoadForSupport:true,
		showLoadForDate:true,
		supportCommentForGoods:[]//登录后获取,注销时清空
	},
	computed:{
		publisherId:function(){
			return goodDetailsapp.details[0].publisherId;
		}
	},
	created:function(){
		var vm=this;
		$.ajax({
			url:'goods/getCommentLimitOrderBySupport',
			type:'post',
			data:{id:id,offset:vm.offsetForSupport,limit:vm.limitForSupport},
			success:function(data){
				vm.commentsBySupport=vm.commentsBySupport.concat(data);
				if(data.length<5){
					vm.showLoadForSupport=false;
				}
			}
		})
		$.ajax({
			url:'goods/getCommentLimitOrderByDate',
			type:'post',
			data:{id:id,offset:vm.offsetForDate,limit:vm.limitForDate},
			success:function(data){
				vm.commentsByDate=vm.commentsByDate.concat(data);
				if(data.length<5){
					vm.showLoadForDate=false;
				}
			}
		})
	},
	methods:{
		setImgList:function(list,item,index){
			imgapp.imgList=list;
			imgapp.showImg=item.picture;
			imgapp.index=index;
		},
		loadMoreByDate:function(){
			this.offsetForDate+=this.limitForDate;
		},
		loadMoreBySupport:function(){
			this.offsetForSupport+=this.limitForSupport;
		},
		supportUpOrDown:function(item,event){
			var tar=event.target;
			var vm=this;
			var supp=$(tar).parent('.user-handle').find('i.support').attr('data-support');
			if(supp==0||supp==-1){
				$(tar).parent('.user-handle').find('i.support').attr('data-support','1').addClass('supported');
			}else{
				$(tar).parent('.user-handle').find('i.support').attr('data-support','-1').removeClass('supported');
			}
			var change=parseInt($(tar).parent('.user-handle').find('i.support').attr('data-support'));
			$.ajax({
				url:'checkSession',
				cache:false,
				type:'get',
				success:function(data){
					if(data){
						$.ajax({
							url:'goods/supportUpOrDown',
							data:{id:id,comment_id:item.comment_id,support:change},
							type:'post',
							success:function(data){
								item.comment.support+=change;
							},
							error:function(data){
								console.log(data);
							}
						})
					}else{
						alert("请先登录");
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}
				}
			})
		}
	},
	watch:{
		commentsByDate:function(){
			for(var i=0;i<this.commentsByDate.length;i++){
				for(var j=0;j<this.supportCommentForGoods.length;j++){
					if(this.supportCommentForGoods[j].comment_id==this.commentsByDate[i].comment_id){					
						$('li.newItem').eq(i).find('.user-handle i.support').attr('data-support','1').addClass('supported');
					}
				}
			}
		},
		commentsBySupport:function(){
			for(var i=0;i<this.commentsBySupport.length;i++){
				for(var j=0;j<this.supportCommentForGoods.length;j++){
					if(this.supportCommentForGoods[j].comment_id==this.commentsBySupport[i].comment_id){
						$('div.niceItem').eq(i).find('.user-handle i.support').attr('data-support','1').addClass('supported');					
					}
				}
			}
		},
		supportCommentForGoods:function(){
			for(var i=0;i<this.commentsBySupport.length;i++){
				for(var j=0;j<this.supportCommentForGoods.length;j++){
					if(this.supportCommentForGoods[j].comment_id==this.commentsBySupport[i].comment_id){
						$('div.niceItem').eq(i).find('.user-handle i.support').attr('data-support','1').addClass('supported');					
					}					
				}
			}
			for(var i=0;i<this.commentsByDate.length;i++){
				for(var j=0;j<this.supportCommentForGoods.length;j++){
					if(this.supportCommentForGoods[j].comment_id==this.commentsByDate[i].comment_id){					
						$('li.newItem').eq(i).find('.user-handle i.support').attr('data-support','1').addClass('supported');
					}
				}
			}
		},
		offsetForSupport:function(){
			var vm=this;
			$.ajax({
				url:'goods/getCommentLimitOrderBySupport',
				type:'post',
				data:{id:id,offset:vm.offsetForSupport,limit:vm.limitForSupport},
				success:function(data){
					vm.commentsBySupport=vm.commentsBySupport.concat(data);
					if(data.length<5){
						vm.showLoadForSupport=false;
					}
				}
			})
		},
		offsetForDate:function(){
			var vm=this;
			$.ajax({
				url:'goods/getCommentLimitOrderByDate',
				type:'post',
				data:{id:id,offset:vm.offsetForDate,limit:vm.limitForDate},
				success:function(data){
					vm.commentsByDate=vm.commentsByDate.concat(data);
					if(data.length<5){
						vm.showLoadForDate=false;
					}
				}
			})
		}
	}
})

var imgapp=new Vue({
	el:'#shadow',
	data:{
		message:'',
		imgList:[],
		showImg:'',
		index:0
	},
	beforeCreate:function(){
		return this.showImg='';
	},
	computed:{
		showModal:function(){
			return this.imgList.length>0 ? true : false;
		}
	},
	watch:{
		showModal:function(){
			if(this.showModal){
				$("#shadow").addClass("shadow");
			}else{
				$("#shadow").removeClass("shadow");
			}
		}
	},
	methods:{
		close:function(){
			this.imgList=[];
			this.index=0;
			this.showImg='';
		},
		showImgSrcUp:function(){
			this.index++;
			if(this.index===this.imgList.length){
				this.index=0;
			}
			this.showImg=this.imgList[this.index].picture;
		},
		showImgSrcDown:function(){
			this.index--;
			if(this.index<0){
				this.index=this.imgList.length-1;
			}
			this.showImg=this.imgList[this.index].picture;
		}
	}
})


$(".btnRight").hover(function() {
	$(this).css({
		"background-position": "-44px"
	});
}, function() {
	$(this).css({
		"background-position": "-126px"
	});
})
$(".btnLeft").hover(function() {
	$(this).css({
		"background-position": "0px"
	});
}, function() {
	$(this).css({
		"background-position": "-84px"
	});
})

$('#imgapp img').load(function(){
	var margin_top=(600-this.height)/2;
	$(this).css({
		'margin-top':margin_top+"px"
	})
})
