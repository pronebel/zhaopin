package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.Seeker;


@Repository
public class SeekerDao extends BaseDao<Seeker>{

	@Override
	public Class<Seeker> getEntityClass() {
		// TODO Auto-generated method stub
		return Seeker.class;
	}
	
	public void newSeeker(Seeker s){
		String sn=getIbatisMapperNamespace() + ".selectFromOpenid";
		if(getSqlSessionTemplate().selectOne(sn, s)==null){
			sn=getIbatisMapperNamespace() + ".newSeeker";
			getSqlSessionTemplate().insert(sn, s);
			System.out.println("插入成功");
		}
	}
	
	public Seeker getUserInfo(Seeker s){
		String sn=getIbatisMapperNamespace() + ".selectFromOpenid";
		return getSqlSessionTemplate().selectOne(sn, s);
	}
	
	public boolean updateSeeker(Seeker s){
		String sn=getIbatisMapperNamespace() + ".updateSeeker";
		return getSqlSessionTemplate().update(sn, s)==1?true : false;
	}
	
	public boolean updateAvatar(Seeker s){
		String sn=getIbatisMapperNamespace() + ".updateAvatar";
		return getSqlSessionTemplate().update(sn, s)==1?true : false;
	}
}
