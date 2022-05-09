from PIL import Image,ImageDraw
import numpy as np
inputImage=Image.open("lena_colour.jfif")
#inputImage.show()

width,height=inputImage.size
print("image width=",width)
print("image height=",height)

pixel_val=list(inputImage.getdata())

pixels=np.array(inputImage.getdata()).reshape(width,height,3)
print(pixels[0,2])
print(pixel_val[1])
coordinate=x, y=1,1
print(inputImage.getpixel(coordinate))

im_gray=inputImage.convert("L")
#im_gray.show()

im_cmyk=inputImage.convert("CMYK")
#im_cmyk.show()
#print(inputImage.getpixel(coordinate))
print(im_cmyk.getpixel(coordinate))

# txt="not really a fancy text"
# size=(150,50)
# color=(0,100,0)
# img=Image.new("RGB",size,color)
# imgDrawer=ImageDraw.Draw(img)
# imgDrawer.text((5,20),txt)

txt="not really a fancy text"
imgDrawer=ImageDraw.Draw(inputImage)
imgDrawer.text((5,30),txt)
inputImage.show()




