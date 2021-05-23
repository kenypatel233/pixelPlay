package com.pixelplay;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import com.pixelplay.Filter;

@WebServlet("/dehaze")
public class DarkChannelPriorDehazing extends HttpServlet{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	static {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
	}
	

	public static final double krnlRatio = 0.01; // set kernel ratio
	public static final double eps = 0.000001;
	public static Mat darkChannelDehazing(String imgPath, double krnlRatio, double minAtmosLight, double eps) {
		Mat image = Imgcodecs.imread(imgPath, Imgcodecs.IMREAD_COLOR);
		image.convertTo(image, CvType.CV_32F);
		// extract each color channel
		List<Mat> rgb = new ArrayList<Mat>();
		Core.split(image, rgb);
		Mat rChannel = rgb.get(0);
		Mat gChannel = rgb.get(1);
		Mat bChannel = rgb.get(2);
		int rows = rChannel.rows();
		int cols = rChannel.cols();
		// derive the dark channel from original image
		Mat dc = rChannel.clone();
		for (int i = 0; i < image.rows(); i++) {
			for (int j = 0; j < image.cols(); j++) {
				double min = Math.min(rChannel.get(i, j)[0], Math.min(gChannel.get(i, j)[0], bChannel.get(i, j)[0]));
				dc.put(i, j, min);
			}
		}
		// minimum filter
		int krnlSz = Double.valueOf(Math.max(Math.max(rows * krnlRatio, cols * krnlRatio), 3.0)).intValue();
		Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(krnlSz, krnlSz), new Point(-1, -1));
		Imgproc.erode(dc, dc, kernel);
		// get coarse transmission map
		Mat t = dc.clone();
		Core.subtract(t, new Scalar(255.0), t);
		Core.multiply(t, new Scalar(-1.0), t);
		Core.divide(t, new Scalar(255.0), t);
		// obtain gray scale image
		Mat gray = new Mat();
		Imgproc.cvtColor(image, gray, Imgproc.COLOR_RGB2GRAY);
		Core.divide(gray, new Scalar(255.0), gray);
		// refine transmission map
		int r = krnlSz * 4;
		t = Filter.GuidedImageFilter(gray, t, r, eps);
		// get minimum atmospheric light
		minAtmosLight = Math.min(minAtmosLight, Core.minMaxLoc(dc).maxVal);
		// dehaze each color channel
		rChannel = dehaze(rChannel, t, minAtmosLight);
		gChannel = dehaze(gChannel, t, minAtmosLight);
		bChannel = dehaze(bChannel, t, minAtmosLight);
		// merge three color channels to a image
		Mat outval = new Mat();
		Core.merge(new ArrayList<Mat>(Arrays.asList(rChannel, gChannel, bChannel)), outval);
		outval.convertTo(outval, CvType.CV_8UC1);
		return outval;
	}

	public static Mat dehaze(Mat channel, Mat t, double minAtmosLight) {
		Mat t_ = new Mat();
		Core.subtract(t, new Scalar(1.0), t_);
		Core.multiply(t_, new Scalar(-1.0 * minAtmosLight), t_);
		Core.subtract(channel, t_, channel);
		Core.divide(channel, t, channel);
		return channel;
	}
	
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException, ServletException
	{
		String path="";
		path=(String)(request.getAttribute(path));
		 
		 DarkChannelPriorDehazing d ;
		//File f = new File(path);
		//BufferedImage b_in = ImageIO.read(f);
		Mat image = Imgcodecs.imread(path, Imgcodecs.IMREAD_COLOR);
		double minAtmosLight = 240.0; // set minimum atmospheric light
		Mat outval = darkChannelDehazing(path, krnlRatio, minAtmosLight, eps);
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
		request.setAttribute("url", b64);
		getServletContext().getRequestDispatcher("/dehazeResult.jsp").forward(request, response);
	}

}
