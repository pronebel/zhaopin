package com.demo.dao;

import org.springframework.stereotype.Repository;

import com.demo.model.Config;

@Repository
public class ConfigDao extends BaseDao<Config>{
	
	@Override
	public Class<Config> getEntityClass() {
		// TODO Auto-generated method stub
		return Config.class;
	}
	
	public void addConfig(Config c){
		String sn=getIbatisMapperNamespace() + ".addConfig";
		getSqlSessionTemplate().insert(sn, c);
	}
	
	public boolean updateConfig(Config c){
		String sn=getIbatisMapperNamespace() + ".updateConfig";
		return getSqlSessionTemplate().update(sn, c)==1?true:false;
	}
	
	public Config getConfig(Config c){
		String sn=getIbatisMapperNamespace() + ".getConfig";
		return getSqlSessionTemplate().selectOne(sn, c);
	}
}
