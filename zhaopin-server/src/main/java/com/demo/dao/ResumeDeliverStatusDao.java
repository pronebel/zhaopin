package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.*;


@Repository
public class ResumeDeliverStatusDao extends BaseDao<ResumeDeliverStatus>{

	@Override
	public Class<ResumeDeliverStatus> getEntityClass() {
		// TODO Auto-generated method stub
		return ResumeDeliverStatus.class;
	}
	
	public int getUnReadLength(String seeker_id){
		String sm=getIbatisMapperNamespace()+".getUnReadLength";
		return getSqlSessionTemplate().selectOne(sm, seeker_id);
	}
	
	public List<ResumeDeliverStatus> getUnRead(ResumeDeliverStatus rds){
		String sm=getIbatisMapperNamespace()+".getUnRead";
		return getSqlSessionTemplate().selectList(sm, rds);
	}
}
