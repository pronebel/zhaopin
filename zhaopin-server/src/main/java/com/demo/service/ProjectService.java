package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.ProjectDao;
import com.demo.model.*;

@Service
public class ProjectService {

	@Resource
	private ProjectDao pd;
	
	public List<Project> getProjects(Project e){
		return pd.getProjects(e);
	}
	
	public boolean updateProject(Project e){
		return pd.updateProject(e);
	}
	
	public boolean deleteProject(Project e){
		return pd.deleteProject(e);
	}
	
	public boolean addProject(Project e){
		return pd.addProject(e);
	}
}
