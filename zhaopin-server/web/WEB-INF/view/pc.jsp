<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <c:set var="ctx" value="${pageContext.request.contextPath}" />
        <!DOCTYPE html>
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>Insert title here</title>
            <!-- 引入样式 -->
			<link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
			<!-- 引入组件库 -->
			<script src="${ctx }/resources/js/vue.js"></script>
			<script src="//unpkg.com/iview@1.0.1/dist/iview.min.js"></script>
            <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
            <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">           
            <script src="${ctx }/resources/js/jquery-2.1.4.min.js"></script>
            <style>
            .table>tbody>tr>td,
            .table>tbody>tr>th,
            .table>tfoot>tr>td,
            .table>tfoot>tr>th,
            .table>thead>tr>td,
            .table>thead>tr>th {
                vertical-align: inherit;
            }
            </style>
        </head>

        <body id='app' style='padding: 15px'>
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <td>
                            时间
                        </td>
                        <td>
                            职位
                        </td>
                        <td>
                            求职者
                        </td>
                        <td>
                            状态
                        </td>
                        <td>
                            操作
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(index,item) in resumes'>
                        <td>
                            {{item.deliver_date_time}}
                        </td>
                        <td>
                            id:{{item.job_id}} name:{{item.job.name}}
                        </td>
                        <td>
                            {{item.seeker.name}}
                        </td>
                        <td>
                            {{item.status}}
                        </td>
                        <td class='input'>
                            <button v-if='item.status=="未查看"' class="btn btn-primary" @click='setResumeStatusRead(item)'>设为已读</button>
                            <button v-if='item.status=="未查看"||item.status=="待沟通"' class="btn btn-primary" @click='invicate(item)'>邀请面试</button>
                            <button v-if='item.status=="未查看" || item.status=="待沟通"' class="btn btn-primary" @click='reject(item)'>不合适</button>
                            <button class='btn btn-primary' @click='job_invicate(item)'>发起职位邀请</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        <script type="text/javascript">
        function formatTime(date) {
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()

            var hour = date.getHours()
            var minute = date.getMinutes()
            var second = date.getSeconds()


            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        }

        function formatNumber(n) {
            n = n.toString();
            return n[1] ? n : '0' + n
        }
        var apis = {
            getAll: 'pc/getAll',
            setResumeStatusRead: 'pc/setResumeStatusRead',
            invicate: 'pc/invicate',
            reject: 'pc/reject',
            job_invicate:'pc/job_invicate',
            upload:'pc/resume'
        }
        var vm = new Vue({
            el: '#app',
            data: {
                resumes: []
            },
            created: function() {
                var _this = this;
                $.ajax({
                    url: apis.getAll,
                    success: function(res) {
                        console.log(res);
                        _this.resumes = res;
                    }
                })
            },
            methods: {
                upload:function(){
                    var Data=new FormData();//创建FormData对象接收数据
                    Data.append('file',$("#file")[0].files[0]);
                    console.log($('#file')[0].files[0])
                    $.ajax({
                        url:apis.upload,
                        data:Data,
                        type:'POST',
                        contentType: false,        //不可缺参数
                        processData: false,       //不可缺参数
                        success:function(res){
                            console.log(res);
                        }
                    })
                },
                setResumeStatusRead: function(item) {
                	var _this = this;
					$.ajax({
						url:apis.setResumeStatusRead,
						data:{
							id:item.id,
							read_date_time:formatTime(new Date()),
							seeker_id:item.seeker_id,
							email:item.seeker.email
						},
						type:'get',
						success:function(res){
							if(res==true){
								item.status='待沟通';
								_this.$Message.success('操作成功',2);
							}else{
								_this.$Message.error('操作失败',2);
							}
						}
					})
                },
                invicate: function(item) {
                	var _this = this;
					$.ajax({
						url:apis.invicate,
						data:{
							id:item.id,
							interview_date_time:formatTime(new Date()),
							seeker_id:item.seeker_id,
							job_id:item.job_id,
							email:item.seeker.email
						},
						success:function(res){
							if(res){
								item.status='面试',
								_this.$Message.success('操作成功',2);
							}else{
								_this.$Message.error('操作失败',2);
							}
						}
					})
                },
                reject: function(item) {
                	var _this = this;
					$.ajax({
						url:apis.reject,
						data:{
							id:item.id,
							reject_date_time:formatTime(new Date()),
							seeker_id:item.seeker_id,
							email:item.seeker.email
						},
						success:function(res){
							if(res){
								item.status='不合适',
								_this.$Message.success('操作成功',2);
							}else{
								_this.$Message.error('操作失败',2);
							}
						}
					})
                },
                job_invicate:function(item){
                	var _this = this;
					$.ajax({
						url:apis.job_invicate,
						data:{
							job_id:item.job_id,
							seeker_id:item.seeker_id,
							invicate_date_time:formatTime(new Date()),
							hr_id:'openidhr',
							email:item.seeker.email
						},
						success:function(res){
							if(res){
								_this.$Message.success('邀请成功',2);
							}else{
								_this.$Message.error('邀请失败',2);
							}
						}
					})
                }
            }
        })
        </script>

        </html>
