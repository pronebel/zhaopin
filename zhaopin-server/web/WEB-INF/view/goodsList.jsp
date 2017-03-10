<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<title>goodsList</title>
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/icon/iconfont.css" />
		<link href="${ctx }/resources/css/goodsList.css" rel="stylesheet" />
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
	<div id="searchapp">
		<!--头部-->
		<header>
			<i class="iconfont" style="margin-left:20%;">&#xe601;</i>		
			<input type="search" id="searchBox" class="search" autocomplete="off" placeholder="Search..." v-model="searchKey" debounce="500" @keyup.enter="setSearchName($event)" />
			<ul id="searchRecommand" class="list searchKey animated" v-show="items.length>0&&show" transition="flipY">
				<li class="head">------------------Key-----------------</li>
				<li v-for="item in items | limitBy 1"  @click="setSearchNameByType(item)" >{{item.type2}}</li>
				<li v-for="item in items"  @click="setSearchNameByName(item)" >{{item.name}}</li>
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
		<div class="selected">
			<span>商品</span>
			<span v-if="searchType1!=''">&#160;&#160; &#62; &#160;&#160;{{searchType1}}</span>
			<span v-if="searchType2!=''">&#160;&#160; &#62; &#160;&#160;{{searchType2}}</span>
			<span v-if="searchName!=''">&#160;&#160; &#62; &#160;&#160;{{searchName}}</span>
		</div>
		<div class="nav">
			<div class="nav_data type1">分类:
				<span v-for="item in type1" @click="setType1(item,$event)">{{item.type1}}</span>
			</div>
			<div class="nav_data type2">种类:
				<span v-for="item in type2" v-if="item.type1==searchType1" @click="setType2(item,$event) | debounce 300" >{{item.type2}}</span>
			</div>
			<div class="nav_data name">商品:
				<div class="names">
					<span v-if="item.type2==searchType2" v-for="item in names | filterBy searchType2 in 'type2' | limitBy 30" @click="setName(item,$event) | debounce 300" >{{item.name}}</span>
				</div>
				<div style="clear:both;"></div>
			</div>
			<div class="nav_data price">价格:
				<span class="active" v-for="item in priceLimits | limitBy 1 " @click="setPriceLimit(item,$event) | debounce 300" >{{item.limit}}</span>
				<span v-for="item in priceLimits | limitBy 6 1" @click="setPriceLimit(item,$event) | debounce 300" >{{item.price1 | currency '¥'}}-{{item.price2 | currency '¥' }}</span>
			</div>
			<div class="nav_data order">其他:
				<template v-for="item in orderLimits">
					<span v-if="item.order=='销量'" @click="setOrderLimit(item,$event) | debounce 300" :class="soldClass">{{item.order}}<i :class="soldClass" class="iconfont">&#xe613;</i></span>
					<span v-if="item.order=='评论'" @click="setOrderLimit(item,$event) | debounce 300" :class="commentClass">{{item.order}}<i :class="commentClass" class="iconfont">&#xe613;</i></span>
					<span v-if="item.order=='收藏'" @click="setOrderLimit(item,$event) | debounce 300" :class="likeClass">{{item.order}}<i :class="likeClass" class="iconfont">&#xe613;</i></span>
					<span v-if="item.order=='价格'" @click="setOrderLimit(item,$event) | debounce 300" :class="priceClass">{{item.order}}<i :class="priceClass" class="orderByPrice iconfont">&#xe613;</i></span>
					<span v-if="item.order=='综合排行'" @click="setOrderLimit(item,$event)" :class="defaultClass">{{item.order}}</span>				
				</template>
			</div>
		</div>
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
		
		<!-- 商品列表组件 -->
		<div id="goodslistapp">
			<ul>
				<li id="theli" v-for="item in goodslist | limitBy 20" @mouseenter.stop="activeIn($event)" @mouseleave.stop="activeOut($event)" >
					<a target="_blank" href={{href}}{{item.id}} style="display:block"><img class="mainPirture" :src="item.picture" /></a>
					<p class="description">{{item.description}}</p>
					<span>{{item.name}}</span>
					<span><i>{{item.price | currency '¥'}}</i></span>
					<span>销量:<i class="sold">{{item.sold}}</i></span>
					<br/>
					<span class="comment">累计评论晒单:<i class="commentcount">{{item.comment_count}}</i></span>
					<span class="likecount animated">
						<i @click="likecountInorDown($index,item,$event) | debounce 300" class="fa-heart iconfont" data-oldlike="0" data-like="0">&#xe626;</i>
						<i class="likecount">{{item.likecount}}</i>
					</span>
					<span class="shoppingCart animated" @mouseenter="activeInIcon($event)" @mouseleave="activeOutIcon($event)" v-show="userid!=item.publisherId" >
						<i @click="getInCart(item,$event)" id="shoppingCart" class="iconfont">&#xe609;</i>
						<i class="showCart" v-show="showCart">+</i>
					</span>
				</li>
			</ul>
			<div style="clear:both;"></div>
			<!-- 分页组件 -->
			<div style="width:1224px;margin:0 auto;">
				<div id="pagination"></div>
				<div id="totalPages" v-show="totalPages>1">
					<input type="text" class="goPage" v-model="pageKey" placeholder="共{{totalPages}}页" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" />
					<span class="go animated" @click="go()" >Go</span>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
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
	<script src="${ctx }/resources/js/mo.min.js"></script>
	<script src="${ctx }/resources/js/header.js"></script>
	<script src="${ctx }/resources/js/goodsList.js"></script>
	<script src="${ctx }/resources/js/moSvg.js"></script>
//		<%
	//		String data=request.getParameter("data");
//			if(data!=null){
//	 	 		data=new String(data.getBytes("iso-8859-1"),"utf-8");
//			}
//		%>	
	</body>
</html>