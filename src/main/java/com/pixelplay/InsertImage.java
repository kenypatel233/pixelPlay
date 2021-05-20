package com.pixelplay;


import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

 
@WebServlet("/insertImage")
@MultipartConfig(maxFileSize = 16177216)
public class InsertImage extends HttpServlet {
	 	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		static int ID;
		@Override
		protected void doPost(HttpServletRequest req, HttpServletResponse resp)
				throws ServletException, IOException {
			String connectionURL = "jdbc:mysql://localhost:3306/project_pixelPlay";
			String user = "root";
			String pass = "keny@9180";
			resp.getWriter().print("inside post");
			int result = 0;
			
			Part part = req.getPart("imageInput");
			if(part==null) {resp.getWriter().print("nullpart");}
				
			Connection con=null;
			if(part != null){
				try{
					Class.forName("com.mysql.cj.jdbc.Driver");					
				     con = (Connection) DriverManager.getConnection(connectionURL, user, pass);
				    if(con==null) {resp.getWriter().print("null con");}
				     
				    
				    PreparedStatement ps = (PreparedStatement) con.prepareStatement("insert into image_upload(Image) values(?)");
				    InputStream is = part.getInputStream();
				    
				    resp.getWriter().print("inside try");
				    
				    ps.setBlob(1, is);
				    result = ps.executeUpdate();
				}
				catch(Exception e){
					e.printStackTrace();
				}	
				finally{
					if(con != null){
						try{
							con.close();
						}
						catch(Exception e){
							e.printStackTrace();
						}
					}
				}
			}
			String msg;
			if(result > 0){
		    	msg="Image Uploaded";
		    }
			else{
				msg =" Some Error Occurred";
			}
			resp.setContentType("text/plain");
			resp.getWriter().print(msg);
			
			
		}
	

}

	