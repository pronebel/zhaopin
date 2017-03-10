<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MVC Tutorial</title>
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<!-- Bootstrap -->
<link href="${ctx }/resources/css/kendoUI/kendo.bootstrap.min.css" rel="stylesheet">
<link href="${ctx }/resources/css/kendoUI/kendo.common.min.css" rel="stylesheet">

<script src="${ctx }/resources/js/lib/jquery-2.1.4.min.js"></script>
<script src="${ctx }/resources/js/lib/kendoUI/kendo.web.min.js"></script>
</head>
<body>
	<div id="grid" data-role="grid" style="height:300px;" 
		data-columns="[{
                         field:'id',
                         title: 'ID'
                       }, {
                         field: 'name',
                         title: 'NAME'
                       }, {
                         field: 'birthday',
                         title: 'BIRTHDAY',
                   		 template: '#:kendo.toString(new Date(birthday) , \'yyyy-MM-dd\')#'
                       },{
                       	 field: 'gender',
                       	 title: 'GENDER'
                       },{
                       	 command:['edit','destroy'],
                         title:'&nbsp;',
                         width:'250px'}]" 
        data-bind="source: list" data-editable="inline" data-toolbar="['create','edit','delete']"></div>
</body>
<script type="text/javascript">
$(document).ready(function() {
	<%String data=request.getParameter("data");
	  data=new String(data.getBytes("iso-8859-1"),"utf-8");
	%>
	var a=<%=data%>;
	$("#grid").kendoGrid({
		 pageable: {
             refresh: true,
             pageSizes: true,
             buttonCount: 10
         }
	})
	var id=<%=request.getParameter("id")%>;
	var viewModel = kendo.observable({
    	list : new kendo.data.DataSource({
    		transport:{
				read: {
					url:"${ctx}/student/list.json?id="+id,
					dataType: "json",
					type: "get"
				},
		    	update: {
					url: "${ctx}/student/edit.json",
					dataType: "json",
					type: "post"
				},
				create: {
					url: "${ctx}/student/edit.json",
					dataType: "json",
					type: "post"
				},
				destroy: {
					url: "${ctx}/student/delete.json",
					dataType: "json",
					type: "post"
				}
			},
			batch : true, //可批量操作
		    pageSize : 4, //每页显示条数设置
		//    serverPaging : true, //支持分页功能
		//    serverSorting : true,//支持排序功能 
		//    serverFiltering : true, //支持查询功能 
			schema:{
			//	data : "list", //定义数据来源
		//	    total : 4, //页码总数
				model:{
					id:'id',
					fields:{
						name:{type: 'string'},
						birthday: {type: 'number'},
						gender: {type: 'string'}
					}
				}
			}
    	})
    });         
	kendo.bind('body', viewModel);
})
</script>
</html>