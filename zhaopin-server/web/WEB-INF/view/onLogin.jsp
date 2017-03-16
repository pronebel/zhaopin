<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<title>登录</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- 	<meta name="viewport" content="width=device-width, initial-scale=1.0" />-->
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet">
		<link rel="shortcut icon" type="image/x-icon" href="${ctx }/resources/favicon.ico" />
	</head>
	<body>
		<div id='loginapp'>
			<img :src='src' />
		</div>
	</body>
	<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script>
	<script src="${ctx }/resources/js/vue.js"></script><!-- 引入 vuejs-->
	<script>
		var vm=new Vue({
			el:"#loginapp",
			data:{
				src:''
			},
			created:function(){
				var that=this;
				$.ajax({
					url:'/zhaopin/pc/getCode',
					success:function(res){
						console.log(res);
						that.src=JSON.parse(res).qrCodeImg						
					}
				})
			}			
		})
	</script>
</html>
