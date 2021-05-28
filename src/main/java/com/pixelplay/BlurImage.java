package com.pixelplay;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import com.pixelplay.BlurEffect;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import javax.imageio.*;

@MultipartConfig(fileSizeThreshold = 1024 * 1024,
maxFileSize = 1024 * 1024 * 5, 
maxRequestSize = 1024 * 1024 * 5 * 5)
@WebServlet("/BlurImage")
public class BlurImage extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String UPLOAD_DIRECTORY="temp";
		String uploadPath = getServletContext().getRealPath("") + File.separator + UPLOAD_DIRECTORY;
		String fileName="";
		File uploadDir = new File(uploadPath);
		if (!uploadDir.exists()) uploadDir.mkdir();
		for (Part part : request.getParts()) {
		    fileName = part.getSubmittedFileName();
		    part.write(uploadPath + File.separator + fileName);
		}
		String path=uploadPath + File.separator + fileName;
		//response.getWriter().print(fileName+"uploaded! "+uploadPath+File.separator+fileName);
		request.setAttribute("path",uploadPath+File.separator+fileName );
		getServletContext().getRequestDispatcher("/blurr.jsp").forward(request, response);
		//doGet(request,response);
	}
	
}

