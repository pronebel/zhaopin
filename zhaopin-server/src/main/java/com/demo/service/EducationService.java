package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.EducationDao;
import com.demo.model.*;

@Service
public class EducationService {

	@Resource
	private EducationDao ed;
	
	public List<Education> getEducations(Education e){
		return ed.getEducations(e);
	}
	
	public boolean updateEducation(Education e){
		return ed.updateEducation(e);
	}
	
	public boolean deleteEducation(Education e){
		return ed.deleteEducation(e);
	}
	
	public boolean addEducation(Education e){
		return ed.addEducation(e);
	}
	
	public void deleteEducations(Long resume_id){
		ed.deleteEducations(resume_id);
	}
}
