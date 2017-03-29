package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.CampusTalk;

@Repository
public class CampusTalkDao extends BaseDao<CampusTalk> {
	@Override
	public Class<CampusTalk> getEntityClass() {
		// TODO Auto-generated method stub
		return CampusTalk.class;
	}
	public List<CampusTalk> getCampusTalk(Long job_id){
		String sm=getIbatisMapperNamespace()+".getCampusTalk";
		return getSqlSessionTemplate().selectList(sm, job_id);
	}
}
