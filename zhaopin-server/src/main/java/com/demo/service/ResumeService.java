package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.ResumeDao;
import com.demo.model.Resume;

@Service
public class ResumeService {

	@Resource
	private ResumeDao rd;
	
	public List<Resume> getResumesName(Resume r){
		return rd.getResumesName(r);		
	}
	
	public Resume getResumeById(Resume r){
		return rd.getResumeById(r);
	}
	
	public boolean updateResume(Resume r){
		return rd.updateResumeName(r);
	}
	
	public boolean addNewResume(Resume r){
		return rd.addNewResume(r);
	}
	
	public boolean deleteResume(Resume r){
		return rd.deleteResume(r);
	}
	
	public Resume getNewestResumeName(Resume r){
		return rd.getNewestResumeName(r);
	}
	
	public boolean updateSelfAssessment(Resume r){
		return rd.updateSelfAssessment(r);
	}
	
	public boolean updateHope(Resume r){
		return rd.updateHope(r);
	}
}
