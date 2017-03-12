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

}
