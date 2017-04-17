package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.*;


@Repository
public class InterviewDao extends BaseDao<Interview>{

	@Override
	public Class<Interview> getEntityClass() {
		// TODO Auto-generated method stub
		return Interview.class;
	}
	
	public int getUnReadLength(String seeker_id){
		String sm=getIbatisMapperNamespace()+".getUnReadLength";
		return getSqlSessionTemplate().selectOne(sm, seeker_id);
	}
	
	public List<Interview> getUnRead(Interview i){
		String sm=getIbatisMapperNamespace()+".getUnRead";
		return getSqlSessionTemplate().selectList(sm, i);
	}
	
	public Interview getInterviewById(Long id){
		String sm=getIbatisMapperNamespace()+".getInterviewById";
		return getSqlSessionTemplate().selectOne(sm, id);
	}
	
	public boolean setRead(Long id){
		String sm=getIbatisMapperNamespace()+".setRead";
		return getSqlSessionTemplate().update(sm, id)==1?true:false;
	}
	
	public boolean comment(Long id){
		String sm=getIbatisMapperNamespace()+".comment";
		return getSqlSessionTemplate().update(sm,id)==1?true:false;
	}
}
