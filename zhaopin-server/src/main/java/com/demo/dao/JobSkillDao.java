package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.JobSkill;

@Repository
public class JobSkillDao extends BaseDao<JobSkill> {
	@Override
	public Class<JobSkill> getEntityClass() {
		// TODO Auto-generated method stub
		return JobSkill.class;
	}
	public List<JobSkill> getJobSkill(Long job_id){
		String sm=getIbatisMapperNamespace()+".getJobSkill";
		return getSqlSessionTemplate().selectList(sm, job_id);
	}
}
