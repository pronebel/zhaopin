/**
 * $('ul li#theli')和$('li#theli')不一样
 * $('li#theli')存在一定的bug  有时候能获取一个li对象数组   有时候只是获取第一个li对象
 * $('ul li#theli')获取li对象数组
 */
var setLike=0;//商品标识上登录人是否已经收藏

var data=decodeURI(window.location.search);

$(window).load(function(){	
	if(data!=null){
		var keyList=[];
		var key='';
		var reg=/^[\u4e00-\u9fa5]+$/;
		for(var i=0;i<data.length;i++){
			if(reg.test(data.charAt(i))){//中文留下,其他去掉
				key+=data.charAt(i);
			}else{
				if(key!=''){
					keyList.push(key);
					key='';
				}
			}
		}
		if(key!=''){
			keyList.push(key);
		}
		searchapp.searchName=keyList;
	}
	$.ajax({//获取navrecommand
		url:'goods/getAllNames',
		type:'get',
		cache:false,
		success:function(data){
			searchapp.names=data;
		}
	})
})

/**
 * 分页方法
 * @param pageIndex 
 */
function goPage(pageIndex) {
	goodslistapp.currentPage=pageIndex;	
}

var flag=true;//用于判断是否要发送ajax 防止重复触发ajax
/**
 商品列表组件
 */
var goodslistapp=new Vue({
	el:'#goodslistapp',
	data:{
		userid:'',
		href:'details?',
		goodslist:[],
		totalCount:0,
		pageKey:'',
		showCart:false,
		limit:16,
		currentPage:1,
		likelist:[]  //登录后获取收藏列表 见header.js
	},
	watch:{
		'totalCount+currentPage+limit':function(){
			jsPage('#pagination', this.totalCount ,this.limit , this.currentPage , 'goPage');
		},
		'currentPage':function(newval,oldval){
			if(!flag){
				return;
			}
			flag=true;
			var offset=(newval-1)*this.limit;
			if(searchapp.searchName!=''){
				console.log(searchapp.searchName +"  "+searchapp.orderByCount +"  "+searchapp.orderByPrice +"  "+offset +"  "+ this.limit+"  " +searchapp.priceLimitUp +"  "+ searchapp.priceLimitDown);
				getGoodsList(searchapp.searchName , searchapp.orderByCount , searchapp.orderByPrice , offset , this.limit , searchapp.priceLimitUp , searchapp.priceLimitDown);
			}else if(this.searchType2!=''){
				console.log(searchapp.searchName +"  "+searchapp.orderByCount +"  "+searchapp.orderByPrice +"  "+offset +"  "+ this.limit+"  " +searchapp.priceLimitUp +"  "+ searchapp.priceLimitDown);
				getGoodsList(searchapp.searchType2 , searchapp.orderByCount , searchapp.orderByPrice , offset , this.limit , searchapp.priceLimitUp , searchapp.priceLimitDown);
			}
		}
	},
	computed:{
		totalPages:function(){
			return Math.ceil(parseFloat(this.totalCount/this.limit));
		}
	},
	methods:{
		go:function(){
			var vm=this;
			if(vm.pageKey==""){
				return;
			}else{
				if(parseInt(vm.pageKey)>vm.totalPages){
					vm.currentPage=vm.totalPages
				}else if(parseInt(vm.pageKey)==0){
					vm.currentPage=1;
				}else{
					vm.currentPage=parseInt(vm.pageKey);
				}
				vm.pageKey='';
			}
		},
		activeIn:function(event){
			if(shoppingcartlistapp.userid!=""&&setlike==0){
				if(this.likelist.length>0){
					for(var i=0;i<this.likelist.length;i++){
						for(var j=0;j<this.goodslist.length;j++){
							if(this.likelist[i].goodsid==this.goodslist[j].id){
								console.log(j);
								$('ul li#theli').eq(j).find('i.fa-heart').attr('data-like','1').css({color:'#F35186'});
								$('ul li#theli').eq(j).find('i.fa-heart').attr('data-oldlike','1').css({color:'#F35186'});
							}
						}
					}
					setlike=1;
				}
			}
			if(el==null){//每次浏览器重新渲染li后 必须为其重新增加svg
				/**
				 * 不能使用$('li#theli')
				 * 必须使用$('ul li#theli')
				 * $('li#theli')有bug 有时候只能得到一个li对象
				 * $('ul li#theli')能得到所有li对象
				 */
				el=document.getElementById("theli");
				addSvg($('ul li#theli'));
			}
			$(event.target).find('span.likecount').addClass('active bounceIn').end().find('span.shoppingCart').addClass('active bounceIn');
		},
		activeOut:function(event){
			$(event.target).find('span.likecount').removeClass('active bounceIn').end().find('span.shoppingCart').removeClass('active bounceIn');
		},
		likecountInorDown:function(index,item,event){
			$.ajax({
				url:'checkSession',
				cache:false,
				type:'get',
				success:function(data){
					if(data){
						var newval=parseInt($(event.target).parents('li#theli').find('i.fa-heart').attr('data-like'));
						var oldval=parseInt($(event.target).parents('li#theli').find('i.fa-heart').attr('data-oldlike'));
						//报错是因为event.target从<i>转移为<svg>  [object SVGEllipseElement]   NaN   NaN
						var amount=newval-oldval;
						if(amount!=0){
							$.ajax({
								url:'goods/likecountInorDown',
								type:'post',
								data:{goods_id:item.id,amount:amount},
								success:function(data){
									item.likecount+=amount;
								},
								error:function(data){
									console.log(data);
								}
							})
						}
						if(amount==1){//收藏
							goodslistapp.likelist.push({goodsid:item.id,userid:shoppingcartlistapp.userid});
							$(event.target).parents('li#theli').find('i.fa-heart').attr('data-oldlike','1');
						}else if(amount==-1){//取消收藏
							goodslistapp.likelist.$remove(goodslistapp.likelist[index]);
							$(event.target).parents('li#theli').find('i.fa-heart').attr('data-oldlike','0');
						}
					}else{
						alert("请先登录");
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}
				}
			})
		},
		activeInIcon:function(event){
			this.showCart=true;
		},
		activeOutIcon:function(event){
			this.showCart=false;
		},
		getInCart:function(item,event){//加入购物车
			var selector=event.target;//保存点击目标
			var vm=this;//保存vue model
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
								data:{goodsid:item.id,amount:1},
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
		}
	}
})

