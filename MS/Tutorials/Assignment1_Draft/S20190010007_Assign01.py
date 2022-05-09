#Python Program to design a greeting card

# Importing Image and ImageFont, ImageDraw module from PIL package 
from PIL import Image, ImageFont, ImageDraw 
      
# Creating a image object 
inputImg = Image.open("Greeting_Card.gif") 
draw = ImageDraw.Draw(inputImg) 

# Printing the width and height for easy allignment
width,height=inputImg.size
print('-'*17)
print("Image Dimensions")
print('-'*17)
print("Image width =",width)
print("Image height =",height)
 
# Specifiing font sizes
font1 = ImageFont.truetype("font2.otf", 40) 
font2 = ImageFont.truetype("font1.otf", 80)
font3 = ImageFont.truetype("font3.otf", 35)

# Specifing the texts to be written
text1 = "To a Very Special Person"    
text2 = 'HAPPY BIRTHDAY'
text3 = " Wish you many many happy returns of the day! \n I hope your day is filled with lots of love and laughter! \nMay all your dreams and wishes come true!"

# Drawing Text with size,text,colour,fonts and allignment
draw.text((420, 80), text1,fill=(0,0,0),font=font1, align ="center") 
draw.text((320, 200), text2,fill=(255,69,0),font=font2, align ="center") 
draw.text((300, 380), text3,fill=(0,128,128),font=font3, align ="center") 

# Some Alternate rgb colour values that looks good
#11,156,49 
#149,125,188 

# Displaying the Image
inputImg.show() 