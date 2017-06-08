# 基于微信小程序的招聘系统

一个基于微信小程序的招聘系统，包括职位模块、简历模块、用户模块、消息模块等。

1. 职位模块涵盖职位推荐、职位搜索、职位过滤、详情浏览、职位收藏、职位投递等功能

2. 消息模块涵盖简历状态、职位邀请、面试邀约、消息反馈、邮件提醒、面试评价等功能

3. 简历模块包括简历创建、简历编辑、简历删除等功能

4. 用户模块包括用户设置、用户信息、收藏等功能

采用技术有：es6+小程序框架+Spring+SpringMVC+Mybatis

### 使用方法

打开小程序开发工具 导入项目zhaopin-user 需要设置appid 可到公众号平台申请

修改/zhaopin-user/configs/serverConfig.js 里的服务器端设置


安装jdk，项目采用1.8

安装mysql服务，可从官网下载

安装tomcat，项目采用tomcat7，可从官网下载

安装J2EE版本的eclipse

将db/mysql/init.sql导入mysql

将项目导入(import)eclipse开发工具

在eclipse中配置tomcat

修改src/main/resources/conf/app.properties 中的数据库连接信息

运行tomcat


### 部分截图

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_190443.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_190606.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_190640.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_190733.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_190828.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_191034.jpg)

![](https://github.com/linrui1994/zhaopin/tree/master/zhaopin-user/screenshot/20170303_191300.jpg)