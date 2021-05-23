package com.pixelplay;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import com.pixelplay.Filter;

public class DarkChannelPriorDehazing {
	
	public String pathhhh;
	static {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
	}
	public DarkChannelPriorDehazing(String image)
	{
		pathhhh=image;
		
	}

	public static final double krnlRatio = 0.01; // set kernel ratio
	public static final double eps = 0.000001;
	public Mat darkChannelDehazing(String imgPath, double krnlRatio, double minAtmosLight, double eps) {
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

}
