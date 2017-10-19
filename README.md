# VR-Webb-Cluster

A Three.js and WebVR based application to provide an immersive yet lightweight native browser experience of viewing a star cluster from a different galaxy as a part of our own solar system. The application provides for associated functionality to help visualize the cluster along with the earth visible stars and includes toggle features to generate a better understanding of the scenario. The star positions as provided by Enrico Vesperini & Jeremy Webb from the Astronomy school at IU are in the unit of parsecs and have been accurately mapped onto the coordinate system. 
WebVR provides for a native browser immersion and lightweight javascript code which can be used to view the application in a chrome browser on any device platform. 

Tech Used – 

1) Three.js
2) WebVR
3) Reticulum.js
4) Dat.gui


Steps to run -

1) git clone this repository.
2) Navigate to the folder paraview_version. 
3) npm install (which will install any missing or all dependencies need for the application as specified in the node configuration, including grunt)
4) grunt serve (which will launch an instance of the grunt dev server on port 7000 and open the same for viewing in a new browser window - use Google Chrome preferably for a better experience )
5)(optional - if the command specified in step 3 doesn't work) npm install grunt --save-dev(which will install the grunt cli for the application and save it in the application folder heirarchy)

