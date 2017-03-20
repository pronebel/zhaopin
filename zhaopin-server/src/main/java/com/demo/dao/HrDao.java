package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.Hr;


@Repository
public class HrDao extends BaseDao<Hr>{

	@Override
	public Class<Hr> getEntityClass() {
		// TODO Auto-generated method stub
		return Hr.class;
	}
	
	public void newHr(Hr sk){
		String sn=getIbatisMapperNamespace() + ".selectFromOpenid";
		if(getSqlSessionTemplate().selectOne(sn, sk)==null){
			sn=getIbatisMapperNamespace() + ".newHr";
			getSqlSessionTemplate().insert(sn, sk);
			System.out.println("插入成功");
		}
	}
	
	public Hr getUserInfo(Hr s){
		String sn=getIbatisMapperNamespace() + ".selectFromOpenid";
		return getSqlSessionTemplate().selectOne(sn, s);
	}
	
	public boolean updateHr(Hr s){
		String sn=getIbatisMapperNamespace() + ".updateHr";
		return getSqlSessionTemplate().update(sn, s)==1?true : false;
	}
	
	public boolean updateAvatar(Hr s){
		String sn=getIbatisMapperNamespace() + ".updateAvatar";
		return getSqlSessionTemplate().update(sn, s)==1?true : false;
	}

}
