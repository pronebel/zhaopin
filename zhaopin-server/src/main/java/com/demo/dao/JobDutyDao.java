package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.JobDuty;

@Repository
public class JobDutyDao extends BaseDao<JobDuty> {
	@Override
	public Class<JobDuty> getEntityClass() {
		// TODO Auto-generated method stub
		return JobDuty.class;
	}
	public List<JobDuty> getJobDuty(Long job_id){
		String sm=getIbatisMapperNamespace()+".getJobDuty";
		List<JobDuty> jobduty=getSqlSessionTemplate().selectList(sm, job_id);
		return jobduty;
	}
}
