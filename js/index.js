
var canvas, maxWidth, maxHeight, orignalImg, blurImg, grayImg, rainbowImg, customImg, img, redImg, meanval;


function getImage() {
	// alert("reached");
	canvas = document.getElementById('can1');
	img = document.getElementById('img');
	orignalImg = new SimpleImage(img);
	redImg = blurImg = grayImg = rainbowImg = customImg =  new SimpleImage(img);

	orignalImg.drawTo(canvas);
	
	// var totalWidth = orignalImg.getWidth();
	// var totalHeight = orignalImg.getHeight();
	// alert('taotal width and height is '+totalWidth +" x " +totalHeight);

}


function resettingImg() {
	
	setDimension(orignalImg);

	if(orignalImg == null || (!orignalImg.complete())) {
    	alert('please select image or wait for it to upload');
  }	else {
		var context = canvas.getContext('2d');
		console.log('max width andheight '+maxWidth +"------"+maxHeight);
		context.clearRect(0, 0, maxWidth, maxHeight);
		// canvas.style.backgroundColor = 'black';
		orignalImg.drawTo(canvas);

		var canvas2 = document.getElementById('can2');
		var img2 = document.getElementById('img');
		otherImg = new SimpleImage(img2);
		otherImg.drawTo(canvas2);
		
		redImg = grayImg = rainbowImg = customImg = blurImg = null;
		// resetImg = grayImg = rainbowImg = customImg = orignalImg;
		redImg = grayImg = rainbowImg = customImg = blurImg = new SimpleImage(img);
	}
}


function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}


function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}



function doBlur() {
	if(blurImg == null || (!blurImg.complete())) {
    	alert('please select image or wait for it to upload');
  	}	else {

  		setDimension(blurImg);
  		var outputImg = new SimpleImage(blurImg.getWidth(),blurImg.getHeight());
  		var xVal,yVal;
  		for (var pixel of blurImg.values()) {
  			xVal = pixel.getX();
  			yVal = pixel.getY();
  			if(Math.random() > 0.3) {
  				var other = getPixelNearby(blurImg,xVal,yVal,15);
  				outputImg.setPixel(xVal,yVal,other);
  			} else {
  				outputImg.setPixel(xVal,yVal,pixel);
  			}
		}
		outputImg.drawTo(canvas);
  	}
}



function customFilter() {
	if(customImg == null || (!customImg.complete())) {
    	alert('please select image or wait for it to upload');
  	} else {
		setDimension(customImg);

		var outputImg = new SimpleImage(blurImg.getWidth(),blurImg.getHeight());
  		var xVal,yVal;
  		var minValx= Math.round(maxWidth  * 0.10);
		var minValy = Math.round(maxHeight * 0.10);
		var midValx = Math.round(maxWidth * 0.5);
		var midValy = Math.round(maxHeight * 0.5);
		var maxValx = Math.round(maxWidth * 0.90);
		var maxValy = Math.round(maxHeight * 0.90);
		console.log(minValx +"---"+minValy);
		console.log(midValx +"---"+midValy);
		var loopVal = -1;
		var loopRec = 0;

  		for (var pixel of customImg.values()) {
  			xVal = pixel.getX();
  			yVal = pixel.getY();
  				
  			if((xVal >= minValx && xVal <= maxValx) && (yVal >= minValy && yVal <=maxValy)) {
  				if(xVal >= (midValx - Math.round(0.75 * loopVal)) && xVal <= (midValx + Math.round(0.75 * loopVal))  ) {
	  				outputImg.setPixel(xVal,yVal,pixel);
				} else {
	  			  	if(Math.random() > 0.3) {
	  				var other = getPixelNearby(customImg,xVal,yVal,15);
		  				outputImg.setPixel(xVal,yVal,other);
		  			} else {
		  				// pixel.setRed(255);
		  				// pixel.setGreen(255);
		  				// pixel.setBlue(0);
		  				outputImg.setPixel(xVal,yVal,pixel);
		  			}
  				}
				if(xVal == maxValx ) {
					loopVal++;
				}
  			} else {

  			  	if(Math.random() > 0.3) {
  				var other = getPixelNearby(customImg,xVal,yVal,15);
	  				outputImg.setPixel(xVal,yVal,other);
	  			} else {
	  				// pixel.setRed(255);
	  				// pixel.setGreen(0);
	  				// pixel.setBlue(0);
	  				outputImg.setPixel(xVal,yVal,pixel);
	  			}
  			}
		}
	outputImg.drawTo(canvas);   
 	}
}


function setDimension(image) {

	maxWidth = image.getWidth();
	maxHeight = image.getHeight();
	document.getElementById('img-size').textContent = 'Size : '+maxWidth+" x "+maxHeight;
	// console.log(maxWidth + "-------------" + maxHeight);

}

