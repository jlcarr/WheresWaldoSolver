// Solving Hidden Object Puzzles with OpenCV's template matching

cv_canvas = null;
template_canvas = null;

window.addEventListener("DOMContentLoaded", initialize, false);

function initialize(){
	// Initial setup
	document.getElementById('file-input')
		.addEventListener('change', readFile, false);
	document.getElementById('file-input-template')
		.addEventListener('change', readFile, false);

	cv_canvas = document.getElementById("cv-canvas");
	template_canvas = document.getElementById("template-canvas");
}

function onOpenCvReady() {
	document.getElementById("loading").innerHTML = "Done loading OpenCV";
	
	outlineColor = new cv.Scalar(255, 255, 255, 255);
	tintColor = new cv.Scalar(0, 0, 0, 255);
	clearColor = new cv.Scalar(0, 0, 0, 0);
}

function readFile(fileSelectEvent) {
	var file = fileSelectEvent.target.files[0];
	if (!file) return;
	
	var canvas = cv_canvas;
	if (fileSelectEvent.target.id == "file-input-template")
		canvas = template_canvas;
	
	var reader = new FileReader();
	reader.onload = (fileLoadEvent) => loadImage(fileLoadEvent.target.result, canvas);
	reader.readAsDataURL(file);
}


function loadImage(imgData, canvas) {
	img = new Image();
	img.onload = (imageLoadEvent) => drawImageCanvas(imageLoadEvent.target, canvas);
	img.src = imgData;
}

function drawImageCanvas(imageElement, canvas){
	canvas.width = imageElement.width;
	canvas.height = imageElement.height;
	ctx = canvas.getContext("2d");
	ctx.drawImage(imageElement, 0, 0);
}


function loadDemo(){
	loadImage("WheresWaldo_scene.jpg", cv_canvas);
	loadImage("Waldo_opaque.png", template_canvas);
}


function findButton(){
	document.getElementById("loading").innerHTML = "Processing...";
	findHidden();
	document.getElementById("loading").innerHTML = "Done!";
}

function findHidden(){
	if (typeof cv === 'undefined') alert("Error: OpenCV is still loading. Please wait.");
	let src = cv.imread('cv-canvas');
	let dst = new cv.Mat();
	// You can try more different parameters
	//let rect = new cv.Rect(100, 100, 200, 200);
	//dst = src.roi(rect);
	//cv.imshow('cv-canvas', dst);
	
	let template = cv.imread('template-canvas');
	cv.matchTemplate(src, template, dst, cv.TM_CCOEFF);
	
	let result = cv.minMaxLoc(dst);
	let maxPoint = result.maxLoc;
	let maxRect = new cv.Rect(maxPoint.x, maxPoint.y, template.cols, template.rows);
	let oppositePoint = new cv.Point(maxPoint.x + template.cols, maxPoint.y + template.rows);
	
	let resultImg = src.roi(maxRect).clone();
	
	
	let black = new cv.Mat(src.rows, src.cols, src.type(), tintColor);
    cv.addWeighted(src, 0.5, black, 0.5, 0.0, src);
    resultImg.copyTo(src.roi(maxRect));
	
	cv.rectangle(src, maxPoint, oppositePoint, outlineColor, 2, cv.LINE_8, 0);
	//cv.rectangle(src, maxPoint, point, tintColor, cv.FILLED, cv.LINE_8, 0);
	cv.imshow('cv-canvas', src);
	
	//cv.imshow('cv-canvas', dst);
	
	src.delete();
	dst.delete();
	template.delete();
	black.delete();
	resultImg.delete();
}
