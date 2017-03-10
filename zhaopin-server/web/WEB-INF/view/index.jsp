<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<title>index</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet">
		<link href="${ctx }/resources/css/indexStyle.css" rel="stylesheet">
		<link rel="shortcut icon" type="image/x-icon" href="${ctx }/resources/favicon.ico" />
		<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script>
		<script src="${ctx }/resources/js/index.js"></script>
		<!--[if IE]>
			<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
		<![endif]-->
	</head>
	<body>
 
<div id="result"></div>
</body>
<script>
var source=new EventSource("/MVCDemo/student/list.json");
source.onmessage=function(event)
{
    document.getElementById("result").innerHTML+=event.data + "<br>";
//  alert(event.data);
};
</script>
</html>