function doRainbow() {
	// alert('reached');
	if(rainbowImg == null || (!rainbowImg.complete())) {
    	alert('please select image or wait for it to upload');
  }	else {
  		setDimension(rainbowImg);
		for (var pixel of rainbowImg.values()) {
			var redClr = pixel.getRed();
			var greenClr = pixel.getGreen();
			var blueClr = pixel.getBlue();
			meanval = ((pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3);
			if(pixel.getY() >= 0 && pixel.getY() < (rainbowImg.getHeight() * 0.143)) { //red
				 if(meanval < 128) {
				 	pixel.setRed(meanval * 2);
				 	pixel.setGreen(0);
				    pixel.setBlue(0);	
				 } else {
				 	pixel.setRed(255);
			     	pixel.setGreen((2 * meanval) - 255);
				    pixel.setBlue((2 * meanval) - 255);
				 }	
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.143 && (pixel.getY() < rainbowImg.getHeight() * 0.286)) { //orange
				 if(meanval < 128) {
				 	pixel.setRed(meanval * 2);
				 	pixel.setGreen(meanval * 0.8);
				    pixel.setBlue(0);	
				 } else {
				 	pixel.setRed(255);
			     	pixel.setGreen((1.2 * meanval) - 51);
				    pixel.setBlue((2 * meanval) - 255);
				 }	
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.286 && (pixel.getY() < rainbowImg.getHeight() * 0.429)) { //yellow
			 	if(meanval < 128) {
				 	pixel.setRed(meanval * 2);
				 	pixel.setGreen(meanval * 2);
				    pixel.setBlue(0);	
			 	} else {
				 	pixel.setRed(255);
			     	pixel.setGreen(255);
				    pixel.setBlue((2 * meanval) - 255);
			 	}	
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.429 && (pixel.getY() < rainbowImg.getHeight() * 0.572)) { //green
				if(meanval < 128) {
				 	pixel.setRed(0);
				 	pixel.setGreen(meanval * 2);
				    pixel.setBlue(0);	
				 } else {
				 	pixel.setRed((2 * meanval) - 255);
			     	pixel.setGreen(255);
				    pixel.setBlue((2 * meanval) - 255);
				 }	
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.572 && (pixel.getY() < rainbowImg.getHeight() * 0.715)) { //blue
				if(meanval < 128) {
				 	pixel.setRed(0);
				 	pixel.setGreen(0);
				    pixel.setBlue(meanval * 2);	
				 } else {
				 	pixel.setRed((2 * meanval) - 255);
			     	pixel.setGreen((2 * meanval) - 255);
				    pixel.setBlue(255);
				 }
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.715 && (pixel.getY() < rainbowImg.getHeight() * 0.858)) { //indego
				if(meanval < 128) {
				 	pixel.setRed(meanval * 0.8);
				 	pixel.setGreen(0);
				    pixel.setBlue(meanval * 2);	
				 } else {
				 	pixel.setRed((1.2 * meanval) - 51);
			     	pixel.setGreen((2 * meanval) - 255);
				    pixel.setBlue(255);
				 }
			} else if (pixel.getY() >= rainbowImg.getHeight() * 0.715 && (pixel.getY() <= rainbowImg.getHeight() )) { //violet
				if(meanval < 128) {
				 	pixel.setRed(meanval * 1.6);
				 	pixel.setGreen(0);
				    pixel.setBlue(meanval * 1.6);	
				 } else {
				 	pixel.setRed((0.4 * meanval) + 153);
			     	pixel.setGreen((2 * meanval) - 255);
				    pixel.setBlue((0.4 * meanval) + 153);
				 }
			} 

		}
	rainbowImg.drawTo(canvas);
	}
}

function doGray() {
	if(grayImg == null || (!grayImg.complete())) {
    	alert('please select image or wait for it to upload');
  }	else {
  		setDimension(grayImg);
		for (var pixel of grayImg.values()) {
			 var meanval = ((pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3);
		    pixel.setRed(meanval);
		    pixel.setGreen(meanval);
		    pixel.setBlue(meanval);
		}
	grayImg.drawTo(canvas);
	}
}


function doRed() {

	if(redImg == null || (!redImg.complete())) {
    	alert('please select image or wait for it to upload');
  }	else {
  		setDimension(redImg);

		for(var pixel of redImg.values()) {
			 var meanval = ((pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3);
			 // console.log(meanval);
			 if(meanval < 128) {
			 	pixel.setRed(meanval * 2);
			 	pixel.setGreen(0);
			    pixel.setBlue(0);	
			 } else {
			 	pixel.setRed(255);
			    pixel.setGreen((2 * meanval) - 255);
			    pixel.setBlue((2 * meanval) - 255);
			 }
		}
		redImg.drawTo(canvas);
	}
}

