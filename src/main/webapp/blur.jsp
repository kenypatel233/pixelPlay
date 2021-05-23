<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="java.util.Base64"%>    
<%@ page import="com.pixelplay.DarkChannelPriorDehazing" %>
<%@ page import="com.pixelplay.Filter" %>
<%@ page import="java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.io.*" %>
<%@ page import="org.opencv.core.*" %>

<%@ page import=" org.opencv.imgcodecs.*,
 org.opencv.imgproc.*" %>
<%@ page import="com.pixelplay.DarkChannelPriorDehazing" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Dehaze Effect</title>
</head>
<body>
<% 

String path="";
path=(String)(request.getAttribute(path));
 final double krnlRatio = 0.01; // set kernel ratio
 final double eps = 0.000001;
 DarkChannelPriorDehazing d ;
//File f = new File(path);
//BufferedImage b_in = ImageIO.read(f);
Mat image = Imgcodecs.imread(path, Imgcodecs.IMREAD_COLOR);
double minAtmosLight = 240.0; // set minimum atmospheric light
Mat outval = d.darkChannelDehazing(path, krnlRatio, minAtmosLight, eps);
BufferedImage bufImage = null;
int type = BufferedImage.TYPE_BYTE_GRAY;
if (outval.channels() > 1) {
	type = BufferedImage.TYPE_3BYTE_BGR;
}
int bufferSize = outval.channels() * outval.cols() * outval.rows();
byte[] b = new byte[bufferSize];
outval.get(0, 0, b); // get all the pixels
bufImage = new BufferedImage(outval.cols(), outval.rows(), type);
final byte[] targetPixels = ((DataBufferByte) bufImage.getRaster().getDataBuffer()).getData();
System.arraycopy(b, 0, targetPixels, 0, b.length);
ByteArrayOutputStream output = new ByteArrayOutputStream();
ImageIO.write(bufImage, "jpg", output);
String b64 = Base64.getEncoder().encodeToString(output.toByteArray());



%>
<img src="data:image/jpg;base64,<%=b64 %>" alt="image" />

</body>
</html>