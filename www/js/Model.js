/*
 *  
 *  Assignment: NonWimp 2 Fall 2023
 *  Name: Stephanie Kim and Hameedah Lawal 
 *  Email: stephanie.kim640944@tufts.edu and hameedah.lawal@tufts.edu
 *  Variables and functions to store and update data of the game; 
 *  startMazeGame() to be called by main.js and to start the game
 * 
 */

class Model {
        constructor() {
                this.isTracking = true
                this.canvas = document.getElementById('canvas');
                this.ctx = this.canvas.getContext('2d');
                this.moves = 0
                this.timeElem = document.getElementById('time')
                this.moveElem = document.getElementById('moves')
                this.start = [320, 20]
                this.end = [350, 660] /* start and end for maze8 */
                this.time = 0
                this.timer, this.game;
                this.maze = new Maze(8, this.canvas.width, this.canvas.height, 
                                     this.ctx, "imgs/mazes/")
                this.ball = new Ball(this.start[0], this.start[1], 6, "#EF6E50", 5, this)
                this.startAndFinish = []

                /* button listeners */
                document.getElementById("reset").onclick = this.resetGame.bind(this)
                document.getElementById("sameMaze").onclick = this.resetGame.bind(this)
        }

        async startMazeGame() {
                document.getElementById("gameArea").style.display = "inline"
                this.ball.x = this.start[0]
                this.ball.y = this.start[1]
                await this.draw()
                console.log("setting to true")
                this.isTracking = true
                await this.startTimers()
        }

        async startTimers() {
                this.game = setInterval(this.gameLoop.bind(this), 1000/35);
                this.timer = setInterval(this.updateTimer.bind(this), 1000)
        }

        async resetGame() {
                this.time = 0
                this.moves = 0
                clearInterval(this.timer) /* stop timer */
                clearInterval(this.game) /* stop game */
                
                console.log(this.start)
                this.ball.x = this.start[0] /* reset ball back to start */
                this.ball.y = this.start[1]

                this.game = setInterval(this.gameLoop.bind(this), 1000/35); 
                this.timer = setInterval(this.updateTimer.bind(this), 1000)
                document.getElementById("gameOverPopUp").style.display = "none"
        }

        async draw() {
                this.ball.drawBall()
                this.maze.drawMaze()
                this.updateMoves()
        }

        gameLoop() {
                this.draw()
                this.checkForWin();
        }


        endGame() {
                this.time = 0
                this.moves = 0
                clearInterval(this.timer) /* stop timer */
                clearInterval(this.game) /* stop game */
                document.getElementById("gameArea").style.display = "none"
                document.getElementById("gameOverPopUp").style.display = "none"
        }



        async updateTimer() {
                if (this.isTracking) {
                        let minutes = Math.floor(this.time / 60)
                        let seconds = this.time % 60
                        seconds = seconds < 10 ? '0' + seconds: seconds
                        this.timeElem.innerText = `${minutes}:${seconds}`
                        this.time++  
                }
        }

        updateMoves() {
                if (this.moveElem) {
                        this.moveElem.innerText = this.moves
                }
        }

        async checkForWin() {
                if (this.ball.x >= this.end[0] && this.ball.x <= 400 &&
                        this.ball.y >= this.end[1]) {
                        clearInterval(this.timer) /* stop timer */
                        document.getElementById("endTime").innerText = this.timeElem.innerText
                        document.getElementById("endMoves").innerText = this.moves
                        document.getElementById("gameOverPopUp").style.display = "inline"
                }
        }
}