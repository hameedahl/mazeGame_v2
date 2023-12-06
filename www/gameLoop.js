var time;
var score = 0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mazeImg = document.getElementById('maze');
var ballImg = document.getElementById('ball');
var velocityX = 15.0;
var velocityY = 2;
var gravity = 0.5;  // or 1
var bounce = 0.7; 
var xFriction = 0.1;
var isTracking = true;
var moves = 0
var ball = { x: 330,  // or canvas.width / 2
             y: 10, 
             radius: 6, 
             color: "#EF6E50"
           };
var timeElem = document.getElementById('time')
var moveElem = document.getElementById('moves')
var mazeColor = '#293229'
var start = [0,0]
var end = [0,0]
var startMinutes = 0
var time = startMinutes * 60
var timer, game;
var mazeCount = 4
var mazeId = Math.floor(Math.random() * mazeCount); /* randomize maze */


/* button listeners */
// document.getElementById("reset").onclick = resetGame
// document.getElementById("sameMaze").onclick = resetGame
// document.getElementById("newMaze").onclick = newMaze

function startMazeGame() {
        document.getElementById("gameArea").style.display = "inline"
        document.onkeydown = checkKey;
        draw()
        findStartAndFinish()
        ball.x = start[0]
        game = setInterval(gameLoop, 1000/35); 
        timer = setInterval(updateTimer, 1000)
}

function resetGame() {
        time = 0
        moves = 0
        clearInterval(timer) /* stop timer */
        clearInterval(game) /* stop game */
        
        ball.x = start[0] /* reset ball back to start */
        ball.y = start[1]

        game = setInterval(gameLoop, 1000/35); 
        timer = setInterval(updateTimer, 1000)
        document.getElementById("gameOverPopUp").style.display = "none"
}

function endGame() {
        time = 0
        moves = 0
        clearInterval(timer) /* stop timer */
        clearInterval(game) /* stop game */
        document.getElementById("gameArea").style.display = "none"
        document.getElementById("gameOverPopUp").style.display = "none"
}

function gameLoop() {
        draw()
        updateMoves();
        checkForWin();
}


function updateTimer() {
        minutes = Math.floor(time / 60)
        seconds = time % 60
        seconds = seconds < 10 ? '0' + seconds: seconds
        timeElem.innerText = `${minutes}:${seconds}`
        time++  
}

function updateMoves() {
        if (moveElem) {
                moveElem.innerText = moves
        }
}

function findStartAndFinish() { 
        /* find start */
        pixel = ctx.getImageData(0, 0, canvas.width, 1).data;
        for (let i = 3; i < pixel.length; i += 4) {
                // Check the alpha channel (transparency)
                if (pixel[i] === 0) {
                        const x = (i / 4) % canvas.width;
                        start = [x+15, 10]
                        break;
                }
        }

        /* find end */
        pixel = ctx.getImageData(0, canvas.height-1, canvas.width, 1).data;
        for (let i = 3; i < pixel.length; i += 4) {
                // Check the alpha channel (transparency)
                if (pixel[i] === 0) {
                        const x = (i / 4) % canvas.width;
                        end = [x+5, canvas.height - 15]
                        break;
                }
        }
}

function checkForWin() {
        if (ball.x >= end[0] && ball.y >= end[1]) {
                clearInterval(timer) /* stop timer */
                document.getElementById("endTime").innerText = timeElem.innerText
                document.getElementById("endMoves").innerText = moves
                document.getElementById("gameOverPopUp").style.display = "inline"
        }
}

function newMaze() {
        
}

function newMaze() {
        mazeId = Math.floor(Math.random() * mazeCount);
        resetGame()
}

/* 
        - home screen -> instructions -> level 
                - if get to end before time -> new maze (reset score)
                - if not get to end -> try again with same maze?
        - TODO
        ---------
                - add score (increase with pickups)
                        - to the left of maze
                - make more mazes 
                - add things to pick up 
*/