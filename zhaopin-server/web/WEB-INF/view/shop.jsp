<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<title>shop</title>
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/icon/iconfont.css" />
		<link href="${ctx }/resources/css/shop.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/js/jquery.mCustomScrollbar.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/animate.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/header.css" />
		<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script><!-- 引入jquery -->
		<script src="${ctx }/resources/js/jquery.mCustomScrollbar.concat.min.js"></script>
		<script src="${ctx }/resources/js/vue.js"></script><!-- 引入 vuejs-->
		<script src="${ctx }/resources/js/pagination.js"></script>
		
		<script src="${ctx }/resources/node_modules/socket.io-client/dist/socket.io.js"></script>	
		
	</head>

	<body>
	<div class="fullpage">
		<!--头部-->
		<header id="searchapp">
			<i class="iconfont" style="margin-left:20%;">&#xe601;</i>
			<form target="_blank" name="searchform" method="post" autocomplete="off" :action=action >
				<input type="search" id="searchBox" class="search" placeholder="Search..." v-model="searchKey" debounce="300" @keyup.enter="go($event)" />
			</form>
			<ul id="searchRecommand" class="list searchKey animated" v-show="show&&items.length>0" transition="flipY">
				<li class="head">---------------Key--------------</li>
				<li v-for="item in items | limitBy 1"  v-on:click="chooseTypeGo(item)" >{{item.type2}}</li>
				<li v-for="item in items"  v-on:click="chooseNameGo(item)" >{{item.name}}</li>
			</ul>
			<i class="iconfont login">&#xe607;</i>
			<i class="iconfont animated cart" onclick="showcart();">&#xe606;</i>
			<div class="user">
				<img />
				<i class="iconfont jiantou">&#xe604;</i>
			</div>
			<ul class="user">
				<li class="first">
					<a href="${ctx }/home" hidefocus onfocus="this.blur()" target="_blank">
						<i class="iconfont white">&#xe61a;</i>个人中心
					</a>
				</li>
				<li>
					<a href="${ctx }/home" hidefocus onfocus="this.blur()" target="_blank">
						<i class="iconfont white">&#xe626;</i>我的收藏
					</a>
				</li>				
				<li>
					<a href="${ctx }/home" hidefocus onfocus="this.blur()" target="_blank">
						<i class="iconfont white">&#xe61d;</i>交易清单
					</a>
				</li>
				<li>
					<i class="iconfont white">&#xe624;</i>安全注销
				</li>					
			</ul>
			<div class="login-register animated">
				<div class="thumbur">
					<div class="icon-lock"></div>
				</div>
				<div class="login">
					<p>登录</p>
					<div class="username-password username">
						<i class=iconfont>&#xe60b;</i>
						<input type="text" placeholder="6-16位用户名" class="username" maxlength="16" />
						<i class="iconfont" id="judge_true">&#xe619;</i>
						<i class="iconfont" id="judge_false">&#xe622;</i>
					</div>
					<div class="username-password password">
						<i class=iconfont>&#xe60e;</i>
						<input type="password" placeholder="6-20位密码" class="password" maxlength="20" />
						<i class="iconfont" id="judge_true">&#xe619;</i>
						<i class="iconfont" id="judge_false">&#xe622;</i>
					</div>
					<label onclick="change(this)">
						<i class="iconfont choose" data-cookies="true" >&#xe619;</i>
						<span style="cursor: pointer;">记住密码</span>
					</label>
					<div class="btn">	
						<i class="iconfont" style="line-height:40px;">&#xe605;</i>
						<span style="position: absolute; left:55px;top:8px;">登录</span>
					</div>
					<div class="changeBox">
						Register
					</div>
				</div>
				<div class="register">
					<p>注册</p>
					<div class="username-password username">
						<i class=iconfont>&#xe60b;</i>
						<input type="text" placeholder="6-16位用户名" class="username" maxlength="16" />
						<i class="iconfont" id="judge_true">&#xe619;</i>
						<i class="iconfont" id="judge_false">&#xe622;</i>
					</div>
					<div class="username-password password">
						<i class=iconfont>&#xe60e;</i>
						<input type="password" placeholder="6-20位密码" class="password1" maxlength="20" />
						<i class="iconfont" id="judge_true">&#xe619;</i>
						<i class="iconfont" id="judge_false">&#xe622;</i>
					</div>
					<div class="username-password password">
						<i class=iconfont>&#xe60e;</i>
						<input type="password" placeholder="6-20位密码" class="password2" maxlength="20" />
						<i class="iconfont" id="judge_true">&#xe619;</i>
						<i class="iconfont" id="judge_false">&#xe622;</i>
					</div>
					<label onclick="change(this)">
						<i class="iconfont choose" data-cookies="true" >&#xe619;</i>
						<span style="cursor: pointer;">记住密码</span>
					</label>
					<div onclick="register()" class="btn">	
						<i class="iconfont" style="line-height:40px;">&#xe605;</i>
						<span style="position: absolute; left:55px;top:8px;">注册</span>
					</div>
					<div class="changeBox">
						Login
					</div>
				</div>
			</div>
		</header>
		<!--导航和轮播图-->
		<div id="wrap">
			<ul class="picList">
				<li style="display:block;">
					<a href="goodsList?data='休闲零食'"><img src="${ctx }/resources/img/1.jpg" /></a>
				</li>
				<li>
					<a href="goodsList?data='生鲜果蔬'"><img src="${ctx }/resources/img/2.jpg" /></a>
				</li>
				<li>
					<a href="goodsList?data='美酒佳酿'"><img src="${ctx }/resources/img/3.jpg" /></a>
				</li>
				<li>
					<a href="goodsList?data='粮油调味'"><img src="${ctx }/resources/img/4.jpg" /></a>
				</li>
				<li>
					<a href="goodsList?data='冲调饮品'"><img src="${ctx }/resources/img/5.jpg" /></a>
				</li>
			</ul>
			<div class="btnLeft"></div>
			<div class="btnRight"></div>
			<ol>
				<li class="active"></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ol>
			<!--导航-->
			<nav>
				<ul>
					<li class="nav_type">
						<i class="iconfont left">&#xe617;</i>休闲零食
						<i class="iconfont right">&#xe628;</i>
						<ul id="nav_snacks" class="animated">
							<li>
								<span style="display:block;">坚果蜜饯:</span>
								<a href="#">山核桃</a>
								<a href="#">碧根果</a>
								<a href="#">巴旦木</a>
								<a href="#">薄皮核桃</a>
								<a href="#">开心果</a>
								<a href="#">夏威夷果</a>
							</li>
							<li>
								<span style="display:block;">肉类:</span>
								<a href="#">牛肉干</a>
								<a href="#">猪肉铺</a>
								<a href="#">鸡肉</a>
								<a href="#">兔肉</a>
								<a href="#">鱿鱼丝</a>
								<a href="#">鸭脖</a>
							</li>
							<li>
								<span style="display:block;">饼干膨化:</span>
								<a href="#">夹心饼干</a>
								<a href="#">薯片</a>
								<a href="#">进口饼干</a>
								<a href="#">牛奶饼干</a>
								<a href="#">苏打饼干</a>
								<a href="#">压缩饼干</a>
							</li>
							<li>
								<span style="display:block;">糖果巧克力:</span>
								<a href="#">棒棒糖</a>
								<a href="#">话梅糖</a>
								<a href="#">泡泡糖</a>
								<a href="#">巧克力</a>
								<a href="#">牛奶糖</a>
								<a href="#">果冻</a>
							</li>
							<li>
								<span style="display:block;">糕点:</span>
								<a href="#">传统糕点</a>
								<a href="#">西式糕点</a>
								<a href="#">马卡龙</a>
								<a href="#">月饼</a>
								<a href="#">切糕</a>
								<a href="#">发糕</a>							
							</li>
							<li>
								<span style="display:block;">果干:</span>
								<a href="#">进口蓝莓干</a>
								<a href="#">正品酵王梅</a>
								<a href="#">榴莲干</a>
								<a href="#">和田大枣</a>
							</li>
						</ul>
					</li>
					<li class="nav_type">
						<i class="iconfont left">&#xe618;</i>生鲜果蔬
						<i class="iconfont right">&#xe628;</i>
						<ul id="nav_fresh" class="animated">
							<li>
								<span style="display:block;">海鲜:</span>
								<a href="#">大闸蟹</a>
								<a href="#">帝王蟹</a>
								<a href="#">金枪鱼</a>
								<a href="#">鲍鱼</a>
								<a href="#">红虾</a>
								<a href="#">北极贝</a>
								<a href="#">银鳕鱼</a>
							</li>
							<li>
								<span style="display:block;">肉禽蛋:</span>
								<a href="#">牛排</a>
								<a href="#">土猪肉</a>
								<a href="#">土鸡</a>
								<a href="#">羊肉</a>
								<a href="#">火腿</a>
								<a href="#">腊肉</a>
								<a href="#">鸽子蛋</a>
								<a href="#">鸡蛋</a>
							</li>
							<li>
								<span style="display:block;">蛋制品:</span>
								<a href="#">土鹅蛋</a>
								<a href="#">农村土鸡蛋</a>
								<a href="#">红鸡蛋</a>
								<a href="#">香山咸蛋黄</a>
								<a href="#">满月喜蛋</a>
								<a href="#">鸭蛋</a>
							</li>
							<li>
								<span style="display:block;">水果:</span>
								<a href="#">车厘子</a>
								<a href="#">苹果</a>
								<a href="#">橙子</a>
								<a href="#">猕猴桃</a>
								<a href="#">柠檬</a>
								<a href="#">牛油果</a>
								<a href="#">蓝莓</a>
								<a href="#">芒果</a>
							</li>
							<li>
								<span style="display:block;">蔬菜:</span>
								<a href="#">蔬菜</a>
								<a href="#">山药</a>
								<a href="#">番薯</a>
								<a href="#">土豆</a>
								<a href="#">莲藕</a>
								<a href="#">生菜</a>
								<a href="#">马蹄</a>
								<a href="#">芋头</a>				
							</li>
							<li>
								<span style="display:block;">新鲜蛋糕:</span>
								<a href="#">好利来蛋糕</a>
								<a href="#">祝寿蛋糕</a>
								<a href="#">简屋蛋糕</a>
								<a href="#">面包新语</a>
								<a href="#">克莉丝汀</a>
								<a href="#">彩虹蛋糕</a>
							</li>
						</ul>
					</li>
					<li class="nav_type">
						<i class="iconfont left">&#xe610;</i>美酒佳酿
						<i class="iconfont right">&#xe628;</i>
						<ul id="nav_wine" class="animated">
							<li>
								<span style="display:block;">白酒:</span>
								<a href="#">五粮液</a>
								<a href="#">茅台</a>
								<a href="#">剑南春</a>
								<a href="#">泸州老窖</a>
								<a href="#">古井贡</a>
								<a href="#">汾酒</a>
							</li>
							<li>
								<span style="display:block;">啤酒:</span>
								<a href="#">奥丁格</a>
								<a href="#">教士</a>
								<a href="#">瓦伦丁</a>
								<a href="#">喜力 1664</a>
								<a href="#">智美</a>
								<a href="#">青岛</a>
							</li>
							<li>
								<span style="display:block;">调制酒:</span>
								<a href="#">杨梅酒</a>
								<a href="#">蓝莓酱</a>
								<a href="#">自制葡萄酒</a>
								<a href="#">樱花酒</a>
								<a href="#">桑葚酒</a>
								<a href="#">梅子酒</a>
							</li>
							<li>
								<span style="display:block;">葡萄酒:</span>
								<a href="#">红葡萄酒</a>
								<a href="#">白葡萄酒</a>
								<a href="#">桃红葡萄酒</a>
								<a href="#">香槟</a>
								<a href="#">起泡</a>
								<a href="#">冰酒</a>
							</li>
							<li>
								<span style="display:block;">洋酒:</span>
								<a href="#">鸡尾酒</a>
								<a href="#">威士忌</a>
								<a href="#">伏特加</a>
								<a href="#">白兰地</a>
								<a href="#">预调酒</a>
								<a href="#">力娇酒</a>
								<a href="#">朗姆酒</a>
								<a href="#">龙舌兰</a>				
							</li>							
						</ul>
					</li>
					<li class="nav_type">
						<i class="iconfont left">&#xe60c;</i>粮油调味
						<i class="iconfont right">&#xe628;</i>
						<ul id="nav_grains" class="animated">
							<li>
 								<span style="display:block;">小米:</span>
								<a href="#">大米</a>
								<a href="#">面粉</a>
								<a href="#">薏仁</a>
								<a href="#">杂粮</a>
								<a href="#">绿豆</a>
								<a href="#">玉米</a>
								<a href="#">红豆</a>
								<a href="#">黄豆</a>
								<a href="#">橄榄油</a>
							</li>
							<li>
								<span style="display:block;">面食:</span>
								<a href="#">年糕</a>
								<a href="#">面条</a>
								<a href="#">挂面</a>
								<a href="#">意大利面</a>
								<a href="#">速食面</a>
								<a href="#">手抓饼</a>
								<a href="#">冷面</a>
							</li>
							<li>
								<span style="display:block;">银耳:</span>
								<a href="#">黑木耳</a>
								<a href="#">香菇</a>
								<a href="#">莲子</a>
								<a href="#">桂圆干</a>
								<a href="#">松茸</a>
								<a href="#">猴头菇</a>
								<a href="#">荔枝干</a>
								<a href="#">腊肠</a>
							</li>
							<li>
								<span style="display:block;">调味品:</span>
								<a href="#">八角</a>
								<a href="#">桂皮</a>
								<a href="#">味精</a>
								<a href="#">醋制品</a>
								<a href="#">食糖</a>
								<a href="#">酱油</a>
								<a href="#">辣椒酱</a>
								<a href="#">果酱</a>
								<a href="#">咖喱</a>
								<a href="#">沙拉酱</a>
							</li>													
						</ul>
					</li>
					<li class="nav_type">
						<i class="iconfont left">&#xe60d;</i>冲调饮品
						<i class="iconfont right">&#xe628;</i>
						<ul id="nav_drinks" class="animated">
							<li>
								<span style="display:block;">暖冬茶:</span>
								<a href="#">金骏眉</a>
								<a href="#">正山小种</a>
								<a href="#">滇红</a>
								<a href="#">普洱熟茶</a>
								<a href="#">黑茶</a>
								<a href="#">祁门红茶</a>
							</li>
							<li>
								<span style="display:block;">秋香乌龙:</span>
								<a href="#">铁观音</a>
								<a href="#">大红袍</a>
								<a href="#">凤凰单丛</a>
								<a href="#">黑乌龙</a>
								<a href="#">台湾高山茶</a>
								<a href="#">冻顶乌龙</a>
							</li>
							<li>
								<span style="display:block;">怡人花茶:</span>
								<a href="#">菊花茶</a>
								<a href="#">苦荞茶</a>
								<a href="#">玫瑰花茶</a>
								<a href="#">茉莉花茶</a>
								<a href="#">荷叶茶</a>
								<a href="#">组合型花茶</a>
							</li>							
							<li>
								<span style="display:block;">咖啡冲饮:</span>
								<a href="#">速溶咖啡</a>
								<a href="#">即饮咖啡</a>
								<a href="#">咖啡豆</a>
								<a href="#">咖啡伴侣</a>
								<a href="#">麦片</a>
								<a href="#">柚子茶</a>
							</li>	
							<li>
								<span style="display:block;">饮料:</span>
								<a href="#">果味饮料</a>
								<a href="#">功能饮料</a>
								<a href="#">碳酸饮料</a>
								<a href="#">茶饮料</a>
								<a href="#">果蔬汁</a>
								<a href="#">矿泉水</a>
							</li>
							<li>
								<span style="display:block;">清香茗茶:</span>
								<a href="#">龙井</a>
								<a href="#">毛尖</a>
								<a href="#">毛峰</a>
								<a href="#">碧螺春</a>
								<a href="#">安吉白茶</a>
								<a href="#">日照绿茶</a>
								<a href="#">太平猴魁</a>
							</li>															
						</ul>
					</li>					
				</ul>
			</nav>
		</div>
		
		<!-- 购物车组件 -->
		<div id="shoppingcartlistapp">
			<ul id="shoppingcartlist" class="list animated" v-show="showcart" transition="flipY">
				<li class="head">Cart</li>
				<li v-if="cartlist.length==0" class="maimaimai">赶快去买买买</li>
				<li v-for="item in cartlist" class="animated" transition="lightSpeed" stagger="50" >
					<span>{{item.goods.name}} *<i contenteditable="true" onkeyup="this.innerHTML=this.innerHTML.replace(/[^0-9]+/,'');" @keyup.stop="changeAmount($index,item,this) | debounce 500" >{{item.amount}}</i></span>
					<i>{{item.goods.price*item.amount | currency '¥'}}</i>
					<i class="iconfont delete" @click.stop="deleteInCart($index,item,$event)" >&#xe622;</i>
				</li>
				<li class="cost" v-show="cartlist.length>0">
					<span class="cost">Cost</span>
					<i class="cost">{{totalCost | currency '¥'}}</i>
				</li>
				<li>
					<span class="refresh animated" @click.stop="refresh()" >Refresh</span>
					<span v-show="cartlist.length>0" class="checkout" @click.stop="checkout()" >CheckOut</span>
				</li>
			</ul>
			<i class="cartAmount" v-show="cartlist.length>0" onclick="showcart()">{{Math.min(cartlist.length,99)}}</i>
		</div>
		
		<!-- 消息提示组件 -->
		<div id="hintapp" v-show="userid!=''">
			<i class="iconfont hint" @click="showhint=!showhint">&#xe629;</i>
			<ul class="list animated" id="hint" v-show="showhint" transition="flipY">
				<li class="head">Tips</li>
				<li v-if="hints.length==0" class="nohint">没有任何消息~</li>
				<li v-for="item in hints" class="animated" transition="lightSpeed" stagger="50">
					<i>{{item.dealDate}}</i><br>
					<span>出售<font style="color:#ff6700;">{{item.goods.name}}</font> *<i>{{item.amount}}</i> 获得<i>{{item.amount*item.goods.price | currency '¥'}}</i></span>
				</li>
				<li v-if="hints.length>0" class="getit">
					<span class="getit" @click="getit()">GetIt</span>
				</li>
			</ul>
			<i class="hintamount"  v-show="hints.length>0" @click="showhint=!showhint">{{Math.min(hints.length,99)}}</i>
			
			
		</div>
		
		
		<!--休闲零食-->
		<div class="goods" id="snacks">
			<a href="goodsList?data='休闲零食'" class="mainlink" hidefocus onfocus="this.blur()">休闲零食</a>
			<ul>
				<li class="animated" v-for="item in snacks | limitBy 5 0" transition="flip" stagger="200" @mouseleave="leave" @mouseenter="toscaled">
					<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
						<img :src="item.picture" />
						<p class="goodsname">{{item.name}}</p>
						<p class="description" title="{{item.description}}">{{item.description}}</p>
						<p class="price">{{item.price | currency '¥'}}</p>
						<span class="sold">销量:{{item.sold}}</span>
						<span class="likecount">{{item.likecount}}人喜欢</span>
					</a>
				</li>			
			</ul>
		</div>
		<!-- 生鲜果蔬  -->
		<div class="goods" id="fresh">
			<a href="goodsList?data='生鲜果蔬 '" class="mainlink" hidefocus onfocus="this.blur()">生鲜果蔬</a>
			<ul>
				<li class="animated" v-for="item in fresh | limitBy 5"  transition="flip" stagger="200" @mouseleave="leave" @mouseenter="toslideTop">
					<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
						<img :src="item.picture" />
						<p class="goodsname">{{item.name}}</p>
						<p class="description" title="{{item.description}}">{{item.description}}</p>
						<p class="price">{{item.price | currency '¥'}}</p>
						<span class="sold">销量:{{item.sold}}</span>
						<span class="likecount">{{item.likecount}}人喜欢</span>
					</a>
				</li>			
			</ul>
		</div>
		<!-- 美酒佳酿 -->
		<div class="goods" id="wine" >
			<a  href="goodsList?data='美酒佳酿 '" class="mainlink" hidefocus onfocus="this.blur()">美酒佳酿</a><br>
			<div class="bigbox animated" v-for="item in wine | limitBy 1" transition="rotate" @mouseenter="toslideTop">
				<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
					<img :src="item.picture" />
					<p class="goodsname">{{item.name}}</p>
					<p class="description" title="{{item.description}}">{{item.description}}</p>
					<p class="price">{{item.price | currency '¥'}}</p>
					<span class="sold">销量:{{item.sold}}</span>
					<span class="likecount">{{item.likecount}}人喜欢</span>
				</a>
			</div>
			<ul>
				<li class="animated" v-for="item in wine | limitBy 4 1"  transition="rotate" stagger="200" @mouseenter="litoslideTop">
					<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
						<img :src="item.picture" />
						<div style="float:right; width:150px; margin-top:10px; margin-right:10px;">
							<p class="goodsname">{{item.name}}</p>
							<p class="description" title="{{item.description}}">{{item.description}}</p>
							<p class="price">{{item.price | currency '¥'}}</p>
							<div style="clear:both"></div>
							<span class="sold">销量:{{item.sold}}</span>
							<span class="likecount">{{item.likecount}}人喜欢</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
		
		<!-- 粮油调味 -->
		<div class="goods" id="grains">
			<a  href="goodsList?data='粮油调味 '" class="mainlink" hidefocus onfocus="this.blur()">粮油调味</a>
			<ul>
				<li class="animated" v-for="item in grains | limitBy 5" transition="slideLeft" stagger="200" @mouseenter="toslideTop">
					<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
						<img :src="item.picture" />
						<p class="goodsname">{{item.name}}</p>
						<p class="description" title="{{item.description}}">{{item.description}}</p>
						<p class="price">{{item.price | currency '¥'}}</p>
						<span class="sold">销量:{{item.sold}}</span>
						<span class="likecount">{{item.likecount}}人喜欢</span>
					</a>
				</li>			
			</ul>
		</div>
		
		<!-- 冲调饮品 -->
		<div class="goods" id="drinks">
			<a  href="goodsList?data='冲调饮品 '" class="mainlink" hidefocus onfocus="this.blur()">冲调饮品</a>
			<ul>
				<li class="animated" v-for="item in drinks | limitBy 5" transition="flipY" stagger="200" @mouseenter="toslideTop">
					<a href={{href}}{{item.id}} style="display:block;" hidefocus onfocus="this.blur()" >
						<img :src="item.picture" />
						<p class="goodsname">{{item.name}}</p>
						<p class="description" title="{{item.description}}">{{item.description}}</p>
						<p class="price">{{item.price | currency '¥'}}</p>
						<span class="sold">销量:{{item.sold}}</span>
						<span class="likecount">{{item.likecount}}人喜欢</span>
					</a>
				</li>			
			</ul>
		</div>
		<div style="clear:both;"></div>
		<div class="copyright">Copyright © 2016 J2EE-8 All Rights Reserved</div>
	</div>

	<!-- template for the modal component -->
	<script type="x/template" id="modal-template">
  		<div class="modal-mask" v-show="show" transition="modal">
    		<div class="modal-wrapper" @click="closeChat($event)">
     			<div class="modal-container">

        			<div class="modal-header">
          				<slot name="header"></slot>
        			</div>
       
        			<div class="modal-body">
          				<slot name="body"></slot>
        			</div>
        			<div class="modal-footer">
          				<slot name="footer"></slot>
        			</div>
      			</div>
    		</div>
  		</div>
	</script>

	<!-- app -->
		<div id="chatapp" v-show="userid!=''">
			<modal :show.sync="showModal">	
				<div slot="header" class="_center">
					<img class="_portrait" :src="receiver.portrait" />
					  {{receiver.name}}({{receiverConn?'在线':'离线'}})
				</div>
				<div slot="body" class="_body">
					<ul id="chatlist">
						<li class="chatitem" v-for="item in chatData['uid'+receiverid]" :class="[item.senderid!=userid ? '_left':'_right']" v-sdown>
							<div class="_timebox" v-if="timecheck(item,$index)">
								<span class="_time">{{item.time.substr(-5)}}</span>
							</div>							
							<img :src="receiver.portrait" class="_portrait" v-if="item.senderid!=userid">
							<span class="chatmsg" v-html="item.msg" ></span>
							<img :src="userData.portrait" class="_portrait" v-if="item.senderid==userid">
						</li>
					</ul>
				</div>
				<div slot="footer" class="_footer">
					<div class="msg" contenteditable="true" @keydown="chat_send_judge($event)"></div> 
					<button class="btn chat-send" @click="chat_send()">发送</button>
				</div>
			</modal>
			<i class="iconfont chatHint" @click="showhint=!showhint">&#xe6d7;</i>
			<ul class="list animated" id="chatHint" v-show="showhint" transition="flipY">
				<li class="head">Chats</li>
				<li v-if="totalUnread==0" class="nohint">没有任何新消息~</li>
				<li v-for="item in receiverColumn" class="chatHintitem" @click="showChat(item)">
					<img class="_portrait" :src="item.receiverportrait" />
					<span class="name">{{ item.receivername }}</span>
					<i class="chatAmount">{{Math.min(item.unreadCount,99)}}</i>
				</li>
			</ul>
			<i class="chatAmount" v-show="totalUnread>0" @click="showhint=!showhint">{{Math.min(totalUnread,99)}}</i>
		</div>
	</body>
	<script src="${ctx }/resources/js/shop.js"></script>
</html>