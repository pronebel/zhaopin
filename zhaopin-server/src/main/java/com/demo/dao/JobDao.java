package com.demo.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.demo.model.*;

import net.sf.json.JSON;

@Repository
public class JobDao extends BaseDao<Job>{

	@Override
	public Class<Job> getEntityClass() {
		// TODO Auto-generated method stub
		return Job.class;
	}

	public List<String> getSearchRecommand(JSON json){
		String sn=getIbatisMapperNamespace()+".getSearchRecommand";
		return getSqlSessionTemplate().selectList(sn, json);
	}
	
	public List<Job> getIndexSearch(String key){
		String sn=getIbatisMapperNamespace()+".getIndexSearch";
		return getSqlSessionTemplate().selectList(sn,key);
	}
	
	public List<Job> searchJob(JSON json,int startIndex,int limitCount){
		String sn=getIbatisMapperNamespace()+".searchJob";
		RowBounds rb=new RowBounds(startIndex,limitCount);
		return getSqlSessionTemplate().selectList(sn, json, rb);
	}
}
