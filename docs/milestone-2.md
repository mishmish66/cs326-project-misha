# Milestone 2
## Data Interactions
- Can add motor entries with data about the motor and a name
- Can sort by any of the tracked data
- Can delete motors from the list
- Can look at a dynamic graph of motors listed power vs their price
- Can edit existing entries in the list
## Code Overview
The code is structured into a few singletons which are initialized and then can be brought into the scope of a file. These are Graph_Manager, Modal_Manager, Motor_Data, and Table_Manager. Each of these is responsible for abstracting and dealing containing a part of the functionality of the app, and by all working together they made it easier for me to develop the app without having to think about everything all at the same time. Also now I will only have to modify the Motor_Data.js file when I have to convert it to use a server.
## Video
https://www.youtube.com/watch?v=KITKFPlykmg