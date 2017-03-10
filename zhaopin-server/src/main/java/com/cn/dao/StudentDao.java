package com.cn.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.model.Student;

/**
 * 
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */

@Repository
public class StudentDao extends BaseDao<Student>{

	/**
	 * 获取所有学生信息
	 * 
	 * @author Cloud Lau
	 * @return
	 */
	public List<Student> list(){
		String statementName = getIbatisMapperNamespace() + ".list";
		return getSqlSessionTemplate().selectList(statementName, null);
	}

	@Override
	public Class<Student> getEntityClass() {
		// TODO Auto-generated method stub
		return Student.class;
	}
	
	public void insert(Student stu){
		String statementName = getIbatisMapperNamespace() + ".insert";
		getSqlSessionTemplate().insert(statementName, stu);
	}
	
	public void update(Student stu){
		String statementName = getIbatisMapperNamespace() + ".update";
		getSqlSessionTemplate().update(statementName, stu);
	}
	
	public boolean selectById(Student stu){
		String statementName = getIbatisMapperNamespace() + ".selectById";
		if(getSqlSessionTemplate().selectList(statementName, stu).isEmpty()){
			return true;
		}else{
			return false;
		}
	}
	
	public void delete(Student stu){
		String statementName = getIbatisMapperNamespace() + ".delete";
		getSqlSessionTemplate().delete(statementName, stu);
	}

}
