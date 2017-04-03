package com.demo.dao;

import org.springframework.stereotype.Repository;

import com.demo.model.*;


@Repository
public class HopeDao extends BaseDao<Hope>{

	@Override
	public Class<Hope> getEntityClass() {
		// TODO Auto-generated method stub
		return Hope.class;
	}
	
	public Hope getHope(Hope h){
		String sn=getIbatisMapperNamespace() + ".getHope";
		return getSqlSessionTemplate().selectOne(sn, h);
	}
	
	public boolean updateHope(Hope h){
		String sn=getIbatisMapperNamespace() + ".updateHope";
		return getSqlSessionTemplate().update(sn, h)==1?true:false;
	}
	
	public boolean newHope(Hope h){
		String sn=getIbatisMapperNamespace() + ".newHope";
		return getSqlSessionTemplate().insert(sn, h)==1?true:false;
	}
	
	public void deleteHope(Long resume_id){
		String sm=getIbatisMapperNamespace()+".deleteHope";
		getSqlSessionTemplate().delete(sm, resume_id);
	}
}
