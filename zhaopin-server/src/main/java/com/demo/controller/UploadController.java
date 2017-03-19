package com.demo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.controller.SeekerController;
import com.demo.model.*;
import com.demo.service.*;
import com.demo.util.HttpRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.RandomStringUtils;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("upload")
public class UploadController {
	@Resource
	private SeekerService ss;
	@Resource
	private LoginController lc;

	@ResponseBody
	@RequestMapping("/avatar")
	public String avator(HttpServletRequest request) throws IOException, FileUploadException{
		DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("UTF-8"); 
        List<FileItem> list = upload.parseRequest(request);
        String thirdSessionKey="";
        String saveName="avatar";
        for(FileItem item : list){
            if(item.isFormField()){
            	String name = item.getFieldName();
                String value = item.getString("UTF-8");
                request.setAttribute(name,value);//保存文本信息
            }else{
    			String uuidrandom = UUID.randomUUID().toString();
    	        String savePath=request.getSession().getServletContext().getRealPath("/");
    	        savePath=savePath+"resources\\avatars";
    	        File file = new File(savePath);
    	        if (!file.exists() && !file.isDirectory()) {
    		        //创建目录
    		        file.mkdirs();
    		    }
            	String filename = item.getName();
                if(filename==null || filename.trim().equals("")){
                	continue;
                }	                                   
                filename = uuidrandom+filename.substring(filename.lastIndexOf("."));
                saveName=saveName+"-"+filename;
                InputStream in = item.getInputStream();
                FileOutputStream out = new FileOutputStream(savePath + "\\" + saveName);
                savePath=savePath+"\\"+file;
                byte buffer[] = new byte[1024];
                int len = 0;
                while((len=in.read(buffer))>0){
                    out.write(buffer, 0, len);
                }
                in.close();
                out.close();
                //删除处理文件上传时生成的临时文件
                item.delete();
            }
        }
        Seeker s=new Seeker();
        thirdSessionKey=request.getAttribute("thirdSessionKey").toString();
        s.setOpenid(lc.getOpenid(thirdSessionKey, request));
        String url="http://localhost:8080/zhaopin/resources/avatars/"+saveName;
        s.setAvatarUrl(url);
        if(ss.updateAvatar(s)){
        	return url;
        }else{
        	return "false";
        }
	}

}
