/*
 *  
 *  Assignment: NonWimp 2 Fall 2023
 *  Name: Stephanie Kim and Hameedah Lawal 
 *  Email: stephanie.kim640944@tufts.edu and hameedah.lawal@tufts.edu
 *  Functions and data that handle ball movements (eye tracking, key presses, 
 *  collisions, and draw methods); to be used in Model.js
 * 
 */

class Ball {
        constructor(x, y, radius, color, velocityX, model) {
                this.x = x
                this.y = y
                this.radius = radius
                this.color = color
                this.velocityX = velocityX;
                this.model = model
                // console.log(this)
                document.onkeydown = this.checkKey.bind(this)
        }

        ball() {
                return this
        }

        trackEye(data, ball) {  
                if (data == null) {
                        return;
                }

                var xprediction = data.x; //these x coordinates are relative to the viewport
                var yprediction = data.y; //these y coordinates are relative to the viewport

                if (xprediction == 0 || yprediction == 0) { /* corner case = a tie */
                        return
                }

                if (xprediction < 100 && 
                        !ball.isCollidingWithWall(ball.x - ball.velocityX, 
                        ball.y)) { /* left */
                        ball.x -= ball.velocityX
                        this.model.moves++
                }
                
                if (xprediction > (window.innerHeight - 100) &&
                        !ball.isCollidingWithWall(ball.x + ball.velocityX, 
                        ball.y)) { /* right */
                        ball.x += ball.velocityX
                        ball.model.moves++
                } 
                
                if (yprediction < 0 && 
                        !ball.isCollidingWithWall(ball.x, 
                                        ball.y - ball.velocityX)) {  /* up */
                        ball.y -= ball.velocityX
                        this.model.moves++
                }
                
                if (yprediction > (window.innerHeight - 100) && 
                        !ball.isCollidingWithWall(ball.x, 
                        ball.y + ball.velocityX)) { /* down */
                        ball.y += ball.velocityX
                        this.model.moves++
                } 
        }

        checkKey(e) {
                if (e.keyCode == '37' && 
                !this.isCollidingWithWall(this.x - this.velocityX, 
                        this.y)) { /* left */
                        this.x -= this.velocityX
                        this.model.moves++
                } else if (e.keyCode == '39' && 
                        !this.isCollidingWithWall(this.x + this.velocityX, 
                                this.y)) { /* right */
                                this.x += this.velocityX
                        this.model.moves++
                } else if (e.keyCode == '40' && 
                        !this.isCollidingWithWall(this.x, 
                                this.y + this.velocityX)) {  /* down */ 
                                this.y += this.velocityX
                        this.model.moves++
                } else if (e.keyCode == '38' && 
                        !this.isCollidingWithWall(this.x, 
                                this.y - this.velocityX)) { /* up */
                                this.y -= this.velocityX
                        this.model.moves++
                } else if (e.keyCode == '32') { /* space bar */
                console.log(this.model.isTracking)
                        /* pause game */
                        
                        if (this.model.isTracking) {
                                this.model.isTracking = false
                                webgazer.pause(); //WebGazer.js is now paused, no data will be collected and the gaze callback will not be executed
                        } else {
                                this.model.isTracking = true
                                webgazer.resume(); //data collection resumes, gaze callback will be called again
                        }
                } 
        }

        async drawBall() {
                this.model.ctx.clearRect(0, 0, this.model.canvas.width, 
                                        this.model.canvas.height); 
                /* draw ball */ 
                this.model.ctx.beginPath();
                this.model.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
                this.model.ctx.fillStyle = this.color;
                this.model.ctx.fill();
                this.model.ctx.closePath();
        }

        isCollidingWithWall (arcX, arcY) {
                /* collision with maze collision with floor */
                if (arcY < 0 || 
                    arcY + this.radius > this.model.canvas.height) {
                        return true
                } 

                /* Draw the image on a temporary canvas */
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = this.model.canvas.width;
                tempCanvas.height = this.model.canvas.height;
                const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
                tempCtx.drawImage(this.model.maze.mazeImg, 0, 0, tempCanvas.width, tempCanvas.height);

                /* Check each pixel within the arc */
                for (let angle = 0; angle < 360; angle++) {
                        const radians = (angle * Math.PI) / 180;
                        const x = arcX + this.radius * Math.cos(radians);
                        const y = arcY + this.radius * Math.sin(radians);

                        /* get the pixel data of the portion of the maze 
                        the ball is touching */
                        const pixel = tempCtx.getImageData(x, y, 1, 1).data;
                        
                        /* not transparent = collision */ 
                        if (pixel[3] !== 0) { return true; }
                }

                return false; 
        }
}