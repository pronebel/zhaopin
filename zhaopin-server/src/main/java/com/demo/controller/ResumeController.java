package com.demo.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

@Controller
@RequestMapping("resume")
public class ResumeController {
	@Resource
	private ResumeService rs;	
	@Resource
	private LoginController lc;
	@Resource
	private EducationService es;
	@Resource
	private IntershipService is;
	@Resource
	private ProjectService ps;
	@Resource
	private HonorService hs;
	@Resource
	private HopeService hhs;
	@ResponseBody
	@RequestMapping("/getResume")
	public Resume getResume(long id,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		r=rs.getResumeById(r);
		Education e=new Education();
		e.setResume_id(id);
		r.setEducations(es.getEducations(e));
		Intership i=new Intership();
		i.setResume_id(id);
		r.setInterships(is.getInterships(i));
		Project p=new Project();
		p.setResume_id(id);
		r.setProjects(ps.getProjects(p));
		Honor h=new Honor();
		h.setResume_id(id);
		r.setHonors(hs.getHonors(h));
		Hope hh=new Hope();
		hh.setResume_id(id);
		r.setHope(hhs.getHope(hh));
		return r;
	}
	
	@ResponseBody
	@RequestMapping("/getResumesName")
	public List<Resume> getResumesName(String openid){
		Resume r=new Resume();
		r.setSeeker_id(openid);
		return rs.getResumesName(r);
	}
	
	/**
	 * 新增简历  
	 * @param thirdSessionKey
	 * @param req
	 * @return 返回简历id
	 */
	@ResponseBody
	@RequestMapping("/addResume")
	public Resume addResume(String openid,String name,HttpServletRequest req){
		Resume r=new Resume();
		r.setSeeker_id(openid);
		r.setName(name);
		if(rs.addNewResume(r)){
			return rs.getNewestResumeName(r);
		}
		return null;
	}
	
	@ResponseBody
	@RequestMapping("/changeResumeName")
	public boolean changeResumeName(Long id,String name,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		r.setName(name);
		return rs.updateResume(r);
	}
	
	@ResponseBody
	@RequestMapping("/deleteResume")
	public boolean deleteResume(Long id,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		es.deleteEducations(id);
		is.deleteInterships(id);
		hs.deleteHonors(id);
		ps.deleteProjects(id);
		hhs.deleteHope(id);
		return rs.deleteResume(r);
	}
	
	@ResponseBody
	@RequestMapping("/updateSelfAssessment")
	public boolean updateSelfAssessment(String selfAssessment,Long id){
		Resume r=new Resume();
		r.setId(id);
		r.setSelfAssessment(selfAssessment);
		return rs.updateSelfAssessment(r);
	}
	
	@ResponseBody
	@RequestMapping("/test")
	public void test(String id,HttpServletRequest req){
		System.out.println(req.getSession().getId());
		System.out.println(id);
	}
}
