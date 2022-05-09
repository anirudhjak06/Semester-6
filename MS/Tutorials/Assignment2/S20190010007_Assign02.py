# Code By Anirudh Jakhotia

# Assignment - 2 
# To create a bouncing ball animation using pyglet. 
# To save animation file and attach the animation as well as python file while submitting the assignment.

#Required Imports
from pyglet.gl import *
import random
import pyglet
from pyglet.window import key

#Ball Image
B_IMG = 'sampleBall.png'

#Ball Class
class Ball(pyglet.sprite.Sprite):
    #Taking Ball Image as Input
    ball_image = pyglet.resource.image(B_IMG)
    #Specifying Height and Width of the Image
    width = ball_image.width
    height = ball_image.height

    #Constructors
    def __init__(self):
        x = random.random() * (window.width - self.width)
        y = random.random() * (window.height - self.height)

        #Calling the super class
        super(Ball, self).__init__(self.ball_image, x, y, batch=balls_batch)

        self.dx = 350
        self.dy = 200

    #Update the Width and Height of the ball
    def update(self, dt):
        if self.x <= 0 or self.x + self.width >= window.width:
            self.dx *= -1
           
        if self.y <= 0 or self.y + self.height >= window.height:
            self.dy *= -1
            
        self.x += self.dx * dt
        self.y += self.dy * dt

        self.x = min(max(self.x, 0), window.width - self.width)
        self.y = min(max(self.y, 0), window.height - self.height)

#CReating a PYglet Window
window = pyglet.window.Window(740, 480)

#Overriding the window Event on key Press
@window.event
def on_key_press(symbol, modifiers):
    if symbol == key.SPACE:
        balls.append(Ball())
    elif symbol == key.BACKSPACE:
        if balls:
            del balls[-1]
    elif symbol == key.ESCAPE:
        window.has_exit = True

#Overrding the default on_draw
@window.event
def on_draw():
    window.clear()
    balls_batch.draw()
    label.draw()

#Method to Yodate the Ball
def update(dt):
    for ball in balls:
        ball.update(dt)
pyglet.clock.schedule_interval(update, 1/30.)

#Method to Animate the Ball
balls_batch = pyglet.graphics.Batch()
balls = []
label = pyglet.text.Label('Press space to Add a ball and Press Backspace to Remove',
                          font_size=14,
                          x=window.width // 2, y=10, 
                          anchor_x='center')

#Main Function
if __name__ == '__main__':
    pyglet.app.run()
