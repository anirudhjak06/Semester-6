import pyglet
"""
#code-1

width=500
height=500

title="My first animation"
window=pyglet.window.Window(width,height,title)
pyglet.gl.glClearColor(0.5,0.5,0.5,1)

text="Welcome to the world of animation"

label=pyglet.text.Label(text,
                        font_name='Cooper',
                        font_size=16,
                        x=250,
                        y=150,
                        anchor_x='center',
                        anchor_y='center')
image=pyglet.image.load('image.gif')

carsprite=pyglet.sprite.Sprite(image,x=200,y=200)

@window.event
def on_draw():
    window.clear()
    label.draw()
    carsprite.draw()
pyglet.app.run()
"""
#code-2

window=pyglet.window.Window(200,200)

s0=pyglet.resource.image('car.jpg')
s1=pyglet.resource.image("car2.jpg")
images=[s0,s1]

anim=pyglet.image.Animation.from_image_sequence(images,0.5,True)
sprite=pyglet.sprite.Sprite(anim)
@window.event
def on_draw():
    window.clear()
    sprite.draw()
pyglet.app.run()