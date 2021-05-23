<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.io.*,java.awt.image.*,java.awt.*,javax.imageio.*" %>
    <%@ page import="com.pixelplay.BlurEffect" %>
    <%@page import="java.util.Base64"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>


<%

File f = new File((String) request.getAttribute("path"));
BufferedImage b_in = ImageIO.read(f);
BlurEffect blur = new BlurEffect(5,b_in);
BufferedImage op = blur.getBluredImg();
ByteArrayOutputStream output = new ByteArrayOutputStream();
ImageIO.write(op, "jpg", output);
String b64 = Base64.getEncoder().encodeToString(output.toByteArray());
ByteArrayOutputStream o = new ByteArrayOutputStream();
ImageIO.write(b_in,"jpg",o);
String ob64 = Base64.getEncoder().encodeToString(o.toByteArray());

%>
<p>Original</p>
<img src="data:image/jpg;base64,<%=ob64 %>" alt="origin" />
<br>
<p>Blur Image</p>
<img src="data:image/jpg;base64,<%=b64 %>" alt="image" />
<button> Download </button>
<body>

</body>
</html>