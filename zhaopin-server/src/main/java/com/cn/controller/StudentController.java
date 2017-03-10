package com.cn.controller;

import java.util.Date;
import java.util.List;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.model.Student;
import com.cn.service.StudentService;


/**
 * 学生控制器
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */
@Controller
@RequestMapping("student")
public class StudentController {
	
	@Resource 
	private StudentService studentService;
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		return "index2";
	}
	
	@ResponseBody
	@RequestMapping("/list.json")
	public List<Student> list(HttpServletResponse response,String id){
/*		 response.setContentType( "text/event-stream" );
		 response.setHeader("Cache-Control", "no-cache");
         response.setCharacterEncoding( "UTF-8" );
         PrintWriter writer = response.getWriter();
//       writer.write( "data: " +studentService.list().get(0).getId()+ "\n\n" );
         writer.write("data: "+new Date()+"\n\n");
         writer.flush();
         writer.close();*/
		 System.out.println(id);
         return studentService.list();
	}
	
	/*public Map<String,Object> edit(String name){
		//TODO
		return null;
	}*/
	@ResponseBody
	@RequestMapping(value={"edit.json"},method=RequestMethod.POST)
	public Student edit(HttpServletRequest request){
		Long id=Long.parseLong(request.getParameter("models[0][id]"));
		String name=request.getParameter("models[0][name]");
		String gender=request.getParameter("models[0][gender]");
		Student stu=new Student(id,name,new Date(),gender,id);
		studentService.edit(stu);
		return stu;
	}
	@ResponseBody
	@RequestMapping(value={"delete.json"},method=RequestMethod.POST)
	/*public Map<String,Object> delete(){
		//TODO
		
		return null;
	}*/
	public Student delete(HttpServletRequest request){
		Long id=Long.parseLong(request.getParameter("models[0][id]"));
		Student stu=new Student(id);
		studentService.delete(stu);
		return stu;
	}
	
}