/**
 * 搜素功能组件
 */

var searchapp=new Vue({
	el:'#searchapp',
	data:{
		items:[],
		searchKey:'',
		show:false,
		searchType1:'',
		searchType2:'',
		searchName:'',
		type1:[{'type1':'休闲零食'},{'type1':'生鲜果蔬'},{'type1':'美酒佳酿'},{'type1':'粮油调味'},{'type1':'冲调饮品'}],
		type2:[{'type1':'休闲零食','type2':'坚果蜜饯'},{'type1':'休闲零食','type2':'肉类'},{'type1':'休闲零食','type2':'饼干膨化'},
		       {'type1':'休闲零食','type2':'糖果巧克力'},{'type1':'休闲零食','type2':'糕点'},{'type1':'休闲零食','type2':'梅果干'},
		       {'type1':'生鲜果蔬','type2':'海鲜'},{'type1':'生鲜果蔬','type2':'肉禽蛋'},{'type1':'生鲜果蔬','type2':'蛋制品'},
		       {'type1':'生鲜果蔬','type2':'水果'},{'type1':'生鲜果蔬','type2':'蔬菜'},{'type1':'生鲜果蔬','type2':'新鲜蛋糕'},
		       {'type1':'美酒佳酿','type2':'白酒'},{'type1':'美酒佳酿','type2':'啤酒'},{'type1':'美酒佳酿','type2':'调制酒'},
		       {'type1':'美酒佳酿','type2':'葡萄酒'},{'type1':'美酒佳酿','type2':'洋酒'},{'type1':'美酒佳酿','type2':'陈年老酒'},
		       {'type1':'粮油调味','type2':'小米'},{'type1':'粮油调味','type2':'面食'},{'type1':'粮油调味','type2':'银耳'},
		       {'type1':'粮油调味','type2':'调味品'},{'type1':'粮油调味','type2':'粗粮'},{'type1':'粮油调味','type2':'汤料'},
		       {'type1':'冲调饮品','type2':'暖冬茶'},{'type1':'冲调饮品','type2':'秋香乌龙'},{'type1':'冲调饮品','type2':'怡人花茶'},
		       {'type1':'冲调饮品','type2':'咖啡冲饮'},{'type1':'冲调饮品','type2':'饮料'},{'type1':'冲调饮品','type2':'清香茗茶'}],
		names:[],
		priceLimits:[{'price1':0,'price2':100000,'limit':'全部'},{'price1':0,'price2':20},{'price1':20,'price2':50},{'price1':0,'price2':50},{'price1':50,'price2':100},{'price1':100,'price2':500},{'price1':500,'price2':''}],
		priceLimitDown:0,
		priceLimitUp:100000,
		orderLimits:[{'order':'综合排行'},{'order':'销量'},{'order':'评论'},{'order':'收藏'},{'order':'价格'}],
		defaultOrder:true,
		soldOrder:false,
		commentcountOrder:false,
		likecountOrder:false,
		priceDownOrder:false,
		priceUpOrder:false,
		offset:0,
		limit:16
	},
	methods:{
		setSearchName:function(event){
			$(event.target).blur();
			var newval=event.target.value;
			if(newval!=''&&typeof(newval)=='string'){
				var keyList=[];
				var key='';
				var reg=/^[\u4e00-\u9fa5]+$/;
				for(var i=0;i<newval.length;i++){
					if(reg.test(newval.charAt(i))){//中文留下,其他去掉
						key+=newval.charAt(i);
					}else{
						if(key!=''){
							keyList.push(key);
							key='';
						}
					}
				}
				if(key!=''){
					keyList.push(key);
				}
				this.searchName=keyList;
			}
		},
		setSearchNameByType:function(item){
			this.searchKey=item.type2;
			this.searchName=item.type2;
		},
		setSearchNameByName:function(item){
			this.searchKey=item.name;
			this.searchName=item.name;
		},
		setType1:function(item,event){
			if(this.searchType1==item.type1){
				return;
			}else{
				this.searchType1=item.type1;
				this.searchType2='';
				this.searchName='';
				$(event.target).addClass('active').siblings().removeClass('active');
			}
		},
		setType2:function(item,event){
			if(this.searchType2==item.type2){
				return;
			}else{
				this.searchType2=item.type2;
				this.searchName='';
				$(event.target).addClass('active').siblings().removeClass('active');
			}
		},
		setName:function(item,event){
			this.searchName=item.name;
			$('div.names span').each(function(index,selector){
				$(selector).removeClass('active');
			})
			$(event.target).addClass('active');
		},
		setPriceLimit:function(item,event){
			this.priceLimitDown=item.price1;
			if(item.price2!=''){
				this.priceLimitUp=item.price2;
			}else{
				this.priceLimitUp=100000;
			}		
			$(event.target).addClass('active').siblings().removeClass('active');
		},
		setOrderLimit:function(item,event){
			if(item.order=='综合排行'){
				this.defaultOrder=true;
				this.soldOrder=false;
				this.commentcountOrder=false;
				this.likecountOrder=false;
				this.priceDownOrder=false;
				this.priceUpOrder=false;
			}else if(item.order=='销量'){
				this.soldOrder=true;
				this.commentcountOrder=false;
				this.likecountOrder=false;
			}else if(item.order=='评论'){
				this.soldOrder=false;
				this.commentcountOrder=true;
				this.likecountOrder=false;
			}else if(item.order=='收藏'){
				this.soldOrder=false;
				this.commentcountOrder=false;
				this.likecountOrder=true;
			}else if(item.order=='价格'){
				if(this.priceDownOrder==false&&this.priceUpOrder==false){
					this.priceDownOrder=true;
				}else if(this.priceDownOrder==true){
					this.priceUpOrder=true;
					this.priceDownOrder=false;
				}else{
					this.priceUpOrder=false;
				}
			}
		}
	},
	computed:{
		defaultOrder:function(){
			return !(this.soldOrder||this.commentcountOrder||this.likecountOrder||this.priceDownOrder||this.priceUpOrder);
		},
		soldClass:function(){
			return {'active':this.soldOrder};
		},
		commentClass:function(){
			return {'active':this.commentcountOrder};
		},
		likeClass:function(){
			return {'active':this.likecountOrder};
		},
		priceClass:function(){
			return {'active':this.priceDownOrder||this.priceUpOrder};
		},
		defaultClass:function(){
			return {'active':this.defaultOrder};
		},
		orderByCount:function(){
			if(this.defaultOrder||this.soldOrder){
				return 'soldcount';
			}else if(this.commentcountOrder){
				return 'commentcount';
			}else if(this.likecountOrder){
				return 'likecount';
			}else{
				return '';
			}
		},
		orderByPrice:function(){
			if(this.defaultOrder||this.priceUpOrder){
				$('.nav_data i.orderByPrice').css({
					transform:'rotate(0deg)'
				})
				return 'asc';
			}else if(this.priceDownOrder){
				$('.nav_data i.orderByPrice').css({
					transform:'rotate(180deg)'
				})
				return 'desc';
			}else{
				$('.nav_data i.orderByPrice').css({
					transform:'rotate(90deg)'
				})
				return '';
			}
		}
	},
	watch:{
		'orderByCount':function(){
			if(this.searchName!=''){
				if(goodslistapp.currentPage!=1){
					goodslistapp.currentPage=1;//强制改变当前页为第一页
					flag=false;//确保改变goodslistapp.currentPage不再次触发ajax请求
				}
				getGoodsList(this.searchName,this.orderByCount,this.orderByPrice,this.offset,this.limit,this.priceLimitUp,this.priceLimitDown);
			}else if(this.searchType2!=''){
				if(goodslistapp.currentPage!=1){
					goodslistapp.currentPage=1;//强制改变当前页为第一页
					flag=false;//确保改变goodslistapp.currentPage不再次触发ajax请求
				}
				getGoodsList(this.searchType2,this.orderByCount,this.orderByPrice,this.offset,this.limit,this.priceLimitUp,this.priceLimitDown);
			}
		},
		'priceLimitUp+priceLimitDown+searchName+searchType2+orderByPrice':function(){
			if(this.searchName!=''){
				if(goodslistapp.currentPage!=1){
					goodslistapp.currentPage=1;//强制改变当前页为第一页
					flag=false;//确保改变goodslistapp.currentPage不再次触发ajax请求
				}
				getTotalCount(this.searchName,this.priceLimitUp,this.priceLimitDown);
				getGoodsList(this.searchName,this.orderByCount,this.orderByPrice,this.offset,this.limit,this.priceLimitUp,this.priceLimitDown);
			}else if(this.searchType2!=''){
				if(goodslistapp.currentPage!=1){
					goodslistapp.currentPage=1;//强制改变当前页为第一页
					flag=false;//确保改变goodslistapp.currentPage不再次触发ajax请求
				}
				getTotalCount(this.searchType2,this.priceLimitUp,this.priceLimitDown);
				getGoodsList(this.searchType2,this.orderByCount,this.orderByPrice,this.offset,this.limit,this.priceLimitUp,this.priceLimitDown);
			}
		},
		'searchType1':function(newval){
			$('div.type1 span').each(function(index,selector){
				if($(selector).html()==newval){
					
					$(selector).addClass('active');					
				}else{
					$(selector).removeClass('active');
				}
			})
		},
		'searchKey':function(newval){
			if(newval!=''&&typeof(newval)=='string'){
				var keyList=[];
				var key='';
				var reg=/^[\u4e00-\u9fa5]+$/;
				for(var i=0;i<newval.length;i++){
					if(reg.test(newval.charAt(i))){//中文留下,其他去掉
						key+=newval.charAt(i);
					}else{
						if(key!=''){
							keyList.push(key);
							key='';
						}
					}
				}
				if(key!=''){
					keyList.push(key);
				}
				if(keyList.length>0){
					$.ajax({
						url:'goods/getSearch',
						cache:false,
						data:{key:keyList,upperLimit:this.priceLimitUp,lowerLimit:this.priceLimitDown},
						type:'POST',
						traditional:true,
						success:function(data){
							if(data&&data.length!=0){
								searchapp.items=data;
							}else{
								searchapp.items=[];
							}
						}
					})
				}				
			}else if(newval==''){
				searchapp.items=[];
			}
		}
	}
})

