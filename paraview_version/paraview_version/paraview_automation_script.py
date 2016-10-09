from paraview.simple import *

######################## +X direction #####################################
camera=GetActiveCamera()
camera.SetFocalPoint(1,0,0)
camera.SetPosition(0,0,0)
camera.SetViewUp(0,1,0)
camera.SetViewAngle(90)
print camera
Render()
SaveScreenshot('C:\\X.jpg')
######################## -X direction #####################################
'''
camera=GetActiveCamera()
camera.SetFocalPoint(1,0,0)
camera.SetPosition(0,0,0)
camera.SetViewUp(0,1,0)
camera.SetViewAngle(90)
print camera
Render()
SaveScreenshot('C:\\\+X.jpg') '''


######################## +Y direction #####################################
'''
camera=GetActiveCamera()
camera.SetFocalPoint(1,0,0)
camera.SetPosition(0,0,0)
camera.SetViewUp(0,1,0)
camera.SetViewAngle(90)
print camera
Render()
SaveScreenshot('C:\\\+X.jpg') '''

################### -Y direction ############################################
'''
camera=GetActiveCamera()
camera.SetFocalPoint(1,0,0)
camera.SetPosition(0,0,0)
camera.SetViewUp(0,1,0)
camera.SetViewAngle(90)
print camera
Render()
SaveScreenshot('C:\\\+X.jpg') '''

#################### +Z direction ##########################################
'''
camera=GetActiveCamera()
camera.SetFocalPoint(1,0,0)
camera.SetPosition(0,0,0)
camera.SetViewUp(0,1,0)
camera.SetViewAngle(90)
print camera
Render()
SaveScreenshot('C:\\\+X.jpg') '''

##################
