<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<title>details</title>
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/icon/iconfont.css" />
		<link rel="stylesheet" href="${ctx }/resources/js/jquery.mCustomScrollbar.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/animate.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/header.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/details.css" />
		<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script><!-- 引入jquery -->
		<script src="${ctx }/resources/js/jquery.mCustomScrollbar.concat.min.js"></script>
 		<script src="${ctx }/resources/js/vue.js"></script><!-- 引入 vuejs-->
 		<script src="${ctx }/resources/js/pagination.js"></script>
		
		<script src="${ctx }/resources/node_modules/socket.io-client/dist/socket.io.js"></script>
	</head>

	<body>
	<input type="hidden" class="ctx" value="${ctx }" />
	<div class="fullpage">
	<div id="searchapp">
		<!--头部-->
		<header>
<!--		<i class="iconfont" style="margin-left:20%;">&#xe601;</i>		
			<input type="search" id="searchBox" class="search" autocomplete="off" placeholder="Search..." v-model="searchKey" debounce="500" @keyup.enter="setSearchName($event)" />
			<ul id="searchRecommand" class="list searchKey animated" v-show="items.length>0&&show" transition="flipY">
				<li class="head">------------------Key-----------------</li>
				<li v-for="item in items | limitBy 1"  @click="setSearchNameByType(item)" >{{item.type2}}</li>
				<li v-for="item in items"  @click="setSearchNameByName(item)" >{{item.name}}</li>
			</ul>-->
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
		<div id="goodDetailsapp">
			<div class="head" v-for="item in details">
				<div class="information">所有商品  /  {{item.type1}}  /  {{item.type2}}  /  {{item.name}}</div>
			</div>
			<div class="container">
				<div class='details'>
					<ul class="picturesList">
						<li v-for="item in pictures" @mouseenter="setImg(item,$event)"><img :src="item.picture" /></li>
					</ul>
					<div class="selectedImgBox">
						<img :src="selectedImg" />
					</div>
					<div class="detailsMessage" v-for="item in details">
						<span class="name">{{item.name}}</span>
						<span>{{item.description}}</span>
						<span class="dividingLine"></span>
						<i class="price">{{item.price | currency '¥'}}</i>
						<i id="down" class="iconfont down" v-show="count!=''&&count>1" @click="setCount(item,$event)">&#xe621;</i>
						<i id="up" class="iconfont up" v-show="count<item.inventory" @click="setCount(item,$event)" >&#xe620;</i>
						<input type="text" v-model="count" placeholder="余{{item.inventory}}" class="buyCount" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" lazy />
						<span class="dividingLine"></span>
						<span class="getInCart" @click="getInCart(item,$event)"><i class="iconfont getInCart">&#xe606;</i>&#160; 加入购物车</span>
						<span class="heart" @click="likecountInOrDown(item,$event)"><i class="iconfont heart" :class="isLike">&#xe626;</i>&#160; 喜欢</span><span class="likecount">{{item.likecount}}</span>
						<span class="dividingLine"></span>
						<span class="sold">累计销量:<i>{{item.sold}}</i></span>
						<span class="commentcount">评论晒单:<i>{{item.comment_count}}</i></span>

						<span v-show="userid!=details[0].publisherId" class="chat" @click="showChat()"><i class="iconfont chat">&#xe649;</i>联系卖家</span>
					</div>
					<div style="clear:both;"></div>					
				</div>
			</div>
			<h2 class="thehead argument">规格参数</h2>
			<div class="arguments" v-for="item in details">
				<div class="left">
					<img :src="item.picture">
				</div>
				<div class="right">
					<ul>
						<li v-for="item in details">
							<span class="inline_block"><span>商品名称:</span><span>{{item.name}}</span></span>
							<span class="inline_block"><span>价格:</span><span>{{item.price | currency '¥'}}</span></span>
							<span class="inline_block"><span>生产日期:</span><span>{{item.production_date}}</span></span>
							<span class="inline_block"><span>保质期:</span><span>{{item.expiration_date}}天</span></span>
							<span class="inline_block goodid"><span>商品编号:</span><span>{{item.id}}</span></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<h2 class="thehead comment">评论晒单</h2>
		<div id="commentsapp" class="comments">
			<div class="left" v-if="stars.length==0&&needComments.length>0">
				<p>暂时还没有任何评价</p>
				<p style="color:#b0b0b0">期待您来分享</p>
			</div>
			<div class="noComment" v-if="stars.length==0&&needComments.length==0">
				<p>暂时还没有任何评价</p>
				<p style="color:#b0b0b0">期待您来分享</p>
			</div>
			<div class="left" v-if="stars.length>0">
				<i class="percent">{{percentage}}</i><i style="font-size:22px">%</i><br>
				<p>购买后满意</p>
				<i style="font-size:22px;">{{stars.length}}</i>名用户参与
			</div>
			<div class="right" v-if="needComments.length>0">
				<div v-for="item in needComments | limitBy 1" class="commentBox animated">
					<div class="top">
						<i class="iconfont picture" @click="selectPicture()">&#xe603;</i>
						<i class="iconfont" @click="showExpression()">&#xe62a;</i>
						<span class="facialExpression" @click="showfacialExpression">(・ω・) 颜文字</span>
					</div>
					<ul class="expressions animated" v-show="showExpressions" transition="flipY">
						<li v-for="expression in expressions" class="expression theexpression" @click="setExpression(expression)">
							<img :src="expression.src" :title="expression.info" />
						</li>
					</ul>						
					<ul class="expressions facialExpressions animated"  v-show="showFacialExpressions" transition="flipY">
						<li v-for="item in facialExpressions" class="expression facialExpression"  @click="setFacialExpression(item)">
							<span :title="item.info">{{item.info}}</span>
						</li>
					</ul>
					<div class="info" contenteditable="true" v-html="information" @click="activeInInfo()" >						
					</div>
					<input class="commentPicture" type="file" @change="showPicture($event)" multiple style="display:none" accept="image/gif,image/jpg,image/jpeg,image/bmp,image/png" />
					<div class="footer">
						<div class="starLevel">选择评价星级:
							<i class="iconfont star" @mouseenter="starLevel=n+1" v-for="n in starLevel">&#xe62f;</i>
							<i class="iconfont star" @mouseenter="starLevel=5-n" v-for="n in contrast">&#xe630;</i>
						</div>
						<span class="commentPicture" v-show="commentPicture>0">评论晒图:</span>
						<button class="send" @click="sendComment(item)">评论</button>
					</div>
				</div>
			</div>
			<div class="right popular" v-if="needComments.length==0&&popular.length>0" v-for="item in popular | limitBy 1">
				<div class="head">
					<img :src="item.user.portrait" class="portrait" />
					<span class="name">{{item.user.name}}</span>
					<i class="support">{{item.comment.support}}</i><span class="support">人觉得很赞</span>
				</div>
				<span class="theinfo" v-html="item.comment.information"></span>
				<div style="margin-top:15px;">
					<img class="commentImg" v-for="picItem in item.commentPicture" :src="picItem.picture">
				</div>
				<span class="datetime">{{item.comment.comment_datetime}}</span>
			</div>
			<div style="clear:both;"></div>
		</div>
		<div id="theCommentsapp" class="theComments">
			<div class="containerLeft">
				<span class="header">最有帮助的评价</span>
				<div class="niceComments">
					<div class="niceItem" v-for="item in commentsBySupport">
						<div class="theUserImg">
							<img :src="item.user.portrait" class="userImg" />
						</div>
						<div class="theStar">
							<i class="iconfont star" v-for="n in item.comment.star">&#xe62f;</i>
						</div>
						<div class="username-datetime">
							<span class="username">{{item.user.name}}</span>
							<span class="date-time">{{item.comment.comment_datetime}}</span>
						</div>
						<div class="user-handle" @click="supportUpOrDown(item,$event) | debounce 300">
							<i class="iconfont support" data-support="0">&#xe631;</i>
							<span class="support">{{item.comment.support}}</span>
						</div>
						<div class="user-comment-info">
							<div class="user-comment-info-content">
								<p class="user-comment-information" v-html="item.comment.information"></p>
							</div>
							<div class="theCommentImg">
								<img v-for="picItem in item.commentPicture" :src="picItem.picture" class="commentImg" @click="setImgList(item.commentPicture,picItem,$index)" />
							</div>
							<div class="comment-reply-box">
								<input class="reply-box" type="text" placeholder="回复楼主:" />
								<a href="javascript:void(0);" class='inline-btn' @click="sendReply(item,$event)" >回复</a>
							</div>
						</div>
						
					</div>
					<div class="loadMore" @click="loadMoreBySupport()" v-show="showLoadForSupport">加载更多</div>
					<div class="loadMore" style="cursor:default" v-else>然而并没有了~~~</div>			
				</div>
			</div>
			<div class="containerRight">
				<span class="header">最新评价</span>
				<ul class="newComments" v-if="commentsByDate.length>0">
					<li class="newItem" v-for="item in commentsByDate">
						<p class="line-time">{{item.comment.comment_datetime}}</p>
						<p class="line-content" v-html="item.comment.information"></p>
						<div class="theCommentImg">
							<img v-for="picItem in item.commentPicture" :src="picItem.picture" class="line-img" @click="setImgList(item.commentPicture,picItem,$index)" />
						</div>
						<div class="line-foot">
							<div class="line-left">{{item.user.name}}</div>
							<div class="user-handle line-right" @click="supportUpOrDown(item,$event) | debounce 300">
								<i class="iconfont support" data-support="0">&#xe631;</i>
								<span class="support">{{item.comment.support}}</span>
							</div>
						</div>
						<div style="clear:both;"></div>
					</li>					
				</ul>
				<div class="loadMore" @click="loadMoreByDate()" v-if="showLoadForDate">加载更多</div>
				<div class="loadMore" style="cursor:default" v-else>然而并没有了~~~</div>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="height:100px"></div>
		<div class="copyright">Copyright © 2016 J2EE-8 All Rights Reserved</div>
	</div>
	</div>
	
	
	<!-- app -->
	<div id="shadow" class="animated shadow" v-show="showImg!=''" >
		<div id="imgapp" class="animated">
		<i class="iconfont close" @click="close()">&#xe622;</i>
			<img :src="showImg" />
			<div class="btnLeft" v-show="imgList.length>1" @click="showImgSrcDown()"></div>
			<div class="btnRight" v-show="imgList.length>1" @click="showImgSrcUp()"></div>
		</div>	
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
	<script src="${ctx }/resources/js/details.js"></script>
	<script src="${ctx }/resources/js/moSvg.js"></script>
	</body>
</html>