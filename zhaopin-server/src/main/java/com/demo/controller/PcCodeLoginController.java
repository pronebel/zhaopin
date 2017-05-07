package com.demo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;
import com.demo.util.*;

import org.json.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.json.JSONException;  

@Controller
@RequestMapping("pc")
public class PcCodeLoginController {
	
	@Resource
	private ResumeDeliverStatusService rdss;	
	@Resource
	private InterviewService is;
	@Resource
	private JobInvicationService jis;
	@Resource
	private ConfigService cs;
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		System.out.println("访问pc");
		return "pc";
	}
	
	@ResponseBody
	@RequestMapping("/getCode")
	public String getCode(HttpServletRequest request,HttpServletResponse response) throws JSONException{		
		//生成唯一ID
		int uuid = (int) (Math.random() * 100000);
		//二维码内容
		JSONObject json=new JSONObject();
		json.put("uid","uid"+uuid);
		json.put("action", "pc");
		System.out.println(json);
		String content = "123";
		//生成二维码
		String imgName =  uuid + "_" + (int) (new Date().getTime() / 1000) + ".png";
		String imgPath = request.getServletContext().getRealPath("/")+"resources/pc/QrCode/" + imgName;
		TwoDimensionCode handler = new TwoDimensionCode();
		handler.encoderQRCode(content, imgPath, "png",null);
		System.out.println(" request.getServerName()"+ request.getServerName());
		System.out.println("httpRequest.getContextPath()"+request.getContextPath());
		System.out.println("httpRequest.getServletPath()"+request.getServletPath());
		//生成的图片访问地址
		String qrCodeImg = request.getContextPath()+"/resources/pc/QrCode/" + imgName;
		String jsonStr = "{\"uuid\":" + uuid + ",\"qrCodeImg\":\"" + qrCodeImg + "\"}";
	//	JavaMail.sendTxtMail("zwill招聘消息通知","您投递的简历已经被企业查看，快去看看吧!","670390939@qq.com",5);
		return jsonStr;
	}
	
	@ResponseBody
	@RequestMapping("/getAll")
	public List<ResumeDeliverStatus> getAll(){		
		return rdss.getAll();
	}
	
	@ResponseBody
	@RequestMapping("/setResumeStatusRead")
	public boolean setResumeStatusRead(Long id,String read_date_time,String seeker_id,String email) throws JSONException, IOException{
		ResumeDeliverStatus rds=new ResumeDeliverStatus();
		rds.setId(id);
		rds.setRead_date_time(read_date_time);
        //websocket的json结构 0 1 2
		if(rdss.setResumeStatusRead(rds)){
			System.out.println(1);
			JSONObject json=new JSONObject();
			json.put("action", 0);
			WebSocket.send(seeker_id,json.toString());
			Config c=new Config();
			c.setSeeker_id(seeker_id);
			c=cs.getConfig(c);
			if(c.isEmail_accept_open()){
				if(!email.equals("")){
					JavaMail.sendTxtMail("zwill招聘消息通知","您投递的简历已经被企业查看，快去看看吧!",email,5);
				}
			}
			return true;
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping("/invicate")
	public boolean invicate(Long id,String interview_date_time,String seeker_id,Long job_id,String email) throws IOException, JSONException{
		ResumeDeliverStatus rds=new ResumeDeliverStatus();
		rds.setId(id);
		rds.setInterview_date_time(interview_date_time);
		Interview i=new Interview();
		i.setSeeker_id(seeker_id);
		i.setJob_id(job_id);
		i.setInterview_date_time("2017-04-26 14:00");
		i.setI_address("深圳市南山区软件基地A栋207号");
		i.setOther("可乘坐地铁到桃园站");
		if(rdss.invicate(rds)){
			if(is.insertNewInterview(i)){
				JSONObject json=new JSONObject();
				json.put("action", 0);
				WebSocket.send(seeker_id,json.toString());
				JSONObject json2=new JSONObject();
				json2.put("action", 2);
				WebSocket.send(seeker_id,json2.toString());
				System.out.println(seeker_id);
				Config c=new Config();
				c.setSeeker_id(seeker_id);
				c=cs.getConfig(c);
				if(c.isEmail_accept_open()){
					if(!email.equals("")){
						JavaMail.sendTxtMail("zwill招聘消息通知","您投递的简历已经被企业认可，他们对您发起了面试邀请，快去看看吧!",email,5);
					}
				}
				return true;
			}
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping("/reject")
	public boolean reject(Long id,String reject_date_time,String seeker_id,String email) throws IOException, JSONException{
		ResumeDeliverStatus rds=new ResumeDeliverStatus();
		rds.setId(id);
		rds.setReject_date_time(reject_date_time);
		if(rdss.reject(rds)){
			JSONObject json=new JSONObject();
			json.put("action", 0);
			WebSocket.send(seeker_id,json.toString());
			Config c=new Config();
			c.setSeeker_id(seeker_id);
			c=cs.getConfig(c);
			if(c.isEmail_accept_open()){
				if(!email.equals("")){
					JavaMail.sendTxtMail("zwill招聘消息通知","很遗憾，您的简历被企业标记为不合适。",email,5);
				}
			}
			return true;
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping("/job_invicate")
	public boolean job_invicate(Long job_id,String seeker_id,String invicate_date_time,String hr_id,String email) throws IOException, JSONException{
		JobInvication ji=new JobInvication();
		ji.setJob_id(job_id);
		ji.setSeeker_id(seeker_id);
		ji.setInvicate_date_time(invicate_date_time);
		ji.setHr_id(hr_id);
		ji.setDescription("这是一封邀请函，我们真诚地邀请您，如果您接受这份邀请函，我们会再安排您的具体面试时间，期待您的加入，让我们一起共同发展！");
		if(jis.job_invicate(ji)){
			JSONObject json=new JSONObject();
			json.put("action", 1);
			WebSocket.send(seeker_id,json.toString());
			Config c=new Config();
			c.setSeeker_id(seeker_id);
			c=cs.getConfig(c);
			if(c.isEmail_accept_open()){
				if(!email.equals("")){
					JavaMail.sendTxtMail("zwill招聘消息通知","有企业对您有兴趣，向您发起了职位邀请，快去看看吧!",email,5);
				}
			}
			return true;
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping("/resume")
	public String avator(HttpServletRequest request) throws IOException, FileUploadException{
		DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("UTF-8"); 
        List<FileItem> list = upload.parseRequest(request);
        for(FileItem item : list){
            if(item.isFormField()){
            }else{
                InputStream in = item.getInputStream();
                WordExtractor ex = new WordExtractor(in);
                String text = ex.getText();
                return text;
            }
        }
        return "null";
	}

}