function trackEye(data) {  
	widthMiddle = window.innerWidth / 2; 
	heightMiddle = window.innerHeight / 2; 
	if (data == null) {
		return;
	}
	var xprediction = data.x; //these x coordinates are relative to the viewport
	var yprediction = data.y; //these y coordinates are relative to the viewport

	if (xprediction < widthMiddle && 
		!isBallCollidingWithImage(ball.x - velocityX, 
		ball.y, ball.radius)) { /* left */
		ball.x -= velocityX
		moves++
	} 
	
	if (xprediction >= widthMiddle &&
		!isBallCollidingWithImage(ball.x + velocityX, 
		ball.y, ball.radius)) { /* right */
		ball.x += velocityX
		moves++

	} 
	
	if (yprediction < heightMiddle && 
		!isBallCollidingWithImage(ball.x, ball.y - velocityX, 
		ball.radius)) {  /* up */
		ball.y -= velocityX
		moves++

	} 
	
	if (yprediction >= heightMiddle && 
		!isBallCollidingWithImage(ball.x, ball.y + velocityX, 
		ball.radius)) { /* down */
		ball.y += velocityX
		moves++

	}
}