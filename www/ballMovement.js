function checkKey(e) {
        if (e.keyCode == '37' && 
           !isBallCollidingWithImage(ball.x - velocityX, 
                                     ball.y, ball.radius)) { /* left */
                ball.x -= velocityX
                moves++
        } else if (e.keyCode == '39' && 
                   !isBallCollidingWithImage(ball.x + velocityX, 
                                             ball.y, ball.radius)) { /* right */
                ball.x += velocityX
                moves++
        } else if (e.keyCode == '40' && 
                  !isBallCollidingWithImage(ball.x, ball.y + velocityX, 
                                            ball.radius)) {  /* up */
                ball.y += velocityX
                moves++
        } else if (e.keyCode == '38' && 
                   !isBallCollidingWithImage(ball.x, ball.y - velocityX, 
                                             ball.radius)) { /* down */
                ball.y -= velocityX
                moves++
        } else if (e.keyCode == '32') { /* space bar */
                /* pause game */
                if (isTracking) {
                        isTracking = false
                        webgazer.pause(); //WebGazer.js is now paused, no data will be collected and the gaze callback will not be executed
                } else {
                        isTracking = true
                        webgazer.resume(); //data collection resumes, gaze callback will be called again
                }
        }
}

function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        /* draw ball */ 
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
        
        /* to temp canvas to color maze */
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        tempCtx.drawImage(mazeImg, 0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.globalCompositeOperation = "source-in";
        tempCtx.fillStyle = mazeColor;
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);

        /* draw colored maze back to original canvas */
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

        updateMoves();
}

function xF() {
    if (velocityX > 0)
        velocityX = velocityX - xFriction;
    if(velocityX < 0)
        velocityX = velocityX + xFriction;
}

function isBallCollidingWithImage(arcX, arcY, arcRadius) {
        /* collision with maze collision with floor */
        if (arcY < 0 || ball.y + ball.radius > canvas.height) {
                return true
        } 

        /* Draw the image on a temporary canvas */
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        tempCtx.drawImage(mazeImg, 0, 0, tempCanvas.width, tempCanvas.height);

        /* Check each pixel within the arc */
        for (let angle = 0; angle < 360; angle++) {
                const radians = (angle * Math.PI) / 180;
                const x = arcX + arcRadius * Math.cos(radians);
                const y = arcY + arcRadius * Math.sin(radians);

                /* get the pixel data of the portion of the maze 
                   the ball is touching */
                const pixel = tempCtx.getImageData(x, y, 1, 1).data;
                
                /* not transparent = collision */ 
                if (pixel[3] !== 0) { return true; }
        }

        return false; 
}