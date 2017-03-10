<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html >
<html>
	<head>
		<meta charset="utf-8" />
		<title>本地图片预览</title>
		<style type="text/css">
			#preview{width:300px;}
			#imghead {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);}
			.imghead{
				max-width:80%;
				height:auto;
				
			}
			#newImg{
				
			}
			.hiddenDiv{
				display: none;
			}
		</style>
		<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script>
		<script type="text/javascript">
			var k=0;
			function previewImage(file){
				if(file.files[0].type.indexOf("image")!=0){//如果选择的不是图片 返回
					$(file).val("");
					return false;
				}
				var div = document.getElementById('preview');
				newFile='.'+'myFile'+k;
				k++;
				var newInputFile='myFile'+k;
				$(newFile).after("<input type=file onchange=previewImage(this) id=newImg class=" +newInputFile+ " />");
				if(file.files && file.files[0]){
					var old=$("#preview").html();
					k--;
					var newImg='imghead'+k;
					k++;
					div.innerHTML = old+"<img class=imghead id=" +newImg+ " />";
					var img = document.getElementById(newImg);
					var reader = new FileReader();
					reader.onload = function(evt){img.src = evt.target.result;}
					reader.readAsDataURL(file.files[0]);
				}
			}
			$(function(){
				$("#preview").keyup(function(event){//文本框进行删除操作时判断是否删除了图片
			    	if(event.which==8){
			    		deleteImg();
			    	}
			  });
			})
			function deleteImg(){
				for(i=0;i<k;i++){
					var IMG='#imghead'+i;
					var a=$(IMG).attr("id");
					if(typeof(a)=="undefined"){
						var deleteFile='.myFile'+i;
						$(deleteFile).val("");
						$(deleteFile).remove();
					}
				}
			}
			
			function empty(){
				$(".myFile0").val("");
			}
			
			function selectImg(){
				var selectImg='.myFile'+k;
				$(selectImg).click();
			}
			
			
			function send(){
				if($("#preview").html()==""){//输入内容为空返回
					return false;
				}
				$("#preview").after($("#preview").clone(true).addClass("hiddenDiv"));//克隆需要发送的所有数据
				$(".hiddenDiv").find("img").removeAttr("src");//删除可能存在的图片src
				var txtData=$(".hiddenDiv").html();//截取完的需要发送的文本数据
				$(".hiddenDiv").remove();//回收
				$("#preview").html("");//清空发送框里的所有数据
				//创建FormData对象接收数据
			    var Data = new FormData();
			    //为FormData对象添加数据
			    for(var j=0;j<k;j++){
			       	var theFile='.myFile'+j;
			       	if(typeof($(theFile)[0])!="undefined"){
					    $.each($(theFile)[0].files, function(i, file) {
		          			Data.append('upload_file'+i, file);
		          			$(theFile).remove();
		  				});
			       	}
			    }
			    Data.append("chatMessage",txtData);//加入文本数据
			    Data.append("receiverID","13728738411");//接收人ID
			    Data.append("receiverName","13728738411");//接收人name
			    //发送数据
			    $.ajax({
			        url:'/MVCDemo/upload/fileupload',
			        type:'POST',
			        data:Data,
			        cache: false,
			        contentType: false,        //不可缺参数
			        processData: false,        //不可缺参数
			        success:function(data){
			            if(data){            	
			            	$("div.show").html(data);
			            }
			        },
			        error:function(){
			            alert('ajax失败');
			        }
			    })
			}
		</script>
	</head>
	
	<!--加载时清空input file可能存在的数据-->
	<body onload="empty()">
		<div id=preview contenteditable="true"></div>
		<br/>
		<input type="file" id=newImg class="myFile0" onchange="previewImage(this)" />
		<input type=button value="+++" onclick="selectImg()" />
		<input type="button" value="试试" onclick="send()" />
		<div class="show"></div>
	</body>
</html>