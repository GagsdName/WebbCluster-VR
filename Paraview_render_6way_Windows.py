from paraview.simple import *

camera=GetActiveCamera()
view = GetActiveView() 


camera.SetViewAngle(90.0)
view.UseOffscreenRenderingForScreenshots = 0
#view.ViewSize=[512,512]
view.ViewSize=[1024, 1024]
# view.ViewSize=[496,475]
# (512 x 512) kept rendering at 

#back
#for Octree fractal: x:-1.75 to 0.75, y: -1.25 to 1.25, z: 0 to 2
#camera.SetPosition(-0.5, 0, 1)
#camera.SetFocalPoint(-0.5, 0, 0)
#for sphere
camera.SetFocalPoint(0,0,-1)
camera.SetPosition(0,0,0)

camera.SetViewUp(0, 1, 0)

#back of cube
#Render()
#SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_back.jpg', magnification=1)
#WriteImage('C:\Users\AVL\Desktop\ParaView_test\pic.png')
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_back.png')

#left
camera.Yaw(90)
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_left.png')

#front
camera.Yaw(90)
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_front.png')

#right
camera.Yaw(90)
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_right.png')

#top
camera.Yaw(90)
#camera.Pitch(90)
camera.SetFocalPoint(0,1,0)
camera.SetViewUp(0, 0, 1)
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_top.png')

#bottom
#camera.Pitch(-180)
camera.SetFocalPoint(0,-1,0)
camera.SetViewUp(0, 0, -1)
SaveScreenshot('C:\Users\AVL\Desktop\ParaView_test\pic_bottom.png')