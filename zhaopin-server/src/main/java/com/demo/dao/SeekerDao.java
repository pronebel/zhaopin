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
	
	public void newSeeker(Seeker sk){
		String sn=getIbatisMapperNamespace() + ".selectFromOpenid";
		if(getSqlSessionTemplate().selectOne(sn, sk)==null){
			sn=getIbatisMapperNamespace() + ".newSeeker";
			getSqlSessionTemplate().insert(sn, sk);
			System.out.println("插入成功");
		}
	}

}
