package com.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.demo.model.Resume;


@Repository
public class ResumeDao extends BaseDao<Resume>{

	@Override
	public Class<Resume> getEntityClass() {
		// TODO Auto-generated method stub
		return Resume.class;
	}
	
	public List<Resume> getResumesName(Resume r){
		String sn=getIbatisMapperNamespace() + ".getResumesName";
		return getSqlSessionTemplate().selectList(sn, r);
	}
	
	public Resume getResumeById(Resume r){
		String sn=getIbatisMapperNamespace() + ".getResumeById";
		return getSqlSessionTemplate().selectOne(sn, r);
	}
	
	public boolean updateResumeName(Resume r){
		String sn=getIbatisMapperNamespace() + ".updateResumeName";
		return getSqlSessionTemplate().update(sn, r)==1?true:false;
	}
	
	public boolean addNewResume(Resume r){
		String sn=getIbatisMapperNamespace() + ".addNewResume";
		return getSqlSessionTemplate().insert(sn, r)==1?true:false;
	}
	
	public boolean deleteResume(Resume r){
		String sn=getIbatisMapperNamespace() + ".deleteResume";
		return getSqlSessionTemplate().delete(sn, r)==1?true:false;
	}
	
	public Resume getNewestResumeName(Resume r){
		String sn=getIbatisMapperNamespace() + ".getNewestResumeName";
		return getSqlSessionTemplate().selectOne(sn, r);
	}
}
