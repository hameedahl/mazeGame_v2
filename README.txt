Hameedah Lawal and Stephanie Kim
hameedah.lawal@tufts.edu and stephanie.kim640944@tufts.edu

ASSIGNMENT NONWIMP2

CHANGES AND FINAL DESIGN
------------------

- Originally, we had planned to use WebGazer.js such that the player controlled 
  the ball's movement (everything from speed, direction, position, etc) 
  with their eye. 
- However, a limitation of WebGazer.js is how inaccurate and finicky it can 
  be, so the final implementation of the game had to be changed so that eye 
  movements only controlled the direction, rather than all aspects of the 
  ball's movement. The distance the ball moves in 
  the eye's guided direction is bounded by the walls of the maze. 


USER INSTRUCTIONS
------------------

- To run the game, open "homepage.html". This will take you to the 
  game's homepage. 
- Click "Start Game". This will bring you to the game's Instructions page. 
  (These instructions are also written in How To Play section) 
- Click "Continue". This will bring you to a calibration page, which has 
  instructions to calibrate the curser and your eye. 
- Once, calibrated, the game will start. 


HOW TO PLAY
------------------

- Get the ball out of the maze by controlling the ball's direction with 
 the movement of your eye. 
    - To move the ball up, look at the top center of your screen
    - To move the ball down, look at the bottom center of your screen
    - To move the ball right, look at the rightmost center of your screen
    - To move the ball left, look at the leftmost center of your screen. 
- You can toggle eye tracking on and off by pressing the space bar
- You can also use the arrow keys to control the ball if you get stuck. 


COMMENTS ON USER INTERFACE
------------------

- Above the actual maze is a state panel that holds the player's 
game information, such as the time elapsed, how many moves they are using, 
and whether or not the user calibrated the WebGazer. This panel also 
contains a reset button for the player to restart the game at any point. 
- What is good about this UI design is that the game has controls that can be
toggled via keys rather than as widgets that may clutter the visual interface.
All key toggles can be used at any time within the game. 


AGGREGATION HIERARCHY

Main - Model - Ball - Maze

- Main Class is from WebGazer.js that we modified to contain our Model 
- Model Class holds information about the timer and the number of moves played. 
- Ball Class holds the balls x and y coordinates, functionality relating to 
the ball's movement, and functionality handling collisions with the maze. 
- Maze Class holds the drawMaze function which can draw different mazes onto 
the canvas. 

- Main interacts with Model to start the timer.
- Ball interacts with Maze to handle maze wall collisions.
- Ball interacts with Model to increment the number of moves made. 

FILES
------------------
maze8.png         : maze image for game
mazeGameStyle.css : style sheet for the below html pages
homePage.html     : maze game homepage; takes you to instructions.html
instructions.html : maze game instructions; takes you to calibration.html
Model.js          : Model class to holds the variables and functions 
                    that maintain the game loop and game data
Ball.js           : Ball class to hold functions that handle all ball movement 
                    and ball data; to be used my Model
Maze.js           : Maze class; to be used by Model


MODIFIED FILES FROM WEBGAZER
----------------------------
calibration.html : added html elements to display maze and  win pop up screen
calibrations.js  : added a call to startMazeGame() so game starts after 
                   calibration is completed
main.js          : added a call to trackEye() to get data from eyetracking