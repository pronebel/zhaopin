package com.demo.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.demo.model.*;

import net.sf.json.JSON;

@Repository
public class JobDao extends BaseDao<Job>{
	
	@Resource
	private JobDutyDao jdd;
	@Resource
	private JobSkillDao jsd;
	@Resource
	private CampusTalkDao ctd;
	@Resource
	private HrDao hd;
	@Override
	public Class<Job> getEntityClass() {
		// TODO Auto-generated method stub
		return Job.class;
	}

	public List<String> getSearchRecommand(JSON json){
		String sn=getIbatisMapperNamespace()+".getSearchRecommand";
		List<String> jl=getSqlSessionTemplate().selectList(sn, json);
		sn=getIbatisMapperNamespace()+".getSearchRecommandCompany";
		List<String> cl=getSqlSessionTemplate().selectList(sn,json);
		for(int i=0;i<cl.size();i++){
			jl.add(cl.get(i));
		}
		return jl;
	}
	
	public List<Job> getIndexSearch(JSON json,int startIndex,int limitCount){
		String sn=getIbatisMapperNamespace()+".getIndexSearch";
		RowBounds rb=new RowBounds(startIndex,limitCount);
		return getSqlSessionTemplate().selectList(sn,json,rb);
	}
	
	public List<Job> searchJob(JSON json,int startIndex,int limitCount){
		String sn=getIbatisMapperNamespace()+".searchJob";
		RowBounds rb=new RowBounds(startIndex,limitCount);
		return getSqlSessionTemplate().selectList(sn, json, rb);
	}
	
	public Job getJobDetailById(Long id){
		String sn=getIbatisMapperNamespace()+".getJobDetailById";
		Job j= getSqlSessionTemplate().selectOne(sn,id);
		System.out.println("id:"+id);
		System.out.println(j);
		Hr h=new Hr();
		h.setOpenid(j.getHr_id());
		j.setHr(hd.getUserInfo(h));
		j.setJobduty(jdd.getJobDuty(id));
		j.setJobskill(jsd.getJobSkill(id));
		j.setCampustalk(ctd.getCampusTalk(id));
		return j;
	}
}
