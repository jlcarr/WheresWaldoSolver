# WheresWaldoSolver
An OpenCV.js project to solve hidden object puzzles in the browser using template matching.

Try it online [here](https://jcarr.ca/WheresWaldoSolver).

## Description
This project uses OpenCV's `matchTemplate` function to quickly find a template subimage in a source image, then highlight the results.  
This is done in the browser using OpenCV's precompiled JS bindings.  

### Mathematical Description
Similarity can be measured by a convolutional kernal operation between the images: think of it as a sliding "dot product" (generally dotted over color channels) between the images to measure their similarity at each possible overlap position.
Defined mathematically as:

![\sigma(x,y)=\sum_{i,j}K\left(S(x+i,y+j),T(x,y)\right)](https://render.githubusercontent.com/render/math?math=%5Csigma%28x%2Cy%29%3D%5Csum_%7Bi%2Cj%7DK%5Cleft%28S%28x%2Bi%2Cy%2Bj%29%2CT%28x%2Cy%29%5Cright%29)

Where:
- ![\sigma(x,y)](https://render.githubusercontent.com/render/math?math=%5Csigma%28x%2Cy%29) is the similarity score
- ![K(S,T)](https://render.githubusercontent.com/render/math?math=K%28S%2CT%29) is the kernal function
- ![S(x,y)](https://render.githubusercontent.com/render/math?math=S%28x%2Cy%29) is the pixel value of the source image at pixel position `x,y` (either as a color vector, or greyscale scalar)
- ![T(x,y)](https://render.githubusercontent.com/render/math?math=T%28x%2Cy%29) is the pixel value of the template image at pixel position `x,y` (either as a color vector, or greyscale scalar)

These similarity scores can either be measure of the amount of "overlap" or the amount of "error", and so the respective maximum or minimum coordinates in the source image can be found, as well as that of runner-ups.
A particularly good choice is the similarity function is the cross-covariance, which subtracts off the mean from each pixel value to make the mean zero (whereas most images formats' pixels are defined in terms of positive integers).  
Defined mathematically as:

![K\left(S(x+i,y+j),T(x,y)\right)=\left(S(x+i,y+j)-\mu_{S}\right)\cdot\left(T(x,y)-\mu_{T}\right)](https://render.githubusercontent.com/render/math?math=K%5Cleft%28S%28x%2Bi%2Cy%2Bj%29%2CT%28x%2Cy%29%5Cright%29%3D%5Cleft%28S%28x%2Bi%2Cy%2Bj%29-%5Cmu_%7BS%7D%5Cright%29%5Ccdot%5Cleft%28T%28x%2Cy%29-%5Cmu_%7BT%7D%5Cright%29)

## References
- https://en.wikipedia.org/wiki/Template_matching
- https://docs.opencv.org/3.4/df/dfb/group__imgproc__object.html
- https://docs.opencv.org/3.4/d8/dd1/tutorial_js_template_matching.html
- https://en.wikipedia.org/wiki/Cross-correlation