/**
 * 获取商品列表方法
 * @param key 搜索关键字 数组
 * @param orderByCount  排序关键字(可选:评论 收藏 销量) 降序
 * @param orderByPrice  排序关键字(价格) 升序或降序
 * @param offset  分页  开始点
 * @param limit	  分页  限制个数
 * @param upperLimit	价格上	限
 * @param lowerLimit	价格下限
 */
function getGoodsList(key,orderByCount,orderByPrice,offset,limit,upperLimit,lowerLimit){
	$.ajax({
		url:'goods/getGoodsList',
		type:'post',
		traditional:true,
		data:{key:key,orderByCount:orderByCount,orderByPrice:orderByPrice,offset:offset,limit:limit,upperLimit:upperLimit,lowerLimit:lowerLimit},
		success:function(data){
			goodslistapp.goodslist=data;
			el=null;
			setlike=0;
			flag=true;
		}	
	})
}
/**
 * 
 * @param key	搜索关键字 数组
 * @param upperLimit  	价格上	限
 * @param lowerLimit	价格下限
 */
function getTotalCount(key,upperLimit,lowerLimit){
	$.ajax({
		url:'goods/getTotalCount',
		type:'post',
		traditional:true,
		data:{key:key,upperLimit:upperLimit,lowerLimit:lowerLimit},
		success:function(data){
			goodslistapp.totalCount=data;
		}	
	})
}
$('input#searchBox').blur(function(){
	searchapp.show=false;
})

$('input#searchBox').focus(function(){
	searchapp.show=true;
})


var getInformation=function(){
		$.ajax({
			type: "get",
			cache:false,
			url: "getInformation",
			success: function(data) {
				if (data != null) {
					$("header div.user img").attr("src", data[0].portrait);
					shoppingcartlistapp.userid=data[0].id;
					goodslistapp.userid=data[0].id;
				}
			}
		})
		//获取收藏列表
		$.ajax({
			url:'goods/getLikeGoods',
			type:'get',
			cache:false,
			success:function(data){
				if (data != null) {
					goodslistapp.$data.likelist=data;
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
//				console.log("from onmessage: "+data+"  "+"readState: "+source.readyState);
				if(data=="false"){
					console.log("登录超时");
					source.close();
				}else{
					var obj=eval(data);//String 转  array Object
//					console.log('obj: '+obj+obj.length);
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
				shoppingcartlistapp.userid="";
				goodslistapp.userid="";
				shoppingcartlistapp.cartlist=[];
				goodslistapp.likelist=[];
				hintapp.hints=[];
				clearInterval(interval);
				source.close();//关闭 server-send event
			} else {
				alert("注销失败");
			}
		},
		error: function(data) {
			alert(data);
		}
	})
})