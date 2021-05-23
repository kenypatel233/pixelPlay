<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.io.*,java.awt.image.*,java.awt.*,javax.imageio.*" %>
    <%@ page import="com.pixelplay.BlurEffect" %>
    <%@page import="java.util.Base64"%> 
<!DOCTYPE html>
<html>
<head>

<meta charset="ISO-8859-1">
<title>Blur Result</title>
<style>
.original{border:5px solid #0D1137 ; margin:10%; padding:10%; text-align:center ;}
.blur{border:5px solid #0D1137; margin:10%; padding:10%; text-align:center;}
</style>

</head>

<body>
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

<h2 style="text-align:center; color: #E52165">Original</h2>


<div class="original">
<img src="data:image/jpg;base64,<%=ob64 %>" alt="origin" />
</div>

<br>
<h2 style="text-align:center; color: #E52165">Blur Effect</h2>
<div class="blur">
<img src="data:image/jpg;base64,<%=b64 %>" alt="image" id="myimg"/>

<a href=data:image/jpg;base64,<%=b64 %> download="pixelPlay.jpg"><button>Download</button></a>
</div>








</body> 
</html>