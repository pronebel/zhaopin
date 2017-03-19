package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.CompanyDao;
import com.demo.model.*;

@Service
public class CompanyService {

	@Resource
	private CompanyDao id;
	
	public List<Company> getCompanys(Company i){
		return id.getCompanys(i);
	}
	
	public boolean updateCompany(Company i){
		return id.updateCompany(i);
	}
	
	public boolean deleteCompany(Company i){
		return id.deleteCompany(i);
	}
	
	public boolean addCompany(Company i){
		return id.addCompany(i);
	}
}
