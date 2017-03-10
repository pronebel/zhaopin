<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="org.jfree.chart.*,org.jfree.chart.plot.*,org.jfree.chart.labels.*,
org.jfree.data.category.*,java.awt.*,org.jfree.ui.*,org.jfree.chart.renderer.category.BarRenderer3D,
org.jfree.chart.servlet.*,org.jfree.chart.plot.PlotOrientation,org.jfree.data.general.DatasetUtilities"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<title>home</title>
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/icon/iconfont.css" />
		<link href="${ctx }/resources/css/home.css" rel="stylesheet" />
		<link rel="stylesheet" href="${ctx }/resources/js/jquery.mCustomScrollbar.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/animate.css" />
		<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script><!-- 引入jquery -->
		<script src="${ctx }/resources/js/jquery.mCustomScrollbar.concat.min.js"></script>
		<script src="${ctx }/resources/js/vue.js"></script><!-- 引入 vuejs-->
		<script src="${ctx }/resources/js/pagination.js"></script>
		<script src="${ctx }/resources/Jcrop/js/Jcrop.min.js"></script><!-- 引入Jcrop -->
		<link href="${ctx }/resources/Jcrop/css/Jcrop.min.css" rel="stylesheet" />
		<link href="${ctx }/resources/dist/css/datepicker.min.css" rel="stylesheet" /><!--引入datepicker -->
		<script src="${ctx }/resources/dist/js/datepicker.min.js"></script>
		<script src="${ctx }/resources/dist/js/i18n/datepicker.en.js"></script> 
	</head>
	
	<body onload="init()">
	<input type="hidden" class="ctx" value="${ctx }" />
		<div class="left">
			<div class="portrait animated"></div>
			<img class="animated"/>
			<p class="name" contenteditable="true"></p>
			<ul>
				<li><i class="iconfont left">&#xe61f;</i><p>个人信息</p><i class="iconfont right">&#xe611;</i></li>
				<li><i class="iconfont left">&#xe626;</i><p>我的收藏</p><i class="iconfont right">&#xe611;</i></li>
				<li><i class="iconfont left">&#xe61d;</i><p>已买清单</p><i class="iconfont right">&#xe611;</i></li>
				<li><i class="iconfont left">&#xe61d;</i><p>已卖清单</p><i class="iconfont right">&#xe611;</i></li>
				<li><i class="iconfont left">&#xe605;</i><p>商品发布</p><i class="iconfont right">&#xe611;</i></li>
				<li><i class="iconfont left">&#xe61e;</i><p>出售清单</p><i class="iconfont right">&#xe611;</i></li>
			</ul>
		</div>
		<div class="right">
		<!-- 个人信息 -->
			<div class="container information">
				<ul>
					<li class="active">
						<div class="header first"><i class="iconfont left">&#xe620;</i>账号信息<i class="iconfont right">&#xe607;</i></div>
						<span>账号:</span><input type="text" class="userId" readonly/><br />
						<span>修改密码:</span><input type="password" placeholder="6-20位密码" class="password password1" maxlength="20" />
						<i class="iconfont check">&#xe619;</i><br />
						<span>确认密码:</span><input type="password" placeholder="6-20位密码" class="password password2" maxlength="20" onblur="checkPassword(this)" />
						<i class="iconfont check">&#xe619;</i><br />
						<span>昵称:</span><input type="text" placeholder="" class="name" maxlength="15" /><br />
					</li>
					<li>
						<div class="header"><i class="iconfont left">&#xe621;</i>头像设置<i class="iconfont right">&#xe603;</i></div>
						<div class="cropcon animated">
				 			<p class="description animated">请选择大于200*200分辨率的图片进行裁剪,支持jpg、png、bmp格式</p>
							<i class="iconfont photo animated" onclick="setportrait()">&#xe603;</i>
							<input type="file" class="portraitFile" onchange="checkFile(this)" style="display:none;" accept="image/jpg,image/jpeg,image/bmp,image/png" />
							<input type="hidden" id="txtX1" />
							<input type="hidden" id="txtY1" />
							<input type="hidden" id="txtX2" />
							<input type="hidden" id="txtY2" />
							<input type="hidden" id="txtWidth" />
							<input type="hidden" id="txtHeight" />
							<div class="crop animated">
								<img class="portrait" id="newImg" />
								<i class="iconfont delete animated">&#xe61c;</i>								
							</div>						
						</div>
						<div class="preview animated">裁剪预览~~~
							<div class="pre"></div>
							<div class="pre"></div>
							<div class="pre"></div>
							<div class="border"></div>
							<div class="border"></div>
							<div class="border"></div>
						</div>	
					</li>
					<li>
						<div class="header"><i class="iconfont left">&#xe621;</i>个人信息<i class="iconfont right">&#xe61f;</i></div>
						<span>姓名:</span><input type="text" placeholder="真实姓名" class="realname" maxlength="10"/><br />
						<span data-sex="male" class="resultSex">性别:</span><span class="sex male">男</span><span class="sex female">女</span><br />
						<span>生日:</span><input type='text' placeholder="yyyy/mm/dd" class='datepicker-here' data-language='en' data-date-format="yyyy/mm/dd" onclick="openDatepicker(this)" onkeyup="cleanDate(this)" onblur="checkDate(this)" />
						<i class="iconfont check">&#xe619;</i><br />
						<span>手机:</span><input type="text" class="telephone" placeholder="11位手机号码" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" onblur="checkMobile(this)" maxlength="11" />
						<i class="iconfont check">&#xe619;</i><br />
						<span>邮箱:</span><input type="text" class="email" placeholder="常用邮箱" onblur="checkEmail(this)"/>
						<i class="iconfont check">&#xe619;</i><br />
					</li>
				</ul>
				<p class="message"></p>
				<img src="${ctx}/resources/img/puff.svg" class=message />
				<i class="iconfont save" onclick="send()">&#xe605;</i>
				<span class="save animated" onclick="send()">保存</span>
			</div>
			
			<!-- 收藏 -->
			<div class="container collection">
				<div class="header collectionHeader">收藏列表</div>
				<div id="collectionapp">
					<span class="query">Search:</span> 
					<input name="query" v-model="filterKey" class="query" placeholder="Search for anything">
					<span class="refresh animated" @click="refresh()" >Refresh</span>
					<table>
						<thead>
							<tr>
								<th v-for="key in columns">{{key | capitalize}}</th>
							</tr>						
						</thead>
						<tbody>
							<tr class="animated" v-for="item in goodsList | filterBy filterKey | count | limitBy itemsPerPage beginPerPage  " 
							transition="lightSpeed" stagger="50">
								<th v-for="key in columns">{{item.goods[key]}}</th>
								
							</tr>
						</tbody>
					</table>
		 			<div id="collpagination"></div>
					<div id="colltotalPages" v-show="totalPages>1">
						<input type="text" class="goPage" v-model="pageKey" number placeholder="共{{totalPages}}页" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" />
						<span class="go animated" @click="go()" >Go</span>
					</div> 
				</div>
			</div>
			
			<!-- 已买 -->
			<div class="container bought">

		<ul>
		<li class="active">
		   <div class="header first"><i class="iconfont left">&#xe620;</i>已买商品种类统计图</div>	
		  
		</li>
		<li>
           <div class="header"><i class="iconfont left">&#xe621;</i>已买商品统计图</div>
	       
	     </li>
	     <li id="app">
			<div class="header first"><i class="iconfont left">&#xe621;</i>已买商品图表</div>	
			<div id="boughtapp">
					<span class="query">Search:</span> 
					<input name="query" v-model="filterKey" class="query" placeholder="Search for anything">
					<span class="refresh animated" @click="refresh()" >Refresh</span>
					<table>
						<thead>
							<tr>
								<th v-for="key in columns">{{key | capitalize}}</th>
								<th style="border-right:1px solid rgba(49,200,234,0.5)">Do</th>
							</tr>													
						</thead>
						<tbody>
							<tr class="animated" v-for="item in goodsList | filterBy filterKey | count | limitBy itemsPerPage beginPerPage  " 
							transition="lightSpeed" stagger="50">
								<th v-for="key in columns">{{item.goods[key] || item[key]}}</th>
								<th >								
									<a hidefocus onfocus="this.blur()" v-if="!item.comment" href={{href}}{{item.goodsid}} target="_blank"><i class="iconfont goDetails">&#xe605;<i class="message">去评论</i></i></a>
									<i class="iconfont goDetails" v-else style="color:yellow">&#xe62e;<i class="message">已评论</i></i>		
								</th>
							</tr>
						</tbody>
					</table>
		 			<div id="boughtpagination"></div>
					<div id="boughttotalPages" v-show="totalPages>1">
						<input type="text" class="goPage" v-model="pageKey" number placeholder="共{{totalPages}}页" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" />
						<span class="go animated" @click="go()" >Go</span>
					</div> 
				</div>
		</li>
		</ul>
			</div>
			
			
			<!-- 已卖 -->
			<div class="container sold">
		
		<ul>
		<li class="active">  	
			<div class="header first"><i class="iconfont left">&#xe620;</i>已卖商品种类统计图</div>  	
		
		</li>	
		<li>
       		<div class="header"><i class="iconfont left">&#xe621;</i>已卖商品统计图</div>     
	   	
	   </li>
	   <li id="app">
			<div class="header first"><i class="iconfont left">&#xe621;</i>已卖商品图表</div>	
			<div id="soldapp">
					<span class="query">Search:</span> 
					<input name="query" v-model="filterKey" class="query" placeholder="Search for anything">
					<span class="refresh animated" @click="refresh()" >Refresh</span>
					<table>
						<thead>
							<tr>
								<th v-for="key in columns">{{key | capitalize}}</th>
								<th>buyer</th>
								<th style="border-right:1px solid rgba(49,200,234,0.5)">Do</th>
							</tr>													
						</thead>
						<tbody>
							<tr class="animated" v-for="item in goodsList | filterBy filterKey | count | limitBy itemsPerPage beginPerPage  " 
							transition="lightSpeed" stagger="50">
								<th v-for="key in columns">{{item.goods[key] || item[key]}}</th>
								<th v-if="item.user.length>0">								
									{{item.user[0].name}}
								</th>
								<th>								
									<a hidefocus onfocus="this.blur()" v-if="item.comment" href={{href}}{{item.goodsid}} target="_blank"><i class="iconfont goDetails" style="color:red">&#xe619;<i class="message">有评论</i></i></a>
									<i class="iconfont goDetails" v-else style="color:yellow">&#xe62e;<i class="message">未评论</i></i>		
								</th>
							</tr>
						</tbody>
					</table>
		 			<div id="soldpagination"></div>
					<div id="soldtotalPages" v-show="totalPages>1">
						<input type="text" class="goPage" v-model="pageKey" number placeholder="共{{totalPages}}页" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" />
						<span class="go animated" @click="go()" >Go</span>
					</div> 
				</div>
		</li>
	   </ul>
	   </div>
			<!-- 商品发布 -->
			<div class="container release">
				<div class="header goodsHeader">发布商品</div>
				<span class="type" data-type1="" data-type2="">种类:</span>				
				<div class="goods" style="margin-left:1.5em;" data-type1="休闲零食">休闲零食
					<i class="iconfont top">&#xe625;</i>
					<ul>
						<li>坚果蜜饯</li>
						<li>糖果巧克力</li>
						<li>肉类</li>
						<li>糕点</li>
						<li>饼干膨化</li>
						<li>梅果干</li>
					</ul>
				</div>
				<div class="goods"  data-type1="生鲜果蔬">生鲜果蔬
					<i class="iconfont top">&#xe625;</i>
					<ul>
						<li>海鲜</li>
						<li>肉禽蛋</li>
						<li>蛋制品</li>
						<li>水果</li>
						<li>蔬菜</li>
						<li>新鲜蛋糕</li>
					</ul>
				</div>
				<div class="goods"  data-type1="美酒佳酿">美酒佳酿
					<i class="iconfont top">&#xe625;</i>
					<ul>
						<li>白酒</li>
						<li>葡萄酒</li>
						<li>调制酒</li>
						<li>啤酒</li>
						<li>洋酒</li>
						<li>陈年老酒</li>
					</ul>
				</div>
				<div class="goods"  data-type1="粮油调味">粮油调味
					<i class="iconfont top">&#xe625;</i>
					<ul>
						<li>小米</li>
						<li>粗粮</li>
						<li>面食</li>
						<li>调味品</li>
						<li>汤料</li>		
						<li>银耳</li>				
					</ul>
				</div>
				<div class="goods"  data-type1="冲调饮品">冲调饮品
					<i class="iconfont top">&#xe625;</i>
					<ul>
						<li>暖冬茶</li>
						<li>秋香乌龙</li>
						<li>怡人花茶</li>
						<li>清香茗茶</li>
						<li>咖啡冲饮</li>
						<li>饮料</li>
					</ul>
				</div>
				<i class="iconfont check typeCheck">&#xe619;</i><br/>
				<span>名称:</span>
				<input type="text" maxlength="16" class="goodsName" placeholder="请正确输入，如苹果" onblur="checkGoodsName(this)" />
				<i class="iconfont check">&#xe619;</i><br/>
				<span>生产日期:</span>
				<input type="text" class="production_date" placeholder="请选择生产日期范围" data-language='en' data-multiple-dates="2" data-multiple-dates-separator="-" data-date-format="yyyy/mm/dd" onclick="openDatepicker(this)" onkeyup="cleanDate(this)" onblur="checkProduction_date(this)" />
				<i class="iconfont check">&#xe619;</i><br/>
				<span>保质期:</span>
				<input type="text" maxlength="4" class="expiration_date" placeholder="请正确填写保质期,单位为天" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" onblur="checkExpiration_date(this)" />
				<i class="iconfont check">&#xe619;</i><br/>
				<span>单价:</span>
				<input type="text" maxlength="8" class="price" placeholder="份/元,最多精确到小数点后2位" onkeyup="this.value=this.value.replace(/[^0-9.]+/,'');" onblur="checkPrice(this)" />
				<i class="iconfont check">&#xe619;</i><br/>
				<span>库存:</span>
				<input type="text" maxlength="10" class="inventory" placeholder="请正确填写库存" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" onblur="checkInventory(this)" />
				<i class="iconfont check">&#xe619;</i><br/>
				<span class="description">产品描述:</span>
				<textarea class="description animated" onblur="checkDescription(this)" rows="4" cols="16" required onkeyup="checkLength(this);" maxlength="60" placeholder="请输入产品的描述,这将影响到用户检索的结果,如:红富士"></textarea>
				<i class="iconfont check description">&#xe619;</i>
				<span class="residue_length">还可以输入60个字符</span>
				<div class="picture picture-1 animated">
					<p class="description">请选择大于360*300小于720*600分辨率的图片,支持jpg、png、bmp格式</p>
					<i class="iconfont picture" onclick="setPicture(this)">&#xe602;</i>
					<input type="file" class="pictureFile pictureFile0" onchange="checkPicture(this,event)" style="display:none" accept="image/jpg,image/jpeg,image/bmp,image/png" />
					<img class="pictureView" />
					<i class="iconfont delete" onclick="deletePicture(this)">&#xe61c;</i>
					<p class="errorMessage"></p>
				</div>
				<div class="picture picture-2 picture-child animated">				
					<i class="iconfont picture" onclick="setPicture(this)">&#xe602;</i>
					<input type="file" class="pictureFile pictureFile1" onchange="checkPicture(this,event);" style="display:none;" accept="image/jpg,image/jpeg,image/bmp,image/png" />
					<img class="pictureView" />
					<i class="iconfont delete" onclick="deletePicture(this)">&#xe61c;</i>
				</div>
				<div class="picture picture-3 picture-child animated">				
					<i class="iconfont picture" onclick="setPicture(this)">&#xe602;</i>
					<input type="file" class="pictureFile pictureFile2" onchange="checkPicture(this,event);" style="display:none;" accept="image/jpg,image/jpeg,image/bmp,image/png" />
					<img class="pictureView" />
					<i class="iconfont delete" onclick="deletePicture(this)">&#xe61c;</i>
				</div>
				<div class="picture picture-4 picture-child animated">				
					<i class="iconfont picture" onclick="setPicture(this)">&#xe602;</i>
					<input type="file" class="pictureFile pictureFile3" onchange="checkPicture(this,event);" style="display:none;" accept="image/jpg,image/jpeg,image/bmp,image/png" />
					<img class="pictureView" />
					<i class="iconfont delete" onclick="deletePicture(this)">&#xe61c;</i>
				</div>
				<span class="send" onclick="sendGoods()"><i class="iconfont send">&#xe605;</i> 上架</span><br>
				<p class="callbackMessage"></p>
				<img src="${ctx}/resources/img/puff.svg" class=callbackMessage />
				<p class="ground"></p>		
			</div>
			<!-- 出售中的商品清单 -->
			<div class="container onsale">
				<div class="header onsaleGoods">出售中的商品清单</div>								

					<!-- demo root element -->
 					<div id="vueapp">
						<span class="query">Search:</span> 
						<input name="query" v-model="searchQuery" class="query" placeholder="Search for anything">
						<span class="refresh animated" @click="refresh()" >Refresh</span>
						<demo-grid :data="gridData" :columns="gridColumns" :filter-key="searchQuery"  :limit-keys="limitKeys"
						:items-per-page.sync="itemsPerPage" :begin-per-page.sync="beginPerPage" ></demo-grid>
						<div id="pagination"></div>
						<div id="totalPages" v-show="totalPages>1">
							<input type="text" class="goPage" v-model="pageKey" number placeholder="共{{totalPages}}页" onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" />
							<span class="go animated" @click="go()" >Go</span>
						</div>
					</div>				
			</div>
			<div style="height:15px;width:1000px;"></div>
			<div class="container chat">
				<div class="chatting"></div>
				<div class="chatContent" contenteditable="true"></div>
				<div class="chatLog"></div>
			</div>		
		</div>
		
		<!-- app -->
		<div id="cropapp">
			<!-- use the modal component, pass in the prop -->
			<modal :show.sync="showModal">
				<!--
				you can use custom content here to overwrite
				default content
				-->
				<h3 slot="header">Use the box to Crop the photo</h3>
				<div slot="body">
					<div style="float:left;" class="cropbox"></div>
					<div style="float:left;" class="view">
						<div class="preview preview-1"></div>
						<div class="preview preview-2"></div>
						<div class="preview preview-3"></div>
						<div class="viewborder viewborder-1"></div>
						<div class="viewborder viewborder-2"></div>
						<div class="viewborder viewborder-3"></div>
					</div>
				</div>
				<div slot="footer">
					<span class="modal-default-button ok" @click="showModal = false" onclick="showPreview()">OK</span>
					<span class="modal-default-button cancel" @click="showModal = false" onclick="deleteCrop()">Cancel</span>
				</div>
			</modal>
		</div>
		
		<!-- app -->
		<div id="messageapp">
			<!-- use the modal component, pass in the prop -->
			
			<modal :show.sync="showModal">
				<h3 slot="header">Something need to tell you</h3>
				<div slot="body">
					<p class="remind">{{message}}</p>
				</div>
				<div slot="footer" style="height:60px;margin-top:30px;" >					
					<span class="modal-default-button cancel" @click="showModal = false">Cancel</span>
					<span class="modal-default-button ok" @click="showModal = false">OK</span>
				</div>
			</modal>
		</div>	
	</body>
	<!-- template for the modal component -->
	<script type="x/template" id="modal-template">
  		<div class="modal-mask" v-show="show" transition="modal">
    		<div class="modal-wrapper">
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
	<!-- component template -->
	<script type="text/x-template" id="grid-template">
		<table>
			<thead>
				<tr>
					<th v-for="key in columns" @click="sortBy(key)" :class="{active: sortKey == key}">
						{{key | capitalize}}
						<i class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></i>
					</th>
					<th style="border-right:1px solid rgba(49,200,234,0.5)">Todo</th>
				</tr>
			</thead>
			<tbody>
				<tr  class="animated" v-for="entry in data  | filterBy filterKey in limitKeys | count | orderBy sortKey sortOrders[sortKey] | limitBy itemsPerPage beginPerPage " 
					transition="lightSpeed" stagger="50">
					<td v-for="key in columns">
						<!-- let the price and inventory contenteditable -->
						<input v-if="key=='price'" @keyup="onEnterPrice(entry,$event) | debounce 1500"  
							type="text" :value="entry[key]" class="priceOrInventory price" placeholder="您可以修改价格"
							onkeyup="this.value=this.value.replace(/[^0-9.]+/,'');" maxlength="10" />
						<input v-if="key=='inventory'" @keyup="onEnterInventory(entry,$event) | debounce 1500" 
							type="text" :value="entry[key]" class="priceOrInventory inventory" placeholder="您可以修改库存" 
							onkeyup="this.value=this.value.replace(/[^0-9]+/,'');" maxlength="8" />								
						<span class="else" v-if=" key!='price' && key!='inventory' ">{{entry[key]}}</span>																
					</td>
					<td>
						<i @click="domn(entry)" class="iconfont down" v-if="entry.status" >&#xe616; <i class="message">下架</i></i>
						<i @click="up(entry)" class="iconfont up" v-else >&#xe605; <i class="message">上架</i></i>
					</td>											
				</tr>
			</tbody>
		</table>
	</script>
		
	<script src="${ctx }/resources/js/home.js"></script>
</html>
			