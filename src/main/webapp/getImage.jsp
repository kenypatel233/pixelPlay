<%@page import="java.sql.Blob"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.io.DataInputStream" %>
<%
String id = request.getParameter("id");

String connectionURL = "jdbc:mysql://localhost:3306/project_pixelPlay";
String user = "root";
String pass = "keny@9180";
 
Connection con = null;
 
try{
    Class.forName("com.mysql.jdbc.Driver");
    con = DriverManager.getConnection(connectionURL, user, pass);
    
    PreparedStatement ps = con.prepareStatement("select * from image_upload where ImageId=?");
    ps.setString(1, id);
    ResultSet rs = ps.executeQuery();
 
    if(rs.next()){
    	
        Blob blob = rs.getBlob("image");
       
	    
        byte byteArray[] = blob.getBytes(1, (int)blob.length());
 
        response.setContentType("image/jpeg");
        ServletOutputStream os = response.getOutputStream();
        
        os.write(byteArray);
        os.flush();
        os.close();
    }
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
%>