package com.cn.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.StudentDao;
import com.cn.model.Student;

/**
 * Student Service
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */
@Service
public class StudentService {

	@Resource
	private  StudentDao studentDao;
	
	public List<Student> list(){
		return studentDao.list();
	}
	public void edit(Student stu){
		if(studentDao.selectById(stu)){
			studentDao.insert(stu);
		}else{
			studentDao.update(stu);
		}
	}
	public void delete(Student stu){
		studentDao.delete(stu);
	}
	
}
