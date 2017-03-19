package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.*;


@Repository
public class CompanyDao extends BaseDao<Company>{

	@Override
	public Class<Company> getEntityClass() {
		// TODO Auto-generated method stub
		return Company.class;
	}
	
	public List<Company> getCompanys(Company c){
		String sn=getIbatisMapperNamespace() + ".getCompanys";
		return getSqlSessionTemplate().selectList(sn, c);
	}
	
	public boolean updateCompany(Company e){
		String sn=getIbatisMapperNamespace() + ".updateCompany";
		return getSqlSessionTemplate().update(sn, e)==1?true:false;
	}
	
	public boolean deleteCompany(Company c){
		String sn=getIbatisMapperNamespace() + ".deleteCompany";
		return getSqlSessionTemplate().delete(sn, c)==1?true:false;
	}
	
	public boolean addCompany(Company c){
		String sn=getIbatisMapperNamespace() + ".addCompany";
		return getSqlSessionTemplate().insert(sn, c)==1?true:false;
	}
}
