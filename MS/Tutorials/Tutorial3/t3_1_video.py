from numpy import concatenate
from moviepy.editor import *
clip=VideoFileClip("sample-mp4-file.mp4")
clip1=clip.subclip(56,66)
clip2=clip.subclip(70,76)
clip3=clip.subclip(50,52)
clip4=clip.subclip(30,35)
final_clip=concatenate_videoclips([clip1,clip2,clip3,clip4])
final_clip.write_videofile("Output_1.mp4")

#View the clip
# previewing the clip at fps=20

#clip.preview(fps=20)

## Add text to the clip
# Generate a text clip
txt_clip=TextClip("MS Class",fontsize=20,color='black')

# setting position of text in the center and duration will be 10 seconds
txt_clip=txt_clip.set_pos('center').set_duration(10)

#Overlay the text clip on the first video clip
video=CompositeVideoClip([clip,txt_clip])
video.write_videofile("Output_2.mp4")


#clip=VideoFileClip("sample-mp4-file.mp4").subclip(56,66)


## Audio Clips

musicclip = AudioFileClip("Study and Relax.mp3").subclip(0, 6)
audioclip = clip.audio
musicclip = AudioFileClip("Study and Relax.mp3").subclip(0, 6)

audioclip = (clip.audio).fx(afx.volumex, 1.2).fx(afx.audio_fadein, 1.0)

# Make the sound 20% louder, and fade it in over 1 second

clip_v2 = clip.set_audio(audioclip) # new first clip

final_clip = concatenate_videoclips([clip_v2, clip2, clip3, clip4])

final_clip.write_videofile("output_3.mp4")

# saving a frame at 2 second

clip.save_frame("frame2.png", t = 2)

#To traverse through all the frames

# iterating frames

frames = clip.iter_frames()

# counter to count the frames

counter = 0

# using loop to transverse the frames

for value in frames :
    # incrementing the counter
    counter += 1

# printing the value of the counter

print("Counter Value",end=":")
print(counter)